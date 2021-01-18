import React from 'react';

import { IsogridBackground } from './IsogridBackground';

export default {
  title: 'aesthetic/IsogridBackground',
  component: IsogridBackground,
};

const Template = ({ theme, ...args }) => <IsogridBackground {...args}/>;

export const Normal = Template.bind({});
Normal.args = {
	rows:6,
	cols:6
};