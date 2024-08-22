import { post } from '../utils/fetch.js';

const { API_HOST = 'http://localhost:4040' } = process.env;

export const postFeedbackMessage = async (requestBody) =>
  await remarkApiPost('/feedback', requestBody);

export const postPoemComposition = async (requestBody) =>
  await remarkApiPost('/composition', requestBody);

// utils

const remarkApiPost = async (path, requestBody) =>
  await post(new URL(path, API_HOST), requestBody);
