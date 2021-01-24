/**
 * @file Yeah I injected the font directly into head, so what?
 * @author John-Henry Lim <hyphen@interpause.dev>
 */

import { ComponentProps, useEffect, useRef } from 'react';
import tw, { css, styled } from 'twin.macro';

/** Internal styled figure. */
export const IconWrapper = styled.figure`
  ${tw`relative inline-block flex-none`}
  ${({ orientation }: { orientation?: number, href?: string }) =>
    css`
      &>.icon{
        transform: rotate(${orientation ?? 0}deg);
        transition: inherit;
      }
    `}
  &>.label{ ${tw`text-center whitespace-normal`} }
`;

export interface IconProps extends ComponentProps<'figure'> {
  /** Rotation of the SVG component in degrees. */
  orientation?: number;
  /** Used if icon is treated as button. */
  href?: string;
  as?: keyof JSX.IntrinsicElements;
  /** Icon label. */
  label?: string;
  /** Following material icons in how to specify icon. */
  children: string;
}

/**
 * Icon component. For styling purposes:
 * - figcaption has `.label`
 */
export function Icon({ orientation, className, children, href, as, label, onClick, ...props }: IconProps) {
  const iconRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLElement>(null);

  useEffect(()=>{
    if(document.head.querySelector('#materialIconSheet')) return;
    const materialIconSheet = document.createElement('link');
    materialIconSheet.rel = 'stylesheet';
    materialIconSheet.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
    materialIconSheet.id = 'materialIconSheet';
    document.head.appendChild(materialIconSheet);
  },[]);

  useEffect(()=>{
    const iconElem = iconRef.current;
    const wrapperElem = wrapperRef.current;
    if(iconElem == null || wrapperElem == null) return;
    const wrapperStyle = getComputedStyle(wrapperElem);
    iconElem.style.fontSize = wrapperStyle.width;
  },[className]);
  
  return (
    <IconWrapper
      as={as}
      ref={wrapperRef}
      className={className}
      orientation={orientation}
      href={href}
      onClick={onClick}
      {...props}
    >
      <i ref={iconRef} tw="align-bottom pointer-events-none" className="material-icons icon">{children}</i>
      <figcaption className="label">{label}</figcaption>
    </IconWrapper>
  );
}