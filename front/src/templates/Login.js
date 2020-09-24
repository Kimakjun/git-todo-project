import '../../public/css/login.css'

export const createLogin = ()=>{
    return `
    <div class="loginContainer">
        <input type="email" name="email" id="email" placeholder="email"/>
        <input type="password" name="pw" id="pw" placeholder="password"/>
        <input type="button" class="LoginFormButton" id="loginButton" value="login">
        <input type="button" class="LoginFormButton" id="goToRegister" value="to to register">
    </div>
`
}