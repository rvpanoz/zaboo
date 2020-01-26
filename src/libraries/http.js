/**
 * HTTP GET
 * @param {*} params
 */
export const getRequest = params => {
  const { url } = params || {};
  const options = {
    method: "GET"
  };

  return fetch(url, options)
    .then(response => response.json())
    .catch(error => console.error(error));
};

/**
 * HTTP POST
 * @param {*} params
 * @param {*} headers
 */
export const postRequest = (params, headers = {}) => {
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      ...headers
    }
  };

  const { url, payload } = params || {};

  return fetch(url, { body: payload, ...options })
    .then(response => response.json())
    .catch(error => console.error(error));
};
