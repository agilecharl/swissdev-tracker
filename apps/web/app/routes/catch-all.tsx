import type { LoaderFunctionArgs } from 'react-router';
import { useLocation } from 'react-router';

// Loader function to handle DevTools requests at the server level
export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);

  // Handle Chrome DevTools requests
  if (
    url.pathname.includes('.well-known/appspecific/com.chrome.devtools.json')
  ) {
    return new Response(JSON.stringify({ devtools: false }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // For other routes, return null to continue with normal rendering
  return null;
}

export default function CatchAll() {
  const location = useLocation();

  // For unmatched routes, show a 404 page
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <p>Path: {location.pathname}</p>
      <a href="/" style={{ color: '#007bff', textDecoration: 'underline' }}>
        Go back to home
      </a>
    </div>
  );
}
