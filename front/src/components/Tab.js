import '../../public/css/tab.css';
import {$el, $new} from '../util/dom';
import {getData} from '../util/api'; 
import {linkTo} from '../util/link';
class Tab {

    // TODO : LOG 정보도 알려줘야함.
    constructor(props){
        this.user = props.user;
        this.el = $new('div', 'tabContainer'); 
        this.create();
        this.addEvent();
        console.log(this.user.nick !== undefined, "test");
    }  

    create(){
        this.el.innerHTML = `
            <div>  
                <button type="button" class="tabContainerButton tabCloseButton">X</button>
                ${this.user.nick !== undefined ? `<button type="button" class="tabContainerButton tabLogoutButton">logout</button>` : ''}
                <div>${this.user.nick !== undefined ? `hello ${this.user.nick}!` : 'login required'}</h3>
                <h2>log 정보를 보여줄 곳입니다.!<h2>
            </div>
        `;
    }

    addEvent(){
        const tabCloseButton = $el('.tabCloseButton', this.el);
        tabCloseButton.addEventListener('click', ()=> {
            this.el.style.marginRight = '-300px';
        })
        
        const tabLogoutButton = $el('.tabLogoutButton', this.el);
        if(tabLogoutButton){
            tabLogoutButton.addEventListener('click', async()=>{
                console.log('test');
                await getData('/auth/logout').then(()=>{
                    linkTo('');
                }).catch((err)=>{
                    console.error(err);
                })
            })
        }
      

    }

    get(){
        return this.el;
    }

}




export default Tab;