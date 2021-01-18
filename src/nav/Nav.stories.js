import React from 'react';

import { Navbar } from './Nav';
import { DarkThemeWrapper } from '../theme/DarkThemeProvider';

export default {
  title: 'Nav/Navbar',
  component: Navbar,
};

const Template = ({ ...args }) => (
  <DarkThemeWrapper>
    <Navbar {...args} />
  </DarkThemeWrapper>
);


export const Normal = Template.bind({});
Normal.args = {
	routes:{
		'#a':'link1',
		'#b':'link2',
		'#c':'link3',
		'#d':'link4'
	}
};
