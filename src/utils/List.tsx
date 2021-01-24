/**
 * @file Generic List to easily make animated lists of things. See Toast.tsx for example usage.
 * @author John-Henry Lim <hyphen@interpause.dev>
 */
import { createRef, Dispatch, ComponentProps, useReducer, ForwardRefExoticComponent, PropsWithoutRef, RefAttributes } from 'react';
import { SerializedStyles } from '@emotion/react';
import { Transition, TransitionGroup } from 'react-transition-group';

/** Reducer actions for List. */
export type ListAction<ItemType> =
  | {
      type: 'delAll';
    }
  | {
      type: 'delItem';
      id: string;
    }
  | {
      type: 'addItem';
      id: string;
      data: ItemType;
    };

/** Type of state used in reducer. */
export type ListState<ItemType> = {
  [id: string]: ItemType;
};

/** List reducer used to add and remove items. */
export const useListReducer = <ItemType,>() =>
  useReducer((state: ListState<ItemType>, action: ListAction<ItemType>) => {
    switch (action.type) {
      case 'addItem':
        return { ...state, [action.id]: action.data };
      case 'delItem':
        const { [action.id]: removed, ...rest } = state;
        return rest;
      case 'delAll':
        return {};
      default:
        console.error(`Invalid action given to listReducer: ${action}`);
        return state;
    }
  }, {});

/** 
 * Properties required to animate List items. When first added, items are briefly in the `exited` state before shifting to `entering`. Hence, initial style should be in `exited`. This is possible because when the item actually exits, it skips the `exited` state.
 * 
 * @note timeout.appear seems to do nothing & defaults to timeout.enter anyways.
 * @note timeout.enter is how long it stays in entering state.
 * @note timeout.exit is how long it stays in exiting state.
 */
export interface AnimProps {
  timeout: number | { enter?: number; exit?: number; appear?: number };
  styles: {
    [state:string]:SerializedStyles;
  };
}

export interface ListProps<ItemType> extends ComponentProps<'div'> {
  /** Access to the List reducer and state. */
  reducerHook: [ListState<ItemType>, Dispatch<ListAction<ItemType>>];
  /** Component used as the List item. Should forward ref using react.ForwardRef. */
  ListItemComponent: ForwardRefExoticComponent<PropsWithoutRef<ListItemProps<ItemType>> & RefAttributes<any>>;
  /** Properties used to animate List items. */
  AnimProps?: AnimProps;
}

export type ListItemProps<ItemType> = {
  /** Used to remove the List item via a button in that item for example. */
  dispatch: Dispatch<ListAction<ItemType>>;
  /** Used to refer to the List item when dispatching to the store. */
  id: string;
  /** Passes the transition state to the ListItem if handling animation itself. */
  animState: string;
} & ItemType;

/**
 * List component. See Toast.tsx for usage example.
 */
export function List<ItemType>({ reducerHook, ListItemComponent, AnimProps, ...props }: ListProps<ItemType>) {
  const [state, dispatch] = reducerHook;
  return (
    <div {...props}>
      <TransitionGroup component={null}>
        {Object.entries(state).map(([key, item]) => {
          const itemRef = createRef<any>();
          return (
            <Transition nodeRef={itemRef} key={key} timeout={AnimProps?.timeout ?? 0}>
              {(animState:string) => (
                <ListItemComponent
                  ref={itemRef}
                  {...item as any}
                  dispatch={dispatch}
                  css={AnimProps && AnimProps.styles[animState]}
                  animState={animState}
                  id={key}
                />
              )}
            </Transition>
          );
        })}
      </TransitionGroup>
      {props.children}
    </div>
  );
}
