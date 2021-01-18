import React from 'react';

import { LazyImage } from './LazyImage';

export default {
  title: 'display/LazyImage',
	component: LazyImage,
};

const Template = ({ theme, ...args }) => (
  <div className={theme}>
    <LazyImage {...args} style={{border:"10px solid black"}}/>
  </div>
);

export const Normal = Template.bind({});
Normal.args = {
	src:'https://github.githubassets.com/images/modules/open_graph/github-mark.png',
	aspectRatio:'1120 630'
};
