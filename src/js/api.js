class tag extends EventTarget{
    constructor(selector){
        super();
        this._tag = document.querySelector(selector);
    }
    use(HTMLElement){
        this.tag = HTMLElement;
        return this;
    }
    get(selector){
        return new tag(selector);
    }
    get tag(){
        return this._tag;
    }
    set tag(a){
        this._tag = a;
    }
    get onError(){
        return (callback)=>this.addEventListener("error",callback);
    }
    set onError(callback){
        this.addEventListener("error",callback);
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
    change(callback){
        this.on("change",a=>{
            a.inputs = Array.from(document.getElementsByTagName("input")).map(e=>{
                try{
                    if(e.className.length>0){
                        return new inputTag(e.className.split(" ").join("."));
                    }else if(e.id){
                        return new inputTag("#"+e.id)
                    }else{
                        let tag = new inputTag(undefined);
                        tag._tag = e;
                        return tag;
                    }
                }catch(err){
                    throw err;
                }
            });
            callback(a);
        })
    }
}

class form extends tag{
    getInput(id){
        return new inputTag(id);
    }
    submit(callback){
        this.on("submit",a=>{
            a.preventDefault();
            a.inputs = Array.from(document.getElementsByTagName("input")).map(e=>{
                try{
                    if(e.className.length>0){
                        return this.getInput(e.className.split(" ").join("."));
                    }else if(e.id){
                        return this.getInput("#"+e.id)
                    }else{
                        let tag = this.getInput(undefined);
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
    addChild(tag){
        this.tag.appendChild(tag);
        return this;
    }
    insertText(selector,text){
        if(text)this.tag.querySelector(selector).innerText = text;
        return this;
    }
    insertIn(tag){
        return document.querySelector(tag).appendChild(this.tag)
    }
}

function $(selector){
    const a = document.querySelector(selector);
}