import apiClient from './apiService';

export interface Company {
  id: number;
  name: string;
  description: string;
  industry: string;
  size: string;
  location: string;
  website: string;
  founded: number;
  logo: string;
  benefits: string[];
  openPositions: number;
  rating: number;
}

export interface CompaniesResponse {
  success: boolean;
  data: Company[];
  total: number;
}

export interface CompanyResponse {
  success: boolean;
  data: Company;
}

export interface CompanyFilters {
  industry?: string;
  location?: string;
  size?: string;
  minRating?: number;
}

export class CompanyService {
  /**
   * Fetch all companies with optional filters
   */
  static async getCompanies(filters?: CompanyFilters): Promise<Company[]> {
    try {
      const params = new URLSearchParams();

      if (filters?.industry) {
        params.append('industry', filters.industry);
      }
      if (filters?.location) {
        params.append('location', filters.location);
      }
      if (filters?.size) {
        params.append('size', filters.size);
      }
      if (filters?.minRating) {
        params.append('minRating', filters.minRating.toString());
      }

      const queryString = params.toString();
      const url = queryString ? `/companies?${queryString}` : '/companies';

      const response = await apiClient.get<CompaniesResponse>(url);

      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error('Failed to fetch companies');
      }
    } catch (error) {
      console.error('Error fetching companies:', error);
      throw error;
    }
  }

  /**
   * Fetch a single company by ID
   */
  static async getCompanyById(id: number): Promise<Company> {
    try {
      const response = await apiClient.get<CompanyResponse>(`/companies/${id}`);

      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error('Failed to fetch company');
      }
    } catch (error) {
      console.error('Error fetching company:', error);
      throw error;
    }
  }

  /**
   * Create a new company
   */
  static async createCompany(companyData: Partial<Company>): Promise<Company> {
    try {
      const response = await apiClient.post<CompanyResponse>(
        '/companies',
        companyData
      );

      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error('Failed to create company');
      }
    } catch (error) {
      console.error('Error creating company:', error);
      throw error;
    }
  }

  /**
   * Update an existing company
   */
  static async updateCompany(
    id: number,
    companyData: Partial<Company>
  ): Promise<Company> {
    try {
      const response = await apiClient.put<CompanyResponse>(
        `/companies/${id}`,
        companyData
      );

      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error('Failed to update company');
      }
    } catch (error) {
      console.error('Error updating company:', error);
      throw error;
    }
  }

  /**
   * Delete a company
   */
  static async deleteCompany(id: number): Promise<void> {
    try {
      const response = await apiClient.delete(`/companies/${id}`);

      if (!response.data.success) {
        throw new Error('Failed to delete company');
      }
    } catch (error) {
      console.error('Error deleting company:', error);
      throw error;
    }
  }
}
