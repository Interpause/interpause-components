import React from 'react';

import { SimpleCardFlex } from './CardFlex';
import { accents } from '../theme/baseTheme';

export default {
  title: 'container/CardFlex',
  component: SimpleCardFlex,
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: ['filled', 'outline'],
      },
    },
    theme: {
      control: {
        type: 'select',
        options: ['dark', 'light'],
      },
    },
    type: {
      control: {
        type: 'select',
        options: accents,
      },
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
