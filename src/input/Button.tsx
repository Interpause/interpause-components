/**
 * @file Everything about Buttons.
 * @author John-Henry Lim <hyphen@interpause.dev>
 */

import { ReactNode, useEffect, useRef, useState } from 'react';
import tw, { css } from 'twin.macro';
import { accentTypes, getAccent } from '../theme/baseTheme';

export type ButtonVariants = 'outline' | 'filled' | 'text';

export interface ButtonProps {
  type?: accentTypes;
  variant?: ButtonVariants;
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
}

/** Returns the style used for a Button based on ButtonProps. */
export const ButtonStyle = (props: ButtonProps) => css`
  ${getAccent(props.type ?? 'primary')}
  ${tw`relative inline-block p-2 text-center rounded`}
	
	${props.variant == 'outline' &&
  css`
    ${tw`border-2 bg-opacity-0`}
    ${props.disabled&&tw`text-trivial border-trivial`}

    &:hover,&:focus {
      ${tw`bg-opacity-10`}
    }
  `}

	${props.variant == 'text' &&
  css`
    ${tw`hocus:underline bg-opacity-0 rounded-none`}
    ${props.disabled&&tw`text-trivial`}
  `}

	${(props.variant ?? 'filled') == 'filled' &&
  css`
    ${tw`text-white hocus:ring-2 bg-opacity-80`}
    ${props.disabled&&tw`bg-opacity-60 text-opacity-70`}
  `}

  ${props.disabled&&tw`pointer-events-none`}
`;

/** Button component. */
export function Button(props: ButtonProps & { onClick?: () => void }) {
  return (
    <button css={ButtonStyle(props)} className={props.className} onClick={props.onClick}>
      {props.children}
    </button>
  );
}

export interface LinkButtonProps extends ButtonProps {
  href?: string;
  /** Component used to wrap anchor tags for routing purposes. */
  RouterWrapper?: ({ children }: any) => JSX.Element;
  /** If true, button will be disabled if the href of the current route and link matches. */
  disableIfRouteMatch?: boolean;
};

/** 
 * Button component using anchor tag with support for Routers.
 * @example
 * ```jsx
 * <LinkButton RouterWrapper={NextLink} href="/nextjs" disableIfRouteMatch>Uses next/router<LinkButton/>
 * ```
 */
export function LinkButton(props: LinkButtonProps) {
  const { RouterWrapper } = props;
  const [ disabled, setDisabled ] = useState(false);
  const linkRef = useRef<HTMLAnchorElement>(null);

  const checkDisabled = () => {
    if(!props.disableIfRouteMatch) return;
    const linkElem = linkRef.current;
    if(linkElem == null) return;
    setDisabled(linkElem.href == window.location.href);
  }

  useEffect(()=>{
    window.addEventListener('popstate',checkDisabled);
    return ()=>window.removeEventListener('popstate',checkDisabled);
  },[])

  const linkElement = (
    <a ref={linkRef} css={[ButtonStyle(props),disabled&&tw`pointer-events-none! cursor-default! text-trivial! no-underline!`]} className={props.className} href={props.href}>
      {props.children}
    </a>
  );
  if (RouterWrapper) return <RouterWrapper href={props.href}>{linkElement}</RouterWrapper>;
  return linkElement;
}
