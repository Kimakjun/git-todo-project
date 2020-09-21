import IntroPage from './pages/IntroPage';
import Todo from './pages/TodoPage';
import index from './index.css';

export class App{

    constructor(el){
        this.el = el; // root div 
        this.routing(location.hash.replace('#', ''));
    }

    routing(hash){
        switch(hash){
            case '': 
                this.el.appendChild(IntroPage());
                break;
            case 'main':
                this.el.appendChild(Todo());
                break;
        }
    }

    render(){
      

    }


}
