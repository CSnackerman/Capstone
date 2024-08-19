import html from 'html-literal';
import infoSvg from '../assets/images/info.svg';
import tooltipSvg from '../assets/images/tooltip.svg';

export default () => {
  return html`
    <div id="compose-view">
      <form>
        <div>
          <label for="title">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Invitation"
            required
          />
        </div>
        <div>
          <textarea
            placeholder="If you are a dreamer, come in,
              If you are a dreamer, a wisher, a liar,
              A hope-er, a pray-er, a magic bean buyer...
              If you're a pretender, come sit by my fire
              For we have some flax-golden tales to spin.
              Come in!
              Come in!"
            required
          ></textarea>
          <div id="info-container">
            <img id="info-icon" src=${infoSvg} />
            <div id="tooltip-container">
              <img id="tooltip-svg" src=${tooltipSvg} />
              <div id="tooltip-content">
                Evoke your inner poet.
                <br />
                Formatting is preserved.
                <br />
                Your submission will be considered!
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>
            <label for="author">Author</label>
            <input
              id="author"
              name="author"
              type="text"
              placeholder="Shel Silverstein"
              required
            />
          </div>
          <input type="submit" />
        </div>
      </form>
    </div>
  `;
};
