import Header from '../components/Header';
import {$el, $new} from "../util/dom";
import {getData} from '../util/api';
import '../../public/css/todo.css'


class Todo{
    constructor(props){
        const {root, user} = props;
        this.root = root;
        this.el = $new('div', 'todoContainer'); 
        this.user = user;
        this.boardDatas;
        this.header = new Header();

        this.create();
        this.render();
    }

    async fetch(){
        const {data: {resData}} = await getData('/board');
        return resData;
    }

    async create(){

        this.boardDatas = await this.fetch();

        

        this.boardDatas.map((data)=>{
            this.el.innerHTML+=`
                <div class="todo">
                    <div class="todoHeader">
                        <div class="todoHeaderContents">
                            <div>${data.cards.length}</div>
                            <div>${data.title}</div>
                        </div>
                        <div class="todoHeaderButtons">
                            <button class="todoHeaderPlus">+</button>
                            <button class="todoHeaderDelete">X</button>
                        </div>
                    </div>
                    <div class="cardContainer">
                    </div>
                </div>
        `;   
        })
    }

    addEvent(){


    }

    render(){
        this.root.appendChild(this.header.get());
        this.root.appendChild(this.el);

    }

}


export default Todo;