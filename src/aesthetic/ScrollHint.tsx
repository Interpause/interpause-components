/**
 * @file Animated SVG that hints user to scroll.
 * @author John-Henry Lim <hyphen@interpause.dev>
 */

import { OrientableSVG } from '../utils/orientableSVG';

/** Hardcoded style of stroke used in SVG. */
export const lineStyle = {
  stroke: 'currentColor',
  strokeWidth: 8,
  strokeLinecap: 'butt',
  fill: 'none',
} as const;

/**
 * Creates an animated arrow hinting the user to scroll in that direction.
 * @param orientation Takes either an Orientation or degrees clockwise relative to pointing down.
 */
export function ScrollHint({ orientation, ...props }: OrientableSVG) {
  return (
    <svg viewBox="0 0 100 160" transform={`rotate(${orientation ?? 0} 0 0)`} {...props}>
      <g>
        <polyline {...lineStyle} points="0,160 50,110 100,160"></polyline>
        <polyline {...lineStyle} points="0,110 50,60 100,110"></polyline>
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0 -5 ; 0 -55"
          calcMode="spline"
          keyTimes="0 ; 1"
          keySplines="0 0 0.5 1"
          dur="1s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0; 1 ; 0"
          calcMode="spline"
          keyTimes="0 ; 0.3 ; 1"
          keySplines="0.5 0 0.5 1 ; 0.5 0 0.5 1"
          dur="1s"
          repeatCount="indefinite"
        />
      </g>
    </svg>
  );
}
