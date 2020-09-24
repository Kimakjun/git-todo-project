import cardlogo from '../images/cardlogo.png';

export const createCard = (content, nick, id, boardId, boardTitle)=>{

    return `
    <div class="card" id=cardId${id} draggable="true">
        <input type="hidden" class="boardId${id}" value="${boardId}" />
        <input type="hidden" class="boardTitle${id}" value="${boardTitle}" />
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
    `;

}