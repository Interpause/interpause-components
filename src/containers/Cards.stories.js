import React from 'react';

import { BasicCard } from './Cards';
import 'twin.macro';

export default {
  title: 'layout/BasicCard',
  component: BasicCard,
};

const Template = (args) => <BasicCard {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  title: 'Does not have link',
  body: 'insert lorum ipsum',
};

export const Linked = Template.bind({});
Linked.args = {
  title: 'Has link',
  href: '#',
  body: 'insert lorum ipsum',
};
