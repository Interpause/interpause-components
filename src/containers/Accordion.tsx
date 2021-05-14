/**
 * @file It doesn't play music.
 * @author John-Henry Lim <hyphen@interpause.dev>
 */

import { ReactNode, isValidElement, MouseEvent, useState, ComponentProps } from 'react';
import tw, { css } from 'twin.macro';
import { accentTypes, getAccent } from '../theme/baseTheme';
import { Icon } from '../display/Icon';
import { CollapsableDiv } from '../utils';

export type AccordionVariants = 'normal';

export interface AccordionProps extends ComponentProps<'details'>{
  type?: accentTypes;
	/** TODO: implement different variants for accordion */
	variant?: AccordionVariants;
	body?: ReactNode;
	header?: ReactNode;
}

/**
 * It is a accordion, what else could it be? For styling purposes:
 * - summary has `.header` applied
 * - the body has `.body` applied
 * - the button has `.button` applied
 */
export function Accordion({body, header, type, ...props}:AccordionProps){
	const [isOpen, setOpen] = useState(false);

	const accordionOpener = (e:MouseEvent) => {
		e.preventDefault();
		setOpen(!isOpen);
	};

	return (
		<details css={css`
			${isOpen&&getAccent(type??'primary')}
			${tw`relative text-left text-normal border-2 rounded transition-colors bg-opacity-0 -mb-0.5`}
			${isOpen&&tw`mb-1`}
			list-style: none;

			&>.header{
				${getAccent(type??'primary')}
				${tw`flex flex-row cursor-pointer w-full transition-colors outline-none p-2`}
				${!isOpen&&tw`text-normal bg-opacity-0 hover:bg-opacity-10 dark:hover:bg-opacity-40`}
				::-webkit-details-marker { display:none }
			}
			& .body{
				${tw`p-2`}
			}
			& .button{
				${tw`self-end transition-transform w-8`}
			}
		`} {...props} open>
			<summary className="header" onClick={accordionOpener}>
				{isValidElement(header) ? header : <h4>{header}</h4>}
				<span tw="flex-grow"/>
				<Icon className="button" orientation={isOpen?180:0}>expand_less</Icon>
			</summary>
			<CollapsableDiv className="body" open={isOpen}>{isValidElement(body) ? body : <p>{body}</p>}</CollapsableDiv>
		</details>
	);
}