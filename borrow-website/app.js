const items=[
  {name:"Sony Headphones",meta:"Electronics · Verified",price:"₹120/day",icon:"◉"},
  {name:"Scientific Calculator",meta:"Study · Nearby",price:"₹40/day",icon:"▣"},
  {name:"Cricket Bat",meta:"Sports · Verified",price:"₹80/day",icon:"◐"},
  {name:"Cordless Drill",meta:"Tools · Nearby",price:"₹150/day",icon:"◈"}
];
const itemsEl=document.querySelector("#items");
itemsEl.innerHTML=items.map(i=>`<article class="item"><div class="item-art">${i.icon}</div><h3>${i.name}</h3><p>${i.meta}</p><p class="price">${i.price}</p></article>`).join("");

function show(name){
 document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
 document.querySelector("#screen-"+name)?.classList.add("active");
}
document.addEventListener("click",e=>{
 const action=e.target.closest("[data-action]")?.dataset.action;
 if(action==="home")show("home");
 if(action==="profile")show("profile");
 if(action==="add")show("add");
 if(action==="search")document.querySelector("#searchInput")?.focus();
});
document.querySelector("#searchInput")?.addEventListener("input",e=>{
 const q=e.target.value.toLowerCase();
 document.querySelectorAll(".item").forEach(card=>card.style.display=card.textContent.toLowerCase().includes(q)?"":"none");
});
