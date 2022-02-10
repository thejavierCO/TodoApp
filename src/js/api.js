class TodoApp extends EventTarget{
    constructor(){
        super();
        this._items = [];
    }
    get items(){
        return this._items;
    }
    set items(a){
        if(typeof a === "object")this._items = a;
        throw this.dispatchEvent(new Event("error",{detail:{
            type:"getItem",
            in:a
        }}))
    }
    addItem(data){
        if(typeof data === "object"){
            this.items.push(data);
            this.dispatchEvent(new CustomEvent("adding",{detail:data}))
            this.dispatchEvent(new CustomEvent("update",{detail:data}))
        }else this.dispatchEvent(new Event("error",{detail:{
            type:"adding",
            in:data
        }}))
    }
    getItem(id){
        return this.items.filter(e=>e.id==id);
    }
    updateItem(id,data){
        if(typeof data === "object"){
            this.dispatchEvent(new CustomEvent("update",{detail:data}))
        }else this.dispatchEvent(new Event("error",{detail:{
            type:"adding",
            in:data
        }}))
    }
    delItem(id){
        this.items = this.items.filter(e=>e.id!=id)
        this.dispatchEvent(new CustomEvent("delete",{detail:{id}}))
    }
    clear(){
        this.dispatchEvent(new CustomEvent("clear",{detail:{id}}))
        this.items = [];
    }
    on(event,callback){this.addEventListener(event,callback);}
}

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
        if(text)this.tag.querySelector(selector).innerText = text;
    }
    insertIn(tag){
        document.querySelector(tag).appendChild(this.tag)
    }
}