import cardlogo from '../images/cardlogo.png';
import '../../public/css/card.css';

export const createCard = (content, nick, id, boardId)=>{
    return `
        <div class="card">
            <input type="hidden" class="boardId${id}" value="${boardId}" />
            <div id="cardHeaderContent${id}" class="cardHeaderContent" >
                <div>
                    <img src=${cardlogo}>
                    <p class="cardHeaderContentTitle">${content}</p>
                </div>
                <div>
                    <button id="cardDeleteButton${id}" class="cardDeleteButton">X</button>
                </div>
            </div>
            <div id="cardBottomContent${id}" class="cardBottomContent">
                <span class="decoTitle">added by</span> ${nick}
            </div>
        </div>
    `
}