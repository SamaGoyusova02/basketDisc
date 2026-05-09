let Maincontainer = document.getElementById('Maincontainer')
let allClothes = []
fetch('https://69ff27888c70b15fa3cb1c03.mockapi.io/clothes')
.then(resp => resp.json())
.then(data => {
    allClothes = data

    data.map(item => {
        Maincontainer.innerHTML += `
             <div class=" w-full max-w-[220px] pb-4 rounded-[10px] overflow-hidden shadow-[0_0_10px_#01df82] ">
              <div class="overflow-hidden">  <img class=" w-full max-w-[220px] h-[130px] hover:scale-[1.1] duration-300 ease-in-out object-contain" src="${item.image}" alt=""></div>
                <div class="px-2">
                    <h2 class="text-[#01df82] mt-1.5">${item.title}</h2>
                    <p class="text-[.7em] text-white ">${item.desc}</p>
                   <div class="flex justify-between px-1 items-center mt-2">
                     <div class="mt-2">
                        <p  class="bg-[#01df82] rounded-[6px] text-[#030f0f] w-full max-w-[60px] h-[24px] text-[.8em] flex justify-center items-center">${item.discount} ₼</p>
                        <p class="w-[60px] flex justify-center items-center text-[.8em] text-[#01df82] line-through ">${item.price} ₼</p>
                    </div>
                    <button onclick="addBasket(${item.id})" class="bg-[#01df82] w-full max-w-[60px] h-[24px] text-[.8em] flex justify-center items-center rounded-[6px] text-[#030f0f]">+ Add</button>
                   </div>
                </div>
            </div>
        `
    })
})

let say = document.getElementById('say')


let sebet = []
function addBasket(id){
    let existing = sebet.find(item => item.id == id)
    if(existing){
        existing.count += 1   
    }
    else{ 
       sebet.push({id : id , count : 1})
    }
     say.innerHTML = sebet.length
     showsebet()
}

let mebleg = document.getElementById('mebleg')
let endirim = document.getElementById('endirim')
let yekun = document.getElementById('yekun')
let faiz =document.getElementById('faiz')
function showsebet(){
    let total = 0
    let mebleg1 = 0
    let endirim1 = 0
    let yekun1 = 0
    let basketContainer = document.getElementById('basketContainer')
        basketContainer.innerHTML = sebet.map((item , index) =>{
        const clo = allClothes.find(c => c.id == item.id)
        mebleg1 += clo.price * item.count
        endirim1 +=  (clo.price - clo.discount) * item.count
        yekun1 += clo.discount * item.count

        return `
                     <div class="flex justify-between px-5 items-center text-[#01df82] ">
                        <img class="w-[60px]" src="${clo.image}" alt="">
                        <p>${clo.title}</p>
                        <p>${clo.price * item.count} ₼</p>
                    </div>
        `
    }).join('')
    yekunDeyer = mebleg1 - endirim1
    mebleg.innerHTML = `${mebleg1} ₼`
    endirim.innerHTML = `${endirim1} ₼`
    yekun.innerHTML = `${yekun1} ₼`
    
   
}

    function tamamla(){
        if(!faiz.value){
            alert('Endirim kuponu daxil et !')
        }
        else{
             yekun.innerHTML = `${yekunDeyer * Number(faiz.value) / 100} ₼`
        }
        faiz.value = ""
    }