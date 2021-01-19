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
		'link1':'#a',
		'link2':'#b',
		'link3':'#c',
		'link4':'#d'
	}
};
