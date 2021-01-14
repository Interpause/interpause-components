import tw, { css, theme } from 'twin.macro';
import Color from 'color';
/** Used to convert hex to `${r},${g},${b}`. */
export const rgb = (c: string) => Color(c).array().join(',');

export const accents = ['primary', 'secondary', 'info', 'trivial', 'good', 'risky', 'bad', 'normal'] as const;
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
export type accentTypes = typeof accents[number];
// prettier-ignore
/** SerializedStyles containing default values for CSS vars. */
export const themeVars = css`
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

/** Creates a SerializedStyles that sets all colors to that of the accent given. */
export const getAccent = (accent: accentTypes) => css`
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

/** Default font size for various heading tags. */
export const typographyStyle = css`
  body {
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
    p {
      ${tw`text-lg`}
    }

    @media screen and (max-width: ${theme`screens.md`}) {
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
      p {
        ${tw`text-base`}
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

  :root {
    ${themeVars}
    ${tw`text-normal text-center`}

		scroll-behavior: smooth;
    @media (prefers-reduced-motion) {
      scroll-behavior: auto;
    }
  }
  .light {
    ${themeVars}
    ${tw`bg-white text-normal`}
  }
  .dark {
    ${themeVars}
    --hi-color-normal: ${rgb('#fff')};
    --hi-color-secondary: ${rgb('#614bc2')};

    ${tw`bg-black text-normal`}
  }
`;
