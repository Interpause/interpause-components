import React from 'react';

import { SimpleCard } from '../../src/containers/Card';
import { accents } from '../../src/theme/baseTheme';

export default {
  title: 'container/Card',
  component: SimpleCard,
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

const filler = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum at libero vitae lectus aliquet porttitor efficitur nec massa. Proin sollicitudin mi semper, blandit mauris et, tincidunt neque. In at tempus arcu.';

const Template = ({ theme, ...args }) => (
  <div className={'theme-div '+theme}>
    <SimpleCard {...args} />
  </div>
);

export const Normal = Template.bind({});
Normal.args = {
  header: 'A Card',
  body: filler,
  footer: 'Card Footer',
  onClick: undefined
};

export const Button = Template.bind({});
Button.args = {
  header: 'Has button function',
  onClick: () => alert('hi'),
  body: filler,
  footer: 'Im a button',
};

export const Linked = Template.bind({});
Linked.args = {
  header: 'Has link',
  href: '#',
  body: filler,
  footer: 'Im a link',
};

export const Custom = Template.bind({});
Custom.args = {
  header: <code>Elements are accepted too!</code>,
  body: <em>{filler}</em>,
  footer: <input type="range"></input>
};
