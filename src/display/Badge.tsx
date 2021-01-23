/**
 * @file Using twin.macro, this is trivial to make... so why did I make a dedicated component? Cause its in the list.
 * @author John-Henry Lim <hyphen@interpause.dev>
 */

import tw, { css, styled } from 'twin.macro';
import { accentTypes, getAccent } from '../theme';

export interface BadgeProps {
	variant?: 'filled'|'outline';
	type?: accentTypes;
}

/** why does this exist. why did i make this. using twin.macro its so short */
export const Badge = styled.span`
	${({type}:BadgeProps) => getAccent(type??'primary')}
	${tw`bg-opacity-90 text-white px-1 py-0.5 mx-1 rounded`}
`;