import React from 'react';

import { Accordion } from '../../src/containers/Accordion';
import { accents } from '../../src/theme/baseTheme';

export default {
  title: 'container/Accordion',
  component: Accordion,
  argTypes: {
    variant: {
      options: ['filled', 'outline'],
    },
    theme: {
      options: ['dark', 'light'],
      control: { type: 'select' }
    },
    type: {
      options: accents,
    },
  },
};

const filler = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus maximus ante id eros facilisis pulvinar. Donec vel nulla odio. Maecenas vel pharetra enim, vel egestas nunc. Donec ac quam sed nisl tincidunt pharetra. Nam in eros lorem. Pellentesque a arcu dui. Aliquam dapibus tristique nulla et tincidunt. Suspendisse vel eleifend dui. Phasellus ut nisl nec enim dictum interdum eu sed ligula. Morbi vulputate ut ante sed consequat. Proin porttitor purus id felis elementum scelerisque. Cras lacinia mauris in tortor fringilla tincidunt. Phasellus quis efficitur neque. Praesent vel malesuada neque. Quisque blandit risus sed laoreet lacinia.';

const Template = ({ theme, ...args }) => (
  <div className={'theme-div '+theme}>
    <Accordion {...args} />
    <Accordion {...args} />
    <h6>some content after</h6>
  </div>
);

export const Normal = Template.bind({});
Normal.args = {
	body:filler,
	header:'A accordion'
};