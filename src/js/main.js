let api = new TodoApp();

api.on("error",({detail})=>{
    console.log(detail)
})

document.addEventListener("DOMContentLoaded",function(){
    // get tags info
    const formulario  = new form("form#Data");
    formulario.getInput(".Date").value = new Date().toISOString().slice(0,10); 
    formulario.submit(e=>{
        let [Title,Description,Date] = e.inputs;
        api.addItem({
            id:document.querySelector("#print").children.length,
            title:Title.value,
            description:Description.value,
            date:Date.value,
            status:false
        })
        const model = new template("template.modelItem");
        model.insertText("span.Title",Title.value);
        model.insertText("span.Description",Description.value);
        model.insertText("span.Date",Date.value);
        model.insertText("span.Id",document.querySelector("#print").children.length);
        model.insertIn("#print")
    })
})
