import Card from './Card';
import '../../public/css/board.css';
import {createAddedBoard} from '../templates/AddBoard'
import {createAddedCard} from '../templates/AddCard'
import {$el, $els, $new} from '../util/dom';
import {deleteData} from '../util/api';
import { getIntegerId } from '../util/validator';

class Board {

    constructor(props){

        this.el = props.root;
        this.reDraw = props.reDraw;
        this.card = new Card({reDraw: props.reDraw});
        
    }


    createBoard(data, user){
        return  `
            <div class="todo" id="board${data.id}">
                <div class="todoHeader">
                    <div class="todoHeaderContents">
                        <button class="cardCount">${data.cards.length}</button>
                        <p id="boardTitle${data.id}" class="boardTitle">${data.title}</p>
                    </div>
                    <div class="todoHeaderButtons">
                        <button class="todoHeaderPlus" id="todoHeaderPlus${data.id}">+</button>
                        <button class="todoHeaderDelete" id="todoHeaderDelete${data.id}">X</button>
                    </div>
                </div>
                <div class="cardContainer">
                    <input type="hidden" class="cardContainerBoardTitle" value="${data.title}"/>
                    <input type="hidden" class="cardContainerBoardId" value="${data.id}"/>
                    ${this.card.get(data, data.cards, user)}
                </div>
            </div>
            `
    }

    draw(datas, user){
        this.el.innerHTML = '';
        datas.map((data)=>{
            this.el.innerHTML+= this.createBoard(data, user);
        })
        this.el.innerHTML += createAddedBoard();

        this.card.addEventHandler(this.el);
        this.card.setBoardDatas(datas);
        this.addEventHandler();
    }

    addEventHandler(){

        const todoHeaderPlusButtons = $els('.todoHeaderPlus', this.el);
        const todoHeaderDeleteButtons = $els('.todoHeaderDelete', this.el);
        
        todoHeaderPlusButtons.forEach((todoHeaderPlusButton)=>{
            todoHeaderPlusButton.addEventListener('click', (e)=>{
                const curTargetId = getIntegerId(e.target.id);
                const $targetBoard = $el(`#board${curTargetId}`, this.el);
                this.addFormCard($targetBoard, curTargetId)
            });
        })
       
        todoHeaderDeleteButtons.forEach((todoHeaderDeleteButton)=>{
            todoHeaderDeleteButton.addEventListener('click',(e)=>{
                const curTargetId = getIntegerId(e.target.id);
                this.deleteBoard(curTargetId)
            });    
        })
       
    }

    addFormCard($targetBoard, curTargetId){
        const cardContainer = $targetBoard.lastElementChild;
        const addedCardContainer = $el('.addCardContainer', cardContainer);

        if(addedCardContainer !== null){
            cardContainer.removeChild(addedCardContainer);
            return;
        }else{
            const card = $new('div', 'addCardContainer');
            card.innerHTML = createAddedCard(curTargetId);
            cardContainer.prepend(card);
            this.card.addFormCardEvent(card);
        }
    }

    async deleteBoard(boardId){
        try{
            if(!confirm('포함된 card 가 전부 삭제됩니다. 진행하시겠습니까?')) return;
            await deleteData(`/board/${boardId}`);
            this.reDraw();
        }catch(err){
            console.error(err);
        }
    }
    
}

export default Board;
