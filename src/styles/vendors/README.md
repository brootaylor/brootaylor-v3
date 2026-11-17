# Vendors

The `vendors/` folder is for third-party CSS (eg. an icon font's styles). `_vendor-styles.scss` is a placeholder for now: it isn't included in `main.scss`, so it adds nothing to the built CSS. Add a `@use 'vendors/vendor-styles';` line to `main.scss` if it's ever needed.
