CREATE TABLE job (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    company VARCHAR(255),
    location VARCHAR(255),
    salary NUMERIC(12, 2),
    posted_date DATE NOT NULL DEFAULT CURRENT_DATE,
    status VARCHAR(50) DEFAULT 'open'
);