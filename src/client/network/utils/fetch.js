export const post = async (url, requestBody) => {
  try {
    return await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });
  } catch (err) {
    console.error('[post]', err);
    return null;
  }
};

export const get = async (url) => {
  try {
    return await fetch(url);
  } catch (err) {
    console.err('[get]', err);
    return null;
  }
};

export const erase = async (url, requestBody) => {
  try {
    return await fetch(url, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });
  } catch (err) {
    console.err('[delete]', err);
    return null;
  }
};
