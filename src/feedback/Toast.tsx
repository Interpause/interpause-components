/**
 * @file Animated toasts.
 * @author John-Henry Lim <hyphen@interpause.dev>
 */
import { createContext, useContext, Dispatch, useEffect, HTMLProps, ForwardedRef } from 'react';
import tw, { css } from 'twin.macro';
import { accentTypes, getAccent } from '../theme/baseTheme';
import { ListItemProps, useListReducer, ListAction, List, ListProps } from '../utils/List';
import { SvgIcon, ICON } from '../display/Icon';

export interface ToastProps extends HTMLProps<HTMLDivElement> {
  type: accentTypes;
  duration: number;
}
/** Default Toast props. */
export const DefaultToastProps = {
  type: 'normal',
  duration: 10000,
} as const;

/** React context used to hold dispatch for making Toasts. */
export const ToastContext = createContext<Dispatch<ListAction<ToastProps>>>(() =>
  console.error('ToastContext was not provided!')
);

/** Returns the style for a Toast based on its type. */
export const getToastStyle = (type: accentTypes) => css`
  ${getAccent(type)}
  ${tw`relative flex flex-row rounded border-2 ml-auto lg:max-w-2xl motion-reduce:transition-none overflow-hidden mt-1`}
  transition: opacity 300ms cubic-bezier(0.4, 0, 0.2, 1), left 200ms cubic-bezier(0.4, 0, 0.2, 1), max-height 300ms cubic-bezier(0.4, 0, 0.2, 1);
`;

/**
 * Default animation for Toasts.
 * 
 * @note styles.exit never shows up as component is removed at that stage.
 * @note timeout.appear seems to do nothing & defaults to timeout.enter anyways.
 * @note timeout.enter is how long it stays in entering state.
 * @note timeout.exit is how long it stays in exiting state
 */
export const DefaultToastAnim = {
  timeout: { enter: 1, exit: 400 },
  styles: {
    entering: css`
      ${tw`opacity-0 -left-1/2 max-h-0`}
    `,
    entered: css`
      ${tw`opacity-100 left-0 max-h-20`}
    `,
    exiting: css`
      ${tw`opacity-0 left-1/2 max-h-0 mt-0`}
    `,
  },
} as const;

/** Actual Toast component. Usually not used directly. */
export function Toast({ type, dispatch, ...props }: ListItemProps<ToastProps>, ref: ForwardedRef<HTMLDivElement>) {
  const delToast = () => dispatch({ type: 'delItem', id: props.id });
  useEffect(() => {
    const id = setTimeout(delToast, props.duration);
    return () => clearTimeout(id);
  }, [props.duration]);
  return (
    <div ref={ref} css={getToastStyle(type)} {...props}>
      <span tw="p-1">{props.children}</span>
      <SvgIcon
        as="button"
        icon={ICON.cross}
        tw="flex-none w-4 mr-1 ml-2 self-stretch opacity-60 hocus:opacity-100"
        onClick={delToast}
      />
    </div>
  );
}

/** Should be wrapped around App to allow useToaster() hook to work. */
export function ToastWrapper(props: Omit<ListProps<ToastProps>, 'ListItemComponent' | 'reducerHook'>) {
  const [state, dispatch] = useListReducer<ToastProps>();
  return (
    <ToastContext.Provider value={dispatch}>
      <List<ToastProps>
        tw="fixed flex flex-col justify-end inset-x-2 bottom-2 lg:left-auto z-100"
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
