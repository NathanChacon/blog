import {createStore} from 'redux'

const initialState = {
    isLogged: false,
    userName: false,
    userRole:false
}


const rootReduce = (state = initialState,action) => {
    switch (action.type){
        case 'SUCCESS_LOGIN':
            return {
                ...state,
                isLogged: true,
                userName: action.userName,
                userRol: action.userRol
            }
        case 'FAIL_LOGIN':
            return {
                ...state,
                isLogged: false,
                userName:false,
                userRol:false
            }
        default:
            return state
    }
}

export default createStore(rootReduce)