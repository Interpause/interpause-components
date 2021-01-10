import React from 'react';

import { useToaster, ToastWrapper, Toast } from './Toast';
import { Button } from '../input/Button';

export default {
  title: 'feedback/Toast',
  component: Toast,
  argTypes: {
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

const ToastButton = (args) => {
	const toast = useToaster();
	return <div className={args.theme}><Button onClick={()=>toast(args.message,{
		duration: args.duration,
		type: args.type
	})}>make Toast</Button></div>
}

const Template = (args) => <ToastWrapper><ToastButton {...args}/></ToastWrapper>;

export const Normal = Template.bind({});
Normal.args = {
	message:"hello world",
	duration:1000
};