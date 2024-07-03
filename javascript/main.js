let sname=document.getElementById("name");
let surl=document.getElementById("url");
let table=document.getElementById("table");
let tablebody=document.getElementById("content");
let search=document.getElementById("search")
let arr=[];
let book={};

if(localStorage.getItem('item')!==null){
    arr=JSON.parse(localStorage.getItem('item'));
    display(arr);
}

function push(){
   if(valid(sname)&&valid(surl)){
    book={
        sitename:sname.value,
        siteurl:surl.value
    }
    
        arr.push(book);
        display(arr);
        localStorage.setItem('item',JSON.stringify(arr));
        clear();
   }
}

function clear(){
    sname.value="";
    surl.value="";
    sname.classList.remove('is-invalid','is-valid');
    surl.classList.remove('is-invalid','is-valid');



}

function display(any){
    table.style.display = any.length > 0 ? "block" : "none";   
    let cartona="";
    for(let i=0;i<any.length;i++){
        cartona+=`
                <tr>
                <td class="py-3">${i+1}</td>
                <td>${any[i].sitename}</td>
                <td>
                    <a href="${any[i].siteurl}" target="_blank" class="btn btn-success">                  
                    <i class="fa-solid fa-eye pe-2"></i>Visit</a></td>
                <td>
                    <button class="btn btn-danger pe-2" onclick="deletesite(${i})">
                    <i class="fa-solid fa-trash-can pe-2"></i>Delete</button>
                </td>
                </tr>

        `
    }
    tablebody.innerHTML=cartona;
}
function deletesite(index){
    arr.splice(index, 1);
    display(arr);
    localStorage.setItem('item', JSON.stringify(arr));

}
function searchbook() {
    let searchTerm = search.value.toLowerCase();
    let filteredSites = arr.filter((item) => item.sitename.toLowerCase().includes(searchTerm));
    display(filteredSites);
}

function valid(element){
    var regex = {
        name: /^([a-z]{3})[a-z]*$/i,
        url:/^(https?:\/\/)?(www.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}([a-zA-Z0-9@:%\\_+-.~#?&//=]*)?$/
        };


    if (regex[element.id].test(element.value)) {
        element.classList.add('is-valid');
        element.classList.remove('is-invalid');
        return true;
    } else {
        element.classList.remove('is-valid');
        element.classList.add('is-invalid');
        return false
    }
}
