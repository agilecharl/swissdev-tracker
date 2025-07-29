import React from 'react';
import DashboardNavBar from '../system/dashBoardNavBar';

interface Company {
  id: string;
  name: string;
  location: string;
  description: string;
}

interface CompaniesProps {
  countries: string[];
}

const Companies: React.FC<CompaniesProps> = ({ countries }) => {
  if (!countries || countries.length === 0) {
    return (
      <div>
        <DashboardNavBar
          items={[
            { label: 'Home', href: '/' },
            { label: 'Jobs', href: '/jobs' },
            { label: 'Tracking', href: '/tracking' },
            { label: 'Companies', href: '/companies' },
          ]}
        />
        No country listings available.
      </div>
    );
  }

  return (
    <div>
      <DashboardNavBar
        items={[
          { label: 'Home', href: '/' },
          { label: 'Jobs', href: '/jobs' },
          { label: 'Tracking', href: '/tracking' },
          { label: 'Companies', href: '/companies' },
        ]}
      />
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
          {countries.map((country) => (
            <li key={country} style={{ marginBottom: '1.5rem' }}>
              <h3>{country}</h3>
              <p>
                <strong>Location:</strong> {country}
              </p>
              <p>Description of the company in {country}.</p>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default Companies;
