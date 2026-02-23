export const commonAPI = async (method, url, body) => {

  const requestOptions = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (body) {
    requestOptions.body = JSON.stringify(body);
  }

  const response = await fetch(url, requestOptions);
  const data = await response.json();

  if (!response.ok) {
    throw data;
  }

  return data;
};