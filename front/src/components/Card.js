import {$new, $el, $els} from '../util/dom';
import '../../public/css/card.css';
import {createCard} from '../templates/Card';
import {deleteData, postData} from '../util/api';
class Card {

    constructor(props){
        this.el = $new('div', 'cardContainer');
        this.reDraw = props.reDraw;
        this.boardDatas;
    }

    setBoardDatas(boardDatas){
        this.boardDatas = boardDatas;
    }

    addFormCardEvent($card){
        $card.addEventListener('click', (e)=>{
            const curTargetId = e.target.id.replace(/[a-zA-Z]+/,'');
            if(e.target.className === 'cardCancleButton') this.deleteFormCard($card);
            if(e.target.className === 'cardAddButton')  this.addCard($card, curTargetId);
        })
    }

    addEventHandler(parent){
        
        const cardDeleteButtons = $els('.cardDeleteButton', parent);
        cardDeleteButtons.forEach((cardDeleteButton)=>{
            cardDeleteButton.addEventListener('click', (e)=>{
                const curTargetId = e.target.id.replace(/[a-zA-Z]+/,'');
                const boardId = $el(`.boardId${curTargetId}`, parent).value;
                this.deleteCard(curTargetId, boardId);
            })
        })
    }

    async deleteCard(targetId, boardId){

        const {id, title, cards}= this.boardDatas.find((boardData)=> boardData.id === parseInt(boardId, 10));
        const {content} = cards.find((card)=> card.id == parseInt(targetId, 10));
        
        try{
            if(!confirm('정말로 삭제하시겠습니까 ?')) return;
            // TODO: axios delete 요청시 body 본문 전달 안되는 문제.
            await deleteData(`/card/${targetId}`, {boardId: id, content: content, boardTitle: title});
            this.reDraw();
        }catch(err){
            console.error(err);
            alert(err);
        }
        
    }

    async addCard($card, targetId){

        const cardInput = $el('.addCardInput', $card).value;
        const {title, id} = this.boardDatas.find((boardData)=> boardData.id === parseInt(targetId, 10));

        if(cardInput.length === 0 || cardInput.length > 500) return alert('fail!!!');
        try{
            await postData(`/board/${id}/card`, {content: cardInput, boardTitle: title});
            this.reDraw(); //전송 해서 새로운 카드 등록되면 다시그리기. 페이지 리로드는 x
            
        }catch(err){
            console.error(err);
            alert('fail');
        } 
    }

    deleteFormCard($card){
        $card.remove();
    }

    get(data, cards, nick){

        this.el.innerHTML = cards.reduce((acc, cur)=>{
            acc+= createCard(cur.content, nick, cur.id, data.id, data.title);
            return acc;
        }, ``)
       
        return this.el.innerHTML;

    }

}

export default Card;