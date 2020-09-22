import {$el, $new} from '../../util/dom';
import '../../../public/css/modal.css' 
import { postData, putData } from '../../util/api';
// TODO : 
// Board Modal 만들필요없이 
// Card => Modal 로 재활용하기

class CardModal {

    constructor(props){

        this.root = props.root;
        this.el = $new('div', 'modalContainer'); 
        this.cardId;
        this.content;
        this.title;
        this.type;

        this.create();
        this.addEvent();
        this.render();
    }  

    create(){
        this.el.innerHTML = `
            <div class="modalWrapper">
                <div class="modalHeader">
                    <span class="ModalHeaderTitle">Edit Note</span>
                    <button class="modalCloseButton">X</button>
                </div>
                <div class="modalBody">
                    <span class="modalBodyTitle">Note</span>
                    <textarea class="modalBodyInput"></textarea>
                    <button class="modalBodyButton">Save Note</button>
                </div>
            </div>
        `; 
    }

    addEvent(){
        // 모달창 닫기 이벤트
        const modalCloseButton = $el('.modalCloseButton', this.el);
        modalCloseButton.addEventListener('click' ,()=> {
            this.el.style.display = 'none';
        });


        // 입력 이벤트
        const modalInput = $el('.boardInput', this.root);
        if(modalInput){
            modalInput.addEventListener('input', ()=>{
                this.title = modalInput.value;
            })
        }
    }

    show(cardId, content, type){
        this.create();
        this.addEvent();
        this.type = type;
        switch(this.type){
            case 'CARD_UPDATE':
                $el('.modalBodyInput').value = content;
                this.cardId = cardId;
                break;
            case 'BOARD_CREATE':
                // TODO : 코드 리펙토링.
                $el('.modalBodyInput').value = "";   // input 으로 바꾸고. 스타일변경.
                const modalBody = $el('.modalBody', this.el);
                const textInput = $el('.modalBodyInput', this.el);
                const input = $new('input', 'boardInput');
                const modalBodyButton = $el('.modalBodyButton', this.el);
                modalBody.removeChild(textInput);
                modalBody.insertBefore(input, modalBodyButton)  //부모노드.insertBefore(삽입 할 노드, 기준 점 노드);
                $el('.modalWrapper').style.height = '170px';
                this.addEvent();
                break;
            case 'BOARD_UPDATE':
                // 코드 리펙토링.
                break;
        }

        this.el.style.display = 'flex'; 
  
    }

    close(){
        this.el.style.display = 'none';   
    }

    async update(){
        
        switch(this.type){
            case 'CARD_UPDATE':
                this.content = $el('.modalBodyInput').value;
                if(this.content === '') return "fail";
                await putData(`/card/${this.cardId}/content`, {content: this.content});
                break;
            case 'BOARD_CREATE':
                if(this.title === '') return "fail";
                await postData('/board', {title: this.title});
                break;
            case 'BOARD_UPDATE':
                break;
        }
    
    
    }

    render(){
        this.root.appendChild(this.el);
    }

}


export default CardModal;