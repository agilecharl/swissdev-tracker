import { Router } from 'express';

const router = Router();

// Sample applicant data (in a real app, this would come from a database)
const applicants = [
  {
    id: 1,
    name: 'Anna Meier',
    email: 'anna.meier@email.com',
    phone: '+41 79 123 45 67',
    location: 'Zurich',
    skills: ['JavaScript', 'React', 'Node.js'],
    experience: 5,
    education: 'MSc Computer Science, ETH Zurich',
    appliedPositions: [1, 2],
    status: 'active',
    rating: 4.8,
    resume: 'https://example.com/resumes/anna-meier.pdf',
    linkedin: 'https://linkedin.com/in/anna-meier',
    portfolio: 'https://anna-meier.dev',
  },
  {
    id: 2,
    name: 'Luca Rossi',
    email: 'luca.rossi@email.com',
    phone: '+41 78 234 56 78',
    location: 'Geneva',
    skills: ['Python', 'Machine Learning', 'Data Science'],
    experience: 3,
    education: 'BSc Data Science, University of Geneva',
    appliedPositions: [3],
    status: 'active',
    rating: 4.6,
    resume: 'https://example.com/resumes/luca-rossi.pdf',
    linkedin: 'https://linkedin.com/in/luca-rossi',
    portfolio: '',
  },
  {
    id: 3,
    name: 'Sophie Keller',
    email: 'sophie.keller@email.com',
    phone: '+41 76 345 67 89',
    location: 'Basel',
    skills: ['AWS', 'DevOps', 'Docker'],
    experience: 4,
    education: 'MSc Information Systems, University of Basel',
    appliedPositions: [2, 4],
    status: 'inactive',
    rating: 4.4,
    resume: 'https://example.com/resumes/sophie-keller.pdf',
    linkedin: 'https://linkedin.com/in/sophie-keller',
    portfolio: 'https://sophie-keller.dev',
  },
  {
    id: 4,
    name: 'Jonas Müller',
    email: 'jonas.mueller@email.com',
    phone: '+41 77 456 78 90',
    location: 'Bern',
    skills: ['Java', 'Spring Boot', 'Microservices'],
    experience: 6,
    education: 'BSc Software Engineering, University of Bern',
    appliedPositions: [1],
    status: 'active',
    rating: 4.7,
    resume: 'https://example.com/resumes/jonas-mueller.pdf',
    linkedin: 'https://linkedin.com/in/jonas-mueller',
    portfolio: '',
  },
];

router.get('/count', (req, res) => {
  return res.json({
    success: true,
    total: applicants.length,
  });
});

// GET /api/applicants - Get all applicants
router.get('/', (req, res) => {
  const { name, location } = req.query;

  let filteredApplicants = applicants;

  if (name) {
    filteredApplicants = filteredApplicants.filter((applicant) =>
      applicant.name.toLowerCase().includes((name as string).toLowerCase())
    );
  }

  if (location) {
    filteredApplicants = filteredApplicants.filter((applicant) =>
      applicant.location
        .toLowerCase()
        .includes((location as string).toLowerCase())
    );
  }

  return res.json({
    success: true,
    data: filteredApplicants,
    total: filteredApplicants.length,
  });
});

// GET /api/applicants/:id - Get applicant by ID
router.get('/:id', (req, res) => {
  const applicantId = parseInt(req.params.id);
  const applicant = applicants.find((c) => c.id === applicantId);

  if (!applicant) {
    return res.status(404).json({
      success: false,
      message: 'Applicant not found',
    });
  }

  return res.json({
    success: true,
    data: applicant,
  });
});

// POST /api/applicants - Create a new applicant
router.post('/', (req, res) => {
  const {
    name,
    email,
    phone,
    location,
    skills,
    experience,
    education,
    appliedPositions,
    status,
    rating,
    resume,
    linkedin,
    portfolio,
  } = req.body;

  if (!name || !location) {
    return res.status(400).json({
      success: false,
      message: 'Missing required fields: name, industry, location',
    });
  }

  const newApplicant = {
    id: Math.max(...applicants.map((c) => c.id)) + 1,
    name,
    email,
    phone,
    location,
    skills: skills || [],
    experience: experience || 0,
    education: education || '',
    appliedPositions: appliedPositions || [],
    status: status || 'active',
    rating: rating || 0,
    resume: resume || '',
    linkedin: linkedin || '',
    portfolio: portfolio || '',
  };

  applicants.push(newApplicant);

  return res.status(201).json({
    success: true,
    data: newApplicant,
    message: 'Applicant created successfully',
  });
});

// PUT /api/applicants/:id - Update a applicant
router.put('/:id', (req, res) => {
  const applicantId = parseInt(req.params.id);
  const applicantIndex = applicants.findIndex((c) => c.id === applicantId);

  if (applicantIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Applicant not found',
    });
  }

  const updatedApplicant = {
    ...applicants[applicantIndex],
    ...req.body,
    id: applicantId, // Ensure ID doesn't change
  };

  applicants[applicantIndex] = updatedApplicant;

  return res.json({
    success: true,
    data: updatedApplicant,
    message: 'Applicant updated successfully',
  });
});

// DELETE /api/applicants/:id - Delete a applicant
router.delete('/:id', (req, res) => {
  const applicantId = parseInt(req.params.id);
  const applicantIndex = applicants.findIndex((c) => c.id === applicantId);

  if (applicantIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Applicant not found',
    });
  }

  applicants.splice(applicantIndex, 1);

  return res.json({
    success: true,
    message: 'Applicant deleted successfully',
  });
});

// GET /api/applicants/:id/jobs - Get jobs for a specific applicant
router.get('/:id/jobs', (req, res) => {
  const applicantId = parseInt(req.params.id);
  const applicant = applicants.find((c) => c.id === applicantId);

  if (!applicant) {
    return res.status(404).json({
      success: false,
      message: 'Applicant not found',
    });
  }

  // This would typically query the jobs collection/table
  // For now, we'll return a mock response
  const applicantJobs = [
    {
      id: 1,
      title: 'Senior Full Stack Developer',
      type: 'Full-time',
      salary: '120000-150000 CHF',
      postedDate: '2025-01-15',
      status: 'active',
    },
  ].filter((job) => job.id === 1); // Mock filter for this applicant

  return res.json({
    success: true,
    data: {
      applicant: {
        id: applicant.id,
        name: applicant.name,
      },
      jobs: applicantJobs,
      total: applicantJobs.length,
    },
  });
});

export default router;
