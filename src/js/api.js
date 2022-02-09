class tag{
    constructor(selector,not_alert=true){
        this._tag = undefined;
        if(typeof selector === "string"){
            if(document.querySelector(selector))this._tag = document.querySelector(selector);
            else throw "error not exist tag";
        }else if(typeof selector != "undefined"){
            throw "error require string type queryselector"
        }else{
            not_alert==false?console.warn("please check this error",selector):undefined;
        }
    }
    get tag(){
        return this._tag;
    }
    set tag(a){
        this._tag = document.querySelector(a);
    }
    tagChild(a){
        return this.tag.querySelector(a)
    }
    on(event,callback){
        this.tag.addEventListener(event,callback);
    }
}

class inputTag extends tag{
    set value(a){
        this.tag.value = a;
    }
    get value(){
        return this.tag.value;
    }
}

class form extends tag{
    getInput(id){
        return new inputTag(id);
    }
    submit(callback){
        this.tag.addEventListener("submit",a=>{
            a.preventDefault();
            a.inputs = Array.from(document.getElementsByTagName("input")).map(e=>{
                try{
                    if(e.className.length>0){
                        return this.getInput(e.className.split(" ").join("."));
                    }else if(e.id){
                        return this.getInput("#"+e.id)
                    }else{
                        let tag = this.getInput(undefined,true);
                        tag._tag = e;
                        return tag;
                    }
                }catch(err){
                    throw err;
                }
            });
            callback(a)
        })
    }
}

class template extends tag{
    constructor(selector){
        super(selector);
        this._tag = this._tag.content.cloneNode(true);
    }
    getChild(selector){
        return this.tag.querySelector(selector);
    }
    insertText(selector,text){
        console.log(this.tag.querySelector(selector),selector)
        this.tag.querySelector(selector).innerText = text;
    }
    insert(tag){
        document.querySelector(tag).appendChild(this.tag)
    }
}