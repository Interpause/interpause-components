/**
 * @file Everything about Buttons.
 * @author John-Henry Lim <hyphen@interpause.dev>
 */

import { ReactNode } from 'react';
import tw, { css } from 'twin.macro';
import { accentTypes, getAccent } from '../theme/baseTheme';

export type ButtonVariants = 'outline' | 'filled' | 'text';

export interface ButtonProps {
  type?: accentTypes;
  variant?: ButtonVariants;
  children?: ReactNode;
  className?: string;
}

/** Returns the style used for a Button based on ButtonProps. */
export const ButtonStyle = (props: ButtonProps) => css`
  ${getAccent(props.type ?? 'primary')}
  ${tw`relative inline-block p-2 text-center rounded`}
	
	${props.variant == 'outline' &&
  css`
    ${tw`border-2 bg-opacity-0`}

    &:hover,&:focus {
      ${tw`bg-opacity-10`}
    }
  `}

	${props.variant == 'text' &&
  css`
    ${tw`hocus:underline bg-opacity-0 rounded-none`}
  `}

	${(props.variant ?? 'filled') == 'filled' &&
  css`
    ${tw`text-white hocus:ring-2 bg-opacity-80`}
  `}
`;

/** Button component. */
export function Button(props: ButtonProps & { onClick?: () => void }) {
  return (
    <button css={ButtonStyle(props)} className={props.className} onClick={props.onClick}>
      {props.children}
    </button>
  );
}

/** 
 * Button component using anchor tag with support for Routers.
 * @param RouterWrapper Component used to wrap anchor tag for routing.
 * @example
 * ```jsx
 * <LinkButton RouterWrapper={NextLink} href="/nextjs">Uses next/router<LinkButton/>
 * ```
 */
export function LinkButton(props: ButtonProps & { href?: string; RouterWrapper?: ({ children }: any) => JSX.Element }) {
  const { RouterWrapper } = props;
  const linkElement = (
    <a css={ButtonStyle(props)} className={props.className} href={props.href}>
      {props.children}
    </a>
  );
  if (RouterWrapper) return <RouterWrapper href={props.href}>{linkElement}</RouterWrapper>;
  return linkElement;
}
