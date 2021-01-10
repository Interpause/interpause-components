/**
 * @file Buttons.
 * @author John-Henry Lim <hyphen@interpause.dev>
 */

import { ReactNode } from "react";
import tw, { css } from "twin.macro";
import { colorTypes } from "../theme/baseTheme";

export type ButtonVariants = 'outline'|'filled'|'text';

export interface ButtonProps {
	type?: colorTypes;
	variant?: ButtonVariants;
	children?: ReactNode;
	className?: string;
}

const ButtonStyle = (props:ButtonProps) => css`
	${tw`relative inline-block p-2 bg-transparent text-center rounded`}

  color: var(--color-${props.type??'theme'});
	--tw-ring-color: var(--color-${props.type??'theme'}-soft);
	
	${props.variant=='outline'&&css`
		${tw`border-2`}
		border-color: var(--color-${props.type??'theme'}-hard);

		&:hover,&:focus {
			background-color: var(--color-${props.type??'theme'}-soft);
		}
	`}

	${props.variant=='text'&&css`
		${tw`hocus:underline`}
		color: var(--color-${props.type??'theme'});
	`}

	${(props.variant??'filled')=='filled'&&css`
		${tw`text-white hocus:ring-2`}
		background-color: var(--color-${props.type??'theme'}-hard);
	`}
`;

export function Button(props:ButtonProps&{onClick?: ()=>void}){
	return <button css={ButtonStyle(props)} className={props.className} onClick={props.onClick}>{props.children}</button>;
}

export function LinkButton(props:ButtonProps&{href?: string, RouterWrapper?: ({children}:any)=>JSX.Element}){
	const { RouterWrapper } = props;
	const linkElement = <a css={ButtonStyle(props)} className={props.className} href={props.href}>{props.children}</a>;
	if(RouterWrapper) return <RouterWrapper href={props.href}>{linkElement}</RouterWrapper>;
	return linkElement;
}