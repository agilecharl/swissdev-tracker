CREATE TABLE jobs (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    company NUMERIC(12) NOT NULL,
    location VARCHAR(255),
    salary NUMERIC(12, 2),
    posted_date DATE NOT NULL DEFAULT CURRENT_DATE,
    status VARCHAR(50) DEFAULT 'open'
);