import {$el, $new} from '../../util/dom';
import '../../../public/css/modal.css' 
import { putData } from '../../util/api';
// TODO : 
// Board Modal 만들필요없이 
// Card => Modal 로 재활용하기

class CardModal {

    constructor(props){

        this.root = props.root;
        this.el = $new('div', 'modalContainer'); 
        this.cardId;
        this.content;

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

        const modalBodyInput = $el('.modalBodyInput', this.el);
        modalBodyInput.addEventListener('change', ()=>{
            //TODO: .. onchange event...
        })
        // 입력 이벤트
    }

    show(cardId, content){
       
        $el('.modalBodyInput').value = content;
        this.cardId = cardId;
        this.el.style.display = 'flex';   
    }

    close(){
        this.el.style.display = 'none';   
    }

    async update(){
        this.content = $el('.modalBodyInput').value;
        if(this.content === '') return "fail";
        await putData(`/card/${this.cardId}/content`, {content: this.content});
    }

    render(){
        this.root.appendChild(this.el);
    }

}


export default CardModal;