import Header from '../components/Header';
import {createBoard} from '../components/Board';
import {CreateAddedCard} from '../components/AddCard';
import {$el, $els, $new} from "../util/dom";
import {getData, postData} from '../util/api';
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
            }
        })

        this.el.addEventListener('input', (e)=> {
            const $targetBoard = $el(`#board${e.target.id.replace(/[a-zA-Z]+/, '')}`, this.el);
            this.addCardInput($targetBoard);
        })

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
        console.log($targetBoard);
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