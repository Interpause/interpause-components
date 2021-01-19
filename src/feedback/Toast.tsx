/**
 * @file Animated toasts.
 * @author John-Henry Lim <hyphen@interpause.dev>
 */
import { createContext, useContext, Dispatch, useEffect, ComponentProps, ForwardedRef, useRef, useState, useLayoutEffect } from 'react';
import tw, { css, styled } from 'twin.macro';
import { accentTypes, getAccent } from '../theme/baseTheme';
import { ListItemProps, useListReducer, ListAction, List, ListProps } from '../utils/List';
import { SvgIcon, ICON } from '../display/Icon';

export interface ToastProps extends ComponentProps<'div'> {
  type: accentTypes;
  duration: number;
}
/** Default Toast props. */
export const DefaultToastProps = {
  type: 'primary',
  duration: 10000,
} as const;

/** React context used to hold dispatch for making Toasts. */
export const ToastContext = createContext<Dispatch<ListAction<ToastProps>>>(() =>
  console.error('ToastContext was not provided!')
);

/** Returns the style for a Toast based on its type. */
export const getToastStyle = (type: accentTypes) => css`
  ${getAccent(type)}
  ${tw`flex flex-row text-left flex-shrink-0 rounded border-2 lg:max-w-2xl ml-auto overflow-hidden mt-1`}
  
`;

/** Workaround to have a margin between toasts but smoothly animate height anyways. */
export const ToastAnimContainer = styled.div`
  ${tw`relative flex flex-col-reverse overflow-visible motion-reduce:transition-none`}
  ${tw` opacity-0 max-h-0`}
  transition: opacity 300ms cubic-bezier(0.4, 0, 0.2, 1), left 200ms cubic-bezier(0.4, 0, 0.2, 1) 50ms, max-height 300ms cubic-bezier(0.4, 0, 0.2, 1);
`;

/** Default animation for Toasts. */
export const DefaultToastAnim = {
  timeout: { enter: 0, exit: 300 },
  styles: {
    entering: css`
      ${tw`-left-1/2`}
    `,
    entered: css`
      ${tw`opacity-100! left-0 max-h-16`}
    `,
    exiting: css`
      ${tw`left-1/2`}
    `
  },
} as const;

/** Actual Toast component. Usually not used directly. */
export function Toast({ type, dispatch, animState, ...props }: ListItemProps<ToastProps>, ref: ForwardedRef<any>) {
  const delToast = () => dispatch({ type: 'delItem', id: props.id });
  const [ maxHeight, setMaxHeight ] = useState('999rem'); // infinite initial max height fixes it
  const toastRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => { setTimeout(delToast, props.duration) }, []);

  useLayoutEffect(() => {
    const toastDiv = toastRef.current;
    if(toastDiv == null) return;
    const rect = toastDiv.getBoundingClientRect();
    // the extra is to get 1 rem in pixels for the top margin
    setMaxHeight(`${rect.height+parseFloat(getComputedStyle(document.documentElement).fontSize)}px`)
  }, [JSON.stringify(props.children)]);
  return (
    <ToastAnimContainer ref={ref} {...props} css={(animState==="entered")&&css`max-height:${maxHeight}!important;`}>
      <div ref={toastRef} css={getToastStyle(type)}>
        <span tw="p-1">{props.children}</span>
        <SvgIcon
          as="button"
          icon={ICON.cross}
          tw="flex-none w-4 mr-1 ml-2 self-stretch opacity-60 hocus:opacity-100"
          onClick={delToast}
        />
      </div>
    </ToastAnimContainer>
  );
}

/** Should be wrapped around App to allow useToaster() hook to work. */
export function ToastWrapper(props: Omit<ListProps<ToastProps>, 'ListItemComponent' | 'reducerHook'>) {
  const [state, dispatch] = useListReducer<ToastProps>();
  return (
    <ToastContext.Provider value={dispatch}>
      <List<ToastProps>
        tw="fixed flex flex-col justify-end right-2 bottom-2 ml-2 z-100"
        AnimProps={DefaultToastAnim}
        ListItemComponent={Toast}
        reducerHook={[state, dispatch]}
        {...props}
      >
        {''}
      </List>
      {props.children}
    </ToastContext.Provider>
  );
}

/** Hook that returns a function that allows you to make Toasts. Needs to be inside ToastWrapper. */
export function useToaster() {
  const dispatch = useContext(ToastContext);
  return (text: string, conf?: Partial<ToastProps>) =>
    dispatch({
      type: 'addItem',
      id: `${Date.now()}`,
      data: { ...DefaultToastProps, ...conf, children: text },
    });
}
