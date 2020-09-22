import cardlogo from '../images/cardlogo.png'
import {$el, $new} from '../util/dom';

export const createBoard = (data, user, callback)=>{


    return  `
            <div class="todo" id="board${data.id}">
                <div class="todoHeader">
                    <div class="todoHeaderContents">
                        <button class="cardCount">${data.cards.length}</button>
                        <p class="boardTitle">${data.title}</p>
                    </div>
                    <div class="todoHeaderButtons">
                        <button class="todoHeaderPlus" id="todoHeaderPlus${data.id}">+</button>
                        <button class="todoHeaderDelete">X</button>
                    </div>
                </div>
                <div class="cardContainer">
                    ${data.cards.reduce((acc, cur)=>{
                        acc+= `
                            <div class="card">
                                <img src=${cardlogo}>${cur.content}
                                <p class="cardUser">added by ${user.nick}</p>
                            </div>
                            `
                        return acc;
                    }, ``)}
                </div>
        </div>
    `

}