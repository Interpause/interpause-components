/**
 * @file Everything about Toggles.
 * @author John-Henry Lim <hyphen@interpause.dev>
 */
import { Dispatch, SetStateAction, ComponentProps } from 'react';
import tw, { css, styled } from 'twin.macro';

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
  ${tw`select-none cursor-pointer`}

	>input[type="checkbox"] {
    ${tw`opacity-0 h-0 w-0`}
  }
  > .label {
    ${tw`align-middle inline transition-colors`}
    font-size:calc(var(--toggle-height)*3/4);
  }
  > .wrapper {
    ${tw`relative inline-block align-middle transition-colors`}
    height:var(--toggle-height);
    width: calc(var(--toggle-height) * 2);

    > .slider {
      ${tw`absolute transition`}
      height:calc(var(--toggle-height)*3/4);
      width: calc(var(--toggle-height) * 3 / 4);
      left: calc(var(--toggle-height) * 1 / 8);
      bottom: calc(var(--toggle-height) * 1 / 8);
    }
    > .bg {
      ${tw`absolute inset-0 transition-colors`}
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

export interface ToggleProps extends ComponentProps<'label'> {
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
/** Toggle component. Provides classes for styling purposes, see example.
 * @example
 * ```jsx
 * css`
 *   .slider,
 *   .bg {
 *     ${tw`rounded-sm`}
 *   }
 *   .slider {
 *     ${tw`bg-white`}
 *   }
 *   .bg {
 *     ${tw`bg-trivial`}
 *   }
 *   &.on .bg {
 *     ${tw`bg-primary bg-opacity-100`}
 *   }
 * `;
 * ```
 */
export function Toggle({ toggleHook: [isOn, setOn], label, height = 2, className, ...props }: ToggleProps) {
  return (
    <ToggleWrapper height={height} css={defaultStyle} className={`${className} ${isOn&&'on'}`} {...props}>
      <p className="label">{label ?? ''} </p>
      <input type="checkbox" checked={isOn} onChange={() => setOn(!isOn)}></input>
      <div className="wrapper">
        <span className="bg" />
        <span className="slider" />
      </div>
    </ToggleWrapper>
  );
}
