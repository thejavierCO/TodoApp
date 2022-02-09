document.addEventListener("DOMContentLoaded",function(){
    const form  = document.getElementById("post_form");
    const ItemModel = document.querySelector("template.modelItem");
    form.querySelector("#post_date").value = new Date().toISOString().slice(0,10); 
    form.onsubmit = e=>{
        e.preventDefault();
        const title = e.target.querySelector("#post_title").value,
        desc  = e.target.querySelector("#post_description").value,
        date  = e.target.querySelector("#post_date").value;
        let clone = ItemModel.content.cloneNode(true);
        clone.querySelector(".Title").innerText = title;
        clone.querySelector(".Description").innerText = desc;
        clone.querySelector(".Date").innerText = date;
        document.querySelector("#print").appendChild(clone);
    }
})
