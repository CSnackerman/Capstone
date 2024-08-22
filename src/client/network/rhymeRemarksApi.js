import { post } from '../utils/fetch.js';

const { API_HOST = 'http://localhost:4040' } = process.env;

export const postFeedbackMessage = async (requestBody) =>
  await remarkApiPost('/feedback', requestBody);

export const postPoemComposition = async (requestBody) =>
  await remarkApiPost('/composition', requestBody);

export const postReview = async (requestBody) =>
  await remarkApiPost('/review', requestBody);

export const getReviewsByTitleAuthor = async (title, author) =>
  await remarkApiGet(`/reviews?title=${title}&author=${author}`);

// utils
const remarkApiGet = async (path) => await fetch(new URL(path, API_HOST));

const remarkApiPost = async (path, requestBody) =>
  await post(new URL(path, API_HOST), requestBody);
