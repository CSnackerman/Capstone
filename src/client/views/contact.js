import html from 'html-literal';

export default () => {
  return html`
    <div id="contact-view">
      <h1>Speak your mind<span id="brain">🧠</span></h1>
      <form id="contact-form" autocomplete="off">
        <div id="name-field">
          <label for="contact-name">Name</label>
          <input id="contact-name" name="contact-name" type="text" required />
        </div>
        <div id="email-field">
          <label for="contact-email">Email</label>
          <input id="contact-email" name="contact-email" type="email" />
        </div>
        <div id="message-field">
          <label for="contact-message">Message</label>
          <textarea
            id="contact-message"
            name="contact-message"
            required
          ></textarea>
        </div>
        <input type="submit" />
      </form>
    </div>
  `;
};
