/**
 * @file NavItems like NavItem, NavLink, TODO: maybe NavDropdown and search etc
 * @author John-Henry Lim <hyphen@interpause.dev>
 */

import React, { ComponentProps } from 'react';
import tw, { css, styled } from 'twin.macro';
import { LinkButton } from '../input';

/** Styled li component. */
export const NavItem = styled.li`
  ${tw`relative inline-flex flex-col flex-expand justify-center text-center w-32 max-w-xs p-1`}
`;

export function NavLink({className,...props}:ComponentProps<typeof LinkButton>){
  return (
    <NavItem className={className}>
      <LinkButton {...props} tw="text-normal hocus:(text-primary) p-0" css={css`text-align: inherit`} disableIfRouteMatch/>
    </NavItem>
  );
}
