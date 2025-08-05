import { Router } from 'express';
import { CompanyService } from '../services/companyService';

const router = Router();
const companyService = new CompanyService();

// Sample company data (in a real app, this would come from a database)
const companies = [
  {
    id: 1,
    name: 'Swiss Tech AG',
    description:
      'Leading technology company in Switzerland specializing in fintech solutions.',
    industry: 'Financial Technology',
    size: '201-500 employees',
    location: 'Zurich',
    website: 'https://swisstech.ch',
    founded: 2015,
    logo: 'https://example.com/logos/swisstech.png',
    benefits: [
      'Health Insurance',
      'Flexible Hours',
      'Remote Work',
      'Stock Options',
    ],
    openPositions: 5,
    rating: 4.5,
  },
  {
    id: 2,
    name: 'Innovation Labs',
    description:
      'Cutting-edge research and development company focusing on AI and machine learning.',
    industry: 'Artificial Intelligence',
    size: '51-200 employees',
    location: 'Geneva',
    website: 'https://innovationlabs.ch',
    founded: 2018,
    logo: 'https://example.com/logos/innovationlabs.png',
    benefits: [
      'Health Insurance',
      'Learning Budget',
      'Gym Membership',
      'Catered Meals',
    ],
    openPositions: 3,
    rating: 4.7,
  },
  {
    id: 3,
    name: 'CloudFirst Solutions',
    description:
      'Cloud infrastructure and DevOps consulting company serving enterprise clients.',
    industry: 'Cloud Computing',
    size: '11-50 employees',
    location: 'Basel',
    website: 'https://cloudfirst.ch',
    founded: 2020,
    logo: 'https://example.com/logos/cloudfirst.png',
    benefits: [
      'Health Insurance',
      'Professional Development',
      'Remote Work',
      'Profit Sharing',
    ],
    openPositions: 2,
    rating: 4.3,
  },
  {
    id: 4,
    name: 'Alpine Software',
    description:
      'Software development company specializing in enterprise applications.',
    industry: 'Software Development',
    size: '101-200 employees',
    location: 'Bern',
    website: 'https://alpinesoftware.ch',
    founded: 2012,
    logo: 'https://example.com/logos/alpine.png',
    benefits: [
      'Health Insurance',
      'Pension Plan',
      'Flexible Hours',
      'Team Events',
    ],
    openPositions: 8,
    rating: 4.2,
  },
];

// GET /api/companies/search - Search companies by query
router.get('/search', async (req, res) => {
  const query = req.query.q as string;

  if (!query) {
    return res.status(400).json({
      success: false,
      message: 'Search query is required',
    });
  }

  try {
    const companies = await companyService.searchCompanies(query);
    return res.json({
      success: true,
      results: companies,
    });
  } catch (error) {
    console.error('Error searching companies:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to search companies',
    });
  }
});

// GET /api/companies/count - Get total number of companies
router.get('/count', (req, res) => {
  try {
    const totalCompanies = companies.length;
    return res.json({
      success: true,
      total: totalCompanies,
    });
  } catch (error) {
    console.error('Error fetching total companies count:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch total companies count',
    });
  }
});

// GET /api/companies - Get all companies
router.get('/', (req, res) => {
  const { industry, location, size, minRating } = req.query;

  let filteredCompanies = companies;

  if (industry) {
    filteredCompanies = filteredCompanies.filter((company) =>
      company.industry
        .toLowerCase()
        .includes((industry as string).toLowerCase())
    );
  }

  if (location) {
    filteredCompanies = filteredCompanies.filter((company) =>
      company.location
        .toLowerCase()
        .includes((location as string).toLowerCase())
    );
  }

  if (size) {
    filteredCompanies = filteredCompanies.filter((company) =>
      company.size.toLowerCase().includes((size as string).toLowerCase())
    );
  }

  if (minRating) {
    const rating = parseFloat(minRating as string);
    filteredCompanies = filteredCompanies.filter(
      (company) => company.rating >= rating
    );
  }

  return res.json({
    success: true,
    data: filteredCompanies,
    total: filteredCompanies.length,
  });
});

// GET /api/companies/:id - Get company by ID
router.get('/:id', (req, res) => {
  const companyId = parseInt(req.params.id);
  const company = companies.find((c) => c.id === companyId);

  if (!company) {
    return res.status(404).json({
      success: false,
      message: 'Company not found',
    });
  }

  return res.json({
    success: true,
    data: company,
  });
});

// POST /api/companies - Create a new company
router.post('/', (req, res) => {
  const {
    name,
    description,
    industry,
    size,
    location,
    website,
    founded,
    benefits,
  } = req.body;

  if (!name || !industry || !location) {
    return res.status(400).json({
      success: false,
      message: 'Missing required fields: name, industry, location',
    });
  }

  const newCompany = {
    id: Math.max(...companies.map((c) => c.id)) + 1,
    name,
    description: description || '',
    industry,
    size: size || 'Not specified',
    location,
    website: website || '',
    founded: founded || new Date().getFullYear(),
    logo: '',
    benefits: benefits || [],
    openPositions: 0,
    rating: 0,
  };

  companies.push(newCompany);

  return res.status(201).json({
    success: true,
    data: newCompany,
    message: 'Company created successfully',
  });
});

// PUT /api/companies/:id - Update a company
router.put('/:id', (req, res) => {
  const companyId = parseInt(req.params.id);
  const companyIndex = companies.findIndex((c) => c.id === companyId);

  if (companyIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Company not found',
    });
  }

  const updatedCompany = {
    ...companies[companyIndex],
    ...req.body,
    id: companyId, // Ensure ID doesn't change
  };

  companies[companyIndex] = updatedCompany;

  return res.json({
    success: true,
    data: updatedCompany,
    message: 'Company updated successfully',
  });
});

// DELETE /api/companies/:id - Delete a company
router.delete('/:id', (req, res) => {
  const companyId = parseInt(req.params.id);
  const companyIndex = companies.findIndex((c) => c.id === companyId);

  if (companyIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Company not found',
    });
  }

  companies.splice(companyIndex, 1);

  return res.json({
    success: true,
    message: 'Company deleted successfully',
  });
});

// GET /api/companies/:id/jobs - Get jobs for a specific company
router.get('/:id/jobs', (req, res) => {
  const companyId = parseInt(req.params.id);
  const company = companies.find((c) => c.id === companyId);

  if (!company) {
    return res.status(404).json({
      success: false,
      message: 'Company not found',
    });
  }

  // This would typically query the jobs collection/table
  // For now, we'll return a mock response
  const companyJobs = [
    {
      id: 1,
      title: 'Senior Full Stack Developer',
      type: 'Full-time',
      salary: '120000-150000 CHF',
      postedDate: '2025-01-15',
      status: 'active',
    },
  ].filter((job) => job.id === 1); // Mock filter for this company

  return res.json({
    success: true,
    data: {
      company: {
        id: company.id,
        name: company.name,
      },
      jobs: companyJobs,
      total: companyJobs.length,
    },
  });
});

export default router;
