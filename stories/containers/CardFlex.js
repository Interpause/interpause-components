import React from 'react';

import { SimpleCardFlex } from '../../src/containers/CardFlex';
import { accents } from '../../src/theme/baseTheme';

export default {
  title: 'container/CardFlex',
  component: SimpleCardFlex,
  argTypes: {
    variant: {
      options: ['filled', 'outline'],
    },
    theme: {
      options: ['dark', 'light'],
			control: { type: 'select' }
    },
    type: {
      options: accents,
    },
  },
};

const Template = ({ theme, ...args }) => (
  <div className={theme}>
    <SimpleCardFlex {...args} />
  </div>
);

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

export const Normal = Template.bind({});
Normal.args = {
  cards:cards
};
