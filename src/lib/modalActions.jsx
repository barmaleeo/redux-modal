
export const REDUX_MODAL_OPEN       = 'REDUX_MODAL_OPEN';
export const REDUX_MODAL_CLOSE      = 'REDUX_MODAL_CLOSE';
export const REDUX_MODAL_PROGRESS   = 'REDUX_MODAL_PROGRESS';
export const REDUX_MODAL_ERROR      = 'REDUX_MODAL_ERROR';

export function open(content, options){
    return {type: REDUX_MODAL_OPEN, payload:{content:content, options:options}}
}
export function close(){
    return {type:REDUX_MODAL_CLOSE}
}
export function progress(value){
    return {type:REDUX_MODAL_PROGRESS, payload:value}
}
export function error(value){
    return {type:REDUX_MODAL_ERROR, payload:value}
}