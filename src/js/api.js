<<<<<<< HEAD
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
        return this.items.filter(e=>e.id==id);
    }
    updateItem(id,data){
        if(typeof data === "object"){
            this.items = this.items.map(e=>e.id==id?((a)=>{
                Object.keys(data).forEach(f=>a.hasOwnProperty(f)?a[f]=data[f]:a[f]);
                return a;
            })(e):e);
        }else this.dispatchEvent(new CustomEvent("error",{detail:{
            type:"adding",
            in:data
        }}))
    }
    delItem(id){
        this.items = this.items.filter(e=>e.id!=id)
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

=======
>>>>>>> dbff5f6 (delete old system)
class tag extends EventTarget{
    constructor(selector){
        super();
        this._tag = undefined;
        if(typeof selector === "string"){
            if(document.querySelector(selector))this._tag = document.querySelector(selector);
            else throw "error not exist tag";
        }else if(typeof selector != "undefined"){
            throw "error require string type queryselector"
        }else this.dispatchEvent(new CustomEvent("error",{detail:{
            type:"tag_class",
            in:selector
        }}))
    }
    get tag(){
        return this._tag;
    }
    set tag(a){
        this._tag = document.querySelector(a);
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