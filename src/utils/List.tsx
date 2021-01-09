/**
 * @file Magic stuff to easily make animated lists of things. See Toast.tsx for example usage.
 * @author John-Henry Lim <hyphen@interpause.dev>
 */
import { createRef, Dispatch, ForwardedRef, forwardRef, HTMLProps, useReducer } from "react";
import "twin.macro";
import { SerializedStyles } from "@emotion/react";
import { Transition, TransitionGroup } from 'react-transition-group';

export type ListAction<ItemType> = {
	type:"delAll";
} | {
	type:"delItem";
	id:string;
} | {
	type:"addItem";
	id:string;
	data:ItemType;
}

export type ListState<ItemType> = {
	[id:string]:ItemType
};

export const useListReducer = <ItemType,>() => useReducer((state:ListState<ItemType>, action:ListAction<ItemType>) => {
	switch(action.type){
		case "addItem":
			return {...state,[action.id]:action.data};
		case "delItem":
			const {[action.id]:removed,...rest} = state;
			return rest;
		case "delAll":
			return {};
		default:
			console.error(`Invalid action given to listReducer: ${action}`);
			return state;
	}
},{});

export interface animProps {
	timeout: number | { enter?: number, exit?: number, appear?: number };
	styles: {
		[key:string]: SerializedStyles;
	}
}

export interface ListProps<ItemType> extends HTMLProps<HTMLDivElement>{
	reducerHook:[ListState<ItemType>,Dispatch<ListAction<ItemType>>],
	/** listItemComponent will be wrapped by React.ForwardRef */
	listItemComponent:(props:ListItemProps<ItemType>,ref:ForwardedRef<HTMLDivElement>) => JSX.Element,
	animProps?:animProps
}

export type ListItemProps<ItemType> = {
	dispatch:Dispatch<ListAction<ItemType>>;
	id:string;
} & ItemType;


export function List<ItemType>({reducerHook,listItemComponent,animProps,...props}:ListProps<ItemType>){
	const [state, dispatch] = reducerHook;
	const Item = forwardRef(listItemComponent);
	return <div {...props}>
		<TransitionGroup component={null}>
			{Object.entries(state).map(([key,item]) => {
				const itemRef = createRef<HTMLDivElement>();
				return <Transition nodeRef={itemRef} key={key}
					timeout={animProps?.timeout??0}
				>
					{animState =>
						//@ts-ignore some type-checking bug that expectedly comes around when it gets so complex
						<Item ref={itemRef} {...item} dispatch={dispatch} css={animProps&&animProps.styles[animState]} id={key}/>
					}
				</Transition>
			})}
		</TransitionGroup>
		{props.children}
	</div>;
}