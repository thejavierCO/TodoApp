class database{}

class template{
    constructor(selector){
        console.log(typeof selector)
        this._tag = selector;
    }
    get tag(){
        return this._tag.content.cloneNode(true);
    }
}