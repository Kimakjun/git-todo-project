import { getData } from "../util/api";
import { $new } from "../util/dom";


class Log{

    constructor(props){
    
        this.user = props.user;
        this.logDatas;
        this.el = $new('div', 'tabContainerLogs');

        this.create();
        
    }                                              


    async fetch(){
        if(this.user.nick === undefined) return;
        const {data: {data : {logs}}} = await getData('/log');
        return logs
    }


    makeLog({nick, action, content, from, to}){

        return `
                <span class="highlite">${nick}</span> 
                ${action} <span class="highlite">${content}</span>  
                ${from ? `to <span class="bold">${from}</span>` : ''}
                ${to ? `to <span class="bold">${to}</span>` : ''}
            `; 

    }

    makeTime(createdTime){
        
        const preTime = new Date(createdTime).getTime();
        const curTime = new Date().getTime();
        const diff =  curTime - preTime;

        if(diff / (3600 * 24 * 30 * 1000) >= 1) return `${Math.floor(diff / (3600 * 24 * 30 * 1000))} months ago`; 
        if(diff / (3600 * 24 * 1000) >= 1) return `${Math.floor(diff / (3600 * 24 * 1000))} days ago`; 
        if(diff / (3600 * 1000) >= 1) return `${Math.floor(diff / (3600 * 1000))} hours ago`; 
        if(diff / (60 * 1000) >= 1) return `${Math.floor(diff / (60 * 1000))} minute ago`;
        return `${Math.floor(diff / 1000)} seconds ago`; 

    }

    makeLogForm(logs){

        return logs.reduce((acc, cur)=> {
            //console.log(cur);
            const {action, content, create_time, pre, next} = cur;
            const userNick = this.user.nick;
            acc += ` 
                <div class="logContentContainer">
                    <div class="logContent">
                        ${this.makeLog({nick: userNick, action, content, from: pre, to: next})}
                    </div>
                    <div class="logedTime">
                       ${this.makeTime(create_time)}
                    </div>
                </div>`
            return acc;
        }, '');

    }

    async create(){
        
         this.el.innerHTML = '';
         const logs = await this.fetch();
         if(logs === undefined) return;
         this.el.innerHTML+= this.makeLogForm(logs);

    }

    draw(){
        this.create();
    }


    get(){
        return this.el;
    }

}                           

export default Log;