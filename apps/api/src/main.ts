/**
 * SwissDev Tracker API
 * A comprehensive API for tracking Swiss development jobs and companies.
 */

import express from 'express';
import * as path from 'path';
import applicantsRouter from './routes/applicants';
import companiesRouter from './routes/companies';
import jobsRouter from './routes/jobs';

const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// CORS middleware (for development)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  return next();
});

// Health check endpoint
app.get('/api', (req, res) => {
  return res.json({
    message: 'Welcome to SwissDev Tracker API!',
    version: '1.0.0',
    status: 'healthy',
    endpoints: {
      jobs: '/api/jobs',
      companies: '/api/companies',
    },
  });
});

// API Routes
app.use('/api/jobs', jobsRouter);
app.use('/api/companies', companiesRouter);
app.use('/api/applicants', applicantsRouter);

// 404 handler
app.use('*', (req, res) => {
  return res.status(404).json({
    success: false,
    message: 'Endpoint not found',
    availableEndpoints: [
      'GET /api - Health check',
      'GET /api/jobs - Get all jobs',
      'GET /api/jobs/count - Get total number of jobs',
      'GET /api/jobs/search - Search jobs',
      'POST /api/jobs - Create a job',
      'GET /api/jobs/:id - Get job by ID',
      'PUT /api/jobs/:id - Update job',
      'DELETE /api/jobs/:id - Delete job',
      'GET /api/companies - Get all companies',
      'GET /api/companies/count - Get total number of companies',
      'GET /api/companies/search - Search companies',
      'POST /api/companies - Create a company',
      'GET /api/companies/:id - Get company by ID',
      'PUT /api/companies/:id - Update company',
      'DELETE /api/companies/:id - Delete company',
      'GET /api/companies/:id/jobs - Get jobs for a company',
      'GET /api/applicants - Get all applicants',
      'POST /api/applicants - Create an applicant',
      'GET /api/applicants/:id - Get applicant by ID',
      'PUT /api/applicants/:id - Update applicant',
      'DELETE /api/applicants/:id - Delete applicant',
      'GET /api/applicants/:id/jobs - Get jobs for a specific applicant',
      'GET /api/applicants/count - Get total number of applicants',
      'GET /api/jobs/count - Get total number of jobs',
    ],
  });
});

// Error handling middleware
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error('Error:', err);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
  }
);

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(
    `🚀 SwissDev Tracker API is running at http://localhost:${port}/api`
  );
  console.log(`📋 Jobs endpoint: http://localhost:${port}/api/jobs`);
  console.log(`🏢 Companies endpoint: http://localhost:${port}/api/companies`);
  console.log(
    `👥 Applicants endpoint: http://localhost:${port}/api/applicants`
  );
});
server.on('error', console.error);
