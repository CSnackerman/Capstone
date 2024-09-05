import { postFeedbackMessage, postRemark } from '../network/rhymeRemarksApi.js';
import remarks from './remarks.js';

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
};
