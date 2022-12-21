import tw, { css, theme } from 'twin.macro';
import Color from 'color';

/** Prefix for generated CSS vars. Should be same as in tailwind.config.js. */
const prefix = "hi-color";

/** names should be same as in tailwind.config.js. */
export const accents = {
  'primary':'#0288d1',
  'secondary':'#311b92',
  'info':'#0288d1',
  'trivial':'#9e9e9e',
  'good':'#4caf50',
  'risky':'#fbc02d',
  'bad':'#d50000',
  'normal':'#000'
} as const;

/** Converts the color into separate H,S & L CSS vars. */
export function colorToCSSVars([accentName,c]:[string,string]){
  const [h,s,l] = Color(c).hsl().array();
  return `
    --${prefix}-${accentName}-h: ${h};
    --${prefix}-${accentName}-s: ${s}%;
    --${prefix}-${accentName}-l: ${l}%;
  `;
}

/**
 * Different color accents to theme components with.
 * 
 * @example
 * - primary: emphasis, important
 * - secondary: contrasting primary
 * - info: notifications, loading alerts, updates
 * - trivial: disabled, unimportant, extraneous
 * - good: success, logged in, purchases, loading complete
 * - risky: warnings, confirmations
 * - bad: errors, wrong password, serious warnings
 * - normal: text
 */
export type accentTypes = keyof typeof accents;

/** SerializedStyles containing default values for CSS vars. */
export const themeVars = css`
  ${Object.entries(accents).map(colorToCSSVars)}

  --hi-color-lightness-text:        1;
  --hi-color-lightness-placeholder: 1.9;
  --hi-color-lightness-bg:          1.5;
  --hi-color-lightness-border:      1;
  --hi-color-lightness-divide:      1.3;
  --hi-color-lightness-ring:        1.6;
`;

/** Creates a SerializedStyles that sets all colors to that of the accent given. */
export const getAccent = (accent: accentTypes) => css`
  color: rgba(var(--hi-color-${accent}), var(--tw-text-opacity));
  background-color: rgba(var(--hi-color-${accent}), var(--tw-bg-opacity));
  border-color: rgba(var(--hi-color-${accent}), var(--tw-border-opacity));

  --tw-ring-color: rgba(var(--hi-color-${accent}), var(--tw-ring-opacity));
  --tw-ring-offset-color: rgba(var(--hi-color-${accent}), 1);

  --hi-color-lightness-text:        1;
  --hi-color-lightness-placeholder: 1.9;
  --hi-color-lightness-bg:          1.5;
  --hi-color-lightness-border:      1;
  --hi-color-lightness-divide:      1.3;
  --hi-color-lightness-ring:        1.6;

  & > * + * {
    border-color: rgba(var(--hi-color-${accent}), var(--tw-divide-opacity));
  }
  &::placeholder {
    color: rgba(var(--hi-color-${accent}), var(--tw-placeholder-opacity));
  }
`;

/** Default font size for various heading tags. To override in component, have to do `& h1` for example to be more specific. */
export const typographyStyle = css`
  body {
    ${tw`text-lg`}
    h1 {
      ${tw`text-6xl`}
    }
    h2 {
      ${tw`text-5xl`}
    }
    h3 {
      ${tw`text-4xl`}
    }
    h4 {
      ${tw`text-3xl`}
    }
    h5 {
      ${tw`text-2xl`}
    }
    h6 {
      ${tw`text-xl`}
    }

    @media screen and (max-width: ${theme`screens.md`}) {
      ${tw`text-base`}
      h1 {
        ${tw`text-5xl`}
      }
      h2 {
        ${tw`text-4xl`}
      }
      h3 {
        ${tw`text-3xl`}
      }
      h4 {
        ${tw`text-2xl`}
      }
      h5 {
        ${tw`text-xl`}
      }
      h6 {
        ${tw`text-lg`}
      }
    }
  }
`;

/** 
 * Default baseStyle that should be injected globally.
 * @note themeVars is put under .light again to allow .dark to be overrided.
 */ 
export const baseStyle = css`
  ${typographyStyle}
  *, ::before, ::after {
    border-color: rgba(var(--hi-color-trivial), 0.4);
  }
  :root {
    ${themeVars}
    ${tw`text-normal text-center`}

		scroll-behavior: smooth;
    @media (prefers-reduced-motion) {
      scroll-behavior: auto;
    }

    /* Temporary fix for scaling of text till I think of something better */
		font-size: 1.75vmin;
		@media screen and (max-width:768px) {
			font-size: 1.75vmax;
		}
  }
  .theme-div.light {
    ${themeVars}
    ${tw`bg-white text-normal`}
  }
  .theme-div.dark {
    ${themeVars}
    --hi-color-normal-l: 100%;
    ${tw`bg-black text-normal`}
  }
`;
