// Job-related interfaces
export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  salary: string;
  description: string;
  requirements: string[];
  postedDate: string;
  status: 'active' | 'inactive' | 'filled';
}

export interface CreateJobRequest {
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  salary?: string;
  description?: string;
  requirements?: string[];
}

export interface UpdateJobRequest extends Partial<CreateJobRequest> {
  status?: 'active' | 'inactive' | 'filled';
}

// Company-related interfaces
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

export interface CreateCompanyRequest {
  name: string;
  description?: string;
  industry: string;
  size?: string;
  location: string;
  website?: string;
  founded?: number;
  benefits?: string[];
}

export interface UpdateCompanyRequest extends Partial<CreateCompanyRequest> {
  logo?: string;
  openPositions?: number;
  rating?: number;
}

// API Response interfaces
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  total?: number;
}

export interface ErrorResponse {
  success: false;
  message: string;
  error?: string;
}

// Query parameters interfaces
export interface JobQueryParams {
  company?: string;
  location?: string;
  type?: string;
  status?: string;
}

export interface CompanyQueryParams {
  industry?: string;
  location?: string;
  size?: string;
  minRating?: string;
}
