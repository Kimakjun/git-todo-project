
export const $el = (target, base=document)=>{
    return base.querySelector(target);
}

export const $new = (target, className)=>{
    const newEl = document.createElement(`${target}`);
    if(className) newEl.classList.add(`${className}`);
    return newEl;
}

