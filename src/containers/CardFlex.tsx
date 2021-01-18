/**
 * @file Flex container for Cards.
 * @author John-Henry Lim <hyphen@interpause.dev>
 */

import { ReactNode } from 'react';
import tw, { styled } from 'twin.macro';
import { CardProps, SimpleCard } from './Card';

export type CardData = {
  /** Title of card. */
  title: ReactNode;
  /** Text in card. */
  body: ReactNode;
  /** Link to redirect to when card is clicked. */
  href?: string;
};

/** Apply .card to Card elements in here in order for CardFlex to work correctly. See code for SimpleCardFlex as example. Is actually a styled div. */
const CardFlex = styled.div`
  ${tw`flex flex-col flex-wrap items-center justify-center sm:(max-w-screen-md flex-row)`}
  &>.card {
    ${tw`m-4 w-11/12 md:(w-5/12 h-64) flex-auto`}
  }
`;

export interface SimpleCardFlexProps extends CardProps {
  cards: CardData[];
  className?: string;
}
/** Easily make a CardFlex with the Cards already added to it. */
export function SimpleCardFlex({ cards, ...props }: SimpleCardFlexProps) {
  return (
    <CardFlex className={props.className}>
      {cards.map((card, i) => (
        <SimpleCard header={card.title} body={card.body} type={props.type} variant={props.variant} footer="click me" href={card.href} className="card" key={i} />
      ))}
    </CardFlex>
  );
}
