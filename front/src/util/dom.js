
export const $el = (target, base=document)=>{
    return base.querySelector(target);
}

export const $new = (target, base=document, className)=>{
    const newEl = base.createElement(`${target}`);
    if(className) newEl.classList.add(`${className}`);
    return newEl;
}

