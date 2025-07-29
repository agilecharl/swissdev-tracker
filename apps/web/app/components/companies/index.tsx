import React from 'react';
import DashboardNavBar from '../system/dashBoardNavBar';

interface Company {
  id: string;
  name: string;
  location: string;
  description: string;
}

interface CompaniesProps {
  companies: Company[];
}

const Companies: React.FC<CompaniesProps> = ({ companies }) => {
  if (!companies || companies.length === 0) {
    return (
      <div>
        <DashboardNavBar items={[]} />
        No company listings available.
      </div>
    );
  }

  return (
    <div>
      <DashboardNavBar items={[]} />
      <main className="main-content">
        <section className="section">
          <h1>Companies</h1>
          <div className="card">
            <p>Company details</p>
            <p>Employee stats</p>
            <p>Update profile</p>
          </div>
        </section>
        <ul>
          {companies.map((company) => (
            <li key={company.id} style={{ marginBottom: '1.5rem' }}>
              <h3>{company.name}</h3>
              <p>
                <strong>Location:</strong> {company.location}
              </p>
              <p>{company.description}</p>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default Companies;
