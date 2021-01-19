import React from 'react';

import { Accordion } from './Accordion';
import { accents } from '../theme/baseTheme';

export default {
  title: 'container/Accordion',
  component: Accordion,
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: ['filled', 'outline'],
      },
    },
    theme: {
      control: {
        type: 'select',
        options: ['dark', 'light'],
      },
    },
    type: {
      control: {
        type: 'select',
        options: accents,
      },
    },
  },
};

const filler = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum at libero vitae lectus aliquet porttitor efficitur nec massa. Proin sollicitudin mi semper, blandit mauris et, tincidunt neque. In at tempus arcu.';

const Template = ({ theme, ...args }) => (
  <div className={theme}>
    <Accordion {...args} />
    <h6>some content after</h6>
  </div>
);

export const Normal = Template.bind({});
Normal.args = {
	body:filler,
	header:'A accordion'
};