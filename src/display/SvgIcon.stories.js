import React from 'react';

import { SvgIcon, ICON } from './SvgIcon';

export default {
  title: 'display/SvgIcon',
	component: SvgIcon,
	argTypes: {
		icon: {
			control: {
				type: 'select',
				options: ICON
			}
		}
	}
};

const Template = ({ theme, ...args }) => (
  <div className={theme}>
    <SvgIcon {...args} style={{width:'5rem'}} />
  </div>
);

export const Normal = Template.bind({});
Normal.args = {
	icon:ICON.github
};
