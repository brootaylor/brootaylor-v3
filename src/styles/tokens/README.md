## Tokens

The `tokens/` folder contains the *generated* `_tokens.scss` file. This Sass file is created from a concatenation of the `.json` files in the root `tokens/` directory (`npm run sass:tokens`, which runs before every Sass build). Don't edit it by hand: it's replaced each time.

The idea behind this is to use a '[design token workflow](https://www.smashingmagazine.com/2019/11/smashing-podcast-episode-3/)' to supply key website values (eg. brand colours, font stacks, sizes etc.) to the various development teams (eg. iOS, Android and Web). The shared format is agnostic (eg. JSON) - that can then be converted to their own native coding language.

