import Header from '../components/Header';
import {createBoard} from '../components/Board';
import {Card} from '../components/Card';
import {$el, $els, $new} from "../util/dom";
import {getData} from '../util/api';
import '../../public/css/todo.css'

class Todo{
    constructor(props){
        const {root, user} = props;
        this.root = root;
        this.user = user;
        this.boardDatas;
        this.header = new Header({user});
        this.el = $new('div', 'todoContainer'); 

        this.create();
        this.addEvent();
        this.render();

    }

    async fetch(){
        const {data: {resData}} = await getData('/board');
        return resData;
    }

    async create(){

        this.boardDatas = await this.fetch();  // board 데이타를 받아와서. 

        this.el.innerHTML = '';
        
        this.boardDatas.map((data)=>{
            this.el.innerHTML+= createBoard(data, this.user, this.create);
        })
    }
    // https://tramyu.github.io/js/javascript-event/ //이벤트 전파..?
    addEvent(){
        // 이벤트 위임을 통해서 이벤트 등록.
        this.el.addEventListener('click', (e)=>{

            switch(e.target.className){
                case 'todoHeaderPlus':
                    const $targetBoard = $el(`#board${e.target.id.replace(/[a-zA-Z]+/, '')}`, this.el);
                    this.addTestEvent($targetBoard);
                    break;
                case 'todoHeaderDelete':
                    break;
            }
        })

        



    }

    addTestEvent($targetBoard){

        const cardContainer = $targetBoard.lastElementChild
        const result = $el('.addCardContainer', cardContainer);

        if(result !== null){
            console.log(cardContainer);
            cardContainer.removeChild(result);
            return;
        }else{
            const card = $new('div', 'addCardContainer');
            card.innerHTML = `
                <input type="textarea" class="addCardInput" placeholder="Enter a Note"/>
                <div class="cardButtons">
                    <button class="cardAddButton">Add</button>
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

            cardContainer.prepend(card);
            }
        
          }
    

    render(){

        this.root.appendChild(this.header.get());
        this.root.appendChild(this.el);

    }

}


export default Todo;