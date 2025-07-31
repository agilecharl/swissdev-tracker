import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('./app.tsx'),
  route('jobs', './components/jobs/index.tsx'),
  route('companies', './components/companies/index.tsx'),
  route('tracking', './components/tracking/index.tsx'),
  route('settings', './components/system/settings.tsx'),
  route('about', './routes/about.tsx'),
  route('logout', './components/system/logout.tsx'),
  // Catch-all route for Chrome DevTools and other unmatched routes
  route('*', './routes/catch-all.tsx'),
] satisfies RouteConfig;
