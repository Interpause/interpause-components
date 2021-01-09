/**
 * @file Primitive card components.
 * @author John-Henry Lim <hyphen@interpause.dev>
 */
import { HTMLProps, ReactNode } from 'react';
import tw, { styled } from 'twin.macro';
import { StyledComponent } from '@emotion/styled';

export type CardData = HTMLProps<HTMLElement> & {
	/** title of card */
	title:ReactNode;
	/** text in card */
	body:ReactNode;
	/** link to redirect to when card is clicked */
	href?:string;
}

export const Card = styled.div`
	${tw`flex-auto rounded border-2 text-left overflow-hidden transition-colors m-4 p-6 w-11/12 sm:(w-5/12 h-64)`}
	>.header{ ${tw`mb-4 text-2xl`} }
	>.body{ ${tw`text-lg`} }
`;

export const LinkCard = styled(Card)`
	${tw`hocus:(text-blue-400 border-blue-400)`}
	>.header{ ${tw`text-blue-400`} }
`.withComponent("a");

//TODO generalize this further. Make it a wrapper. Needed for Github Card that will be created in a composition manner.
/** Creates a flex card. */
export function BasicCard({title,body,...props}:CardData){
	const CardUsed = typeof props.href === "undefined"?Card:LinkCard;
	return <CardUsed {...props as StyledComponent<HTMLAnchorElement|HTMLDivElement>}>
		<h3 className="header">{title}</h3>
		<p className="body">{body}</p>
	</CardUsed>;
}

export interface CardFlexProps extends HTMLProps<HTMLDivElement>{ 
	cards: CardData[],
	cardProps?: HTMLProps<HTMLElement>
}
/** Populates a list of flex cards. */
export function CardFlex({cards,cardProps,...props}:CardFlexProps){
	return <div tw="flex flex-col flex-wrap items-center justify-center sm:(max-w-screen-md flex-row)" {...props}>
		{cards.map((card,i) => <BasicCard {...card} {...cardProps} key={i}/>)}
	</div>;
}