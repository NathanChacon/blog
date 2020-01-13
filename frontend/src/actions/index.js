export const successLogin = (userName,userRol) => {
    return {type:'SUCCESS_LOGIN',userName: userName,userRol:userRol}
}

export const failLogin = () => {
    return {type:'FAIL_LOGIN'}
}