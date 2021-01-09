/**
 * @file quite a primitive navbar tbh
 * @author John-Henry Lim <hyphen@interpause.dev>
 */
import React, { HTMLProps, useEffect, useRef } from 'react';
import tw, { css, styled } from 'twin.macro';
import { StyledComponent } from "@emotion/styled";
import Link from "next/link";
import { useRouter } from "next/router";
import { Icon, ICON } from "../display/Icon";
import { mobileScreen } from "../utils/deviceOrientation";
import { DarkToggle } from '../theme/DarkThemeProvider';

export const NavItem = styled.li`${tw`relative inline-flex flex-col flex-expand justify-center text-center w-32 max-w-xs p-1`}`;

export const BaseNavbar = styled.nav`
	${({height}:{height:number}) => css`--nav-height:${height}rem`}
	${tw`sticky flex flex-wrap md:flex-nowrap bg-normal-soft md:shadow-md top-0 inset-x-0 z-75`}
	transition: height 150ms cubic-bezier(0.4, 0, 0.2, 1);
	height: var(--nav-height);
	>.nav-items{ ${tw`inline-flex flex-row w-full divide-x-2 my-2 overflow-x-auto`} }
`;

export const CollapsableNavbar = styled(BaseNavbar)`
	${mobileScreen}{
		${tw`fixed bg-transparent`}
		>.nav-items{
			${tw`absolute flex flex-col divide-y divide-x-0 bg-normal-soft transition-transform motion-reduce:transition-none transform-gpu top-0 -z-25 m-0`}
			padding-top: var(--nav-height);
		}
		&:not(.opened){
			>.nav-items{
				${tw`pointer-events-none -translate-y-full`}
			}
		}
		${NavItem}{ ${tw`w-full text-left py-2`} }
	}
`;

export interface NavLinkProps extends HTMLProps<HTMLLIElement>{ route:string }
/** group-disabled:{class} can be used in className and children to customize */
export function NavLink({route,children,...props}:NavLinkProps){
	const router = useRouter();
	const currentRoute = router.pathname;
	const disabled = currentRoute === route;
	return <NavItem css={disabled?tw`text-trivial cursor-not-allowed`:tw`hocus:text-link-color cursor-pointer`} {...props as StyledComponent<HTMLLIElement>}>
		{children}
		<Link href={route}><a tw="absolute inset-0" css={disabled&&tw`hidden`}></a></Link>
	</NavItem>;
}

export interface NavbarProps extends HTMLProps<HTMLElement>{
	routes:Record<string,string>,
	itemProps?:HTMLProps<HTMLLIElement>
}
//TODO Implement the navbar context provider for in page hiding of navbar, recustomization by page etc
export function Navbar({routes,itemProps,...props}:NavbarProps){
	/** height in rem */
	const height = 4;
	const navbar = useRef<HTMLElement>(null);
	useEffect(()=>{
		const bar = navbar.current;
		const resizeBar = () => {
			if(document.documentElement.scrollTop > 30) bar&&bar.style.setProperty("--nav-height",`${height*3/4}rem`);
			else bar&&bar.style.setProperty("--nav-height",`${height}rem`);
		}
		document.addEventListener("scroll",resizeBar);
		return () => document.removeEventListener("scroll",resizeBar);
	},[])
	const navOpener = ()=>navbar.current?.classList.toggle("opened");
	return <CollapsableNavbar ref={navbar} height={height} {...props as StyledComponent<HTMLProps<HTMLElement>>}>
		<Icon src="/favicon/original-icon.png" tw="m-1 my-auto" css={css`height:${height*3/4}rem;width:${height*3/4}rem;`} priority/>
		<span tw="flex-grow md:flex-grow-0"></span>
		<Icon
			as="button"
			icon={ICON.menu}
			onClick={navOpener}
			tw="flex-shrink-0 md:hidden text-white ring-inset ring-2 ring-theme bg-indigo-400 rounded-lg bg-opacity-20! hocus:bg-opacity-60! m-1 p-1"
			css={css`height:${height*3/4}rem;width:${height*3/4}rem;backdrop-filter:invert(40%) hue-rotate(60deg)`}
		/>
		<ul className="nav-items">
			{Object.entries(routes).map(([route,text],i) => <NavLink route={route} {...itemProps} key={i} onClick={navOpener}>{text}</NavLink>)}
			<NavItem tw="flex-grow max-w-full hidden lg:inline-flex"></NavItem>
			<NavItem tw="w-40 flex-none"><DarkToggle height={1.25}/></NavItem>
		</ul>
	</CollapsableNavbar>;
}