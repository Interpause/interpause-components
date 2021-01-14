import { Button } from './Button';
import { accents } from '../theme/baseTheme';

export default {
  title: 'input/Button',
  component: Button,
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: ['text', 'outline', 'filled'],
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

const Template = ({ theme, ...args }) => (
  <div className={theme}>
    <Button {...args} />
  </div>
);

export const Normal = Template.bind({});
Normal.args = {
  children: 'hello world',
};
