import { useState } from 'react';
import { Toggle } from '../../src/input/Toggle';
import { accents } from '../../src/theme/baseTheme';

export default {
  title: 'input/Toggle',
  component: Toggle,
  argTypes: {
    variant: {
      options: [],
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

const Template = ({ theme, ...args }) => {
  const [isOn, setOn] = useState(false);
  return (
    <div className={'theme-div '+theme}>
      <Toggle toggleHook={[isOn, setOn]} {...args} />
    </div>
  );
};

export const Normal = Template.bind({});
Normal.args = {};
