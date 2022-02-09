document.addEventListener("DOMContentLoaded",function(){
    // get tags info
    const form  = document.getElementById("post_form");
    const ItemModel = document.querySelector("template.modelItem");
    // config input date
    form.querySelector("#post_date").value = new Date().toISOString().slice(0,10); 
    // content loading
    form.onsubmit = e=>{
        // function default
        e.preventDefault();
        // get info
        const title = e.target.querySelector("#post_title").value,
        desc  = e.target.querySelector("#post_description").value,
        date  = e.target.querySelector("#post_date").value;
        // config print
        let clone = ItemModel.content.cloneNode(true);
        
        if(title)clone.querySelector("span.Title").innerText = title;
        if(desc)clone.querySelector("span.Description").innerText = desc;
        if(date)clone.querySelector("span.Date").innerText = date;
        clone.querySelector("item span.Id").innerText = [
            "[",
            document.querySelector("#print").getElementsByTagName("item").length,
            "] -"
        ].join("");
        // start print
        document.querySelector("#print").appendChild(clone);
    }
})
