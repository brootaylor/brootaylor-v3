/**
 * "Reply to this post by email"
 * =============================
 *
 * Enhances the reply paragraph at the end of writing posts (`layouts/writing.njk`). Its email option starts
 * `hidden`, with the address scrambled (base64, by the `obscureEmail` filter) so it isn't readable in the HTML.
 *
 * This decodes the address with the browser's built-in `atob()`, makes the link a `mailto:` with
 * "Re: <post title>" as the subject, then shows the option. It runs when the page loads rather than on click,
 * so hovering the link, the status bar and screen readers all report where it really goes.
 *
 * Without JavaScript the option stays hidden and readers get the contact form link instead.
 *
 * Loaded by `main-modules.mjs`, only on pages that have the reply paragraph.
 */
export default function replyByEmail() {
  document.querySelectorAll('[data-reply-email]').forEach((replyOption) => {
    const replyLink = replyOption.querySelector('a');
    const emailAddress = atob(replyOption.dataset.replyEmail);
    const subject = `Re: ${replyOption.dataset.replySubject}`;

    // `encodeURIComponent` keeps characters like `&` or `?` in a title from breaking the subject
    replyLink.href = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}`;

    // Only show the email option once its link actually works
    replyOption.hidden = false;
  });
}
