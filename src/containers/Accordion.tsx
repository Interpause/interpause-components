/**
 * @file It doesn't play music.
 * @author John-Henry Lim <hyphen@interpause.dev>
 */

import { ReactNode, isValidElement, MouseEvent, useState, useEffect, useRef, ComponentProps } from 'react';
import tw, { css } from 'twin.macro';
import { accentTypes, getAccent } from '../theme/baseTheme';
import { Icon } from '../display/Icon';

export type AccordionVariants = 'normal';

export interface AccordionProps extends ComponentProps<'details'>{
	/** TODO: implement */
  type?: accentTypes;
	variant?: AccordionVariants;
	body?: ReactNode;
	header?: ReactNode;
}

/**
 * It is a accordion, what else could it be? For styling purposes:
 * - summary has `.header` applied
 * - the body has `.body` applied
 */
export function Accordion(props:AccordionProps){
	const [isOpen, setOpen] = useState(false);
	const [openHeight, setOpenHeight] = useState('999rem');
	const [closeHeight, setCloseHeight] = useState('1rem');

	const bodyRef = useRef<HTMLDivElement>(null);
	const headerRef = useRef<HTMLElement>(null);
	const summaryRef = useRef<HTMLDetailsElement>(null);
	const accordionOpener = (e:MouseEvent) => {
		e.preventDefault();
		setOpen(!isOpen);
	};

	useEffect(() => {
		const bodyDiv = bodyRef.current;
		const headerDiv = headerRef.current;
		const parentDiv = summaryRef.current;
		if(bodyDiv == null || headerDiv == null || parentDiv == null) return;
		
		const calculateHeights = ()=>{
			parentDiv.style.transition = 'none';
			// body cannot be display:hidden first else this wont work
			const bodyRect = bodyDiv.getBoundingClientRect();
			const headerRect = headerDiv.getBoundingClientRect();
			setCloseHeight(`${headerRect.height}px`)
			setOpenHeight(`${bodyRect.height+headerRect.height}px`);
			setTimeout(()=>parentDiv.style.transition = 'max-height 300ms cubic-bezier(0.4, 0, 0.2, 1)',20);
		}
		calculateHeights();
		window.addEventListener('resize', calculateHeights);
		
  }, [JSON.stringify(props.body),JSON.stringify(props.header)]);

	return (
		<details ref={summaryRef} css={css`
			${tw`relative overflow-hidden text-left cursor-pointer`}
			list-style: none;
			max-height:${isOpen?openHeight:closeHeight};
			&>.header{
				${isOpen&&getAccent(props.type??'primary')}
				${tw`flex flex-row p-1 border-2 rounded w-full transition-colors`}
				::-webkit-details-marker { display:none }
			}
			&>.body{
				${tw`relative p-1 -top-1 border-2 border-t-0 transition-colors border-trivial border-opacity-0`}
				${isOpen&&tw`border-opacity-40`}
			}
		`} {...props} open>
			<summary ref={headerRef} className="header" onClick={accordionOpener}>
				{isValidElement(props.header) ? props.header : <h4>{props.header}</h4>}
				<span tw="flex-grow"/>
				<Icon tw="self-end transition-transform w-8" orientation={isOpen?180:0}>expand_less</Icon>
			</summary>
			<div ref={bodyRef} className="body">{isValidElement(props.body) ? props.body : <p>{props.body}</p>}</div>
		</details>
	);
}