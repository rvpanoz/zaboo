export const isPasswordValid = password => password.length > 8;
export const isEmailValid = email => {
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return regEx.test(email.trim().toLowerCase());
};

export const getRequest = params => {
  const { url } = params || {};
  const options = {
    method: "GET"
  };

  return fetch(url, options)
    .then(response => response.json())
    .catch(error => console.error(error));
};

export const postRequest = params => {
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8"
    }
  };

  const { url, payload } = params || {};

  return fetch(url, { body: payload, ...options })
    .then(response => response.json())
    .catch(error => console.error(error));
};
