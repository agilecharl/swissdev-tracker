INSERT INTO applicants (name, email, phone, resume, application_date)
VALUES
    ('Alice Smith', 'alice.smith@example.com', '+41 79 123 45 67', 'https://example.com/resumes/alice-smith.pdf', NOW() - INTERVAL '1 week'),
    ('Bob Johnson', 'bob.johnson@example.com', '+41 79 234 56 78', 'https://example.com/resumes/bob-johnson.pdf', NOW() - INTERVAL '2 weeks'),
    ('Charlie Brown', 'charlie.brown@example.com', '+41 79 345 67 89', 'https://example.com/resumes/charlie-brown.pdf', NOW() - INTERVAL '3 days'),
    ('Diana Prince', 'diana.prince@example.com', '+41 79 456 78 90', 'https://example.com/resumes/diana-prince.pdf', NOW() - INTERVAL '5 days'),
    ('Ethan Hunt', 'ethan.hunt@example.com', '+41 79 567 89 01', 'https://example.com/resumes/ethan-hunt.pdf', NOW() - INTERVAL '1 month');