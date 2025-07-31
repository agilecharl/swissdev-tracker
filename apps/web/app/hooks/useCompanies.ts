import { useCallback, useEffect, useState } from 'react';
import {
  Company,
  CompanyFilters,
  CompanyService,
} from '../services/companyService';

interface UseCompaniesResult {
  companies: Company[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  filterCompanies: (filters: CompanyFilters) => Promise<void>;
}

export function useCompanies(
  initialFilters?: CompanyFilters
): UseCompaniesResult {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentFilters, setCurrentFilters] = useState<
    CompanyFilters | undefined
  >(initialFilters);

  const fetchCompanies = useCallback(async (filters?: CompanyFilters) => {
    try {
      setLoading(true);
      setError(null);
      const companiesData = await CompanyService.getCompanies(filters);
      setCompanies(companiesData);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to fetch companies';
      setError(errorMessage);
      console.error('Error fetching companies:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const refetch = useCallback(async () => {
    await fetchCompanies(currentFilters);
  }, [fetchCompanies, currentFilters]);

  const filterCompanies = useCallback(
    async (filters: CompanyFilters) => {
      setCurrentFilters(filters);
      await fetchCompanies(filters);
    },
    [fetchCompanies]
  );

  // Initial fetch
  useEffect(() => {
    fetchCompanies(initialFilters);
  }, [fetchCompanies, initialFilters]);

  return {
    companies,
    loading,
    error,
    refetch,
    filterCompanies,
  };
}

interface UseCompanyResult {
  company: Company | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useCompany(id: number): UseCompanyResult {
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCompany = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const companyData = await CompanyService.getCompanyById(id);
      setCompany(companyData);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to fetch company';
      setError(errorMessage);
      console.error('Error fetching company:', err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const refetch = useCallback(async () => {
    await fetchCompany();
  }, [fetchCompany]);

  // Initial fetch
  useEffect(() => {
    if (id) {
      fetchCompany();
    }
  }, [fetchCompany, id]);

  return {
    company,
    loading,
    error,
    refetch,
  };
}
