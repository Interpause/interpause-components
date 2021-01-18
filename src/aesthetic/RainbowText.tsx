/**
 * @file Rainbow text effect cause why not?
 * @author John-Henry Lim <hyphen@interpause.dev>
 */

import { ReactText, useState } from 'react';
import { BaseTextProps, styleState, BaseTextWithEffect } from './TextEffect';

export interface RainbowTextProps extends Omit<BaseTextProps, 'text' | 'styleStateHook'>{
  children: ReactText;
  /** Duration of animation in seconds. */
  duration?: number;
  /** Number of color stops in rainbow gradient, increase to make more accurate gradient. */
  numStops?: number;
  /** Saturation of rainbow gradient (HSL colorspace). */
  saturation?: number;
  /** Luminosity of rainbow gradient (HSL colorspace). */
  luminosity?: number;
  /** SVG path of pattern. */
  pattern?: string;
  /** Height of pattern viewport. */
  pHeight?: number;
  /** Width of pattern viewport. */
  pWidth?: number;
  /** Size of pattern relative to text in percent. */
  pSize?: number;
  /** Color of pattern. */
  pFill?: string;
  /** Width of rect used in pattern, should be larger than 100% to transition smoothly. Default allows smooth tessellation. */
  bgWidth?: number;
  /** Height of rect used in pattern, just leave at 100%. */
  bgHeight?: number;
}

/** Default config for RainbowText. */
export const DefaultRainbowTextConfig = {
  duration: 20,
  numStops: 21,
  saturation: 100,
  luminosity: 60,
  pattern:
    'M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z',
  pHeight: 49,
  pWidth: 28,
  pSize: 50,
  pFill: '#fff',
  bgWidth: (100 * 49) / 28,
  bgHeight: 100,
} as const;

/** rainbow text cause why not. */
export function RainbowText({ children, ...props }: RainbowTextProps) {
  const [state, setState] = useState<styleState>();
  const conf = { ...DefaultRainbowTextConfig, ...props };
  const {
    duration,
    numStops: N,
    saturation: S,
    luminosity: L,
    bgWidth,
    bgHeight,
    pattern,
    pHeight,
    pWidth,
    pSize,
    pFill,
  } = conf;
  const text = children.toString();

  return (
    <BaseTextWithEffect text={text} styleStateHook={[state, setState]} {...props}>
      {state && (
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            {Array.from(Array(N).keys()).map((n) => (
              <stop
                offset={`${(100 * n) / (N - 1)}%`}
                stopColor={`hsl(${(360 * n) / (N - 1)}deg,${S}%,${L}%)`}
                key={n}
              />
            ))}
          </linearGradient>
          <pattern
            id="hex"
            viewBox={`0 0 ${pWidth} ${pHeight}`}
            width={`${((((state.height * bgHeight) / (state.width * bgWidth)) * pWidth) / pHeight) * pSize}%`}
            height={`${pSize}%`}
          >
            <path fill={pFill} d={pattern} />
          </pattern>

          <pattern
            id="pattern"
            x="0"
            y="0"
            width={`${bgWidth * 2}%`}
            height={`${bgHeight}%`}
            patternUnits="userSpaceOnUse"
          >
            <rect x="0" y="0" width={`${bgWidth}%`} height="100%" fill="url(#gradient)">
              <animate
                attributeType="XML"
                attributeName="x"
                from="0"
                to={`${bgWidth}%`}
                dur={duration}
                repeatCount="indefinite"
              />
            </rect>
            <rect x={`${-bgWidth}%`} y="0" width={`${bgWidth}%`} height="100%" fill="url(#gradient)">
              <animate
                attributeType="XML"
                attributeName="x"
                from={`${-bgWidth}%`}
                to="0"
                dur={duration}
                repeatCount="indefinite"
              />
            </rect>
            <rect x="0" y="0" width={`${bgWidth}%`} height="100%" fill="url(#hex)">
              <animate
                attributeType="XML"
                attributeName="x"
                from="0"
                to={`${bgWidth}%`}
                dur={(duration * 2) / 3}
                repeatCount="indefinite"
              />
            </rect>
            <rect x={`${-bgWidth}%`} y="0" width={`${bgWidth}%`} height="100%" fill="url(#hex)">
              <animate
                attributeType="XML"
                attributeName="x"
                from={`${-bgWidth}%`}
                to="0"
                dur={(duration * 2) / 3}
                repeatCount="indefinite"
              />
            </rect>
          </pattern>
        </defs>
      )}
    </BaseTextWithEffect>
  );
}
