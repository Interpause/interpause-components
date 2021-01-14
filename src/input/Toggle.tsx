/**
 * @file Everything about Toggles.
 * @author John-Henry Lim <hyphen@interpause.dev>
 */
import { Dispatch, SetStateAction, HTMLProps, useRef, useEffect } from 'react';
import tw, { css, styled } from 'twin.macro';
import { StyledComponent } from '@emotion/styled';

/** Default style used for Toggle. */
export const defaultStyle = css`
  .slider,
  .bg {
    ${tw`rounded-sm`}
  }
  .slider {
    ${tw`bg-white`}
  }
  .bg {
    ${tw`bg-trivial`}
  }
  &.on .bg {
    ${tw`bg-primary bg-opacity-100`}
  }
`;

/** Internal styled label used for Toggle. */
export const ToggleWrapper = styled.label`
  ${({ height }: { height: number }) =>
    css`
      --toggle-height: ${height}rem;
    `}
  ${tw`select-none`}

	>input[type="checkbox"] {
    ${tw`opacity-0 h-0 w-0`}
  }
  > .label {
    ${tw`align-middle inline`}
    font-size:calc(var(--toggle-height)*3/4);
  }
  > .wrapper {
    ${tw`relative inline-block align-middle transition-colors`}
    height:var(--toggle-height);
    width: calc(var(--toggle-height) * 2);

    > .slider {
      ${tw`absolute transition-transform`}
      height:calc(var(--toggle-height)*3/4);
      width: calc(var(--toggle-height) * 3 / 4);
      left: calc(var(--toggle-height) * 1 / 8);
      bottom: calc(var(--toggle-height) * 1 / 8);
    }
    > .bg {
      ${tw`absolute inset-0`}
    }
  }
  &.on .slider {
    ${tw`transform-gpu`}
    --tw-translate-x:var(--toggle-height);
  }
  &:hover .bg {
    ${css`
      box-shadow: 0 0 0.1em 0.05em rgba(0, 0, 0, 0.2) inset;
    `}
  }
`;

export interface ToggleProps extends HTMLProps<HTMLLabelElement> {
  /** Array returned by React.useState(true|false). */
  toggleHook: [boolean, Dispatch<SetStateAction<boolean>>];
  /** Text label for toggle. */
  label?: string;
  /** Height of component in rem used for scaling. */
  height?: number;
  /** TODO: implement. */
  variant?: never;
  /** TODO: implement. */
  type?: never;
}
/** Toggle component. Look at defaultStyle for how to customize the toggle using css prop. */
export function Toggle({ toggleHook: [isOn, setOn], label, height = 2, ...props }: ToggleProps) {
  const tRef = useRef<HTMLLabelElement>(null);
  useEffect(() => tRef.current?.classList[isOn ? 'add' : 'remove']('on'), [isOn]);
  return (
    <ToggleWrapper ref={tRef} height={height} css={defaultStyle} {...(props as StyledComponent<HTMLLabelElement>)}>
      <p className="label">{label ?? ''} </p>
      <input type="checkbox" checked={isOn} onClick={() => setOn(!isOn)} readOnly></input>
      <div className="wrapper">
        <span className="bg" />
        <span className="slider" />
      </div>
    </ToggleWrapper>
  );
}
