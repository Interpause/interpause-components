import React from 'react';

import { useToaster, ToastWrapper, Toast } from '../../src/feedback/Toast';
import { Button } from '../../src/input/Button';
import { accents } from '../../src/theme/baseTheme';

export default {
  title: 'feedback/Toast',
  component: Toast,
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

const ToastButton = (args) => {
  const toast = useToaster();
  return (
    <div className={args.theme}>
      <Button
        onClick={() =>
          toast(args.message, {
            duration: args.duration,
            type: args.type,
          })
        }
      >
        make Toast
      </Button>
    </div>
  );
};

const Template = (args) => (
  <ToastWrapper>
    <ToastButton {...args} />
  </ToastWrapper>
);

export const Normal = Template.bind({});
Normal.args = {
  message: 'hello world',
  type: 'info',
  duration: 3000,
};
