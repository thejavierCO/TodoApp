document.addEventListener("DOMContentLoaded",function(){
    // get tags info
    const formulario  = new form("form#Data");
    formulario.getInput(".Date").setValue(new Date().toISOString().slice(0,10)); 
    formulario.submit(e=>{
        console.log(e.inputs)
        // const model = new template("template.modelItem");
        // // get info
        // const title = e.target.querySelector("#post_title").value,
        //       desc  = e.target.querySelector("#post_description").value,
        //       date  = e.target.querySelector("#post_date").value;
        // // config print
        // if(title)model.insertText("span.Title",title);
        // if(desc)model.insertText("span.Description",desc);
        // if(date)model.insertText("span.Date",date);
        // model.insertText("span.Id",document.querySelector("#print").getElementsByTagName("item").length);
        // // start print
        // model.insert("#print")
    })
})
