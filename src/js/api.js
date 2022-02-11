class TodoApp extends EventTarget{
    constructor(a){
        super();
        this._items = [];
        if(typeof a === "object")this._items = a;
        else this.dispatchEvent(new CustomEvent("error",{detail:{type:"items",in:a}}))
    }
    get items(){
        return this._items;
    }
    set items(a){
        if(typeof a === "object"){
            this._items = a;
            this.dispatchEvent(new CustomEvent("update",{detail:{data:a}}))
        }else this.dispatchEvent(new CustomEvent("error",{detail:{type:"getItem",in:a}}))
    }
    addItem(data){
        if(typeof data === "object"){
            this.items.push(data);
            this.dispatchEvent(new CustomEvent("adding",{detail:data}))
            this.dispatchEvent(new CustomEvent("update",{detail:data}))
        }else this.dispatchEvent(new CustomEvent("error",{detail:{type:"adding",in:data}}))
    }
    getItem(id){
        return this.items.filter((a,i)=>i==id);
    }
    updateItem(id,data){
        if(typeof data === "object"){
            this.items = this.items.map((e,i)=>i==id?((a)=>{
                Object.keys(data).forEach(f=>a.hasOwnProperty(f)?a[f]=data[f]:a[f]);
                return a;
            })(e):e);
        }else this.dispatchEvent(new CustomEvent("error",{detail:{
            type:"adding",
            in:data
        }}))
    }
    delItem(id){
        this.items = this.items.filter((e,i)=>i!=id)
        this.dispatchEvent(new CustomEvent("delete",{detail:{id}}))
    }
    clear(){
        this.items = [];
        this.dispatchEvent(new CustomEvent("clear"));
    }
    Update(){
        this.dispatchEvent(new CustomEvent("update"));
    }
    on(event,callback){this.addEventListener(event,callback);}
}

class tag extends EventTarget{
    constructor(selector){
        super();
        this._tag = undefined;
        if(typeof selector === "string"){
            if(document.querySelector(selector))this._tag = document.querySelector(selector);
            else throw "error not exist tag";
        }else if(typeof selector != "undefined"){
            throw "error require string type queryselector"
        }else this.reject({detail:{
            type:"tag_class",
            in:selector
        }})
    }
    get tag(){
        return this._tag;
    }
    set tag(a){
        this._tag = document.querySelector(a);
    }
    reject(data){
        this.dispatchEvent(new CustomEvent("error",{detail:data}))
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
    insertElement(a){
        this.tag.appendChild(a);
        return this;
    }
    on(event,callback,preventDefault=false){
        this.tag.addEventListener(event,a=>{
            preventDefault?a.preventDefault():"";
            a.api = this;
            callback(a);
        });
        return this;
    }
}

class inputTag extends tag{
    constructor(id,parent=undefined){
        super(id);
        this.parent = parent;
        this.type = this.tag.type;
    }
    set value(a){
        switch(this.type){
            case "checkbox":
                this.tag.checked = a;
            break;
            default:
                this.tag.value = a;
        }
    }
    get value(){
        switch(this.type){
            case "checkbox":
                return this.tag.checked;
            break;
            default:
                return this.tag.value;
        }
    }
    default(a){
        this.value = a;
        return this;
    }
    change(callback,preventDefault=false){
        this.on("change",callback,preventDefault)
        return this;
    }
}

class form extends tag{
    getInput(id){
        return new inputTag(id,this);
    }
    getInputs(){
        return Array.from(this.tag.getElementsByTagName("input")).map(e=>{
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
                this.reject({detail:{
                    type:"form",
                    in:err
                }})
                return [];
            }
        });
    }
    submit(callback,preventDefault=false){
        this.on("submit",callback,preventDefault)
        return this;
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
        return this;
    }
    insertIn(tag){
        return document.querySelector(tag).appendChild(this.tag)
    }
}