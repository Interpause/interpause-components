import React from 'react';

import { IsogridBackground } from '../../src/aesthetic/IsogridBackground';

export default {
  title: 'aesthetic/IsogridBackground',
  component: IsogridBackground,
	argTypes: {
    preserveAspectRatio: {
      options:["xMinYMin meet", "xMinYMin slice", "xMinYMid meet", "xMinYMid slice", "xMinYMax meet", "xMinYMax slice", "xMidYMin meet", "xMidYMin slice", "xMidYMid meet", "xMidYMid slice", "xMidYMax meet", "xMidYMax slice", "xMaxYMin meet", "xMaxYMin slice", "xMaxYMid meet", "xMaxYMid slice", "xMaxYMax meet", "xMaxYMax slice", "none"]
		}
  },
};

const Template = ({ theme, ...args }) => <div style={{height:'95vh',width:'95vw'}}><IsogridBackground preserveAspectRatio="xMidYMid meet" {...args}/></div>;

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