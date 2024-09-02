import { erase, get, post, update } from './utils/fetch.js';
import { mockReviews } from './utils/mock.js';

const { API_HOST = 'http://localhost:4040' } = process.env;

// feedback / contact
export const postFeedbackMessage = async (requestBody) =>
  await post(createUrl('/feedback'), requestBody);

// composition
export const postPoemComposition = async (requestBody) =>
  await post(createUrl('/composition'), requestBody);

export const getCompositionByTitleAuthor = async (title, author) =>
  await get(createUrl(`/composition/${title}/${author}`));

// reviews
export const postReview = async (requestBody) =>
  await post(createUrl('/review'), requestBody);

export const getReviewsByTitleAuthor = async (title, author) =>
  await get(createUrl(`/review?title=${title}&author=${author}`));

export const deleteReviewById = async (id) =>
  await erase(createUrl('/review'), { id });

export const updateReviewById = async (id, requestBody) =>
  await update(createUrl(`/review/${id}`), requestBody);

// remarks
export const getRemarksByChunk = async (chunk) =>
  await get(createUrl(`/remark?chunk=${chunk}`));

export const postRemark = async (requestBody) =>
  await post(createUrl('/remark'), requestBody);

// ---

// utils

const createUrl = (path) => new URL(path, API_HOST);

// mock

export const getMockReviewsByTitleAuthor = async () => {
  return new Promise((resolve, reject) => {
    if (Math.random() > 1) {
      reject('randomly failed');
    }

    setTimeout(() => resolve(mockReviews), 300);
  });
};
