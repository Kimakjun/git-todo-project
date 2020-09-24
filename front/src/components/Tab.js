import '../../public/css/tab.css';
import {$el, $new} from '../util/dom';
import {getData} from '../util/api'; 
import {linkTo} from '../util/link';
import Log  from './Log';

class Tab {

    // TODO : LOG 정보도 알려줘야함.
    constructor(props){
        

        this.user = props.user;
        this.el = $new('div', 'tabContainer'); 
        this.log = new Log({user: this.user});
        this.create();
        this.addEvent();
        
    }  

    create(){
        this.el.innerHTML = `

                <div class="tabContainerHeader">
                    <div class="tabContainerHeaderIcon">
                        📃Menu
                    </div>
                    <div class="tabContainerHeaderButtons">
                        ${this.user.nick !== undefined ? 
                            `<button type="button" class="tabContainerButton tabLogoutButton">logout</button>` 
                            : `<button type="button" class="tabContainerButton tabLoginButton">login</button>`}
                        <button type="button" class="tabContainerButton tabCloseButton">X</button>
                    </div>
                </div>
                <div class="tabContainerIcon">🔔 Activity</div>             
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

    draw(){
        this.log.draw();
    }

    get(){
        this.el.appendChild(this.log.get());
        return this.el;
    }

}




export default Tab;