const fetch = global.fetch;
const OPTIONS = "options";

/**
 * HTTP GET
 * @param {*} params
 */

const objectToQueryString = obj =>
  Object.keys(obj)
    .filter(key => key !== OPTIONS)
    .map(key => key + "=" + obj[key])
    .join("&");

export const getRequest = (params, options) => {
  const { path, ...rest } = params || {};
  const resource = `${path}?${objectToQueryString(rest)}`;
  console.log(resource.toString());

  return fetch(resource, {
    ...options
  })
    .then(response => {
      const { redirected } = response;

      if (redirected) {
        return response;
      }
      return response.json();
    })
    .catch(error => {
      return new Error(error);
    });
};

/**
 * HTTP POST
 * @param {*} params
 * @param {*} headers
 */
export const postRequest = ({ headers = {}, ...params }) => {
  const { path: resource, payload } = params || {};
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      ...headers
    }
  };

  return fetch(resource, { body: payload, ...options })
    .then(response => response.json())
    .catch(error => {
      return new Error(error);
    });
};
