/**
 * @file Crap the birds ate all of it.
 * @author John-Henry Lim <hyphen@interpause.dev>
 */

import React, { ComponentProps } from 'react';
import tw, { styled } from 'twin.macro';
import { NavLink } from './NavItem';

const BreadcrumbWrapper = styled.nav`
  --breadcrumb-divider:'/';
  &>.crumb-list{
    &>.crumb-item{
      ${tw`p-0 w-auto inline`}
      &>a{
        ${tw`text-primary underline`}
      }
    }
    &>.crumb-item+.crumb-item::before{
      ${tw`font-thin px-2`}
      content:var(--breadcrumb-divider);
    }
  }
`;


export interface BreadcrumbProps extends ComponentProps<'nav'> {
  /** Ordered object of routes to use. Key is route, value is label. */
  routes: Record<string, string>;
  /** Component used to wrap anchor tags for routing purposes. */
  RouterWrapper?: ({ children }: any) => JSX.Element;
}

/** 
 * Complete Breadcrumb component. For styling purposes:
 * - ul containing breadcrumbs has `.crumb-list` applied to it
 * - NavItems have `.crumb-item` applied to them
 * - set `--breadcrumb-divider` to change the divider
 */
export function Breadcrumb({ routes, RouterWrapper, ...props }: BreadcrumbProps) {
  return (
    <BreadcrumbWrapper {...props}>
      <ul className="crumb-list">
        {Object.entries(routes).map(([name, route], i) => (
          <NavLink href={route} variant="text" className="crumb-item" RouterWrapper={RouterWrapper} key={i}>
            {name}
          </NavLink>
        ))}
      </ul>
    </BreadcrumbWrapper>
  );
}