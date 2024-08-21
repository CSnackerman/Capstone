const { API_HOST = 'http://localhost:4040' } = process.env;

export async function postFeedbackMessage(requestBody) {
  const url = API_HOST + '/feedback';

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  return res;
}
