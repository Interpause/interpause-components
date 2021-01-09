/**
 * @file better than the one provided by nextjs
 * @author John-Henry Lim <hyphen@interpause.dev>
 */

import { DetailedHTMLProps, ImgHTMLAttributes, useEffect, useRef } from "react";
import "twin.macro";

export interface LazyImageProps extends DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>{
	href?:string;
	/** "width height" */
	aspect_ratio:string;
	src:string;
}

export function LazyImage({src,aspect_ratio,...props}:LazyImageProps){
	const imgRef = useRef<HTMLImageElement>(null);
	useEffect(() => {
		setTimeout(()=>imgRef.current?.setAttribute("src",src),100);
	},[src])
	return <a href={props.href}>
		<img ref={imgRef} tw="inline h-full align-bottom" loading="lazy" src={`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${aspect_ratio}'%3E%3C/svg%3E`} {...props}/>
	</a>;
}