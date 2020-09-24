import {$el, $new, setStyle} from '../../util/dom';
import '../../../public/css/modal.css' 
import { postData, putData, patchData } from '../../util/api';
// TODO : 
// Board Modal 만들필요없이 
// Card => Modal 로 재활용하기

class Modal {

    constructor(props){
        this.root = props.root;
        this.el = $new('div', 'modalContainer'); 
        this.id;
        this.value = '';
        this.type;


        this.create();
        this.addEventHandler();
        this.render();
    }  

    create(){
        this.el.innerHTML = `
            <div class="modalWrapper">
                <div class="modalHeader">
                    <span class="ModalHeaderTitle">${this.headerTitle}</span>
                    <button class="modalCloseButton">X</button>
                </div>
                <div class="modalBody">
                    <span class="modalBodyTitle">${this.bodyTitle}</span>
                    <textarea class="modalBodyInput"></textarea>
                    <button class="modalBodyButton">${this.buttonTitle}</button>
                </div>
            </div>
        `; 
    }

    addEventHandler(){

        this.el.addEventListener('click', (e)=>{
            if(e.target.className === 'modalCloseButton'){
                setStyle(this.el, {display: 'none'});
            }
        })

        this.el.addEventListener('input', (e)=>{
            this.value = e.target.value;
            this.isActive();
        })

    }

    isActive(){
        const modalButton = $el('.modalBodyButton', this.el);
        if(this.value.length !== 0) setStyle(modalButton, {backgroundColor: '#00e676'});
        else setStyle(modalButton, {backgroundColor: '#a5d6a7'}); 
    }

    // 모달 형식에 맞게 모달 디자인,값 변경.
    show(id, value, type){

        this.type = type;
        this.value = value;

        switch(this.type){
            case 'CARD_UPDATE':{
                this.setModal({header: 'Edit Note', body: 'note', button: 'Save note'})
                this.id = id;
                break;
            }
            case 'BOARD_CREATE':{
                this.setModal({header: 'Create Board', body: 'board', button: 'Create board'})
                break;
            }
            case 'BOARD_UPDATE':{
                this.setModal({header: 'Board Update', body: 'board', button: 'Update board'})
                this.id = id;
                break;
            }
        }


        this.create();
        if(type !== 'CARD_UPDATE') this.setContainer();
        if(!!$el('.modalBodyInput', this.el)) $el('.modalBodyInput', this.el).value = value;
        this.isActive();
        this.el.style.display = 'flex';   
    }

    setContainer(){
        $el('.modalBodyInput').value = "";   // input 으로 바꾸고. 스타일변경.
        const modalBody = $el('.modalBody', this.el);
        const textInput = $el('.modalBodyInput', this.el);
        const input = $new('input', 'boardInput');
        const modalBodyButton = $el('.modalBodyButton', this.el);
        modalBody.removeChild(textInput);
        modalBody.insertBefore(input, modalBodyButton)  //부모노드.insertBefore(삽입 할 노드, 기준 점 노드);
        input.value = this.value;
        $el('.modalWrapper').style.height = '170px';
    }

    setModal({header, body, button}){
        this.headerTitle = header;
        this.bodyTitle = body;
        this.buttonTitle = button;
    }

    close(){
        this.create();
        this.el.style.display = 'none';  
        this.value = "";
    }

    async update(){

        if(this.value === '') return "fail";
        switch(this.type){
            case 'CARD_UPDATE':
                await putData(`/card/${this.id}/content`, {content: this.value});
                break;
            case 'BOARD_CREATE':
                await postData('/board', {title: this.value});
                break;
            case 'BOARD_UPDATE':
                await patchData(`board/${this.id}/title`, {title: this.value});
                break;
        };
        
    
    }

    render(){
        this.root.appendChild(this.el);
    }

}


export default Modal;