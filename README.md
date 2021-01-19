# Interpause's Components

> Next.js Component Library using typescript, twin.macro and Emotion with Yarn 2's Plug'n'Play working and Storybook to ease component development.

My personal components library using [twin.macro](https://github.com/ben-rogerson/twin.macro) and [emotion-js](https://emotion.sh/) as its CSS-in-JS solution. This repository uses [Next.js](https://nextjs.org/docs/api-reference/create-next-app) however the components are reusable in any project that uses React, twin.macro and emotion-js (see <https://github.com/ben-rogerson/twin.examples>). [Storybook.js](https://storybook.js.org/docs/react/get-started/introduction) is also setup to make it easier to develop components.

If you are seeing the README from the documentation site, <https://github.com/Interpause/interpause-components> to get back.

## Table of Contents

- [Installation](#installation)
- [Documentation](#documentation)
- [Theme System](#theme)
- [How it was set up](#setup)
- [Credits](#credits)

## Installation

```sh
yarn install
# see it works by opening http://localhost:3000
yarn dev
# start the storybook (incomplete)
yarn storybook
```

To ensure Typescript linting works properly with [Yarn 2](https://yarnpkg.com/getting-started/install) run these:

```sh
yarn add --dev @yarnpkg/pnpify
# for VSCode:
yarn pnpify --sdk vscode
```

See <https://yarnpkg.com/getting-started/editor-sdks> for other IDEs.

While I have yet to make it installable as a module, one possible approach for now is to add this repository as a remote:

```sh
git remote add components https://github.com/Interpause/interpause-components.git
git fetch components
# make sure you push to correct repository
git push --set-upstream origin main
```

## Documentation

Documentation can be found at <https://interpause.github.io/interpause-components>. It was auto-generated using [typedoc](https://typedoc.org/). I will eventually be hosting an interactive documentation/demo using Storybook when the component library is much more complete.

## Theme

I created a simple theming system via CSS variables. The 8 different accents are dynamically generated inside [`tailwind.config.js`](https://github.com/Interpause/interpause-components/blob/main/tailwind.config.js):

- `primary`: emphasis, important
- `secondary`: contrasting primary
- `info`: notifications, loading alerts, updates
- `trivial`: disabled, unimportant, extraneous
- `good`: success, logged in, purchases, loading complete
- `risky`: warnings, confirmations
- `bad`: errors, wrong password, serious warnings
- `normal`: text

The base theme is included via:

```jsx
//add this to pages/_app.tsx and .storybook/preview.js
import { Global } from '@emotion/react'
import { baseStyle } from '../src/theme/baseTheme'

<Global styles={baseStyle}/>
```

I preserved the `--tw-opacity` CSS variables, allowing control over the intensity of the color via changing its opacity for various stuff such as backgrounds and borders:

```json
{
  "primary":"rgba(var(--hi-color-primary),var(--tw-text-opacity))"
}
```

```jsx
// e.g. this is still possible
<div tw="bg-primary bg-opacity-50"></div>
```

As for how the base theme is configured by default, [`baseTheme.ts`](https://github.com/Interpause/interpause-components/blob/main/src/theme/baseTheme.ts):

```ts
/** Used to convert hex to `${r},${g},${b}`. */
const rgb = (c: string) => Color(c).array().join(',');
/** SerializedStyles containing default values for CSS vars. */
const themeVars = css`
  --hi-color-primary:   ${rgb('#0288d1')};
  --hi-color-secondary: ${rgb('#311b92')};
  --hi-color-info:      ${rgb('#0288d1')};
  --hi-color-trivial:   ${rgb('#9e9e9e')};
  --hi-color-good:      ${rgb('#4caf50')};
  --hi-color-risky:     ${rgb('#fbc02d')};
  --hi-color-bad:       ${rgb('#d50000')};
  --hi-color-normal:    ${rgb('#000')};

  --tw-text-opacity:        1;
  --tw-placeholder-opacity: 0.65;
  --tw-bg-opacity:          0.3;
  --tw-border-opacity:      1;
  --tw-divide-opacity:      0.2;
  --tw-ring-opacity:        0.2;
`;
```

I have also made dark and light themes (really go check out [`baseTheme.ts`](https://github.com/Interpause/interpause-components/blob/main/src/theme/baseTheme.ts)). Do follow it if you want to change the theme colors. As for changing the accent names and so on, my code in [`tailwind.config.js`](https://github.com/Interpause/interpause-components/blob/main/tailwind.config.js) should be fairly easy to change.

Finally, I provided a function in [`baseTheme.ts`](https://github.com/Interpause/interpause-components/blob/main/src/theme/baseTheme.ts) to make it easy to change the accent of a component easily:

```ts
/** creates a SerializedStyles that sets all colors to that of the accent given. */
const getAccent = (accent:accentTypes) => css`
  color: rgba(var(--hi-color-${accent}), var(--tw-text-opacity));
  background-color: rgba(var(--hi-color-${accent}), var(--tw-bg-opacity));
  border-color: rgba(var(--hi-color-${accent}), var(--tw-border-opacity));

  --tw-ring-color: rgba(var(--hi-color-${accent}), var(--tw-ring-opacity));
  --tw-ring-offset-color: rgba(var(--hi-color-${accent}), 1);

  & > * + * {
    border-color: rgba(var(--hi-color-${accent}), var(--tw-divide-opacity));
  }
  &::placeholder {
    color: rgba(var(--hi-color-${accent}), var(--tw-placeholder-opacity));
  }
`;
```

## Setup

You can follow along with the commit history of this repository to see the effects of each step.

1. [Setup Next.js with Typescript](#setup-nextjs-with-typescript)
2. (Optional) [Setup Yarn 2 PnPify](#optional-setup-yarn-2-pnpify)
3. [Setup twin.macro and emotion](#setup-twinmacro-and-emotion)
4. [Setup Storybook](#setup-storybook)

### Setup Next.js with Typescript

First, create the Next.js project:

```sh
yarn create next-app
```

Next, create `tsconfig.json` in the root folder and run:

```sh
yarn add --dev typescript @types/react @types/node
# Next.js initializes tsconfig.json for you on the first run
yarn dev
```

Optionally, change these `tsconfig.json` settings once done:

```json
{
  "allowJs": false,
  "strict": true
}
```

As we will not be using them anymore, you may delete `./styles`. Look in [`./pages`](https://github.com/Interpause/interpause-components/blob/main/pages) for how code can be written once installation is complete. If using this repository as a Next.js template, see <https://nextjs.org/docs/basic-features/typescript> for further details.

### (Optional) Setup Yarn 2 PnPify

To setup [Yarn 2](https://yarnpkg.com/getting-started/install):

```sh
yarn set version berry
```

Add these to the generated `.gitignore`:

```sh
# dependencies
.yarn/*
!.yarn/releases
!.yarn/plugins
!.yarn/versions
```

Then do:

```sh
yarn add --dev @yarnpkg/pnpify
# for VSCode:
yarn pnpify --sdk vscode
# see https://yarnpkg.com/getting-started/editor-sdks for other IDEs
# you might want to add to .gitignore some of the generated files like .vscode
```

If you run into module resolution problems, you can try adding to `.yarnrc.yml`:

```yaml
nodeLinker: "pnp"
pnpMode: "loose"
```

### Setup twin.macro and emotion

Adapted from <https://github.com/ben-rogerson/twin.examples/tree/master/next-emotion>. My steps are very similar to that of the original, but additional dependencies `@emotion/babel-plugin babel-plugin-macros` are needed if you are using Yarn 2. Do take a look at the original as it covers some of the features as well as contains optional steps that I skipped. Perhaps this is specifically an issue with VSCode, but I had to use "reload window" sometimes to get the Typescript linter to update, so try that if you get weird warnings.

First, install the dependencies:

```sh
yarn add twin.macro tailwindcss @emotion/react @emotion/styled @emotion/css
yarn add --dev @emotion/babel-plugin babel-plugin-macros
```

In [_app.tsx](https://github.com/Interpause/interpause-components/blob/main/pages/_app.tsx) add `<GlobalStyles/>` like this:

```tsx
import { GlobalStyles } from 'twin.macro';

export default function App({Component, pageProps}:AppProps){
  return <>
    <GlobalStyles/>
    <Component {...pageProps}/>
  </>;
}
```

Create `.babelrc.js` in the root folder and add:

```js
module.exports = {
  presets: [
    [
      'next/babel',
      {
        'preset-react': {
          runtime: 'automatic',
          importSource: '@emotion/react',
        },
      },
    ],
  ],
  plugins: ['@emotion/babel-plugin', 'babel-plugin-macros'],
}
```

Then, create `next.config.js` in the root folder and add:

```js
module.exports = {
  webpack: (config, { isServer }) => {
    // Fixes packages that depend on fs/module module
    if (!isServer) {
      config.node = { fs: 'empty', module: 'empty' }
    }

    return config
  },
}
```

Finally, create `twin.d.ts` in the root folder and add these type declarations:

```ts
import 'twin.macro'
import styledImport from '@emotion/styled'
import { css as cssImport } from '@emotion/react'

// The css prop
// https://emotion.sh/docs/typescript#css-prop
import {} from '@emotion/react/types/css-prop'

declare module 'twin.macro' {
  // The styled and css imports
  const styled: typeof styledImport
  const css: typeof cssImport
}

// The 'as' prop on styled components
declare global {
  namespace JSX {
    interface IntrinsicAttributes<T> extends DOMAttributes<T> {
      as?: string
    }
  }
}
```

And include it into `tsconfig.json`:

```json
{
  "include": ["twin.d.ts"]
}
```

See [`./pages/index.tsx`](https://github.com/Interpause/interpause-components/blob/main/pages/index.tsx) for code that uses twin.macro's features to see if everything so far is setup correctly.

#### (Optional) Setup TailwindCSS Intellisense for VSCode

Get it from <https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss> and add these to `.vscode/settings.json`:

```json
{
  "editor.quickSuggestions": true,
  "tailwindCSS.experimental.classRegex": [
      "tw`([^`]*)",
      "tw=\"([^\"]*)",
      "tw={\"([^\"}]*)",
      "tw\\.\\w+`([^`]*)",
      "tw\\(.*?\\)`([^`]*)"
  ],
  "tailwindCSS.includeLanguages": {
    "typescript": "javascript",
    "typescriptreact": "javascript"
  }
}
```

### Setup Storybook

To add [Storybook.js](https://storybook.js.org/docs/react/get-started/introduction):

```sh
#Storybook v6.2.0 was needed to solve something related to core-js
yarn add --dev @storybook/cli@next prop-types @emotion/babel-plugin-jsx-pragmatic @babel/plugin-transform-react-jsx
yarn sb init
yarn storybook
```

Create `./.storybook/.babelrc` and add:

```json
{
  "presets": [
    [
      "next/babel",
      {
        "preset-react": {
          "runtime": "automatic",
          "importSource": "@emotion/react"
        }
      }
    ]
  ],
  "plugins": [
    "babel-plugin-macros",
    [
      "@emotion/babel-plugin-jsx-pragmatic",
      {
        "export": "jsx",
        "import": "__cssprop",
        "module": "@emotion/react"
      }
    ],
    [
      "@babel/plugin-transform-react-jsx",
      {
        "pragma": "__cssprop"
      },
      "emotion-css-prop"
    ]
  ]
}
```

Adapted from <https://github.com/ben-rogerson/twin.examples/blob/master/storybook-emotion/.storybook/.babelrc>. A different set of plugins had to be used for Storybook's `.babelrc` to work. This is probably because the way Next.js and Storybook transpiles is different, leading to the `@emotion/babel-plugin` not working for storybook. Presets had to be respecified too as they were overwritten. Also, see [`./src/containers/Card.stories.js`](https://github.com/Interpause/interpause-components/blob/main/src/containers/Card.stories.js) for an example.

Finally, to `./.storybook/preview.js` add:

```jsx
import { GlobalStyles } from 'twin.macro'

export const decorators = [
  Story => (
    <div>
      {/* */}
      <GlobalStyles />
      <Story />
    </div>
  ),
]
```

## Credits

Many thanks to [ben-rogerson](https://github.com/ben-rogerson) for developing twin.macro, if not for which none of this would be possible. I really like the twin.macro + emotionjs library to the point when I tried to switch to a component library, I was actually put off by the relative difficulty of styling things. He had also made several examples of how to use twin.macro with various frameworks, without which it would have taken me much longer to get this to work.

## Standards (unfinished)

Most of my components will have a `type` and `variant` prop. `type` refers to mainly the accent, allowing you to customize which accent is used for the component. `variant` refers to the style of the component, for example, an outlined button with transparent background versus one that is filled in.

All components will pass the `className` prop to the root element, allowing you to style them directly using the `tw` or `css` props. Components that contain other sub-components that makes sense to be stylable will attach classes to those sub-components so that they can be styled from outside. In that case, the classes will be mentioned in the documentation. Else, you could use the browser's debtools to inspect the classes added.
