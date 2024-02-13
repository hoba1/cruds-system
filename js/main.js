let inputtitle = document.querySelector(".input-title");
let inputprice = document.querySelector(".input-price");
let inputtaxes = document.querySelector(".input-taxes");
let inputads = document.querySelector(".input-ads");
let inputdiscount = document.querySelector(".input-discount");
let total = document.querySelector(".total");
let inputcount = document.querySelector(".input-count")
let inputcategory = document.querySelector(".input-category")
let createbtn = document.querySelector(".create-btn");
let inputsearch = document.querySelector(".input-search")
let searchbytitle = document.querySelector(".search-by-title")
let searchbycategory = document.querySelector(".search-by-category")

let mood = "create";
let tmp;

// get total

function totalnum(){
    if(inputprice.value != ""){
        total.classList.remove("bg-danger");
        total.classList.add("bg-success");
        if(inputdiscount.value != ""){
            total.innerHTML = `Total:${(+inputprice.value + +inputads.value + +inputtaxes.value) - +inputdiscount.value}`
        } else {
            total.innerHTML = `Total:${+inputprice.value + +inputads.value + +inputtaxes.value}`
        }
    } else {
        total.innerHTML = `Total:`
        total.classList.remove("bg-success");
        total.classList.add("bg-danger");
    }
}

// create product
let datapro = [];
if(localStorage.products != null){
    datapro = JSON.parse(localStorage.products)
}

createbtn.onclick = function(){
    let product = {
        title: inputtitle.value.toLowerCase(),
        price: inputprice.value,
        taxes: inputtaxes.value || 0,
        ads: inputads.value || 0,
        discount: inputdiscount.value || 0,
        total: total.innerHTML.slice(`${total.innerHTML.indexOf(":") + 1}`),
        count: inputcount.value || 1,
        category: inputcategory.value.toLowerCase()
    }

    if(inputtitle.value != "" && inputprice.value != "" && inputcategory.value != "" && product.count < 100){
        if(mood === "create"){
            for(let i = 0; i < product.count; i++){
                datapro.push(product);
            }
        } else{
            datapro[tmp] = product;
            createbtn.innerHTML = "Create";
            mood = "create"
            inputcount.style.display = "block"
        }
        clear()
    }
    // save in localstorage
    localStorage.setItem("products", JSON.stringify(datapro));
    read()
}

// clear inputs 
function clear(){
    inputtitle.value = "";
    inputprice.value = "";
    inputtaxes.value = "";
    inputads.value = "";
    inputdiscount.value = "";
    totalnum()
    inputcount.value = "";
    inputcategory.value = "";
}

// read data
let showdata = document.querySelector(".show");
function read(){
    let table = "";
    for(let i = 0; i < datapro.length; i++){
            table += `
            <tr>
                <td class="text-light p-1">${i + 1}</td>
                <td class="text-light p-1">${datapro[i].title}</td>
                <td class="text-light p-1">${datapro[i].price}</td>
                <td class="text-light p-1">${datapro[i].taxes}</td>
                <td class="text-light p-1">${datapro[i].ads}</td>
                <td class="text-light p-1">${datapro[i].discount}</td>
                <td class="text-light p-1">${datapro[i].total}</td>
                <td class="text-light p-1">${datapro[i].category}</td>
                <td class="text-light p-1"><button type="button" onclick=" updatedata(${i}) "class="btn btn-primary rounded-pill">Update</button></td>
                <td class="text-light p-1"><button type="button" onclick=" deletedata(${i}) " class="btn btn-primary rounded-pill">Delete</button></td>
            </tr>
            `
    }
    showdata.innerHTML = table

    let delallbtn = document.querySelector(".delallbtn");
    if(datapro.length > 0){
        delallbtn.innerHTML = `
        <button type="button" onclick=" deleteall() " class="btn btn-primary w-100 rounded-pill mb-3 delete-btn">Delete All (${datapro.length})</button>
        `
    } else {
        delallbtn.innerHTML = "";
    }
}
read()

//delete data
function deletedata(i){
    datapro.splice(i,1);
    localStorage.products = JSON.stringify(datapro);
    read()
}

// delete all 
function deleteall(){
    localStorage.clear()
    datapro.splice(0)
    read()
}

// update data
function updatedata(i){
    inputtitle.value = datapro[i].title
    inputprice.value = datapro[i].price
    inputtaxes.value = datapro[i].taxes
    inputads.value = datapro[i].ads
    inputdiscount.value = datapro[i].discount
    totalnum()
    inputcount.style.display = "none"
    inputcategory.value = datapro[i].category
    createbtn.innerHTML = "Update"
    mood = "update";
    tmp = i
    scroll({
        top:0,
        behavior:"smooth"
    })
}

// search
let searchmod = "title"

function getsearchmod(id){
    if(id == "title"){
        searchmod = "title"
    } else{
        searchmod = "category"
    }
    inputsearch.placeholder = `Search By ${id}`
    inputsearch.focus()
    inputsearch.value = "";
    read()
}

function searchdata(value){
    let table = "";
    for(let i = 0; i < datapro.length; i++){
        if(searchmod === "title"){
            if(datapro[i].title.includes(value.toLowerCase())){
                table += `
                <tr>
                    <td class="text-light p-1">${i + 1}</td>
                    <td class="text-light p-1">${datapro[i].title}</td>
                    <td class="text-light p-1">${datapro[i].price}</td>
                    <td class="text-light p-1">${datapro[i].taxes}</td>
                    <td class="text-light p-1">${datapro[i].ads}</td>
                    <td class="text-light p-1">${datapro[i].discount}</td>
                    <td class="text-light p-1">${datapro[i].total}</td>
                    <td class="text-light p-1">${datapro[i].category}</td>
                    <td class="text-light p-1"><button type="button" onclick=" updatedata(${i}) "class="btn btn-primary rounded-pill">Update</button></td>
                    <td class="text-light p-1"><button type="button" onclick=" deletedata(${i}) " class="btn btn-primary rounded-pill">Delete</button></td>
                </tr>
                `
            }
        } else{
            if(datapro[i].category.includes(value.toLowerCase())){
                table += `
                <tr>
                    <td class="text-light p-1">${i + 1}</td>
                    <td class="text-light p-1">${datapro[i].title}</td>
                    <td class="text-light p-1">${datapro[i].price}</td>
                    <td class="text-light p-1">${datapro[i].taxes}</td>
                    <td class="text-light p-1">${datapro[i].ads}</td>
                    <td class="text-light p-1">${datapro[i].discount}</td>
                    <td class="text-light p-1">${datapro[i].total}</td>
                    <td class="text-light p-1">${datapro[i].category}</td>
                    <td class="text-light p-1"><button type="button" onclick=" updatedata(${i}) "class="btn btn-primary rounded-pill">Update</button></td>
                    <td class="text-light p-1"><button type="button" onclick=" deletedata(${i}) " class="btn btn-primary rounded-pill">Delete</button></td>
                </tr>
                `
            }
        }
    }
    showdata.innerHTML = table
}