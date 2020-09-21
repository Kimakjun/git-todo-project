import Header from '../components/Header';
import {$el,$new} from '../util/dom';
import {postData} from '../util/api';
import {push} from '../util/link';
import '../../public/css/login.css'

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
                <input type="button" class="LoginFormButton" id="goToRegister" value="to to register">
            </div>
        `
    }


    addEvent(){
        const button = $el('#loginButton', this.container);
        const registerButton = $el('#goToRegister', this.container);
        
        button.addEventListener('click',async()=>{
            const email = $el('#email', this.container).value;
            const password = $el('#pw', this.container).value;
            try{
                await postData('/auth/login', {email, password});
                push('main');
            }catch(err){
                alert('check your inputs');
            }
        });

        registerButton.addEventListener('click', ()=>{
            push('register');
        })
       

    }

    render(){

        this.root.appendChild(this.header.get());
        this.root.appendChild(this.container);

    }

}






export default IntroPage;