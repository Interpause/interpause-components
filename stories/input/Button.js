import { Button } from '../../src/input/Button';
import { accents } from '../../src/theme/baseTheme';

export default {
  title: 'input/Button',
  component: Button,
  argTypes: {
    variant: {
      options: ['text', 'outline', 'filled'],
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

const Template = ({ theme, ...args }) => (
  <div className={theme}>
    <Button {...args} />
  </div>
);

export const Normal = Template.bind({});
Normal.args = {
  children: 'hello world',
};
