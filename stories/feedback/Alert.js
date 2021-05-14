import React from 'react';

import { Alert } from '../../src/feedback/Alert';
import { accents } from '../../src/theme/baseTheme';

export default {
  title: 'feedback/Alert',
  component: Alert,
  argTypes: {
    theme: {
      options: ['dark', 'light'],
			control: { type: 'select' }
    },
    type: {
      options: accents,
    },
  },
};

const Template = (args) => (
	<div className={args.theme}>
      <Alert {...args}/>
    </div>
);

const filler = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum at libero vitae lectus aliquet porttitor efficitur nec massa. Proin sollicitudin mi semper, blandit mauris et, tincidunt neque. In at tempus arcu.';

export const Normal = Template.bind({});
Normal.args = {
  children: filler,
	type: 'info',
	onClick: undefined
};
