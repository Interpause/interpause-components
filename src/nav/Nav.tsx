/**
 * @file Navbar and other NavItems.
 * @author John-Henry Lim <hyphen@interpause.dev>
 */
import React, { HTMLProps, useEffect, useRef } from 'react';
import tw, { css, styled } from 'twin.macro';
import { StyledComponent } from '@emotion/styled';
import { SvgIcon, ICON } from '../display/Icon';
import { mobileScreen } from '../utils/deviceOrientation';
import { DarkToggle } from '../theme/DarkThemeProvider';

/** Styled li component. */
export const NavItem = styled.li`
  ${tw`relative inline-flex flex-col flex-expand justify-center text-center w-32 max-w-xs p-1`}
`;

/** Styled nav component. Set `--nav-height` in rem. */
export const BaseNavbar = styled.nav`
  ${({ height }: { height: number }) =>
    css`
      --nav-height: ${height}rem;
    `}
  ${tw`sticky flex flex-wrap md:flex-nowrap bg-white md:shadow-md top-0 inset-x-0 z-75`}
	transition: height 150ms cubic-bezier(0.4, 0, 0.2, 1);
  height: var(--nav-height);
  > .nav-items {
    ${tw`inline-flex flex-row w-full divide-x-2 my-2 overflow-x-auto`}
  }
  .dark & { ${tw`bg-black`} }
`;

/** Styled BaseNavbar that allows NavItems to collapse into dropdown. */
export const CollapsableNavbar = styled(BaseNavbar)`
  ${mobileScreen} {
    ${tw`fixed bg-opacity-0!`}
    >.nav-items {
      ${tw`absolute flex flex-col divide-y divide-x-0 bg-white transition-transform motion-reduce:transition-none transform-gpu top-0 -z-25 m-0`}
      padding-top: var(--nav-height);
      .dark & { ${tw`bg-black`} }
      &>.item {
        ${tw`w-full text-left py-2`}
      }
    }
    &:not(.opened) {
      > .nav-items {
        ${tw`pointer-events-none -translate-y-full`}
      }
    }
  }
`;

export interface NavLinkProps extends HTMLProps<HTMLLIElement> {
  route: string;
}

/** Wraps an anchor tag in NavItem. */
export function NavLink({ route, children, ...props }: NavLinkProps) {
  return (
    <NavItem css={tw`hocus:text-blue-400 cursor-pointer`} {...(props as StyledComponent<HTMLLIElement>)}>
      {children}
      <a href={route} css={tw`absolute inset-0`}></a>
    </NavItem>
  );
}

export interface NavbarProps extends HTMLProps<HTMLElement> {
  /** List of routes to use in Navbar. Key is route, value is label. Uses NavLink. */
  routes: Record<string, string>;
  /** List of routes to use in Navbar. Uses NavLink. */
  ItemProps?: HTMLProps<HTMLLIElement>;
  /** Height of Navbar in rem. */
  height?: number;
}
//TODO: Implement the navbar context provider for in page hiding of navbar, recustomization by page etc
/** 
 * Complete Navbar component.
 * 
 * @param routes List of routes to use in Navbar. Key is route, value is label. Uses NavLink.
 * @param ItemProps Additional props to forward to NavItems/NavLinks.
 */
export function Navbar({ routes, ItemProps, height=4, ...props }: NavbarProps) {
  const navbar = useRef<HTMLElement>(null);
  useEffect(() => {
    const bar = navbar.current;
    const resizeBar = () => {
      if (document.documentElement.scrollTop > 30)
        bar && bar.style.setProperty('--nav-height', `${(height * 3) / 4}rem`);
      else bar && bar.style.setProperty('--nav-height', `${height}rem`);
    };
    document.addEventListener('scroll', resizeBar);
    return () => document.removeEventListener('scroll', resizeBar);
  }, []);
  const navOpener = () => navbar.current?.classList.toggle('opened');
  return (
    <CollapsableNavbar ref={navbar} height={height} {...(props as StyledComponent<HTMLProps<HTMLElement>>)}>
      <span tw="flex-grow md:flex-grow-0"></span>
      <SvgIcon
        as="button"
        icon={ICON.menu}
        onClick={navOpener}
        tw="flex-shrink-0 md:hidden text-white ring-inset ring-2 ring-primary bg-indigo-400 rounded-lg bg-opacity-20! hocus:bg-opacity-60! m-1 p-1"
        css={css`
          height: ${(height * 3) / 4}rem;
          width: ${(height * 3) / 4}rem;
          backdrop-filter: invert(40%) hue-rotate(60deg);
        `}
      />
      <ul className="nav-items">
        {Object.entries(routes).map(([route, text], i) => (
          <NavLink route={route} {...ItemProps} key={i} className="item" onClick={navOpener}>
            {text}
          </NavLink>
        ))}
        <NavItem tw="flex-grow max-w-full hidden lg:inline-flex"></NavItem>
        <NavItem tw="w-40 flex-none" className="item">
          <DarkToggle height={1.25} />
        </NavItem>
      </ul>
    </CollapsableNavbar>
  );
}
