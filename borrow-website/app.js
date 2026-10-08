const baseItems=[
{name:"Sony Headphones",meta:"Electronics · Verified",price:120,icon:"◉"},
{name:"Scientific Calculator",meta:"Study · Nearby",price:40,icon:"▣"},
{name:"Cricket Bat",meta:"Sports · Verified",price:80,icon:"◐"},
{name:"Cordless Drill",meta:"Tools · Nearby",price:150,icon:"◈"}];
let items=[...baseItems], selected=null;
const $=s=>document.querySelector(s);
function show(name){document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));$("#screen-"+name)?.classList.add("active");window.scrollTo(0,0);}
function money(n){return "₹"+Number(n).toLocaleString("en-IN")+"/day"}
function render(list=items,target="#items"){const el=$(target);if(!el)return;el.innerHTML=list.map((i,n)=>`<article class="item" data-item="${items.indexOf(i)}"><div class="item-art">${i.icon}</div><h3>${i.name}</h3><p>${i.meta}</p><p class="price">${money(i.price)}</p></article>`).join("")||"<p class='muted'>No items found yet.</p>";}
function openProduct(i){selected=i;$("#productDetail").innerHTML=`<div class="product-art">${i.icon}</div><h1>${i.name}</h1><p class="detail-meta">${i.meta}</p><div class="detail-price">${money(i.price)}</div><p class="muted">Condition verified by the owner. Handover details are shared after confirmation.</p><button class="primary" data-action="rental">Choose rental dates</button>`;show("product");}
function updateTotal(){if(!selected)return;const a=$("#startDate").value,b=$("#endDate").value;if(!a||!b){$("#rentalTotal").textContent=money(selected.price).replace("/day","");return}const days=Math.max(1,Math.ceil((new Date(b)-new Date(a))/86400000));$("#rentalTotal").textContent="₹"+days*selected.price;}
function saveListing(){const name=$("#itemName").value.trim(),price=Number($("#itemPrice").value);if(!name||!price){alert("Please add an item name and daily price.");return}items.unshift({name,meta:$("#itemCategory").value+" · New listing",price,icon:"◇"});render();show("owner");alert("Demo listing added. The next step will connect this to persistent listings.");}
document.addEventListener("click",e=>{
 const action=e.target.closest("[data-action]")?.dataset.action;
 if(action==="welcome")show("welcome"); if(action==="login")show("login");
 if(action==="otp"){const p=$("#phoneInput").value.replace(/\D/g,"");if(p.length!==10){alert("Enter a valid 10-digit mobile number.");return}$("#phonePreview").textContent="+91 "+p;show("otp")}
 if(action==="mode"){if($("#otpInput").value.length<4){alert("Enter the 4-digit demo OTP.");return}show("mode")}
 if(action==="home")show("home"); if(action==="profile")show("profile"); if(action==="trust")show("trust"); if(action==="owner")show("owner"); if(action==="add")show("add");
 if(action==="search"){show("search");$("#searchPageInput")?.focus();render(items,"#searchResults")}
 if(action==="categories")show("search");
 if(action==="product")show("product"); if(action==="rental"){if(!selected){return}show("rental")}
 if(action==="checkout"){if(!$("#startDate").value||!$("#endDate").value){alert("Choose both rental dates.");return}if(new Date($("#endDate").value)<new Date($("#startDate").value)){alert("Return date must be after the start date.");return}const days=Math.max(1,Math.ceil((new Date($("#endDate").value)-new Date($("#startDate").value))/86400000));$("#checkoutSummary").innerHTML=`<div><span>${selected.name}</span><strong>₹${selected.price}/day</strong></div><div><span>Rental period</span><strong>${days} day${days>1?"s":""}</strong></div><div class="total"><span>Total</span><strong>₹${days*selected.price}</strong></div>`;show("checkout")}
 if(action==="confirm"){localStorage.setItem("borrow_last_rental",selected?.name||"");$("#rentalCount").textContent="1";$("#confirmCode").textContent=Math.floor(1000+Math.random()*9000);show("confirmation")}
 if(action==="saveListing")saveListing();
 const card=e.target.closest("[data-item]");if(card)openProduct(items[Number(card.dataset.item)]);
 const mode=e.target.closest("[data-mode]")?.dataset.mode;if(mode){localStorage.setItem("borrow_mode",mode);show(mode==="owner"?"owner":"home")}
 const cat=e.target.closest("[data-category]")?.dataset.category;if(cat){show("search");$("#searchPageInput").value=cat;render(items.filter(i=>i.meta.startsWith(cat)),"#searchResults")}
});
$("#searchInput")?.addEventListener("input",e=>{const q=e.target.value.toLowerCase();render(items.filter(i=>(i.name+" "+i.meta).toLowerCase().includes(q)));});
$("#searchPageInput")?.addEventListener("input",e=>{const q=e.target.value.toLowerCase();render(items.filter(i=>(i.name+" "+i.meta).toLowerCase().includes(q)),"#searchResults")});
$("#startDate")?.addEventListener("change",updateTotal);$("#endDate")?.addEventListener("change",updateTotal);
render();