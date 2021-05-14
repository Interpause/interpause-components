import React from 'react';

import { RainbowText } from '../../src/aesthetic/RainbowText';

export default {
  title: 'aesthetic/RainbowText',
  component: RainbowText,
};

const Template = ({ theme, ...args }) => <div style={{width:'50vw'}}><RainbowText {...args}/></div>;

export const Normal = Template.bind({});
Normal.args = {
	children:'hello world!'
};