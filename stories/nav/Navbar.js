import React from 'react';

import { Navbar } from '../../src/nav/Navbar';
import { DarkThemeWrapper } from '../../src/theme/DarkThemeProvider';

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
		'link1':'#a',
		'link2':'#b',
		'link3':'#c',
		'link4':'#d'
	}
};
