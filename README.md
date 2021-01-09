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

### Setup Next.js with Typescript

First, create the Next.js project:

```sh
yarn create next-app
```

Next, create `tsconfig.json` at the root of the project and run:

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

## Theme

TODO
