import Header from '../components/Header';
import {$el, $els, $new} from "../util/dom";
import {getData} from '../util/api';
import '../../public/css/todo.css'
import cardlogo from '../images/cardlogo.png'

class Todo{
    constructor(props){
        const {root, user} = props;
        this.root = root;
        this.user = user;
        this.boardDatas;
        this.header = new Header({user});

        this.el = $new('div', 'todoContainer'); 

        this.create();
        this.render();

    }

    async fetch(){
        const {data: {resData}} = await getData('/board');
        return resData;
    }

    async create(){

        this.boardDatas = await this.fetch();
        this.el.innerHTML = '';
        
        this.boardDatas.map((data)=>{
            this.el.innerHTML+=`
                <div class="todo">
                    <div class="todoHeader">
                        <div class="todoHeaderContents">
                            <button class="cardCount">${data.cards.length}</button>
                            <p class="boardTitle">${data.title}</p>
                        </div>
                        <div class="todoHeaderButtons">
                            <button class="todoHeaderPlus">+</button>
                            <button class="todoHeaderDelete">X</button>
                        </div>
                    </div>
                    <div class="cardContainer">
                        ${data.cards.reduce((acc, cur)=>{
                            acc+= `
                                <div class="card">
                                    <img src=${cardlogo}>${cur.content}
                                    <p class="cardUser">added by ${this.user.nick}</p>
                                </div>
                                `
                            return acc;
                        }, ``)}
                    </div>
                </div>
        `;   
            
            this.addEvent();
                        
        })
    }
    // https://tramyu.github.io/js/javascript-event/ //이벤트 전파..?
    addEvent(){

        const todoPlusButtons = $els('.todoHeaderPlus', this.el);

        todoPlusButtons.forEach((todoPlusButton)=> {
            todoPlusButton.addEventListener('click', ()=> {
                const cardContainer = $el('.cardContainer', this.el);
              
                const result = $el('.addCardContainer', cardContainer);
                console.log(result);
                if(result !== null){
                    cardContainer.remove(result);
                    return;
                }else{
                  const card = $new('div', 'addCardContainer');
                  card.innerHTML = `
                        <input type="textarea" class="addCardInput"/>
                        <div class="cardButtons">
                            <button class="cardAddButton">Ad</button>
                            <button class="cardCancleButton">Cancle</button>
                        </div>
                  `
                  
                  const cardInput = $el('.addCardInput', card);
                  cardInput.addEventListener('input', ()=>{
                        if(cardInput.value.length !== 0){
                            $el('.cardAddButton', card).style.backgroundColor = '#00e676';
                        }else{
                            $el('.cardAddButton', card).style.backgroundColor = '#a5d6a7';
                        }
                  })

                  cardContainer.appendChild(card);
                }
            })


          }); 

    }

    render(){
        this.root.appendChild(this.header.get());
        this.root.appendChild(this.el);

    }

}


export default Todo;