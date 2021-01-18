import React from 'react';

import { ScrollHint } from './ScrollHint';

export default {
  title: 'aesthetic/ScrollHint',
	component: ScrollHint,
};

const Template = ({ theme, ...args }) => <ScrollHint {...args} style={{color:'black',width:'5rem'}}/>;

export const Normal = Template.bind({});
Normal.args = {
};