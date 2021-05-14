import React from 'react';

import { Breadcrumb } from '../../src/nav/Breadcrumb';

export default {
  title: 'Nav/Breadcrumb',
  component: Breadcrumb,
};

const Template = (args) => (
  <Breadcrumb {...args} />
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
