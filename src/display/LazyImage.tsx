/**
 * @file Lazy loaded image using SVG as substitution to prevent reflow.
 * @author John-Henry Lim <hyphen@interpause.dev>
 */

import { ComponentProps, useEffect, useRef } from 'react';
import 'twin.macro';

export interface LazyImageProps extends ComponentProps<'img'> {
  href?: string;
  /** String that is `${width} ${height}`. */
  aspectRatio: string;
  src: string;
}

/** Lazy loaded image using SVG as substitution to prevent reflow. */
export function LazyImage({ src, aspectRatio, ...props }: LazyImageProps) {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => imgRef.current?.setAttribute('src', src), [src]);

  const img = <img
    ref={imgRef}
    tw="inline align-bottom"
    loading="lazy"
    src={`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${aspectRatio}'%3E%3C/svg%3E`}
    {...props}
  />;

  if(props.href) return <a href={props.href}>{img}</a>;
  return img;
}
