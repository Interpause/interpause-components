/**
 * @file lag issue once exceeding 10 toasts. no max toast limit/fade out effect but I don't think I will need to implement that.
 * @author John-Henry Lim <hyphen@interpause.dev>
 */
import { createContext, useContext, Dispatch, useEffect, HTMLProps, ForwardedRef } from "react";
import tw, { css } from "twin.macro";
import { colorTypes } from "../theme/baseTheme";
import { ListItemProps, useListReducer, ListAction, List, ListProps } from "../utils/List";
import { Icon, ICON } from "../display/Icon";

export interface ToastData extends HTMLProps<HTMLDivElement>{
	type:colorTypes;
	duration:number;
}
export const DefaultToastData = {
	type:"normal",
	duration:10000
} as const;

export const ToastContext = createContext<Dispatch<ListAction<ToastData>>>(()=>console.error("ToastContext was not provided!"));

export const getToastStyle = (type:string) => css`
	${tw`relative flex flex-row rounded border-2 ml-auto lg:max-w-2xl motion-reduce:transition-none overflow-hidden mt-1`}

	transition: opacity 300ms cubic-bezier(0.4, 0, 0.2, 1), left 200ms cubic-bezier(0.4, 0, 0.2, 1), max-height 300ms cubic-bezier(0.4, 0, 0.2, 1);
	color:var(--color-${type});
	background-color:var(--color-${type}-soft);
	border-color:var(--color-${type}-hard);
`;

/**
 * styles.exit never shows up as component is removed at that stage
 * appear seems to do nothing & defaults to enter
 * enter is how long it stays in entering state
 * exit is how long it stays in exiting state
 * idc & will just do whatever I want if it gets the anim correct
 */
export const DefaultToastAnim = {
	timeout: { enter: 1, exit: 400 },
	styles: {
		entering:css`${tw`opacity-0 -left-1/2 max-h-0`}`,
		entered:css`${tw`opacity-100 left-0 max-h-20`}`,
		exiting:css`${tw`opacity-0 left-1/2 max-h-0 mt-0`}`
	}
} as const;

export function Toast({type,dispatch,...props}:ListItemProps<ToastData>,ref:ForwardedRef<HTMLDivElement>){
	const delToast = () => dispatch({type:"delItem",id:props.id});
	useEffect(()=>{
		const id = setTimeout(delToast,props.duration);
		return () => clearTimeout(id);
	},[props.duration]);
	return <div ref={ref} css={getToastStyle(type)} {...props}>
		<span tw="p-1">{props.children}</span>
		<Icon as="button" icon={ICON.cross} tw="flex-none w-4 mr-1 ml-2 self-stretch opacity-60 hocus:opacity-100" onClick={delToast}/>
	</div>;
}

export function ToastWrapper(props:Omit<ListProps<ToastData>,"listItemComponent"|"reducerHook">){
	const [state, dispatch] = useListReducer<ToastData>();
	return <ToastContext.Provider value={dispatch}>
		<List<ToastData> 
			tw="fixed flex flex-col justify-end inset-x-2 bottom-2 lg:left-auto z-100"
			animProps={DefaultToastAnim}
			listItemComponent={Toast}
			reducerHook={[state,dispatch]}
			{...props}
		>{""}</List>
		{props.children}
	</ToastContext.Provider>;
}

export function useToaster(){
	const dispatch = useContext(ToastContext);
	return (text:string,conf?:Partial<ToastData>) => dispatch({
		type:"addItem",
		id:`${Date.now()}`,
		data:{...DefaultToastData,...conf,children:text}
	});
}