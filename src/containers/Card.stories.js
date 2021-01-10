import React from 'react';

import SimpleCard from './Card';

export default {
  title: 'container/SimpleCard',
  component: SimpleCard,
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: ['filled','outline']
      }
    },
    theme: {
      control: {
        type: 'select',
        options: ['dark','light']
      }
    },
    type: {
      control: {
        type: 'select',
        options: ['normal','special','info','trivial','good','risky','bad','theme']
      }
    }
  }
};

const Template = ({theme,...args}) => <div className={theme}><SimpleCard {...args}/></div>;

export const Normal = Template.bind({});
Normal.args = {
  header: 'Does not have link',
  body: 'insert lorum ipsum',
  footer: 'eww feet',
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