<<<<<<< HEAD
let api = new TodoApp(localStorage.getItem("items")?JSON.parse(localStorage.getItem("items")):localStorage.setItem("items","[]"));

document.addEventListener("DOMContentLoaded",function(){
    // get tags info
    const formulario  = new form("form#Data");
    const changeID = formulario.getInput(".Id");
    changeID.change(e=>{
        let [Id,Title,Description,date,Done] = e.inputs;
        let [item] = api.getItem(Id.value);
=======
let api = new Tododb(localStorage.getItem("items")||localStorage.setItem("items","[]"))
.on("error",(a)=>{
    console.log(a)
})

document.addEventListener("DOMContentLoaded",function(){
    const [id,title,description,date,done]  = new form("form#Data").submit(({api:f})=>{
        const [id,title,description,date,done] = f.getInputs();
        if(!!api.get(id.value)){
            api.update(id.value,{
                title:title.value,
                description:description.value,
                date:date.value,
                status:done.value
            });
        }else{
            id.value = api.length;
            api.push({
                title:title.value,
                description:description.value,
                date:date.value,
                status:done.value
            })
        }
        title.value = "";
        description.value = "";
        date.value = new Date().toISOString().slice(0,10);
        done.value = false;
    },true).getInputs();
    id.change(_=>{
        let item = api.get(+id.value);
>>>>>>> cd9a976 (new system storage)
        if(item){
            Title.value = item.title;
            Description.value = item.description;
            date.value = item.date;
            Done.tag.checked = item.status;
        }else{
            Title.value = "";
            Description.value = "";
            date.value = new Date().toISOString().slice(0,10);
            Done.tag.checked = false;
        }
    })
    formulario.getInput(".Date").value = new Date().toISOString().slice(0,10);
    api.on("update",({target:db})=>{
<<<<<<< HEAD
        localStorage.setItem("items",JSON.stringify(db.items))
        let id = formulario.getInput(".Id");
        id.value = api.items.length;
        id.tag.max = id.value; 
        document.querySelector("div#print").innerHTML = "";
        const modelP = new template("template.modelPrint");
        db.items.map(e=>{
=======
        // save in storage
        localStorage.setItem("items",JSON.stringify(db.db))
        // clear content
        document.querySelector("div#print").innerHTML = "";
        // default content inputs
        id.default(api.length);
        id.tag.max = api.length;
        date.default(new Date().toISOString().slice(0,10));
        // system print
        const modelP = new template("template.modelPrint");
        db.db.map((e,i)=>{
>>>>>>> cd9a976 (new system storage)
            const modelI = new template("template.modelItem");
            modelI.getChild("button#itemDelete").addEventListener("click",
                ({target})=>api.del(target.parentNode.querySelector("[itemid]").getAttribute("itemid"))
            )
            modelI.getChild("button#itemEdit").addEventListener("click",
                ({target})=>id.value = target.parentNode.querySelector("[itemid]").getAttribute("itemid")
            )
            modelI.insertText("span.Title",e.title);
            modelI.insertText("span.Description",e.description);
            modelI.insertText("span.Date",e.date);
            modelI.getChild("[itemid]").setAttribute("itemid",i)
            modelP.insertElement(modelI.tag)
        })
        modelP.insertIn("#print")
    })
<<<<<<< HEAD
    api.Update();
    formulario.submit(e=>{
        let [Id,Title,Description,Date,Done] = e.inputs;
        if(api.getItem(Id.value).length>=1){
            let [id_db] = api.getItem(Id.value);
            api.updateItem(id_db.id,{
                title:Title.value,
                description:Description.value,
                date:Date.value,
                status:Done.tag.checked
            });
        }else{
            Id.value = api.items.length;
            api.addItem({
                id:Id.value,
                title:Title.value,
                description:Description.value,
                date:Date.value,
                status:Done.tag.checked
            })
        }
    })
=======
    api.init();
>>>>>>> cd9a976 (new system storage)
})
