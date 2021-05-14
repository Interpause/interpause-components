/**
 * @file Localized Dark Theme using Context API.
 * @author John-Henry Lim <hyphen@interpause.dev>
 */
import { useContext, useState, createContext, ReactNode, Dispatch, SetStateAction, useEffect } from 'react';
import tw, { css } from 'twin.macro';
import { Toggle, ToggleProps } from '../input/Toggle';

/** Used to store and set state about whether it is dark theme or not. */
export interface darkHook {
  isDark: boolean;
  setDark: Dispatch<SetStateAction<boolean>>;
}

/** Provides access to darkHook for all DarkToggles wrapped in DarkThemeWrapper. */
export const DarkThemeContext = createContext({} as darkHook);

/** Wrap this around element tree to localize dark theme. */
export function DarkThemeWrapper({ children, darkDefault }: { children: ReactNode; darkDefault?: boolean }) {
  const [isDark, setDark] = useState(darkDefault ?? false);
  // reads dark theme from LocalStorage then system preference
  useEffect(() => {
    let conf: string | boolean | null = window.localStorage.getItem('darkTheme');
    if (conf === null) {
      if (typeof darkDefault === 'undefined') conf = window.matchMedia('(prefers-color-scheme: dark)').matches;
      else conf = false;
    } else conf = conf === 'true';
    setDark(conf);
  }, [darkDefault]);
  useEffect(() => window.localStorage.setItem('darkTheme', `${isDark}`), [isDark]);

  return (
    <DarkThemeContext.Provider value={{ isDark, setDark }}>
      <div className={isDark ? 'dark' : 'light'}>{children}</div>
    </DarkThemeContext.Provider>
  );
}

/** Default style for DarkToggle. */
export const defaultDarkToggleStyle = css`
  .slider,
  .bg {
    ${tw`rounded-full`}
  }
  .bg {
    ${tw`bg-blue-200`}
  }
  .slider {
    ${tw`bg-yellow-300`}
  }
  &.on .bg {
    ${tw`bg-indigo-900`}
  }
  &.on .slider {
    ${tw`bg-yellow-100`}
  }
`;

/** Place this as descendant to DarkThemeWrapper to toggle localized dark theme. */
export function DarkToggle(props: Partial<ToggleProps>) {
  const { isDark, setDark } = useContext(DarkThemeContext);
  if (typeof isDark === 'undefined') {
    console.error('DarkThemeWrapper missing as ancestor to DarkToggle!');
    return <span>DarkToggle failed to load.</span>;
  }

  return (
    <Toggle label="Dark Mode" toggleHook={[isDark, setDark]} height={1.5} css={defaultDarkToggleStyle} {...props} />
  );
}
