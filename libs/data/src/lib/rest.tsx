import { useEffect, useState } from 'react';

export function Rest() {
  return (
    <div>
      <h1>Welcome to Rest!</h1>
    </div>
  );
}
export function useFetchData(endpoint: string) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3001/${endpoint}`)
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [endpoint]);

  return { data, loading, error };
}
export default Rest;
