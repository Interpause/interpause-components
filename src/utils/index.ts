export * from './deviceOrientation';
export * from './List';
export * from './orientableSVG';
export function rem2px(rem:number){
	return rem*parseFloat(getComputedStyle(document.documentElement).fontSize);
}