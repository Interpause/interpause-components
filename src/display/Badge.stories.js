import React from 'react';

import { Badge } from './Badge';
import { accents } from '../theme/baseTheme';

export default {
  title: 'display/Badge',
	component: Badge,
	argTypes: {
		type: {
      control: {
        type: 'select',
        options: accents,
      },
    },
	}
};

const Template = ({ theme, ...args }) => (
  <div className={theme}>
		why does this exist. why did i make this. using twin.macro its so short<Badge {...args}/>
  </div>
);

export const Normal = Template.bind({});
Normal.args = {
	children:'new'
};
