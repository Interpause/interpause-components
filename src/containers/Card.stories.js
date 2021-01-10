import React from 'react';

import SimpleCard from './Card';
import 'twin.macro';

export default {
  title: 'container/SimpleCard',
  component: SimpleCard,
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: ['normal','outline']
      }
    }
  }
};

const Template = (args) => <SimpleCard {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  header: 'Does not have link',
  body: 'insert lorum ipsum',
  footer: 'eww feet'
};

export const Button = Template.bind({});
Button.args = {
  header: 'Has button function',
  onClick: ()=>alert("hi"),
  body: 'insert lorum ipsum',
  footer: 'eww feet'
};

export const Linked = Template.bind({});
Linked.args = {
  header: 'Has link',
  href: '#',
  body: 'insert lorum ipsum',
  footer: 'eww feet'
};

export const Custom = Template.bind({});
Custom.args = {
  header: 'Has link',
  body: 'insert lorum ipsum',
  footer: <input type="range"></input>
};