let api = new Tododb(localStorage.getItem("items")||localStorage.setItem("items","[]"))
.on("error",(a)=>console.warn(a))
.on("update",({target:db})=>{
    localStorage.setItem("items",JSON.stringify(db.db))
    document.querySelector("div#print").innerHTML = "";
    // system print
    // const modelP = new template("template.modelPrint");
    // db.db.map((e,i)=>{
    //     const modelI = new template("template.modelItem");
    //     modelI.getChild("button#itemDelete").addEventListener("click",
    //         ({target})=>api.del(target.parentNode.querySelector("[itemid]").getAttribute("itemid"))
    //     )
    //     modelI.getChild("button#itemEdit").addEventListener("click",
    //         ({target})=>id.value = target.parentNode.querySelector("[itemid]").getAttribute("itemid")
    //     )
    //     modelI.insertText("span.Title",e.title);
    //     modelI.insertText("span.Description",e.description);
    //     modelI.insertText("span.Date",e.date);
    //     modelI.getChild("[itemid]").setAttribute("itemid",i)
    //     modelP.insertElement(modelI.tag)
    // })
    // modelP.insertIn("#print")
})

const id = $("form#Data input.Id").val(api.length),
title = $("form#Data input.Title"),
description = $("form#Data input.Description"),
date = $("form#Data input.Date"),
done = $("form#Data input[type=checkbox].Done"),
clearInputs = ()=>{
    title.val("");
    description.val("");
    date.val(new Date().toISOString().slice(0,10));
    done[0].checked = false;
};

id.on("change",_=>{
    let item = api.get(+id.val());
    if(item){
        title.val(item.title);
        description.val(item.description);
        date.val(item.date);
        done[0].checked = item.status;
    }else clearInputs();
}).get(0).max = api.length;

$("form#Data").submit(e=>{
    e.preventDefault();
    const data = {
        title:title.val(),
        description:description.val(),
        date:date.val(),
        status:done.get(0).checked
    }
    if(!!api.get(id.val())) api.update(id.val(),data);
    else api.push(data);
    id.val(api.length).get(0).max = api.length;
    clearInputs();
})

api.init();