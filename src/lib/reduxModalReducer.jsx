
export default function reduxModal(state = {options:{}}, action) {
    const pl = action.payload;
    switch (action.type) {
        case 'REDUX_MODAL_OPEN':
            return {...state, open:true, content:pl.content, options:pl.options?pl.options:{}};
        case 'REDUX_MODAL_CLOSE':
            return {...state, open:false, error:''};
        case 'REDUX_MODAL_PROGRESS':
            return {...state, progress:pl};
        case 'REDUX_MODAL_ERROR':
            return {...state, error:pl};
        default:
            return state;
    }
}