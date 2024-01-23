async function FetchInfo(token) {
  try {
    const response = await fetch('http://localhost:3001/api/fetch-user-info', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data; // Resolve the promise with the actual value
    } else {
      alert('Info fetching failed!');
      throw new Error('Info fetching failed');
    }
  } catch (error) {
    console.error('Error fetching name:', error);
    throw error; // Reject the promise with the caught error
  }
}

export default FetchInfo;
