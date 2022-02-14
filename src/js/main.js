
const id = $("form#Data input.Id"),
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

let api = new Tododb(localStorage.getItem("items")||localStorage.setItem("items","[]"))
.on("error",(a)=>console.warn(a))
.on("update",({target:db})=>{
    localStorage.setItem("items",JSON.stringify(db.db))
    document.querySelector("div#print").innerHTML = "";
    clearInputs();
    // system print
    const modelP = $($("template.modelPrint").get(0).content.cloneNode(true));
    db.db.map((e,i)=>{
        const modelI = $($("template.modelItem").get(0).content.cloneNode(true));
        modelI.find("button#itemDelete").click(
            ({target})=>api.del($(target).parent().attr("itemid"))
        )
        modelI.find("button#itemEdit").click(
            ({target})=>id.val($(target).parent().attr("itemid")).get(0).dispatchEvent(new Event("change"))
        )
        modelI.find("button#itemComplete").click(
            ({target})=>
                db.get($(target).parent().attr("itemid"))?
                    db.update($(target).parent().attr("itemid"),{
                        status:!db.get($(target).parent().attr("itemid")).status
                    })
                :undefined
        ).text(!e.status?"complete":"not complete");
        modelI.find("span.Title").text(e.title)
        modelI.find("span.Description").text(e.description)
        modelI.find("span.Date").text(e.date)
        modelI.find("[itemid]").attr("itemid",i)
        modelI.find("[itemid]").attr("status",e.status)
        modelP.append(modelI.get(0))
    })
    $("div#print").append(modelP[0]);
    id.val(db.length).get(0).max = db.length;
})

id.val(api.length).on("change",_=>{
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
})

api.init();