import React from 'react';

import { SimpleCardFlex } from '../../src/containers/CardFlex';
import { DarkThemeWrapper, DarkToggle } from '../../src/theme/DarkThemeProvider';

export default {
  title: 'theme/DarkMode',
  component: DarkToggle,
};

const cards = [
	{
		href: 'https://nextjs.org/docs',
		title: 'Documentation →',
		body: 'Find in-depth information about Next.js features and API.',
	},
	{
		href: 'https://nextjs.org/learn',
		title: 'Learn →',
		body: 'Learn about Next.js in an interactive course with quizzes!',
	},
	{
		href: 'https://github.com/vercel/next.js/tree/master/examples',
		title: 'Examples →',
		body: 'Discover and deploy boilerplate example Next.js projects.',
	},
	{
		href:
			'https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app',
		title: 'Deploy →',
		body: 'Instantly deploy your Next.js site to a public URL with Vercel.',
	},
];

const Template = ({ ...args }) => (
  <DarkThemeWrapper>
		<DarkToggle/>
    <SimpleCardFlex cards={cards}/>
  </DarkThemeWrapper>
);


export const Normal = Template.bind({});
Normal.args = {
};
