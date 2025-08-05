CREATE TABLE applicants (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    resume TEXT,
    application_date DATE NOT NULL DEFAULT CURRENT_DATE
);