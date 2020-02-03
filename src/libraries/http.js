const fetch = global.fetch;

/**
 * HTTP GET
 * @param {*} params
 */

const objectToQueryString = obj =>
  Object.keys(obj)
    .map(key => key + "=" + obj[key])
    .join("&");

export const getRequest = params => {
  const { url, ...rest } = params || {};
  const fetchUrl = url + objectToQueryString(rest);

  return fetch(fetchUrl)
    .then(response => response.json())
    .catch(error => error);
};

/**
 * HTTP POST
 * @param {*} params
 * @param {*} headers
 */
export const postRequest = ({ headers = {}, ...params }) => {
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
    .catch(error => error);
};
