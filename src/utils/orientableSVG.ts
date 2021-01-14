import { SVGProps } from 'react';

/** All SVG components are designed oriented upwards. */
export enum Orientation {
  up = 0,
  right = 90,
  down = 180,
  left = 270,
}

export interface OrientableSVG extends SVGProps<SVGSVGElement> {
  orientation?: Orientation | number;
}
