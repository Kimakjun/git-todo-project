import IntroPage from './pages/IntroPage';
import Todo from './pages/TodoPage';
import {getData} from './util/api';
import './index.css';


export class App{

    constructor(root){
        this.root = root; // root div           // 로그인 정보받아와서 렌더링. 
        this.user;
        this.render();

    }

    async fetchUser(){
        const {data: {user}} = await getData('user');
        this.user = user;
        // this.user = user;
    }

    async render(){

        await this.fetchUser();
        
        if(this.user.id){
            new Todo(this.root);
        }else{
            new IntroPage({root: this.root});
        }

    }


}
