import React from 'react';
import { useCompanies } from '../../hooks/useCompanies';
import DashboardNavBar from '../system/dashBoardNavBar';

const Companies: React.FC = () => {
  const { companies, loading, error, refetch } = useCompanies();

  if (loading) {
    return (
      <div>
        <DashboardNavBar items={[]} />
        <main className="main-content">
          <section className="section">
            <h1>Companies</h1>
            <div className="card">
              <p>Loading companies...</p>
            </div>
          </section>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <DashboardNavBar items={[]} />
        <main className="main-content">
          <section className="section">
            <h1>Companies</h1>
            <div className="card">
              <p>Error loading companies: {error}</p>
              <button
                onClick={refetch}
                style={{
                  marginTop: '1rem',
                  padding: '0.5rem 1rem',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Retry
              </button>
            </div>
          </section>
        </main>
      </div>
    );
  }
  if (!companies || companies.length === 0) {
    return (
      <div>
        <DashboardNavBar items={[]} />
        <main className="main-content">
          <section className="section">
            <h1>Companies</h1>
            <div className="card">
              <p>No company listings available.</p>
              <button
                onClick={refetch}
                style={{
                  marginTop: '1rem',
                  padding: '0.5rem 1rem',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Refresh
              </button>
            </div>
          </section>
        </main>
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
            <p>Browse {companies.length} Swiss development companies</p>
            <p>Find your next career opportunity</p>
            <button
              onClick={refetch}
              style={{
                marginTop: '1rem',
                padding: '0.5rem 1rem',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Refresh Data
            </button>
          </div>
        </section>
        <div className="companies-grid">
          {companies.map((company) => (
            <div
              key={company.id}
              className="company-card"
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '1.5rem',
                marginBottom: '1.5rem',
                backgroundColor: '#f9f9f9',
              }}
            >
              <div className="company-header" style={{ marginBottom: '1rem' }}>
                <h3 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>
                  {company.name}
                </h3>
                <div
                  style={{
                    display: 'flex',
                    gap: '1rem',
                    fontSize: '0.9rem',
                    color: '#666',
                  }}
                >
                  <span>
                    <strong>Industry:</strong> {company.industry}
                  </span>
                  <span>
                    <strong>Size:</strong> {company.size}
                  </span>
                  <span>
                    <strong>Rating:</strong> ⭐ {company.rating}/5
                  </span>
                </div>
              </div>

              <div className="company-details" style={{ marginBottom: '1rem' }}>
                <p style={{ margin: '0 0 0.5rem 0' }}>
                  <strong>Location:</strong> {company.location}
                </p>
                <p style={{ margin: '0 0 0.5rem 0', lineHeight: '1.5' }}>
                  {company.description}
                </p>
                {company.website && (
                  <p style={{ margin: '0 0 0.5rem 0' }}>
                    <strong>Website:</strong>{' '}
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#007bff' }}
                    >
                      {company.website}
                    </a>
                  </p>
                )}
                <p style={{ margin: '0 0 0.5rem 0' }}>
                  <strong>Founded:</strong> {company.founded}
                </p>
              </div>

              {company.benefits && company.benefits.length > 0 && (
                <div
                  className="company-benefits"
                  style={{ marginBottom: '1rem' }}
                >
                  <strong>Benefits:</strong>
                  <div
                    style={{
                      display: 'flex',
                      gap: '0.5rem',
                      marginTop: '0.5rem',
                      flexWrap: 'wrap',
                    }}
                  >
                    {company.benefits.map((benefit) => (
                      <span
                        key={benefit}
                        style={{
                          backgroundColor: '#e3f2fd',
                          color: '#1976d2',
                          padding: '0.25rem 0.5rem',
                          borderRadius: '12px',
                          fontSize: '0.8rem',
                          border: '1px solid #bbdefb',
                        }}
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div
                className="company-footer"
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '1rem',
                  paddingTop: '1rem',
                  borderTop: '1px solid #eee',
                }}
              >
                <span
                  style={{
                    backgroundColor:
                      company.openPositions > 0 ? '#d4edda' : '#f8d7da',
                    color: company.openPositions > 0 ? '#155724' : '#721c24',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '20px',
                    fontSize: '0.9rem',
                    fontWeight: 'bold',
                  }}
                >
                  {company.openPositions > 0
                    ? `${company.openPositions} Open Positions`
                    : 'No Open Positions'}
                </span>
                <button
                  style={{
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                  }}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Companies;
