import { Button } from './Button';

export default {
  title: 'input/Button',
  component: Button,
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: ['text','outline','filled']
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

const Template = ({theme,...args}) => <div className={theme}><Button {...args}/></div>;

export const Normal = Template.bind({});
Normal.args = {
	children:"hello world"
};