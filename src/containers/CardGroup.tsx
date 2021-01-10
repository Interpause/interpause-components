/**
 * @file Ways to hold cards.
 * @author John-Henry Lim <hyphen@interpause.dev>
 */

import { ReactNode } from "react";
import tw, { styled } from "twin.macro";
import SimpleCard from "./Card";

export type CardData = {
  /** title of card */
  title: ReactNode;
  /** text in card */
  body: ReactNode;
  /** link to redirect to when card is clicked */
  href?: string;
};

/** Apply .card to Card elements in here in order for CardFlex to work correctly. */
const CardFlex = styled.div`
	${tw`flex flex-col flex-wrap items-center justify-center sm:(max-w-screen-md flex-row)`}
	&>.card { ${tw`m-4 w-11/12 md:(w-5/12 h-64) flex-auto`} }
`;

export interface CardFlexAutoProps {
  cards: CardData[];
	className?: string;
}
/** Populates a list of flex cards. */
export function CardFlexAuto({ cards, ...props }: CardFlexAutoProps) {
  return <CardFlex className={props.className}>
		{cards.map((card, i) => (
			<SimpleCard header={card.title} body={card.body} footer="click me" href={card.href} className="card" key={i} />
		))}
	</CardFlex>;
}