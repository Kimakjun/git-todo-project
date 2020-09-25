import Header from '../components/Header';
import Modal from './modal/Modal';
import {$el, $els, $new, setStyle} from "../util/dom";
import {getData, patchData} from '../util/api';
import {getIntegerId} from '../util/validator';
import '../../public/css/todo.css'
import Board from '../components/Board';

class Todo{
        constructor(props){
        const {root, user} = props;
        this.root = root;
        this.user = user;
        this.boardDatas;
        this.el = $new('div', 'todoContainer'); 
        this.header = new Header({user});
        this.modal = new Modal({root, reDraw: this.create.bind(this)}); 
        this.board = new Board({root: this.el, reDraw: this.create.bind(this)});
        
        this.state = {
            preCardId : '',
            cardId: '',
            nextCardId: '',
            preBoardId: '',
            boardId: '',
            content: '',
            preBoardTitle: '',
            boardTitle: '',
        }

        this.create();
        this.eventHandler();
        this.render();
    }

    async fetch(){
        const {data: {resData}} = await getData('/board');
        return resData;
    }

    async create(){
        this.boardDatas = await this.fetch(); 
        this.board.draw(this.boardDatas, this.user.nick);
        this.dragAndDrop();
    }

    // https://tramyu.github.io/js/javascript-event/ //이벤트 전파
    eventHandler(){
       
        this.el.addEventListener('input', (e)=> {
            const $targetBoard = $el(`#board${getIntegerId(e.target.id)}`, this.el);
            this.checkInputs($targetBoard);
        })

        this.el.addEventListener('dblclick', (e)=> {
            const curTargetId = getIntegerId(e.target.id);
            if(e.target.className === 'cardBottomContent' || e.target.className === 'cardHeaderContent'){
                const boardId = $el(`.boardId${curTargetId}`, this.el).value;
                this.openCardUpdateModal(curTargetId, boardId);
            }
            if(e.target.className === 'boardTitle'){
                this.modal.show(curTargetId, e.target.innerHTML, 'BOARD_UPDATE');
            }
            if(e.target.classList.contains('addedBoard')){
                this.modal.show('', '', 'BOARD_CREATE');
            }
        })

        this.el.addEventListener('dragstart', (e)=> {
            if(e.target.className === 'card'){
                this.state.cardId = getIntegerId(e.target.id);
                this.state.preBoardId = $el(`.boardId${this.state.cardId}`, e.target).value;
                this.state.preBoardTitle = $el(`.boardTitle${this.state.cardId}`, e.target).value;
                this.state.content = $el('.cardHeaderContentTitle', e.target).innerText;
                
                e.target.classList.add('dragging');
            }
        })

        this.el.addEventListener('dragend', async(e)=> {
            e.target.classList.toggle('dragging');
            try{
                await patchData(`/board/${this.state.boardId}/card`, this.state);
                Object.keys(this.state).map((key)=> this.state[key] = ""); //초기화
                this.create();
            }catch(err){
                console.error(err);
            }

        })

    }

    dragAndDrop(){

        const containers = $els('.cardContainer', this.el);
        containers.forEach((container) => {
            container.addEventListener('dragover', (e) => {
                e.preventDefault();
                const nextElement = this.getNextElement(container, e.clientY);
                const draggingCard = this.el.querySelector('.dragging');
                this.state.boardTitle = $el('.cardContainerBoardTitle', container).value;
                this.state.boardId = $el('.cardContainerBoardId', container).value;

                if(nextElement == null){
                    if(draggingCard.previousElementSibling !== null){
                        this.state.nextCardId = '';
                        this.state.preCardId = getIntegerId(draggingCard.previousElementSibling.id);
                    }else{
                        this.state.nextCardId = '';
                        this.state.preCardId = '';
                    }
                    container.appendChild(draggingCard);
                }else{
                    if(draggingCard.previousElementSibling === null){
                        this.state.preCardId = '';
                        this.state.nextCardId = getIntegerId(nextElement.id);
                    }
                    else{
                        this.state.preCardId = getIntegerId(draggingCard.previousElementSibling.id);
                        this.state.nextCardId = getIntegerId(nextElement.id);
                    }
                    container.insertBefore(draggingCard, nextElement);
                }
            })
        })

    }

    getNextElement(board, y){
        const curBoardElements = [...board.querySelectorAll('.card:not(.dragging)')]; // 현재 드래깅 제외 나머지
        return curBoardElements.reduce((closeset, child)=>{
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2; 
            if(offset < 0 && offset > closeset.offset) return {offset: offset, element: child}
            else return closeset;
        }, {offset: Number.NEGATIVE_INFINITY}).element; 
    }

    openCardUpdateModal(cardId, boardId){
        const {cards} = this.boardDatas.find((boardData)=> boardData.id === parseInt(boardId, 10));
        const {content} = cards.find((card)=> card.id === parseInt(cardId, 10)); 
        this.modal.show(cardId, content, 'CARD_UPDATE');
    }
   
    checkInputs($targetBoard){
        const cardInput = $el('.addCardInput', $targetBoard);
        const cardButton = $el('.cardAddButton', $targetBoard);
        if(cardInput.value.length !== 0){
            setStyle(cardButton, {backgroundColor: '#00e676'});
        }else{
            setStyle(cardButton, {backgroundColor: '#a5d6a7'});
        }
    }

    render(){

        this.root.appendChild(this.header.get());
        this.root.appendChild(this.el);

    }

}

export default Todo;