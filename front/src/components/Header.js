import Tab from './Tab';
import '../../public/css/header.css';
import {$el, $new} from '../util/dom';
 
class Header {

    constructor(props){
        this.el = $new('div', 'headerContainer'); 
        this.Tab = new Tab({user: props.user});
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
        const headerMenu = $el('.headerMenu', this.el);
        
        headerMenu.addEventListener('click', ()=> {
            console.log('hihi');
            this.el.appendChild(this.Tab.get());
        })

    }

    get(){
        return this.el;
    }

}




export default Header;