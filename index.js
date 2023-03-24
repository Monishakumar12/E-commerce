function addCounting(item){
    count= count + 1  ;
    document.getElementById("counting").innerText= count ;
    localStorage.setItem("addCount$",item );
   
}

var count=0;
// document.getElementById("counting").innerText= count;

// function Increment (){
//     count=count + 1;
//     document.getElementById("counting").innerText=count;
// }
// function decrement (){
//     count=count -1;
//     document.getElementById("counting").innerText=count;
// }


//add to cart

const addItem= document.querySelectorAll(".add_cart")
const cartShow= document.querySelector(".addingCart")

for(i=0; i < addItem.length;i++){
    addItem[i].addEventListener('click', (event)=>{
        cartCount();
        
    })
}
function cartCount() {
    let prdCount=localStorage.getItem('cartsCount');
    prdCount=parseInt(prdCount);
    if(prdCount){
        localStorage.setItem('cartsCount',prdCount + 1);
        cartShow.textContent=prdCount + 1;
    }else
    {
        localStorage.setItem('cartsCount',1);
        cartShow.textContent = prdCount = 1;
    }
}
const toastTrigger = document.getElementById('liveToastBtn')
const toastLiveExample = document.getElementById('liveToast')
if (toastTrigger) {
toastTrigger.addEventListener('click', () => {
const toast = new bootstrap.Toast(toastLiveExample)

toast.show()
})
}   







