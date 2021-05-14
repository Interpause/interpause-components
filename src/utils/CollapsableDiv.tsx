/**
 * @file Might be useful for things other than the Accordion.
 * @author John-Henry Lim <hyphen@interpause.dev>
 */

import { useState, useEffect, useRef, ComponentProps } from 'react';
import { css } from 'twin.macro';

export interface CollapsableDivProps extends ComponentProps<'div'>{
  open?: boolean;
}

//TODO: what about animating via max-width? CollapsableDiv could be renamed to Drawer.
/** A div that is animated when opening and closing via max-height. */
export function CollapsableDiv({children, open=false, ...props}:CollapsableDivProps){
	const [height, setHeight] = useState('0px');
	const bodyRef = useRef<HTMLDivElement>(null);

	const calculateHeight = () => {
		const bodyElem = bodyRef.current;
		if(bodyElem == null) return;
		const bodyRect = bodyElem.getBoundingClientRect();
		setHeight(`${bodyRect.height}px`);
	}

	useEffect(() => {		
		calculateHeight();
		window.addEventListener('resize', calculateHeight);
		return ()=>window.removeEventListener('resize', calculateHeight);
		
  });

	return (
		<div css={css`
			max-height: ${open?height:'0px'};
			transition: max-height 200ms cubic-bezier(0.4, 0, 0.2, 1);
			overflow: hidden;
		`}>
			<div ref={bodyRef} {...props}>
				{children}
			</div>
		</div>
	);
}