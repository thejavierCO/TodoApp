document.addEventListener("DOMContentLoaded",function(){
    // get tags info
    const formulario  = new form("form#Data");
    formulario.getInput(".Date").value = new Date().toISOString().slice(0,10); 
    formulario.submit(e=>{
        let [Title,Description,Date] = e.inputs;
        const model = new template("template.modelItem");
        model.insertText("span.Title",Title.value);
        model.insertText("span.Description",Description.value);
        model.insertText("span.Date",Date.value);
        model.insertText("span.Id",document.querySelector("#print").children.length);
        model.insertIn("#print")
    })
})
