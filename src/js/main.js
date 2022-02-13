let api = new TodoApp(localStorage.getItem("items")?JSON.parse(localStorage.getItem("items")):localStorage.setItem("items","[]"));

document.addEventListener("DOMContentLoaded",function(){
    // get tags info
    const formulario  = new form("form#Data");
    const changeID = formulario.getInput(".Id");
    changeID.change(e=>{
        let [Id,Title,Description,date,Done] = e.inputs;
        let [item] = api.getItem(Id.value);
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
        localStorage.setItem("items",JSON.stringify(db.items))
        let id = formulario.getInput(".Id");
        id.value = api.items.length;
        id.tag.max = id.value; 
        document.querySelector("div#print").innerHTML = "";
        const modelP = new template("template.modelPrint");
        db.items.map(e=>{
            const modelI = new template("template.modelItem");
            // modelI.getChild("button#itemDelete").addEventListener("click",({target})=>
            //     api.delItem(target.parentNode.querySelector(".Id").innerText))
            modelI.insertText("span.Title",e.title);
            modelI.insertText("span.Description",e.description);
            modelI.insertText("span.Date",e.date);
            modelI.insertText("span.Id",e.id);
            modelP.addChild(modelI.tag)
        })
        modelP.insertIn("#print")
    })
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
})
