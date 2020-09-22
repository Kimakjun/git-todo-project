
export const CreateAddedCard = (id)=>{
    return `
        <input type="textarea" id ="addCardInput${id}" class="addCardInput" placeholder="Enter a Note"/>
        <div class="cardButtons">
            <button id=cardAddButton${id} class="cardAddButton">Add</button>
            <button id=cardCancleButton${id} class="cardCancleButton">Cancle</button>
        </div>
    `;
}