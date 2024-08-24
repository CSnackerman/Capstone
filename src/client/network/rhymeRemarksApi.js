import { erase, get, post, update } from './utils/fetch.js';
import { mockReviews } from './utils/mock.js';

const { API_HOST = 'http://localhost:4040' } = process.env;

export const postFeedbackMessage = async (requestBody) =>
  await remarkApiPost('/feedback', requestBody);

export const postPoemComposition = async (requestBody) =>
  await remarkApiPost('/composition', requestBody);

export const postReview = async (requestBody) =>
  await remarkApiPost('/review', requestBody);

export const getReviewsByTitleAuthor = async (title, author) =>
  await remarkApiGet(`/review?title=${title}&author=${author}`);

export const deleteReviewById = async (id) =>
  await remarkApiDelete('/review', { id });

export const updateReviewById = async (id, requestBody) =>
  await remarkApiUpdate(`/review/${id}`, requestBody);

// utils
const remarkApiGet = async (path) => await get(new URL(path, API_HOST));

const remarkApiPost = async (path, requestBody) =>
  await post(new URL(path, API_HOST), requestBody);

const remarkApiDelete = async (path, requestBody) =>
  await erase(new URL(path, API_HOST), requestBody);

const remarkApiUpdate = async (path, requestBody) =>
  await update(new URL(path, API_HOST), requestBody);

// mock

export const getMockReviewsByTitleAuthor = async () => {
  return new Promise((resolve, reject) => {
    if (Math.random() > 1) {
      reject('randomly failed');
    }

    setTimeout(() => resolve(mockReviews), 300);
  });
};
