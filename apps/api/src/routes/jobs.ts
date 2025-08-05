import { Router } from 'express';
import { JobService, JobStatus, JobType } from '../services/jobService';

const router = Router();
const jobService = new JobService();

// GET /api/jobs/search - Search jobs
router.get('/search', async (req, res) => {
  const query = req.query.q as string;

  if (!query) {
    return res.status(400).json({
      success: false,
      message: 'Search query is required',
    });
  }

  try {
    const jobs = await jobService.searchJobs(query);
    return res.json({
      success: true,
      results: jobs,
    });
  } catch (error) {
    console.error('Error searching jobs:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to search jobs',
    });
  }
});

// GET /api/jobs/count - Get total number of jobs
router.get('/count', async (req, res) => {
  try {
    const totalJobs = await jobService.getTotalJobsCount();
    return res.json({
      success: true,
      total: totalJobs,
    });
  } catch (error) {
    console.error('Error fetching total jobs count:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch total jobs count',
    });
  }
});

// GET /api/jobs - Get all jobs
router.get('/', async (req, res) => {
  try {
    const { company, location, type, status, limit, offset } = req.query;

    const options: any = {
      company: company as string,
      location: location as string,
      type: type ? (type as JobType) : undefined,
      status: status ? (status as JobStatus) : undefined,
      limit: limit ? parseInt(limit as string) : undefined,
      offset: offset ? parseInt(offset as string) : undefined,
    };

    // Remove undefined values
    Object.keys(options).forEach((key) => {
      if (options[key as keyof typeof options] === undefined) {
        delete options[key as keyof typeof options];
      }
    });

    const result = await jobService.getAllJobs(options);

    return res.json({
      success: true,
      data: result.jobs,
      total: result.total,
    });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch jobs',
    });
  }
});

// GET /api/jobs/:id - Get job by ID
router.get('/:id', async (req, res) => {
  try {
    const jobId = parseInt(req.params.id);

    if (isNaN(jobId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid job ID',
      });
    }

    const job = await jobService.getJobById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found',
      });
    }

    return res.json({
      success: true,
      data: job,
    });
  } catch (error) {
    console.error('Error fetching job:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch job',
    });
  }
});

// POST /api/jobs - Create a new job
router.post('/', async (req, res) => {
  try {
    const {
      title,
      company,
      companyId,
      location,
      type,
      salary,
      description,
      requirements,
    } = req.body;

    if (!title || !company || !location || !type) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: title, company, location, type',
      });
    }

    const jobData = {
      title,
      company,
      companyId: companyId ? parseInt(companyId) : undefined,
      location,
      type: type as JobType,
      salary,
      description,
      requirements: requirements || [],
    };

    const newJob = await jobService.createJob(jobData);

    return res.status(201).json({
      success: true,
      data: newJob,
      message: 'Job created successfully',
    });
  } catch (error) {
    console.error('Error creating job:', error);
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Failed to create job',
    });
  }
});

// PUT /api/jobs/:id - Update a job
router.put('/:id', async (req, res) => {
  try {
    const jobId = parseInt(req.params.id);

    if (isNaN(jobId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid job ID',
      });
    }

    const updateData = { ...req.body };
    if (updateData.companyId) {
      updateData.companyId = parseInt(updateData.companyId);
    }

    const updatedJob = await jobService.updateJob(jobId, updateData);

    return res.json({
      success: true,
      data: updatedJob,
      message: 'Job updated successfully',
    });
  } catch (error) {
    console.error('Error updating job:', error);
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Failed to update job',
    });
  }
});

// DELETE /api/jobs/:id - Delete a job
router.delete('/:id', async (req, res) => {
  try {
    const jobId = parseInt(req.params.id);

    if (isNaN(jobId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid job ID',
      });
    }

    await jobService.deleteJob(jobId);

    return res.json({
      success: true,
      message: 'Job deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting job:', error);
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Failed to delete job',
    });
  }
});

export default router;
