import React from 'react';

import { RainbowText } from './RainbowText';

export default {
  title: 'aesthetic/RainbowText',
  component: RainbowText,
};

const Template = ({ theme, ...args }) => <RainbowText {...args}/>;

export const Normal = Template.bind({});
Normal.args = {
	children:'hello world!'
};