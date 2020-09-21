import '../../public/css/header.css';


function Header(props){

    const {name, onclick} = props;

    const div = document.createElement('div');
    console.log(name, div);
    div.innerHTML =  `
        <div class="headerContainer">
            <h1>header ${name} 입니다.</h1>
            <button id="test">click</button>
        </div>
    `

    div.querySelector('#test').addEventListener('click', onclick)

    return div;

}



export default Header;