import { css, theme } from 'twin.macro';

/** Media query for mobile screen. */
export const mobileScreen = `@media screen and (max-width:${theme`screens.md`})`;
/** Media query for mobile screen that is landscape. */
export const mobileLandscape = `${mobileScreen} and (orientation:landscape)`;
/** Media query for mobile screen that is portrait. */
export const mobilePortrait = `${mobileScreen} and (orientation:portrait)`;
/** Style that hides component if mobileLandscape. */
export const hideMobileLandscape = css`
  ${mobileLandscape} {
    display: none;
  }
`;
/** Style that hides component if mobilePortrait. */
export const hideMobilePortrait = css`
  ${mobilePortrait} {
    display: none;
  }
`;
