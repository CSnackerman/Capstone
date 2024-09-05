import html from 'html-literal';
import store from '../store/_index.js';

const { forms } = store;

export default (id) => {
  const config = forms[id];

  const getInputHtml = (field) => {
    const { name, attributes, inputType } = field;

    const attributesHtml = Object.entries(attributes)
      .map(([attribute, value]) =>
        typeof value === 'string'
          ? `${attribute}="${value}"`
          : `${value === true ? attribute : ''}`
      )
      .join(' ');

    return inputType === 'textarea'
      ? html`
          <textarea
            id="${id}-${name}-textarea"
            name="${name}"
            ${attributesHtml}
          ></textarea>
        `
      : html`
          <input
            id="${id}-${name}-${inputType}-input"
            name="${name}"
            type="${inputType}"
            ${attributesHtml}
          />
        `;
  };

  const getOptionalSpan = (field) =>
    field.attributes.required === false
      ? html`
          <span class="optional">(optional)</span>
        `
      : '';

  const getInputFieldsHtml = () =>
    config.fields.map(
      (field) =>
        html`
          <label id="${id}-${field.name}-label">
            <span>${field.label} ${getOptionalSpan(field)}</span>
            ${getInputHtml(field)}
          </label>
        `
    );

  return html`
    <form
      id="${id}-form-ex"
      ${config.applyDefaultStyles ? 'class="default-form-ex"' : ''}
    >
      ${getInputFieldsHtml()}
      <input
        id="${id}-form-ex-submit"
        type="submit"
        value="${config.submitButton.base}"
      />
    </form>
  `;
};

// ---

export function addFormExEventListeners(id) {
  const config = forms[id];

  const { base, pending, success, failure } = config.submitButton;

  const form = document.getElementById(`${id}-form-ex`);
  const submitBtn = document.getElementById(`${id}-form-ex-submit`);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    submitBtn.value = pending;

    const data = new FormData(form);

    // only works for mostly flat/non-nested request bodies.
    const requestBody = data.entries().reduce((obj, entry) => {
      const [field, value] = entry;

      const existing = obj[field];

      const defaultValue = config.dataDefaults[field];

      if (!existing) {
        return {
          ...obj,
          [field]: value || defaultValue,
        };
      }

      if (existing && !Array.isArray(existing)) {
        return {
          ...obj,
          [field]: [obj[field], value || defaultValue],
        };
      }

      if (Array.isArray(existing))
        return {
          ...obj,
          [field]: [...obj[field], value || defaultValue],
        };
    }, {});

    const solidifiedData = solidifyObject(config.additionalData);
    const mergedData = { ...requestBody, ...solidifiedData };

    const res = await config.postRequestCallback(mergedData);

    if (res.ok) {
      submitBtn.value = success;
      if (config.refreshEventId) {
        dispatchEvent(new Event(config.refreshEventId));
      }
      form.reset();
    } else {
      submitBtn.value = failure;
    }

    setTimeout(() => (submitBtn.value = base), 3000);
  });
}

// util

/**
 * runs any callback functions within the additionalData obj and replaces the value at its own key
 */
const solidifyObject = (additionalData) =>
  Object.entries(additionalData).reduce(
    (obj, [key, val]) => ({
      ...obj,
      [key]: typeof val === 'function' ? val() : val,
    }),
    {}
  );
