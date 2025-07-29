import React from 'react';

interface DashBoardNavBarProps {
  items: { label: string; href: string }[];
  activeHref?: string;
  onNavigate?: (href: string) => void;
}

const initialMenuItems = [
  { label: 'Home', href: '/' },
  { label: 'Jobs', href: '/jobs' },
  { label: 'Tracking', href: '/tracking' },
  { label: 'Companies', href: '/companies' },
];

const DashBoardNavBar: React.FC<DashBoardNavBarProps> = ({
  items,
  activeHref,
  onNavigate,
}) => {
  const menuItems = items.length > 0 ? items : initialMenuItems;

  return (
    <nav className="dashboard-navbar">
      <ul className="dashboard-navbar-list">
        {menuItems.map((item) => (
          <li
            key={item.href}
            className={`dashboard-navbar-item${
              activeHref === item.href ? ' active' : ''
            }`}
          >
            <a
              href={item.href}
              onClick={(e) => {
                if (onNavigate) {
                  e.preventDefault();
                  onNavigate(item.href);
                }
              }}
              className="dashboard-navbar-link"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
      <style>{`
        .dashboard-navbar {
          background: #f8f9fa;
          padding: 0.5rem 1rem;
          border-bottom: 1px solid #e5e7eb;
        }
        .dashboard-navbar-list {
          display: flex;
          gap: 1rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .dashboard-navbar-item {
          margin: 0;
        }
        .dashboard-navbar-link {
          text-decoration: none;
          color: #374151;
          font-weight: 500;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          transition: background 0.2s;
        }
        .dashboard-navbar-item.active .dashboard-navbar-link,
        .dashboard-navbar-link:hover {
          background: #e5e7eb;
          color: #111827;
        }
      `}</style>
    </nav>
  );
};

export default DashBoardNavBar;
