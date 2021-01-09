import tw, { css, theme } from "twin.macro";
/*
- DEFAULT (for text, button fill, etc)
- soft (for background, divides, placeholders, etc)
- hard (for borders, rings, hard lines, etc)
*/
export const themeColor = theme`colors.purple.700`;

/**
 * Some examples of how to use them
 * - normal: text
 * - special: emphasis, important
 * - info: notifications, loading alerts, updates
 * - trivial: disabled, unimportant, extraneous
 * - good: success, logged in, purchases, loading complete
 * - risky: warnings
 * - bad: errors, wrong password, serious warnings
 */
export const themeVars = css`
	--color-link: 				${theme`colors.blue.400`};

	--color-normal: 			${theme`colors.black`};
	--color-normal-soft: 	${theme`colors.gray.100`};
	--color-normal-hard: 	${theme`colors.gray.400`};

	--color-special: 			${theme`colors.indigo.700`};
	--color-special-soft: ${theme`colors.indigo.200`};
	--color-special-hard: ${theme`colors.indigo.400`};

	--color-info: 				${theme`colors.blue.900`};
	--color-info-soft: 		${theme`colors.blue.200`};
	--color-info-hard: 		${theme`colors.blue.500`};

	--color-trivial: 			${theme`colors.gray.500`};
	--color-trivial-soft: ${theme`colors.gray.200`};
	--color-trivial-hard: ${theme`colors.gray.300`};

	--color-good: 				${theme`colors.green.900`};
	--color-good-soft: 		${theme`colors.green.200`};
	--color-good-hard: 		${theme`colors.green.500`};

	--color-risky: 				${theme`colors.yellow.600`};
	--color-risky-soft: 	${theme`colors.yellow.100`};
	--color-risky-hard: 	${theme`colors.yellow.400`};

	--color-bad: 					${theme`colors.red.900`};
	--color-bad-soft: 		${theme`colors.red.300`};
	--color-bad-hard: 		${theme`colors.red.600`};

	--color-theme: 				${themeColor};
	--color-theme-soft: 	${themeColor};
	--color-theme-hard: 	${themeColor};

	--bg-color: 255,255,255;
`;
export type colorTypes = "normal"|"special"|"info"|"trivial"|"good"|"risky"|"bad"|"theme";

// themeVars is put under .light again to allow .dark to be overrided
export const baseStyle = css`
	:root{
		${themeVars}
		${tw`text-normal text-center`}
		scroll-behavior: smooth;
		@media (prefers-reduced-motion) { scroll-behavior: auto; }
	}
	.light{
		${themeVars}
		${tw`bg-white text-normal`}
		* { ${tw`border-normal-hard placeholder-normal-soft overflow-ellipsis`} }
	}
	.dark{
		${themeVars}
		--color-normal: 			${theme`colors.white`};
		--color-normal-soft: 	${theme`colors.black`};
		--color-normal-hard: 	${theme`colors.gray.800`};

		--color-special: 			${theme`colors.indigo.900`};
		--color-special-soft: ${theme`colors.indigo.300`};
		--color-special-hard: ${theme`colors.indigo.500`};

		--bg-color: 0,0,0;

		${tw`bg-black text-normal`}
		* { ${tw`border-normal-hard placeholder-normal-soft overflow-ellipsis`} }
	}
`;