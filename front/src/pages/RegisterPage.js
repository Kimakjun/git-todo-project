import '../../public/css/register.css';
import Header from '../components/Header';
import { postData } from '../util/api';
import {$el, $new} from '../util/dom';
import {linkTo} from '../util/link';
import {isEmail, isPassword, isNick} from '../util/validator'
import {createRegister} from '../templates/Register';

class Register {

    constructor(props){
        this.root = props.root; 
        this.el = $new('div', 'RegisterContainer'); 
        this.header = new Header({user: props.user});

        this.create();
        this.addEvent();
        this.render();
    }  

    create(){
        this.el.innerHTML = createRegister();
    }

    addEvent(){

        const registerButton = $el('#registerButton', this.el);


        registerButton.addEventListener('click', async()=> {
            try{
                const email = $el('#email', this.el).value;
                const password = $el('#pw', this.el).value;
                const nick = $el('#nick', this.el).value;

                if(!isEmail(email) || !isPassword(password) || !isNick(nick)){
                    return alert('invalid input!!');
                }
                
                const result = await postData('/auth/register', {email, password, nick});
                return alert(result.data.message);
            }catch(err){
                alert(err.message);
            }
        })


        const goToLogin = $el('#goToLogin', this.el);
        goToLogin.addEventListener('click', ()=>{
            linkTo('');
        })


    }

    render(){

        this.root.appendChild(this.header.get());
        this.root.appendChild(this.el);

    }

}


export default Register;