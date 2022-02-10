let api = new TodoApp(localStorage.getItem("items")?JSON.parse(localStorage.getItem("items")):localStorage.setItem("items","[]"));

api.on("update",({target:db})=>{
    localStorage.setItem("items",JSON.stringify(db.items))
    document.querySelector("div#print").innerHTML = "";
    const modelP = new template("template.modelPrint");
    db.items.map(e=>{
        const modelI = new template("template.modelItem");
        modelI.insertText("span.Title",e.title);
        modelI.insertText("span.Description",e.description);
        modelI.insertText("span.Date",e.date);
        modelI.insertText("span.Id",e.id);
        modelP.addChild(modelI.tag)
    })
    modelP.insertIn("#print")
})

document.addEventListener("DOMContentLoaded",function(){
    // get tags info
    api.Update();
    const formulario  = new form("form#Data");
    formulario.getInput(".Date").value = new Date().toISOString().slice(0,10); 
    formulario.submit(e=>{
        let [Title,Description,Date] = e.inputs;
        api.addItem({
            id:api.items.length,
            title:Title.value,
            description:Description.value,
            date:Date.value,
            status:false
        })
    })
})
