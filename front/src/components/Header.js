import Tab from './Tab';
import '../../public/css/header.css';
import {$el, $new} from '../util/dom';
 
class Header {

    constructor(props){
        this.el = $new('div', 'headerContainer'); 
        console.log(props);
        this.Tab = new Tab({user: props.user});
        this.create();
        this.addEvent();
      
    }  

    create(){
        this.el.innerHTML = `
            <div class="headerContent">TODO 서비스</div>
            <div class="headerMenu">메뉴<div>
        `;
        this.el.appendChild(this.Tab.get());
    }

    addEvent(){
        const headerMenu = $el('.headerMenu', this.el);

        headerMenu.addEventListener('click', ()=> {
            this.Tab.get().style.marginRight = "0px";
        })

    }

    get(){
        return this.el;
    }

}


export default Header;