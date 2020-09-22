import Header from '../components/Header';
import {createBoard} from '../components/Board';
import {CreateAddedCard} from '../components/AddCard';
import {$el, $els, $new} from "../util/dom";
import {getData, postData, deleteData} from '../util/api';
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
            this.el.innerHTML+= createBoard(data, this.user, this.create);
        })
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
        })

        this.el.addEventListener('input', (e)=> {
            const $targetBoard = $el(`#board${e.target.id.replace(/[a-zA-Z]+/, '')}`, this.el);
            this.addCardInput($targetBoard);
        })

        this.el.addEventListener('ondblclick', ()=> {
            const $targetBoard = $el(`#board${e.target.id.replace(/[a-zA-Z]+/, '')}`, this.el);
            this.openBoardUpdateModal();
        })


    }

    openBoardUpdateModal(){

    }

    async deleteCard(targetId, boardId){
        // const {boardId, content, boardTitle} = req.body;
        // const id = req.params.id;
        // console.log(this.boardDatas);
        // const {content} = this.boardDatas[parseInt(boardId, 10)]
        //                     .cards.find((card=> card.id === parseInt(targetId, 10)));

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
        console.log($targetBoard);
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