import { useState } from 'react';
import { Toggle } from './Toggle';
import { accents } from '../theme/baseTheme';

export default {
  title: 'input/Toggle',
  component: Toggle,
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
    /*
    type: {
      control: {
        type: 'select',
        options: accents
      }
		}
		*/
  },
};

const Template = ({ theme, ...args }) => {
  const [isOn, setOn] = useState(false);
  return (
    <div className={theme}>
      <Toggle toggleHook={[isOn, setOn]} {...args} />
    </div>
  );
};

export const Normal = Template.bind({});
Normal.args = {};
