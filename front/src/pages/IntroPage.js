import Header from '../components/Header';
import axios from 'axios';
import '../../public/css/login.css'
import {$el,$new} from '../util/dom';
import {postData} from '../util/api';

class IntroPage{

    constructor({root}){

        
        this.root = root;
        this.header = new Header();
        this.container = $new('div', 'mainContainer');
        this.create();
        this.addEvent();
        this.render();
    }


    create(){

        this.container.innerHTML = `

            <div class="loginContainer">
                <input type="email" name="email" id="email" placeholder="email"/>
                <input type="password" name="pw" id="pw" placeholder="password"/>
                <input type="button" class="LoginFormButton" id="loginButton" value="login">
                <input type="button" class="LoginFormButton" id="goToRegister" value="register">
            </div>
        `

    }

    addEvent(){

        const button = $el('#loginButton', this.container);
        button.addEventListener('click',async()=>{
            const email = $el('#email', this.container).value;
            const password = $el('#pw', this.container).value;
            try{
                const result = await postData('/auth/login', {email, password});
                window.location.href = '/';
            }catch(err){
                alert('invalid input');
            }


        });
        // button.addEventListener('click', ()=>{
        //     console.log('test');
        // })

    }

    render(){


        this.root.appendChild(this.header.get());
        this.root.appendChild(this.container);

    }

}




// function IntroPage(){

//     // login 되어있는지, 안되어있는지 판단..
//     // event binding 은 어떻게 할것인지..
//     // css 는 어떻게 연결할 것 인지..

//     const email = '초기값1';
//     const value = '초기값2';
//     const div = document.createElement('div');


//     div.innerHTML += `  
//         <div class="loginContainer">
//             <p>로그인 페이지</p><br/>
//             <input type="email" id="email" name="email" placeholder="email" value=${email}/><br/>
//             <input type="password" id="password" name="password" placeholder="password" value=${value}/><br/>
//             <button class="button loginButton">login</button>
//             <button class="button logoutButton">logout</button>
//         </div>
//     `
    
//     const loginButton = div.querySelector('.loginButton');
//     const logoutButton = div.querySelector('.logoutButton');

//     const emailInput = div.querySelector('#email');
//     const pwInput = div.querySelector('#password');

//     loginButton.addEventListener('click', async()=>{
//         console.log(emailInput.value, pwInput.value);
//         const result = await axios.post('/api/v1/auth/login', {email: emailInput.value, password: pwInput.value});
//         console.log(result.message);
//     })

//     logoutButton.addEventListener('click', async()=>{
//         // window.location.href = '/';
//         await axios.get('/api/v1/auth/logout');
//     })


//     return div;

// }

export default IntroPage;