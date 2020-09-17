const Regex = {
    email : /^[\w]([-_.]?[\w])*@[\w]([-_.]?[\w])*\.[a-zA-Z]{2,3}/i,
    password: /^[a-zA-Z0-9]{6,15}/,
    nick: /[a-zA-Z가-힣]{3,30}/,
}

exports.isEmail=(maybeEmail)=>{
    return Regex.email.test(maybeEmail);
}

exports.isPassword=(maybePw)=>{
    return Regex.password.test(maybePw);
}

exports.isNick=(maybeNick)=>{
    return Regex.nick.test(maybeNick);
}

exports.isTitle=(maybeTitle)=>{
    return maybeTitle.length > 0 && maybeTitle.length < 30;
}

exports.isContent=(maybeContent)=>{
    const contentLength =  maybeContent.replace(/\s/gi, "").length; 
    return (contentLength > 0 && contentLength <= 500);
}

