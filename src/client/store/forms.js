import {
  postFeedbackMessage,
  postPoemComposition,
  postRemark,
  postReview,
  updateReviewById,
} from '../network/rhymeRemarksApi.js';
import poems from './poems.js';
import remarks from './remarks.js';
import reviews from './reviews.js';

export default {
  remark: {
    fields: [
      {
        name: 'poster',
        label: 'Username',
        inputType: 'text',
        attributes: { placeholder: 'anonymous (default)', required: false },
      },
      {
        name: 'comment',
        label: 'Comment',
        inputType: 'textarea',
        attributes: { placeholder: 'Write a remark...', required: true },
      },
    ],
    additionalData: { chunk: () => remarks.getSanitizedChunk() },
    dataDefaults: { poster: 'anonymous' },
    postRequestCallback: postRemark,
    refreshEventId: 'refresh-remark',
    submitButton: {
      base: 'Publish',
      pending: 'Publishing ⏳',
      success: 'Published ✅',
      Failure: 'Failed ⛔',
    },
  },
  // ---
  contact: {
    fields: [
      {
        name: 'from',
        label: 'Name',
        inputType: 'text',
        attributes: { required: true },
      },
      {
        name: 'email',
        label: 'Email',
        inputType: 'text',
        attributes: { required: false },
      },
      {
        name: 'message',
        label: 'Message',
        inputType: 'textarea',
        attributes: { required: true },
      },
    ],
    additionalData: {},
    dataDefaults: {},
    postRequestCallback: postFeedbackMessage,
    refreshEventId: null,
    submitButton: {
      base: 'Send',
      pending: 'Sending ⏳',
      success: 'Sent ✅',
      Failure: 'Not Sent ⛔',
    },
  },
  // ---
  compose: {
    fields: [
      {
        name: 'title',
        label: 'Title',
        inputType: 'text',
        attributes: { required: true, placeholder: 'Invitation' },
      },
      {
        name: 'composition',
        label: 'Composition',
        inputType: 'textarea',
        attributes: {
          required: true,
          placeholder:
            "If you are a dreamer, come in,\nIf you are a dreamer, a wisher, a liar\nA hope-er, a pray-er, a magic bean buyer...\nIf you're a pretender, come sit by my fire\nFor we have some flax-golden tales to spin.\nCome in!\nCome in!",
        },
      },
      {
        name: 'author',
        label: 'Author',
        inputType: 'text',
        attributes: { required: true, placeholder: 'Shel Silverstein' },
      },
    ],
    additionalData: {},
    dataDefaults: {},
    postRequestCallback: postPoemComposition,
    refreshEventId: null,
    submitButton: {
      base: 'Publish',
      pending: 'Publishing ⏳',
      success: 'Published ✅',
      Failure: 'Failed ⛔',
    },
  },
  // ---
  review: {
    fields: [
      {
        name: 'review',
        label: null,
        inputType: 'textarea',
        attributes: { required: true, placeholder: 'Type your review...' },
      },
    ],
    additionalData: {
      title: () => poems.getTitle(),
      author: () => poems.getAuthor(),
      rating: () => reviews.getRating(),
      postedAt: () => new Date(),
    },
    dataDefaults: {},
    postRequestCallback: postReview,
    refreshEvent: new Event('refresh-review'),
    submitButton: {
      base: 'Publish',
      pending: 'Publishing ⏳',
      success: 'Published ✅',
      Failure: 'Failed ⛔',
    },
  },
  // ---
  reviewEdit: {
    fields: [
      {
        name: 'review',
        label: null,
        inputType: 'textarea',
        attributes: {
          required: true,
          placeholder: 'Type your review...',
        },
        value: () => reviews.getReview(),
      },
    ],
    additionalData: {
      title: () => poems.getTitle(),
      author: () => poems.getAuthor(),
      rating: () => reviews.getRating(),
      postedAt: () => new Date(),
    },
    dataDefaults: {},
    postRequestCallback: async (requestBody) =>
      await updateReviewById(reviews.getCloudId(), requestBody),
    refreshEvent: new Event('refresh-review-edit'),
    submitButton: {
      base: 'Update',
      pending: 'Updating ⏳',
      success: 'Updated ✅',
      Failure: 'Failed ⛔',
    },
  },
};
