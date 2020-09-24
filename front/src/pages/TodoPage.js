import Header from '../components/Header';
import Modal from './modal/Modal';
import {createBoard} from '../components/Board';
import {CreateAddedCard} from '../components/AddCard';
import {CreateAddedBoard} from '../components/AddBoard';
import {$el, $els, $new} from "../util/dom";
import {getData, postData, deleteData, patchData} from '../util/api';
import '../../public/css/todo.css'

class Todo{
        constructor(props){
        const {root, user} = props;
        this.root = root;
        this.user = user;
        this.boardDatas;
        this.header = new Header({user});
        this.modal = new Modal({root}); 

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
        this.el = $new('div', 'todoContainer'); 

        this.create();
        this.eventHandler();
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
            this.el.innerHTML+= createBoard(data, this.user);
        })
        this.el.innerHTML+= CreateAddedBoard();
        this.dragAndDrop();
    }

    // https://tramyu.github.io/js/javascript-event/ //이벤트 전파
    eventHandler(){
        // 이벤트 위임을 통해서 이벤트 등록.
        this.el.addEventListener('click', (e)=>{
            const curTargetId = e.target.id.replace(/[a-zA-Z]+/,'');
            const $targetBoard = $el(`#board${curTargetId}`, this.el);
            switch(e.target.className){
                case 'todoHeaderPlus':
                    this.addFormCard($targetBoard, curTargetId);
                    break;
                case 'todoHeaderDelete':
                    this.deleteBoard(curTargetId);
                    break;
                case 'cardCancleButton':
                    this.deleteFormCard($targetBoard, curTargetId);
                    break;
                case 'cardAddButton':
                    this.addCard($targetBoard, curTargetId);
                    break;
                case 'cardDeleteButton':
                    const boardId = $el(`.boardId${curTargetId}`, this.el).value;
                    this.deleteCard(curTargetId, boardId);
                    break;
            } 
        });

        

        this.el.addEventListener('input', (e)=> {
            const $targetBoard = $el(`#board${e.target.id.replace(/[a-zA-Z]+/, '')}`, this.el);
            this.addCardInput($targetBoard);
        })

        this.el.addEventListener('dblclick', (e)=> {
            const curTargetId = e.target.id.replace(/[a-zA-Z]+/,'');
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

        // 드래그 시작
        // const {preCardId, cardId, nextCardId, preBoardId x, content x, preBoardTitle x, boardTitle} = req.body;
                 // const boardId = req.params.id; 
        this.el.addEventListener('dragstart', (e)=> {
            if(e.target.className === 'card'){
                this.state.cardId = e.target.id.replace(/[a-zA-Z]+/,'');
                this.state.preBoardId = $el(`.boardId${this.state.cardId}`, e.target).value;
                this.state.preBoardTitle = $el(`.boardTitle${this.state.cardId}`, e.target).value;
                this.state.content = $el('.cardHeaderContentTitle', e.target).innerText;
                
                e.target.classList.add('dragging');
            }
        })

        // 드래그 종료 => 결과 전송, 상태 초기화...
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
    
        this.root.addEventListener('click', async(e)=> {
            if(e.target.className === 'modalBodyButton'){
                const result = await this.modal.update();
                if(result === 'fail') return alert('is empty fail!!');
                this.modal.close();
                this.create();
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
                        this.state.preCardId = draggingCard.previousElementSibling.id.replace(/[a-zA-Z]+/,'');
                    }else{
                        this.state.nextCardId = '';
                        this.state.preCardId = '';
                    }

                    container.appendChild(draggingCard);
                }else{
                    if(draggingCard.previousElementSibling === null){
                        this.state.preCardId = '';
                        this.state.nextCardId = nextElement.id.replace(/[a-zA-Z]+/,'');
                    }
                    else{
                        this.state.preCardId = draggingCard.previousElementSibling.id.replace(/[a-zA-Z]+/,'');
                        this.state.nextCardId = nextElement.id.replace(/[a-zA-Z]+/,'');
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

    async deleteBoard(boardId){
        try{
            if(!confirm('포함된 card 가 전부 삭제됩니다. 진행하시겠습니까?')) return;
            await deleteData(`/board/${boardId}`);
            this.create();
        }catch(err){
            console.error(err);
        }
    }

    async deleteCard(targetId, boardId){

        const {id, title, cards}= this.boardDatas.find((boardData)=> boardData.id === parseInt(boardId, 10));
        const {content} = cards.find((card)=> card.id == parseInt(targetId, 10));
        
        try{
            if(!confirm('정말로 삭제하시겠습니까 ?')) return;
            // TODO: axios delete 요청시 body 본문 전달 안되는 문제.
            await deleteData(`/card/${targetId}`, {boardId: id, content: content, boardTitle: title});
            this.create(); 
        }catch(err){
            console.error(err);
            alert(err);
        }
        
    }

    async addCard($targetBoard, targetId){

        const cardInput = $el('.addCardInput', $targetBoard).value;
        const {title, id} = this.boardDatas.find((boardData)=> boardData.id === parseInt(targetId, 10));

        if(cardInput.length === 0 || cardInput.length > 500) return alert('fail!!!');
        try{
            await postData(`/board/${id}/card`, {content: cardInput, boardTitle: title});
            this.create(); //전송 해서 새로운 카드 등록되면 다시그리기. 페이지 리로드는 x
            
        }catch(err){
            console.error(err);
            alert('fail');
        } 
    }

    addCardInput($targetBoard){
        const cardInput = $el('.addCardInput', $targetBoard);
        if(cardInput.value.length !== 0){
            $el('.cardAddButton', $targetBoard).style.backgroundColor = '#00e676';
        }else{
            $el('.cardAddButton', $targetBoard).style.backgroundColor = '#a5d6a7';
        }
    }

    addFormCard($targetBoard, curTargetId){
        const cardContainer = $targetBoard.lastElementChild;
        const addedCardContainer = $el('.addCardContainer', cardContainer);

        if(addedCardContainer !== null){
            cardContainer.removeChild(addedCardContainer);
            return;
        }else{
            const card = $new('div', 'addCardContainer');
            card.innerHTML = CreateAddedCard(curTargetId);
            cardContainer.prepend(card);
        }
        
    }
    
    deleteFormCard($targetBoard){
        const cardContainer = $targetBoard.lastElementChild;
        const addedCardContainer = $el('.addCardContainer', cardContainer);
        cardContainer.removeChild(addedCardContainer);
    }


    render(){

        this.root.appendChild(this.header.get());
        this.root.appendChild(this.el);

    }

}


export default Todo;