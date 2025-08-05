import { PrismaClient } from '@prisma/client';
import DatabaseService from '../lib/database';

export interface CreateApplicantData {
  name: string;
}

export interface UpdateApplicantData extends Partial<CreateApplicantData> {
  location?: string;
}

export interface ApplicantQueryOptions {
  name?: string;
}

export class ApplicantService {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = DatabaseService.getInstance();
  }

  async getAllCompanies(options: ApplicantQueryOptions = {}) {
    const { name } = options;

    const where: any = {};

    if (name) {
      where.name = {
        contains: name,
        mode: 'insensitive',
      };
    }

    const applicants = await this.prisma.applicant.findMany({
      where,
      orderBy: { name: 'asc' },
      distinct: ['name'], // Ensure unique names
    });

    // Transform the result to include the active jobs count
    const applicantsWithJobCount = applicants.map((applicant: any) => ({
      ...applicant,
      openPositions: applicant.jobs.filter(
        (job: any) => job.status === 'ACTIVE'
      ).length,
      jobs: applicant.jobs, // keep jobs if needed
    }));

    return {
      applicants: applicantsWithJobCount,
      total: applicantsWithJobCount.length,
    };
  }

  async createApplicant(data: CreateApplicantData) {
    // Check if applicant name already exists
    const existingApplicant = await this.prisma.applicant.findFirst({
      where: { name: data.name },
    });

    if (existingApplicant) {
      throw new Error('Applicant with this name already exists');
    }

    return this.prisma.applicant.create({
      data: {
        name: data.name,
        status: 'ACTIVE', // Default status
      },
    });
  }

  async updateApplicant(id: number, data: UpdateApplicantData) {
    const existingApplicant = await this.prisma.applicant.findUnique({
      where: { id },
    });

    if (!existingApplicant) {
      throw new Error('Applicant not found');
    }

    // If name is being updated, check for uniqueness
    if (data.name && data.name !== existingApplicant.name) {
      const nameExists = await this.prisma.applicant.findFirst({
        where: { name: data.name },
      });
      if (nameExists) {
        throw new Error('Applicant with this name already exists');
      }
    }

    return this.prisma.applicant.update({
      where: { id },
      data,
    });
  }

  async deleteApplicant(id: number) {
    const existingApplicant = await this.prisma.applicant.findUnique({
      where: { id },
    });

    if (!existingApplicant) {
      throw new Error('Applicant not found');
    }

    // Check if applicant has associated jobs
    const jobsCount = await this.prisma.job.count({
      where: { companyId: id },
    });

    if (jobsCount > 0) {
      // Instead of preventing deletion, we'll set companyId to null for associated jobs
      await this.prisma.job.updateMany({
        where: { companyId: id },
        data: { companyId: null },
      });
    }

    await this.prisma.applicant.delete({
      where: { id },
    });

    return true;
  }

  async getApplicantByName(name: string) {
    return this.prisma.applicant.findFirst({
      where: { name },
    });
  }
}
