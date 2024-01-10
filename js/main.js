var siteName=document.getElementById("BookmarkName")
var siteUrl=document.getElementById("WebsiteURL")
var boxContainer=document.getElementById("boxContainer")
var closeEl=document.getElementById("close")
var sitesList=[]
if(localStorage.getItem("list") !=null){
    sitesList=JSON.parse(localStorage.getItem("list"))
    displayData()
}
function addsite() {
    if(validName()==true && validUrl()==true){
        if (isExist()==true) {
            document.getElementById("exist").innerHTML="URL is exist"
        } else {
            var site ={
            name:siteName.value ,
            url:siteUrl.value 
        }
        sitesList.push(site)
        localStorage.setItem("list",JSON.stringify(sitesList))
        displayData()
        clearForm()
        }
    }else{
        boxContainer.style.display='flex'
    }
} 
function isExist(){
    for (let i = 0; i < sitesList.length; i++) {
        if(sitesList[i].url.toLowerCase()==siteUrl.value.toLowerCase()){
            return true
        }
    }
}

function displayData(){
    var temp=''
    for (let i = 0; i < sitesList.length; i++) {
        temp+=`<tr>
        <td>`+(i+1)+`</td>
        <td>`+sitesList[i].name+`</td>
        <td>
            <a href="${sitesList[i].url}" target="_blank" class="btn "><i class="fa-solid fa-eye pe-2"></i> Visit</a>
        </td>
        <td>
            <button onclick="deleteSite(`+i+`)" class="btn "><i class="fa-solid fa-trash-can"></i> delete</button>
        </td>
    </tr>`
        
    }
    document.getElementById("myData").innerHTML=temp
}
function clearForm(){
    siteName.value=""
    siteUrl.value=""
    siteName.classList.remove('is-invalid')
    siteName.classList.remove('is-valid')
    siteUrl.classList.remove('is-invalid')
    siteUrl.classList.remove('is-valid')
    document.getElementById("exist").classList.add('d-none')
}
function deleteSite(x){
    sitesList.splice(x,1)
    localStorage.setItem("list",JSON.stringify(sitesList))
    displayData()
    
}

siteName.addEventListener('keyup',validName)
function validName(){
    var ragName=/^[A-Z][a-z]{3,20}$/
    if(ragName.test(siteName.value)==true){
        siteName.classList.add('is-valid')
        siteName.classList.remove('is-invalid')
        return true
    }else{
        siteName.classList.add('is-invalid')
        siteName.classList.remove('is-valid')
        return false
    }
}
siteUrl.addEventListener('keyup',validUrl)
function validUrl(){
    var ragUrl=/^(http|https):\/\/www\.[a-zA-Z]{3,20}\.[a-z]{2,3}$/
    if(ragUrl.test(siteUrl.value)==true){
        siteUrl.classList.add('is-valid')
        siteUrl.classList.remove('is-invalid')
        return true
    }else{
        siteUrl.classList.add('is-invalid')
        siteUrl.classList.remove('is-valid')
        return false
    }
}
closeEl.addEventListener("click",closeSlide)
function closeSlide(){
    boxContainer.style.display='none'
}
