/**
 * @file All the navbars.
 * @author John-Henry Lim <hyphen@interpause.dev>
 */

import React, { ComponentProps, useRef } from 'react';
import tw, { css, styled } from 'twin.macro';
import { SvgIcon, ICON } from '../display/SvgIcon';
import { mobileScreen } from '../utils/deviceOrientation';
import { DarkToggle } from '../theme/DarkThemeProvider';
import { NavItem, NavLink } from './NavItem';

/**
 * Styled nav component. For styling purposes:
 * - set `--nav-height` to change height, default is 4 rem
 * - apply `.nav-list` to element containing NavItems
 * - apply `.nav-item` to each NavItem
 */
export const BaseNavbar = styled.nav`
  ${({height}:{height:number}) => css`--nav-height: ${height}rem;`}
  ${tw`sticky flex flex-wrap md:flex-nowrap bg-white md:shadow-md top-0 inset-x-0 z-75`}
	transition: height 150ms cubic-bezier(0.4, 0, 0.2, 1);
  height: var(--nav-height);
  .dark & { ${tw`bg-black`} }
  > .nav-list {
    ${tw`inline-flex flex-row w-full divide-x-2 my-2 overflow-x-auto overflow-y-hidden`}
  }
`;

/** Styled BaseNavbar that allows NavItems to collapse into dropdown. Apply `.opened` to open dropdown. */
export const CollapsableNavbar = styled(BaseNavbar)`
  ${mobileScreen} {
    ${tw`fixed bg-opacity-0!`}
    >.nav-list {
      ${tw`absolute flex flex-col divide-y divide-x-0 bg-white shadow-md transition-transform motion-reduce:transition-none transform-gpu top-0 -z-25 m-0`}
      padding-top: var(--nav-height);
      .dark & { ${tw`bg-black`} }
      &>.nav-item {
        ${tw`w-full text-left py-2`}
      }
    }
    &:not(.opened) {
      > .nav-list {
        ${tw`pointer-events-none -translate-y-full`}
      }
    }
  }
`;

export interface NavbarProps extends ComponentProps<'nav'> {
  /** List of routes to use in Navbar. Key is route, value is label. */
  routes: Record<string, string>;
  /** Height of Navbar in rem. */
  height?: number;
  /** Component used to wrap anchor tags for routing purposes. */
  RouterWrapper?: ({ children }: any) => JSX.Element;
}
//TODO: Implement the navbar context provider for in page hiding of navbar, recustomization by page etc
/** 
 * Complete Navbar component. For styling purposes:
 * - ul containing NavItems has `.nav-list` applied to it
 * - NavItems have `.nav-item` applied to them
 * - The dropdown button has `.nav-opener` applied to it
 * @example
 * ```jsx
 * <Navbar routes={...} RouterWrapper={NextLink}/>
 * ```
 */
export function Navbar({ routes, height=4, RouterWrapper, ...props }: NavbarProps) {
  const navbar = useRef<HTMLElement>(null);
  const navOpener = () => navbar.current?.classList.toggle('opened');
  return (
    <CollapsableNavbar ref={navbar} height={height} {...props}>
      <SvgIcon
        as="button"
        icon={ICON.menu}
        onClick={navOpener}
        tw="flex-shrink-0 md:hidden! text-white ring-inset ring-2 ring-primary bg-primary rounded-lg bg-opacity-20! hocus:bg-opacity-60! m-1 p-1 ml-auto"
        css={css`
          height: ${(height * 3) / 4}rem;
          width: ${(height * 3) / 4}rem;
          backdrop-filter: invert(40%) hue-rotate(60deg);
        `}
        className="nav-opener"
      />

      <ul className="nav-list" onClick={navOpener}> {/* Hey it bubbles, great so the auto-closing after clicking on link for mobile can be here */}
        {Object.entries(routes).map(([name, route], i) => (
          <NavLink href={route} variant="text" className="nav-item" RouterWrapper={RouterWrapper} key={i}>
            {name}
          </NavLink>
        ))}

        <NavItem tw="max-w-none w-auto flex-expand border-none" className="nav-item">
          <DarkToggle height={1.25} tw="md:ml-auto mr-4"/>
        </NavItem>
      </ul>
    </CollapsableNavbar>
  );
}
