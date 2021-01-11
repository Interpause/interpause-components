/**
 * @file Cards.
 * @author John-Henry Lim <hyphen@interpause.dev>
 */

import { ReactNode, ReactText, isValidElement } from 'react';
import tw, { styled } from 'twin.macro';
import { accentTypes, getAccent } from '../theme/baseTheme';
import { Button, LinkButton } from '../input/Button';

export type CardVariants = 'outline'|'filled';

export interface CardProps {
  type?: accentTypes;
  variant?: CardVariants;
}

export const Card = styled.div`
  ${({type='normal'}:CardProps) => getAccent(type)}
  ${tw`relative inline-flex flex-col justify-between text-left rounded overflow-x-hidden bg-opacity-10`}
  min-height: 30ch;
  width: 50ch;

  ${({variant='outline'}:CardProps) => ({
    outline:tw`bg-opacity-0 border-2`,
    filled:tw`shadow-md`,
  })[variant]}
`;

export const CardHeader = tw.div`order-1 p-1`;
export const CardBody = tw.div`order-2 flex-grow my-1 px-1 overflow-x-hidden overflow-y-auto`;
export const CardFooter = tw.div`order-3 border-t border-current p-1`;

export type SimpleCardProps = CardProps & {
  /** contents of CardHeader. If ReactText, <h4> will be used. */
  header?: ReactNode;
  /** contents of CardBody. If ReactText, <p> will be used. */
  body?: ReactNode;
  /** contents of CardFooter. If ReactText, <h6> will be used. */
  footer?: ReactNode;
  className?: string;
} & ({
  /** If provided, contents of footer will be wrapped as Button with this href. */
  href?: string;
  /** contents of footer button. */
  footer?: ReactText;
} | {
  /** If provided, contents of footer will be wrapped as Button with this function. */
  onClick?: ()=>void;
  /** contents of footer button. */
  footer?: ReactText;
});

export default function SimpleCard(props:SimpleCardProps){
  return <Card className={`${props.className} wrapper`} type={props.type} variant={props.variant}>
    <CardHeader className="header">
      {isValidElement(props.header)?props.header:<h4>{props.header}</h4>}
    </CardHeader>
    <CardBody className="body">
      {isValidElement(props.body)?props.body:<p>{props.body}</p>}
    </CardBody>
    <CardFooter className="footer">
      {(()=>{
        if('href' in props) return <LinkButton variant="text" href={props.href}>{props.footer}</LinkButton>;
        else if('onClick' in props) return <Button onClick={props.onClick}>{props.footer}</Button>;
        else if(isValidElement(props.footer)) return props.footer;
        else return <h6>{props.footer}</h6>;
      })()}
    </CardFooter>
  </Card>;
}