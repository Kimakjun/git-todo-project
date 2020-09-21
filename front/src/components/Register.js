import '../../public/css/header.css';
import {$el, $new} from '../util/dom';
 
class Register {

    constructor(props){
        this.el = $new('div', 'RegisterContainer'); 
        this.create();
        this.addEvent();
      
    }  

    create(){
        this.el.innerHTML = `
            <div class="headerContent">TODO 서비스</div>
            <div class="headerMenu">메뉴<div>
        `;
    }

    addEvent(){
 
    }

    get(){
        return this.el;
    }

}


export default Register;