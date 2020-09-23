import '../../public/css/board.css';
import {createCard} from './Card';

export const createBoard = (data, user, callback)=>{

    

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
                    ${data.cards.reduce((acc, cur)=>{
                        console.log(data.id)
                        acc+= createCard(cur.content, user.nick, cur.id, data.id);
                        return acc;
                    }, ``)}
                </div>
        </div>
    `

}