# SwissDev Tracker API

A comprehensive REST API for tracking Swiss development jobs and companies.

## Features

- ✅ CRUD operations for jobs
- ✅ CRUD operations for companies
- ✅ Advanced filtering and search
- ✅ Company-specific job listings
- ✅ TypeScript support
- ✅ Error handling and validation

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# From the monorepo root
npm install

# Start the API development server
nx serve api
```

The API will be available at `http://localhost:3333/api`

## API Endpoints

### Health Check

- **GET** `/api` - Health check and API information

### Jobs

- **GET** `/api/jobs` - Get all jobs with optional filtering
- **GET** `/api/jobs/:id` - Get a specific job by ID
- **POST** `/api/jobs` - Create a new job
- **PUT** `/api/jobs/:id` - Update an existing job
- **DELETE** `/api/jobs/:id` - Delete a job

#### Job Query Parameters

- `company` - Filter by company name (partial match)
- `location` - Filter by location (partial match)
- `type` - Filter by job type (exact match)
- `status` - Filter by job status (exact match)

#### Job Object Structure

```json
{
  "id": 1,
  "title": "Senior Full Stack Developer",
  "company": "Swiss Tech AG",
  "location": "Zurich",
  "type": "Full-time",
  "salary": "120000-150000 CHF",
  "description": "We are looking for a senior full stack developer...",
  "requirements": ["React", "Node.js", "TypeScript"],
  "postedDate": "2025-01-15",
  "status": "active"
}
```

### Companies

- **GET** `/api/companies` - Get all companies with optional filtering
- **GET** `/api/companies/:id` - Get a specific company by ID
- **POST** `/api/companies` - Create a new company
- **PUT** `/api/companies/:id` - Update an existing company
- **DELETE** `/api/companies/:id` - Delete a company
- **GET** `/api/companies/:id/jobs` - Get jobs for a specific company

#### Company Query Parameters

- `industry` - Filter by industry (partial match)
- `location` - Filter by location (partial match)
- `size` - Filter by company size (partial match)
- `minRating` - Filter by minimum rating (numeric)

#### Company Object Structure

```json
{
  "id": 1,
  "name": "Swiss Tech AG",
  "description": "Leading technology company...",
  "industry": "Financial Technology",
  "size": "201-500 employees",
  "location": "Zurich",
  "website": "https://swisstech.ch",
  "founded": 2015,
  "logo": "https://example.com/logos/swisstech.png",
  "benefits": ["Health Insurance", "Flexible Hours"],
  "openPositions": 5,
  "rating": 4.5
}
```

## Example Requests

### Create a Job

```bash
curl -X POST http://localhost:3333/api/jobs \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Frontend Developer",
    "company": "Tech Startup",
    "location": "Geneva",
    "type": "Full-time",
    "salary": "80000-100000 CHF",
    "description": "Looking for a passionate frontend developer",
    "requirements": ["React", "TypeScript", "CSS"]
  }'
```

### Get Jobs with Filtering

```bash
# Get all full-time jobs in Zurich
curl "http://localhost:3333/api/jobs?type=Full-time&location=Zurich"

# Get jobs from a specific company
curl "http://localhost:3333/api/jobs?company=Swiss%20Tech"
```

### Create a Company

```bash
curl -X POST http://localhost:3333/api/companies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Innovative Solutions AG",
    "description": "A cutting-edge technology company",
    "industry": "Software Development",
    "location": "Basel",
    "website": "https://innovative.ch",
    "founded": 2020,
    "benefits": ["Health Insurance", "Remote Work"]
  }'
```

## Response Format

All API responses follow a consistent format:

### Success Response

```json
{
  "success": true,
  "data": {
    /* response data */
  },
  "total": 10, // For list endpoints
  "message": "Operation completed successfully" // For create/update/delete
}
```

### Error Response

```json
{
  "success": false,
  "message": "Error description"
}
```

## Error Codes

- `400` - Bad Request (validation errors)
- `404` - Not Found (resource doesn't exist)
- `500` - Internal Server Error

## Development

### Project Structure

```
src/
├── main.ts           # Main application entry point
├── routes/           # Route handlers
│   ├── jobs.ts       # Job-related endpoints
│   └── companies.ts  # Company-related endpoints
└── types/            # TypeScript type definitions
    └── index.ts      # API interfaces and types
```

### Adding New Features

1. Define types in `src/types/index.ts`
2. Create route handlers in `src/routes/`
3. Register routes in `src/main.ts`
4. Update this documentation

## Future Enhancements

- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] Authentication and authorization
- [ ] Rate limiting
- [ ] Caching with Redis
- [ ] File upload for company logos
- [ ] Email notifications
- [ ] Advanced search with Elasticsearch
- [ ] GraphQL endpoint
- [ ] API versioning
- [ ] Swagger/OpenAPI documentation
