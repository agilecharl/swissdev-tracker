import { PrismaClient } from '@prisma/client';
import DatabaseService from '../lib/database';

export interface CreateCompanyData {
  name: string;
  description?: string;
  industry: string;
  size?: string;
  location: string;
  website?: string;
  founded?: number;
  benefits?: string[];
}

export interface UpdateCompanyData extends Partial<CreateCompanyData> {
  logo?: string;
  rating?: number;
}

export interface CompanyQueryOptions {
  industry?: string;
  location?: string;
  size?: string;
  minRating?: number;
  limit?: number;
  offset?: number;
}

export class CompanyService {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = DatabaseService.getInstance();
  }

  async searchCompanies(query: string, options: CompanyQueryOptions = {}) {
    const { limit = 50, offset = 0 } = options;
    const [companies, total] = await Promise.all([
      this.prisma.company.findMany({
        where: {
          OR: [
            {
              name: {
                contains: query,
                mode: 'insensitive',
              },
            },
            {
              description: {
                contains: query,
                mode: 'insensitive',
              },
            },
          ],
        },
        // Removed invalid 'companyRef' include as it does not exist in the Prisma schema
        // If you want to include related data, replace this with a valid relation from your Prisma schema
        orderBy: {
          name: 'asc',
        },
        take: limit,
        skip: offset,
      }),
      this.prisma.job.count({
        where: {
          OR: [
            {
              title: {
                // Changed from 'name' to 'title'
                contains: query,
                mode: 'insensitive',
              },
            },
            {
              description: {
                contains: query,
                mode: 'insensitive',
              },
            },
          ],
        },
      }),
    ]);
    return { companies, total };
  }

  async getAllCompanies(options: CompanyQueryOptions = {}) {
    const {
      industry,
      location,
      size,
      minRating,
      limit = 50,
      offset = 0,
    } = options;

    const where: any = {};

    if (industry) {
      where.industry = {
        contains: industry,
        mode: 'insensitive',
      };
    }

    if (location) {
      where.location = {
        contains: location,
        mode: 'insensitive',
      };
    }

    if (size) {
      where.size = {
        contains: size,
        mode: 'insensitive',
      };
    }

    if (minRating !== undefined) {
      where.rating = {
        gte: minRating,
      };
    }

    const [companies, total] = await Promise.all([
      this.prisma.company.findMany({
        where,
        include: {
          _count: {
            select: {
              jobs: {
                where: {
                  status: 'ACTIVE',
                },
              },
            },
          },
        },
        orderBy: [{ rating: 'desc' }, { name: 'asc' }],
        take: limit,
        skip: offset,
      }),
      this.prisma.company.count({ where }),
    ]);

    // Transform the result to include the active jobs count
    const companiesWithJobCount = companies.map(
      (company: { _count: { jobs: any } }) => ({
        ...company,
        openPositions: company._count.jobs,
        _count: undefined, // Remove the _count from the result
      })
    );

    return { companies: companiesWithJobCount, total };
  }

  async getCompanyById(id: number) {
    const company = await this.prisma.company.findUnique({
      where: { id },
      include: {
        jobs: {
          select: {
            id: true,
            title: true,
            type: true,
            salary: true,
            postedDate: true,
            status: true,
          },
          orderBy: {
            postedDate: 'desc',
          },
        },
        _count: {
          select: {
            jobs: {
              where: {
                status: 'ACTIVE',
              },
            },
          },
        },
      },
    });

    if (!company) {
      return null;
    }

    return {
      ...company,
      openPositions: company._count.jobs,
      _count: undefined,
    };
  }

  async createCompany(data: CreateCompanyData) {
    // Check if company name already exists
    const existingCompany = await this.prisma.company.findUnique({
      where: { name: data.name },
    });

    if (existingCompany) {
      throw new Error('Company with this name already exists');
    }

    return this.prisma.company.create({
      data: {
        ...data,
        benefits: data.benefits || [],
      },
    });
  }

  async updateCompany(id: number, data: UpdateCompanyData) {
    const existingCompany = await this.prisma.company.findUnique({
      where: { id },
    });

    if (!existingCompany) {
      throw new Error('Company not found');
    }

    // If name is being updated, check for uniqueness
    if (data.name && data.name !== existingCompany.name) {
      const nameExists = await this.prisma.company.findUnique({
        where: { name: data.name },
      });
      if (nameExists) {
        throw new Error('Company with this name already exists');
      }
    }

    return this.prisma.company.update({
      where: { id },
      data,
    });
  }

  async deleteCompany(id: number) {
    const existingCompany = await this.prisma.company.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            jobs: true,
          },
        },
      },
    });

    if (!existingCompany) {
      throw new Error('Company not found');
    }

    // Check if company has associated jobs
    if (existingCompany._count.jobs > 0) {
      // Instead of preventing deletion, we'll set companyId to null for associated jobs
      await this.prisma.job.updateMany({
        where: { companyId: id },
        data: { companyId: null },
      });
    }

    await this.prisma.company.delete({
      where: { id },
    });

    return true;
  }

  async getCompanyByName(name: string) {
    return this.prisma.company.findFirst({
      where: {
        name: {
          equals: name,
          mode: 'insensitive',
        },
      },
    });
  }

  async searchCompaniesByIndustry(industry: string) {
    return this.prisma.company.findMany({
      where: {
        industry: {
          contains: industry,
          mode: 'insensitive',
        },
      },
      orderBy: {
        rating: 'desc',
      },
    });
  }

  async getTopRatedCompanies(limit: number = 10) {
    return this.prisma.company.findMany({
      where: {
        rating: {
          gt: 0,
        },
      },
      orderBy: {
        rating: 'desc',
      },
      take: limit,
    });
  }

  async updateCompanyRating(id: number, rating: number) {
    if (rating < 0 || rating > 5) {
      throw new Error('Rating must be between 0 and 5');
    }

    return this.prisma.company.update({
      where: { id },
      data: { rating },
    });
  }
}
