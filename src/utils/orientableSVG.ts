import { ComponentProps } from 'react';

/** All SVG components are designed oriented upwards. */
export enum Orientation {
  up = 0,
  right = 90,
  down = 180,
  left = 270,
}

export interface OrientableSVG extends ComponentProps<'svg'> {
  /** Rotation of the SVG component in degrees. */
  orientation?: Orientation | number;
}
