
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}

import { GlobalStyles } from 'twin.macro'
import { baseStyle } from '../src/theme'
import { Global } from '@emotion/react'

export const decorators = [
  Story => (
    <div>
      {/* */}
      <GlobalStyles/>
      <Global styles={baseStyle}/>
      <Story/>
    </div>
  ),
]