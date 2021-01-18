/**
 * @file Lazy loaded image using SVG as substitution to prevent reflow.
 * @author John-Henry Lim <hyphen@interpause.dev>
 */

import { DetailedHTMLProps, ImgHTMLAttributes, useEffect, useRef } from 'react';
import 'twin.macro';

export interface LazyImageProps extends DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
  href?: string;
  /** String that is `${width} ${height}`. */
  aspectRatio: string;
  src: string;
}

/** Lazy loaded image using SVG as substitution to prevent reflow. */
export function LazyImage({ src, aspectRatio, ...props }: LazyImageProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    setTimeout(() => imgRef.current?.setAttribute('src', src), 100);
  }, [src]);
  return (
    <a href={props.href}>
      <img
        ref={imgRef}
        tw="inline h-full align-bottom"
        loading="lazy"
        src={`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${aspectRatio}'%3E%3C/svg%3E`}
        {...props}
      />
    </a>
  );
}
