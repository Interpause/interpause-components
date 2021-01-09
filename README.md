# Interpause's Components

My personal components library using [twin.macro](https://github.com/ben-rogerson/twin.macro) and [emotion-js](https://emotion.sh/). This repository uses [Next.js](https://nextjs.org/docs/api-reference/create-next-app) however the components are reusable in any project that uses React, twin.macro and emotion-js (see <https://github.com/ben-rogerson/twin.examples>).

## Table of Contents

- [Testing](#testing)
- [Installation](#installation)
- [Theme System](#theme)

## Testing

```sh
yarn install
# see it works by opening http://localhost:3000
yarn dev
```

To ensure Typescript linting works properly with [Yarn 2](https://yarnpkg.com/getting-started/install) run these:

```sh
yarn add --dev @yarnpkg/pnpify
# for VSCode:
yarn pnpify --sdk vscode
```

See <https://yarnpkg.com/getting-started/editor-sdks> for other IDEs.

## Installation

You can follow along with the commit history of this repository to see the effects of each step.

1. [Setup Next.js with Typescript](#setup-nextjs-with-typescript)
2. (Optional) [Setup Yarn 2 PnPify](#optional-setup-yarn-2-pnpify)
3. [Setup twin.macro and emotion](#setup-twinmacro-and-emotion)

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

As we will not be using them anymore, you may delete `./styles`. Look in [`./pages`](/pages) for how code can be written once installation is complete. If using this repository as a Next.js template, see <https://nextjs.org/docs/basic-features/typescript> for further details.

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

Finally in the generated `.yarnrc.yml` file add:

```yml
nodeLinker: "pnp"
pnpMode: "loose"
# required due to issues with some packages
```

### Setup twin.macro and emotion

Adapted from <https://github.com/ben-rogerson/twin.examples/tree/master/next-emotion>. My steps are very similar to that of the original, but additional dependencies `@emotion/babel-plugin babel-plugin-macros` are needed if you are using Yarn 2. Do take a look at the original as it covers some of the features as well as contains optional steps that I skipped.

First, install the dependencies:

```sh
yarn add twin.macro tailwindcss @emotion/react @emotion/styled @emotion/css @emotion/babel-plugin babel-plugin-macros
```

In [_app.tsx](/pages/_app.tsx) add `<GlobalStyles/>` like this:

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

See [`./pages/index.tsx`](/pages/index.tsx) for code that uses twin.macro's features to see if everything so far is setup correctly.

#### (Optional) Setup TailwindCSS Intellisense for VSCode

Get it from <https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss> and add these to `.vscode/settings.json`:

```json
{
  "editor.quickSuggestions": true,
  "tailwindCSS.experimental.classRegex": [
      "tw`([^`]*)", // tw`...`
      "tw=\"([^\"]*)", // <div tw="..." />
      "tw={\"([^\"}]*)", // <div tw={"..."} />
      "tw\\.\\w+`([^`]*)", // tw.xxx`...`
      "tw\\(.*?\\)`([^`]*)" // tw(Component)`...`
  ],
  "tailwindCSS.includeLanguages": {
    "typescript": "javascript",
    "typescriptreact": "javascript"
  }
}
```

## Theme

TODO
