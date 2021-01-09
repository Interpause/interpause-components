/**
 * @file Base for SVG text effects.
 * @author John-Henry Lim <hyphen@interpause.dev>
 */
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { OrientableSVG } from "../utils/orientableSVG";

export interface styleState {
	height:number;
	width:number;
	font:string;
}

export interface BaseTextProps extends OrientableSVG { 
	text: string,
	styleStateHook:[styleState|undefined,Dispatch<SetStateAction<styleState|undefined>>]
}
/**
 * Base component for text with special SVG effects
 */
export function BaseTextWithEffect({orientation,text,children,styleStateHook,...props}:BaseTextProps){
	const [state,setState] = styleStateHook;
	const fontRef = useRef<any>(null);

	useEffect(() => {
		const fontElem = fontRef.current;
		if(fontElem == null) return;
		let measureSpan = document.createElement("span");
		measureSpan.style.font = getComputedStyle(fontElem).font;
		// ensure span never get clipped by being small, reset some parts of style to be consistent
		measureSpan.style.lineHeight = "normal";
		measureSpan.style.fontSize = "1px";
		measureSpan.style.position = "fixed";
		const font = measureSpan.style.font;
		measureSpan.innerText = text;
		document.documentElement.appendChild(measureSpan);
		const rect = measureSpan.getBoundingClientRect();
		measureSpan.remove();
		// aspect ratio of height to width should be constant no matter viewport size
		setState({
			height:rect.height,
			width:rect.width,
			font:font
		});
	},[text,props.className]);

	if(typeof state === "undefined") return <span ref={fontRef} className={props.className} style={{visibility:"hidden"}}></span>;

	return <svg ref={fontRef} viewBox={`0 0 ${state.width} ${state.height}`} transform={`rotate(${orientation??0} 0 0)`} {...props}>
		{children}
		<text x="50%" textAnchor="middle" dominantBaseline="text-before-edge" style={{font:state.font}} fill="url(#pattern)">{text}</text>
	</svg>;
}