import React from 'react';

import { IsogridBackground } from './IsogridBackground';

export default {
  title: 'aesthetic/IsogridBackground',
  component: IsogridBackground,
};

const Template = ({ theme, ...args }) => <div style={{height:'95vh',width:'95vw'}}><IsogridBackground {...args}/></div>;

export const Normal = Template.bind({});
Normal.args = {
	rows:7,
	cols:12
};

export const Pretty = Template.bind({});
Pretty.args = {
	rows:7,
	cols:12,
	gapRatio:-3,
	heightRatio:5
};