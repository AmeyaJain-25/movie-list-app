import { isEmpty } from 'lodash';

import serverConfig from '~/config';
import { isProductionHostname, isServer } from '~/utils';

const LOGGING_ENABLED = (() => {
  if (typeof window !== 'undefined') {
    const { hostname } = window.location;
    if (!isProductionHostname(hostname)) {
      return true;
    }
  }
  return false;
})();

const makeHttpRequest = async (
  url,
  { method, headers: extraHeaders, context, ...rest }
) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json;charset=utf-8',
    ...extraHeaders,
  };

  if (isServer()) {
    if (!url.startsWith('http')) {
      url = `${serverConfig.BACKEND_API_BASE_URL}${url}`;
    }
  }

  if (LOGGING_ENABLED) {
    // eslint-disable-next-line no-console
    console.debug(`HTTP ${method} ${url}`);
  }

  try {
    const reqPromise = fetch(url, {
      method,
      headers,
      ...rest,
    });

    const response = await reqPromise;

    const responseText = await response.text();

    // status in the range 200-299
    if (response.ok) {
      try {
        const responseJson = JSON.parse(responseText);
        return responseJson;
      } catch (err) {
        const error = new Error(
          'Failed to parse successful response body as JSON'
        );
        error.response = response;
        error.payload = undefined;
        throw error;
      }
    }

    const error = new Error(
      `Async fetch to ${url} failed with status code: ${response.status}`
    );
    error.response = response;
    try {
      const responseJson = JSON.parse(responseText);
      error.payload = responseJson;
    } catch (err) {
      // Response does not contain JSON
      error.payload = undefined;
      error.payloadText = responseText;
    }
    throw error;
  } catch (error) {
    // Request failed at network level
    if (LOGGING_ENABLED) {
      // eslint-disable-next-line no-console
      console.debug(`Async fetch to ${url} failed with:`, error);
    }
    throw error;
  }
};

const httpClient = {
  get: (url, options = null) =>
    makeHttpRequest(url, {
      method: 'GET',
      ...options,
    }),

  patch: (url, payload, options = null) =>
    makeHttpRequest(url, {
      method: 'PATCH',
      body: !isEmpty(payload) ? JSON.stringify(payload) : null,
      ...options,
    }),

  post: (url, payload, options) =>
    makeHttpRequest(url, {
      method: 'POST',
      body: !isEmpty(payload) ? JSON.stringify(payload) : null,
      ...options,
    }),

  put: (url, payload, options) =>
    makeHttpRequest(url, {
      method: 'PUT',
      body: !isEmpty(payload) ? JSON.stringify(payload) : null,
      ...options,
    }),

  postFile: (url, body, options) =>
    makeHttpRequest(url, {
      method: 'POST',
      body,
      ...options,
    }),

  delete: (url, options = null) =>
    makeHttpRequest(url, {
      method: 'DELETE',
      ...options,
    }),
};

export default httpClient;
