const apiUrl = process.env.API_URL ?? '';

export const getRecords = (url: string, params: any) => {
  let localApiUrl = `${apiUrl}/${url}`;
  localApiUrl = `${localApiUrl}`;

  return fetch(localApiUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
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
  let localApiUrl = `${apiUrl}/${url}`;
  localApiUrl = `${localApiUrl}`;

  return fetch(localApiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(content),
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

export const updateRecord = (url: string, content: any) => {
  let localApiUrl = `${apiUrl}/${url}`;
  localApiUrl = `${localApiUrl}`;

  return fetch(localApiUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(content),
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

export const deleteRecord = (url: string, params: any) => {
  let localApiUrl = `${apiUrl}/${url}`;
  localApiUrl = `${localApiUrl}`;

  return fetch(localApiUrl, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};
