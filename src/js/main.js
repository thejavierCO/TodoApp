let api = new TodoApp(localStorage.getItem("items")?JSON.parse(localStorage.getItem("items")):localStorage.setItem("items","[]"));

api.on("error",(a)=>{
    console.log(a)
})

document.addEventListener("DOMContentLoaded",function(){
    const [id,title,description,date,done]  = new form("form#Data").submit(({api:f})=>{
        const [id,title,description,date,done] = f.getInputs();
        if(api.getItem(id.value).length>=1){
            api.updateItem(id.value,{
                title:title.value,
                description:description.value,
                date:date.value,
                status:done.value
            });
        }else{
            id.value = api.items.length;
            api.addItem({
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
        let [item] = api.getItem(+id.value);
        if(item){
            title.value = item.title;
            description.value = item.description;
            date.value = item.date;
            done.value = item.status;
        }else{
            title.value = "";
            description.value = "";
            date.value = new Date().toISOString().slice(0,10);
            done.value = false;
        }
    })
    api.on("update",({target:db})=>{
        // save in storage
        localStorage.setItem("items",JSON.stringify(db.items))
        // clear content
        document.querySelector("div#print").innerHTML = "";
        // default content inputs
        id.default(api.items.length);
        id.tag.max = api.items.length;
        date.default(new Date().toISOString().slice(0,10));
        // system print
        const modelP = new template("template.modelPrint");
        db.items.map((e,i)=>{
            const modelI = new template("template.modelItem");
            modelI.getChild("button#itemDelete").addEventListener("click",({target})=>
                api.delItem(target.parentNode.querySelector(".Id").innerText))
            modelI.insertText("span.Title",e.title);
            modelI.insertText("span.Description",e.description);
            modelI.insertText("span.Date",e.date);
            modelI.insertText("span.Id",i);
            modelP.insertElement(modelI.tag)
        })
        modelP.insertIn("#print")
    })
    api.Update();
})
