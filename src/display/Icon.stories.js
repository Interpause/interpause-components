import React from 'react';

import { Icon } from './Icon';

export default {
  title: 'display/MaterialIcon',
	component: Icon
};

const Template = ({ theme, ...args }) => (
  <div className={theme}>
    <Icon {...args} style={{width:'5rem'}} />
		<Icon style={{width:'5rem'}}>home</Icon>
  </div>
);

export const Normal = Template.bind({});
Normal.args = {
	children:'home'
};
