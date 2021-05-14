import React from 'react';

import { Badge } from '../../src/display/Badge';
import { accents } from '../../src/theme/baseTheme';

export default {
  title: 'display/Badge',
	component: Badge,
	argTypes: {
		type: {
      options: accents,
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
