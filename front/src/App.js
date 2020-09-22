import IntroPage from './pages/IntroPage';
import Todo from './pages/TodoPage';
import {getData} from './util/api';
import './index.css';
import RegisterPage from './pages/RegisterPage';


export class App{

    constructor(root){
        this.root = root; // root div // 로그인 정보받아와서 렌더링. 
        this.user = {};
        this.hash = location.hash.replace('#', '');
        this.render();

    }

    async fetchUser(){
        const {data: {user}} = await getData('user');
        this.user = user;
        // this.user = user;
    }

    async render(){

        await this.fetchUser(); 

        if(this.user.id || this.hash === 'main') return new Todo({root: this.root, user: this.user});
        
        if(this.hash === '') return new IntroPage({root: this.root, user: this.user});
        if(this.hash === 'register') return new RegisterPage({root: this.root, user: this.user});

    }


}
