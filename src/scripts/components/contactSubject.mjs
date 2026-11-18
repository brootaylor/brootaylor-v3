/**
 * Contact form subject from the address
 * =====================================
 *
 * Writing posts link to the contact form with the post named in the address
 * (eg. `/contact?subject=Re%3A%20My%20post`, see `layouts/writing.njk`). This fills in the form's Subject
 * field with it, so readers don't have to say which post they're replying to.
 *
 * - It only fills in an empty field, so it never replaces something already there (eg. a value the
 *   browser restored after going back).
 * - The value goes in as plain text (`.value`), never as HTML, so a hand-made link can't add anything
 *   to the page.
 * - Without JavaScript the field just starts empty, as before.
 *
 * Loaded by `main-modules.mjs`, only when the contact form is on the page and the address has a subject.
 */
export default function contactSubject() {
  const subjectField = document.querySelector('form[name="contact"] #subject');
  const subject = new URLSearchParams(window.location.search).get('subject');

  if (subjectField && subject && !subjectField.value) {
    subjectField.value = subject;
  }
}
