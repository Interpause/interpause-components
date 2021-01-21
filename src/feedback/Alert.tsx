/**
 * @file Alerting alerts...
 * @author John-Henry Lim <hyphen@interpause.dev>
 */

import tw, { css } from 'twin.macro';
import { accentTypes, getAccent } from '../theme/baseTheme';
import React, { ComponentProps, ForwardedRef, forwardRef } from "react";
import { ICON, SvgIcon } from '../display/SvgIcon';

export interface AlertProps extends ComponentProps<'div'>{
	type?: accentTypes;
	/** If true, alert will be dismissable. */
	dismissable?: boolean;
	/** onClick function that will be passed to close button. Default just removes the Alert from the DOM. */
	onClick?: ()=>void;
}

/**
 * Alert boxes. For styling purposes:
 * - the span containing the text has `.body`
 * - the button for dismissing the alert has `.button`
 */
export const Alert = forwardRef(({type,dismissable,onClick,children,...props}:AlertProps,ref:ForwardedRef<any>) => {
	return (
		<div css={css`
			${getAccent(type??'info')}
			${tw`flex flex-row text-left flex-shrink-0 rounded border-2`}
		`}
		ref={ref}
		{...props}>
			<span tw="p-1" className="body">{children}</span>
			{dismissable&&
				<SvgIcon
					as="button"
					className="button"
					icon={ICON.cross}
					tw="flex-none w-4 mr-1 ml-auto self-stretch opacity-60 hocus:opacity-100"
					onClick={onClick??(e=>(e.target as HTMLElement).parentElement?.remove())}
				/>
			}
		</div>
	);
});