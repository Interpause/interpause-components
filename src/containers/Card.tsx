/**
 * @file Everything about Cards.
 * @author John-Henry Lim <hyphen@interpause.dev>
 */

import { ReactNode, ReactText, isValidElement } from 'react';
import tw, { styled } from 'twin.macro';
import { accentTypes, getAccent } from '../theme/baseTheme';
import { Button, LinkButton } from '../input/Button';

export type CardVariants = 'outline' | 'filled';

export interface CardProps {
  type?: accentTypes;
  variant?: CardVariants;
}

/** Card component that is a styled div. Accepts CardProps. */
export const Card = styled.div`
  ${({ type = 'normal' }: CardProps) => getAccent(type)}
  ${tw`relative inline-flex flex-col justify-between text-left rounded overflow-x-hidden bg-opacity-10`}
  min-height: 30ch;
  width: 50ch;

  ${({ variant = 'outline' }: CardProps) =>
    ({
      outline: tw`bg-opacity-0 border-2`,
      filled: tw`shadow-md`,
    }[variant])}
`;

/** Styled div that should be wrapped in Card. */
export const CardHeader = tw.div`order-1 p-1`;
/** Styled div that should be wrapped in Card. */
export const CardBody = tw.div`order-2 flex-grow my-1 px-1 overflow-x-hidden overflow-y-auto`;
/** Styled div that should be wrapped in Card. */
export const CardFooter = tw.div`order-3 p-1`;

export type SimpleCardProps = CardProps & {
  /** Contents of CardHeader. If ReactText, h4 will be used. */
  header?: ReactNode;
  /** Contents of CardBody. If ReactText, p will be used. */
  body?: ReactNode;
  /** Contents of CardFooter. If ReactText, h6 will be used. */
  footer?: ReactNode;
  className?: string;
} & (
    | {
        /** If provided, contents of footer will be wrapped as Button with this href. */
        href?: string;
        /** Contents of footer button. */
        footer?: ReactText;
      }
    | {
        /** If provided, contents of footer will be wrapped as Button with this function. */
        onClick?: () => void;
        /** Contents of footer button. */
        footer?: ReactText;
      }
  );

/**
 * Easily make a complete Card. For styling purposes:
 * - CardHeader has `.header`
 * - CardBody has `.body`
 * - CardFooter has `.footer`
 */
export function SimpleCard(props: SimpleCardProps) {
  return (
    <Card className={props.className} type={props.type} variant={props.variant}>
      <CardHeader className="header">
        {isValidElement(props.header) ? props.header : <h4>{props.header}</h4>}
      </CardHeader>
      <CardBody className="body">{isValidElement(props.body) ? props.body : <p>{props.body}</p>}</CardBody>
      <CardFooter className="footer">
        {(() => {
          if (isValidElement(props.footer)) return props.footer;
          else if ('href' in props && props.href)
            return (
              <LinkButton variant="text" href={props.href}>
                {props.footer}
              </LinkButton>
            );
          else if ('onClick' in props && props.onClick) return <Button onClick={props.onClick}>{props.footer}</Button>;
          else return <h6>{props.footer}</h6>;
        })()}
      </CardFooter>
    </Card>
  );
}
