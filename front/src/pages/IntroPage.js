import Header from '../components/Header';
import {$el,$new} from '../util/dom';
import {postData} from '../util/api';
import {linkTo} from '../util/link';
import {createLogin} from '../templates/Login';

class IntroPage{

    constructor({root, user}){

        this.root = root;
        this.header = new Header({user});

        this.container = $new('div', 'mainContainer');
        
        this.create();
        this.addEvent();
        this.render();
    }

    create(){

        this.container.innerHTML = createLogin();
    }

    addEvent(){
        const button = $el('#loginButton', this.container);
        const registerButton = $el('#goToRegister', this.container);
        
        button.addEventListener('click',async()=>{
            const email = $el('#email', this.container).value;
            const password = $el('#pw', this.container).value;
            try{
                await postData('/auth/login', {email, password});
                linkTo('main');
            }catch(err){
                alert('check your inputs');
            }
        });

        registerButton.addEventListener('click', ()=>{
            linkTo('register');
        })
       

    }

    render(){

        this.root.appendChild(this.header.get());
        this.root.appendChild(this.container);

    }

}






export default IntroPage;