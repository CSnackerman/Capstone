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
    console.debug('[post]', err);
    return { ok: false };
  }
};

export const get = async (url) => {
  try {
    return await fetch(url);
  } catch (err) {
    console.debug('[get]', err);
    return { ok: false };
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
    console.debug('[erase]', err);
    return { ok: false };
  }
};

export const update = async (url, requestBody) => {
  try {
    return await fetch(url, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });
  } catch (err) {
    console.debug('[update]', err);
    return { ok: false };
  }
};
