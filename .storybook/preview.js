import React from 'react'
import { GlobalStyles } from 'twin.macro'
import { Global } from '@emotion/react'
import { baseStyle } from '../src/theme/baseTheme'

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}

export const decorators = [
  Story => (
    <div>
      {/* */}
      <GlobalStyles />
      <Global styles={baseStyle} />
      <Story />
    </div>
  ),
]