import Header from '../components/Header';


function Todo(){

    // login 되어있는지, 안되어있는지 판단..
    // event binding 은 어떻게 할것인지..
    // css 는 어떻게 연결할 것 인지..
    const div = document.createElement('div');
    div.innerHTML = `  
                        ${Header({name: '김학준'})}
                        <div>
                            <p>Todo 페이지</p>
                            <button id="button">click</button>
                        </div>
                    `
    div.querySelector('#button').addEventListener('click', ()=>{
        console.log('test');
    })

    return div;

}

export default Todo;