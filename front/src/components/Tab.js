import '../../public/css/tab.css';
import {$el, $new} from '../util/dom';
 
class Tab {

    // TODO : LOG 정보도 알려줘야함.
    constructor(props){
        this.user = props.user;
        this.el = $new('div', 'tabContainer'); 
        this.create();
        this.addEvent();
      
    }  

    create(){
        this.el.innerHTML = `
            <div>
                <h3>${this.user ? `hello ${this.user.nick}!` : 'login required'}</h3>
                <h2>log 정보를 보여줄 곳입니다.!<h2>
            </div>
        `;
    }

    addEvent(){
            
    }

    get(){
        return this.el;
    }

}




export default Tab;