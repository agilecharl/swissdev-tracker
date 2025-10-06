const apiUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:3333';

export const getRecords = (url: string, params: any) => {
  let localApiUrl = `${apiUrl}/api/${url}`;
  localApiUrl = `${localApiUrl}`;

  return fetch(localApiUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(async (response) => {
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${text}`);
      }
      
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        throw new Error(`Expected JSON response but received: ${contentType}. Response: ${text.substring(0, 200)}...`);
      }
      
      return response.json();
    })
    .then(async (data) => {
      return data;
    })
    .catch((error) => {
      console.error('Error in getRecords:', error);
      throw error;
    });
};

export const insertRecord = (url: string, content: any) => {
  let localApiUrl = `${apiUrl}/api/${url}`;
  localApiUrl = `${localApiUrl}`;

  return fetch(localApiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(content),
  })
    .then(async (response) => {
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${text}`);
      }
      
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        throw new Error(`Expected JSON response but received: ${contentType}. Response: ${text.substring(0, 200)}...`);
      }
      
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error('Error in insertRecord:', error);
      throw error;
    });
};

export const updateRecord = (url: string, content: any) => {
  let localApiUrl = `${apiUrl}/api/${url}`;
  localApiUrl = `${localApiUrl}`;

  return fetch(localApiUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(content),
  })
    .then(async (response) => {
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${text}`);
      }
      
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        throw new Error(`Expected JSON response but received: ${contentType}. Response: ${text.substring(0, 200)}...`);
      }
      
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error('Error in updateRecord:', error);
      throw error;
    });
};

export const deleteRecord = (url: string, params: any) => {
  let localApiUrl = `${apiUrl}/api/${url}`;
  localApiUrl = `${localApiUrl}`;

  return fetch(localApiUrl, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(async (response) => {
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${text}`);
      }
      
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        throw new Error(`Expected JSON response but received: ${contentType}. Response: ${text.substring(0, 200)}...`);
      }
      
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error('Error in deleteRecord:', error);
      throw error;
    });
};
