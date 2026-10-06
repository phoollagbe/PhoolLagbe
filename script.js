const SUPABASE_URL="https://tvjunajofnsaxpqkftga.supabase.co";
const SUPABASE_KEY="YOUR_EXISTING_SUPABASE_PUBLISHABLE_KEY";

const PRODUCTS=[
{id:"rose",name:"গোলাপ",price:100,priceText:"১০টি — ১০০৳",image:"https://images.unsplash.com/photo-1494972308805-463bc619d34e?auto=format&fit=crop&w=900&q=88",desc:"তাজা সুন্দর গোলাপ—ভালোবাসা, surprise ও special moment-এর জন্য।",cats:["loved-one","love","birthday"]},
{id:"tuberose",name:"রজনীগন্ধা",price:0,priceText:"দাম অর্ডারের পর",image:"https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=900&q=88",desc:"সুগন্ধি fresh রজনীগন্ধা, অনুষ্ঠান ও প্রিয়জনের জন্য।",cats:["wedding","wedding-event","special"]},
{id:"gerbera",name:"জারবেরা",price:0,priceText:"দাম অর্ডারের পর",image:"https://images.unsplash.com/photo-1495231916356-a86217efff12?auto=format&fit=crop&w=900&q=88",desc:"রঙিন fresh gerbera—birthday ও cheerful surprise-এর জন্য।",cats:["birthday","loved-one","special"]},
{id:"lily",name:"লিলি",price:0,priceText:"দাম অর্ডারের পর",image:"https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=900&q=88",desc:"Elegant fresh lily bouquet বা custom arrangement-এর জন্য।",cats:["loved-one","special","wedding"]},
{id:"marigold",name:"গাঁদা ফুল",price:0,priceText:"মালা / decoration",image:"https://images.unsplash.com/photo-1597848212624-e19f3e6a2f18?auto=format&fit=crop&w=900&q=88",desc:"মালা, অনুষ্ঠান ও decoration-এর জন্য fresh গাঁদা ফুল।",cats:["wedding-event","wedding","special"]},
{id:"bouquet",name:"ফুলের তোড়া",price:250,priceText:"২৫০৳ থেকে",image:"https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=900&q=88",desc:"আপনার পছন্দ অনুযায়ী custom premium bouquet।",cats:["loved-one","love","birthday","anniversary"]},
{id:"box",name:"Flower Box",price:500,priceText:"৫০০৳ থেকে",image:"https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=900&q=88",desc:"Premium flower box—একটি memorable gift-এর জন্য।",cats:["love","birthday","anniversary","special"]},
{id:"gajra",name:"গাজরা",price:0,priceText:"দাম অর্ডারের পর",image:"https://images.unsplash.com/photo-1494336934272-f5c1e7d8b6a8?auto=format&fit=crop&w=900&q=88",desc:"Fresh flower gajra—বিবাহ ও special occasion-এর জন্য।",cats:["wedding","wedding-event","special"]},
{id:"garland",name:"গাঁদা ফুলের মালা",price:50,priceText:"৫০৳ থেকে",image:"https://images.unsplash.com/photo-1589578527966-fdac0f44566c?auto=format&fit=crop&w=900&q=88",desc:"প্রতিটি মালায় ১টি গোলাপ থাকবে। ১/২/৩/৫/১০টি pack available।",cats:["wedding-event","wedding","special"]}
];

const CATS={
"loved-one":["প্রিয় মানুষটির জন্য","আপনার প্রিয় মানুষের কাছে ছোট্ট surprise পৌঁছে দিন।"],
"love":["ভালোবাসা","ভালোবাসার মানুষটির জন্য bouquet, rose ও flower box।"],
"wedding":["বিবাহ","বিবাহের সুন্দর দিনটিকে আরও ফুলেল করে তুলুন।"],
"wedding-event":["বিবাহের অনুষ্ঠান","বিয়ে, holud, stage ও অনুষ্ঠান decoration-এর জন্য।"],
"anniversary":["বিবাহবার্ষিকী","একসাথে কাটানো সুন্দর সময়ের জন্য romantic flowers।"],
"birthday":["জন্মদিন","Birthday surprise-এর জন্য fresh flowers ও gift-ready arrangements।"],
"special":["আপনার বিশেষ কোনো অনুষ্ঠান","আপনার event অনুযায়ী custom flower arrangement।"]
};

let cart=JSON.parse(localStorage.getItem("phoollagbe_cart")||"[]");
const page=document.getElementById("page");

function money(n){return n?`৳${n}`:"দাম পরে নিশ্চিত হবে"}
function saveCart(){localStorage.setItem("phoollagbe_cart",JSON.stringify(cart));updateCartCount()}
function updateCartCount(){const n=cart.reduce((s,x)=>s+x.qty,0);document.getElementById("cartCount").textContent=n;document.getElementById("mobileCartCount").textContent=n}
function findProduct(id){return PRODUCTS.find(p=>p.id===id)}

function productCard(p){
return `<article class="product-card"><a href="#product/${p.id}"><img class="product-img" src="${p.image}" alt="${p.name}"></a><div class="product-body"><h3>${p.name}</h3><p class="price">${p.priceText}</p><p class="muted">${p.desc.slice(0,68)}…</p><a class="btn" href="#product/${p.id}">বিস্তারিত দেখুন</a></div></article>`
}
function addCart(id,qty=1){const p=findProduct(id);const old=cart.find(x=>x.id===id);if(old)old.qty+=qty;else cart.push({id,qty});saveCart();toast(`${p.name} কার্টে যোগ হয়েছে 🛍️`)}
function toast(t){const e=document.querySelector(".toast")||Object.assign(document.createElement("div"),{className:"toast"});e.textContent=t;document.body.appendChild(e);e.classList.add("show");setTimeout(()=>e.classList.remove("show"),1700)}

function home(){
page.innerHTML=`<section class="hero"><div class="wrap hero-grid"><div><span class="eyebrow">🌷 রংপুর শহরে fresh flower delivery</span><h1>প্রিয় মানুষটির জন্য <span>ফুল লাগবে?</span></h1><p>জন্মদিন, ভালোবাসা, বিবাহ, anniversary কিংবা যেকোনো special দিনে সুন্দর fresh ফুল পৌঁছে দিন প্রিয় মানুষের দরজায়।</p><div class="actions"><a class="btn" href="#category/loved-one">ফুল দেখুন</a><a class="btn dark" href="#category/love">Love Collection</a></div><div class="trust"><span>✓ 24/7 Order</span><span>✓ Same-day delivery</span><span>✓ Rangpur City</span></div></div><div class="hero-art"><img src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1100&q=90" alt="Fresh flowers"><div class="floating-card">🌸 Fresh flowers<br><b>Made with love</b></div></div></div></section>
<section class="section"><div class="wrap"><div class="section-head"><div><span class="eyebrow">🌸 Collection</span><h2>আপনার মুহূর্তের জন্য ফুল</h2></div><p class="muted">একটি ফুল হোক বা পুরো bouquet—আপনার পছন্দ অনুযায়ী।</p></div><div class="category-pills">${Object.entries(CATS).map(([id,x])=>`<a class="pill" href="#category/${id}">${x[0]}</a>`).join("")}</div><div class="product-grid" style="margin-top:24px">${PRODUCTS.slice(0,8).map(productCard).join("")}</div></div></section>
<section class="section"><div class="wrap"><div class="offer"><div><span class="eyebrow">🌼 Special Offer</span><h2>গাঁদা ফুলের মালা</h2><p>প্রতিটি মালায় ১টি গোলাপ থাকবে।</p><a class="btn" href="#product/garland">অর্ডার দেখুন</a></div><div class="price-list"><span>১টি <b>৫০৳</b></span><span>২টি <b>৭০৳</b></span><span>৩টি <b>৮০৳</b></span><span>৫টি <b>১০০৳</b></span><span>১০টি <b>১৫০৳</b></span></div></div></div></section>
${infoSections()}`;
}
function infoSections(){
return `<section class="section" id="delivery"><div class="wrap"><div class="section-head"><div><span class="eyebrow">🚚 Delivery</span><h2>রংপুর শহরে 24/7 অর্ডার</h2></div><p class="muted">আপনার সময় অনুযায়ী delivery slot বেছে নিন।</p></div><div class="features"><div class="feature">☀️ <b>১০am–১০pm</b><br><span>Delivery charge <strong>৪০৳</strong></span></div><div class="feature">🌙 <b>১০pm–১০am</b><br><span>Midnight charge <strong>৮০৳</strong></span></div><div class="feature">⚡ <b>Same-day</b><br><span>সম্ভব হলে একই দিনে</span></div><div class="feature">🎁 <b>Surprise</b><br><span>Gift card available</span></div></div></div></section>
<section class="section"><div class="wrap about-box" id="about"><div><span class="eyebrow">💗 আমাদের সম্পর্কে</span><h2>ফুল শুধু পণ্য নয়—একটা অনুভূতি।</h2><p>PhoolLagbe-এর লক্ষ্য রংপুর শহরে fresh flowers অর্ডারকে সহজ, সুন্দর ও memorable করা।</p><div class="checklist"><div class="check">✓ Fresh flower selection</div><div class="check">✓ সুন্দর packaging</div><div class="check">✓ Custom bouquet</div><div class="check">✓ Same-day & midnight delivery</div><div class="check">✓ Cash on Delivery</div></div></div><div><img class="team-photo" src="1000067927.jpg" alt="PhoolLagbe team"></div></div></section>
<footer class="footer" id="contact"><div class="wrap footer-grid"><div><div class="brand">🌷 Phool<span>Lagbe</span></div><p>Fresh Flowers, Happy Moments 🌸</p><p>রংপুর শহরের flower delivery service.</p></div><div><b>যোগাযোগ</b><a href="tel:01410013203">📞 01410013203</a><a href="https://wa.me/01410013203" target="_blank">◉ WhatsApp</a><a href="https://www.facebook.com/share/19jzZS166f/" target="_blank">Facebook</a></div><div><b>Payment</b><p>bKash / Nagad<br>01614151656<br>Cash on Delivery</p></div></div><div class="wrap footer-bottom">© ${new Date().getFullYear()} PhoolLagbe.com — Rangpur</div></footer>`;
}
function category(id){
const c=CATS[id]||CATS.lovedOne;const items=PRODUCTS.filter(p=>p.cats.includes(id));
page.innerHTML=`<section class="page"><div class="wrap"><div class="page-title"><span class="eyebrow">🌷 PhoolLagbe Collection</span><h1>${c[0]}</h1><p class="muted">${c[1]}</p></div><div class="category-pills">${Object.entries(CATS).map(([k,v])=>`<a class="pill ${k===id?"active":""}" href="#category/${k}">${v[0]}</a>`).join("")}</div><div class="product-grid" style="margin-top:30px">${(items.length?items:PRODUCTS).map(productCard).join("")}</div></div></section>`;
}
function product(id){
const p=findProduct(id);if(!p)return home();
let qty=1;
page.innerHTML=`<section class="page"><div class="wrap"><a class="muted" href="#home">← Home</a><div class="product-detail" style="margin-top:22px"><img class="detail-image" src="${p.image}" alt="${p.name}"><div><span class="eyebrow">Fresh • Premium</span><h1 class="page-title">${p.name}</h1><div class="detail-price">${p.priceText}</div><p class="muted">${p.desc}</p><div class="info-card">🚚 Day delivery: <b>৪০৳</b> • Midnight: <b>৮০৳</b></div><div class="info-card">📍 রংপুর শহরে delivery</div><div class="quantity"><button class="qty-btn" id="minus">−</button><span class="qty-number" id="qty">1</span><button class="qty-btn" id="plus">+</button></div><div class="actions"><button class="btn" id="add">🛍️ Add to Cart</button><button class="btn dark" id="buy">এখনই অর্ডার করুন</button></div></div></div></div></section>`;
document.getElementById("minus").onclick=()=>{qty=Math.max(1,qty-1);document.getElementById("qty").textContent=qty};
document.getElementById("plus").onclick=()=>{qty++;document.getElementById("qty").textContent=qty};
document.getElementById("add").onclick=()=>addCart(id,qty);
document.getElementById("buy").onclick=()=>{addCart(id,qty);location.hash="#checkout"};
}
function cartPage(){
if(!cart.length){page.innerHTML=`<section class="page"><div class="wrap"><div class="empty"><h1>আপনার Cart এখনো খালি 🌸</h1><p class="muted">পছন্দের ফুল বেছে নিয়ে এখানে যোগ করুন।</p><a class="btn" href="#home">ফুল দেখুন</a></div></div></section>`;return}
let subtotal=cart.reduce((s,x)=>s+(findProduct(x.id).price||0)*x.qty,0);
page.innerHTML=`<section class="page"><div class="wrap"><div class="page-title"><span class="eyebrow">🛍️ Your Cart</span><h1>আপনার পছন্দের ফুল</h1></div><div class="cart-list">${cart.map(x=>{const p=findProduct(x.id);return `<div class="cart-item"><img src="${p.image}" alt=""><div><b>${p.name}</b><div class="muted">${p.priceText}</div><div class="quantity" style="margin:6px 0"><button class="qty-btn" onclick="changeCart('${p.id}',-1)">−</button><span class="qty-number">${x.qty}</span><button class="qty-btn" onclick="changeCart('${p.id}',1)">+</button></div></div><button class="btn soft" onclick="removeCart('${p.id}')">Remove</button></div>`}).join("")}</div><div class="cart-summary"><div>Product subtotal</div><h2>${subtotal?`৳${subtotal}`:"দাম অর্ডারের পর নিশ্চিত হবে"}</h2><p>Delivery charge checkout-এ সময় অনুযায়ী যোগ হবে।</p><a class="btn" href="#checkout">Checkout →</a></div></div></section>`;
}
window.changeCart=(id,d)=>{const x=cart.find(x=>x.id===id);if(x){x.qty=Math.max(0,x.qty+d);if(!x.qty)cart=cart.filter(y=>y.id!==id);saveCart();cartPage()}};
window.removeCart=id=>{cart=cart.filter(x=>x.id!==id);saveCart();cartPage()};

function checkout(){
if(!cart.length){location.hash="#cart";return}
const items=cart.map(x=>`${findProduct(x.id).name} × ${x.qty}`).join(", ");
page.innerHTML=`<section class="page"><div class="wrap"><div class="page-title"><span class="eyebrow">📦 Checkout</span><h1>অর্ডার সম্পূর্ণ করুন</h1><p class="muted">আপনার Cart-এর সব পণ্য একসাথে অর্ডার হবে।</p></div><div class="form-card"><form id="checkoutForm" class="form-grid"><div class="info-card">🛍️ <b>পণ্য:</b> ${items}</div><label class="field">নাম<input name="name" required placeholder="আপনার নাম"></label><label class="field">ফোন নম্বর<input name="phone" required inputmode="tel" placeholder="01XXXXXXXXX"></label><label class="field">Delivery address<textarea name="address" required placeholder="রংপুর শহরের পূর্ণ ঠিকানা"></textarea></label><label class="field">Delivery Date<input type="date" name="deliveryDate" id="deliveryDate" required></label><label class="field">Delivery Time<input type="time" name="deliveryTime" id="deliveryTime" required></label><div id="charge" class="payment-box">🚚 Delivery charge: সময় নির্বাচন করলে দেখা যাবে</div><label class="field">Payment method<select name="payment" id="payment"><option>Cash on Delivery</option><option>bKash</option><option>Nagad</option><option>Bank</option></select></label><div id="online" class="payment-box" hidden><b>Payment:</b> bKash/Nagad: 01614151656<br><small>Transaction ID এবং payment করা নম্বর দিন।</small><label class="field" style="margin-top:12px">Transaction ID<input name="transaction" id="transaction" placeholder="TX123456"></label><label class="field">যে নম্বর থেকে payment করেছেন<input name="paidFrom" id="paidFrom" inputmode="tel" placeholder="01XXXXXXXXX"></label></div><label class="field">অতিরিক্ত নির্দেশনা<textarea name="note" placeholder="Gift message / bouquet note"></textarea></label><button class="btn" type="submit">অর্ডার নিশ্চিত করুন</button><div id="checkoutMsg"></div></form></div></div></section>`;
const d=document.getElementById("deliveryDate"),t=document.getElementById("deliveryTime");const now=new Date();d.min=new Date(now.getTime()-now.getTimezoneOffset()*60000).toISOString().slice(0,10);
function charge(){if(!t.value){document.getElementById("charge").textContent="🚚 Delivery charge: সময় নির্বাচন করলে দেখা যাবে";return}const h=+t.value.split(":")[0];document.getElementById("charge").innerHTML=h>=10&&h<22?"☀️ Daytime delivery — <b>৪০৳</b>":"🌙 Midnight delivery — <b>৮০৳</b>"}t.onchange=charge;
document.getElementById("payment").onchange=e=>document.getElementById("online").hidden=e.target.value==="Cash on Delivery";
document.getElementById("checkoutForm").onsubmit=submitOrder;
}
async function submitOrder(e){
e.preventDefault();const f=new FormData(e.target),phone=String(f.get("phone")).replace(/\s/g,""),paid=String(f.get("paidFrom")||"").replace(/\s/g,"");if(!/^01\d{9}$/.test(phone)){alert("সঠিক ১১ সংখ্যার বাংলাদেশি মোবাইল নম্বর দিন।");return}const time=String(f.get("deliveryTime")),h=+time.split(":")[0],charge=h>=10&&h<22?40:80;const payment=String(f.get("payment"));if(payment!=="Cash on Delivery"){if(!f.get("transaction")){alert("Transaction ID দিন।");return}if(!/^01\d{9}$/.test(paid)){alert("Payment করা নম্বরটি সঠিক ১১ সংখ্যার দিন।");return}}
const products=cart.map(x=>`${findProduct(x.id).name} × ${x.qty}`).join(", ");const order={customer_name:String(f.get("name")).trim(),phone,address:String(f.get("address")).trim(),product:products,delivery_date:f.get("deliveryDate"),delivery_time:time,delivery_charge:charge,payment_method:payment,transaction_id:payment==="Cash on Delivery"?"":String(f.get("transaction")||""),paid_from:payment==="Cash on Delivery"?"":paid,status:"pending"};
const msg=document.getElementById("checkoutMsg");msg.className="payment-box";msg.textContent="অর্ডারটি সংরক্ষণ করা হচ্ছে...";
try{const r=await fetch(`${SUPABASE_URL}/rest/v1/orders`,{method:"POST",headers:{"Content-Type":"application/json","apikey":SUPABASE_KEY},body:JSON.stringify(order)});if(!r.ok)throw new Error(await r.text());cart=[];saveCart();page.innerHTML=`<section class="page"><div class="wrap"><div class="success"><h1>🎉 অর্ডার সফল!</h1><p>আপনার অর্ডার আমরা পেয়েছি। শীঘ্রই আপনার সাথে যোগাযোগ করব।</p><a class="btn dark" href="#home">হোমে ফিরে যান</a></div></div></section>`}catch(err){msg.className="payment-box";msg.textContent="❌ অর্ডার সংরক্ষণ করা যায়নি: "+err.message}}
function searchPage(){
page.innerHTML=`<section class="page"><div class="wrap"><div class="page-title"><span class="eyebrow">⌕ Search</span><h1>ফুল খুঁজুন</h1></div><input id="searchInput" class="search-box" placeholder="গোলাপ, bouquet, flower box..."><div id="searchResults" class="product-grid" style="margin-top:25px"></div></div></section>`;
const inp=document.getElementById("searchInput"),res=document.getElementById("searchResults");function run(){const q=inp.value.toLowerCase();res.innerHTML=PRODUCTS.filter(p=>(p.name+p.desc).toLowerCase().includes(q)).map(productCard).join("")||`<div class="empty">কিছু পাওয়া যায়নি 🌸</div>`}inp.oninput=run;run()
}
function signin(){page.innerHTML=`<section class="page"><div class="wrap"><div class="form-card"><span class="eyebrow">♡ My Profile</span><h1>Sign In</h1><p class="muted">Login system database connection-এর পর চালু করা যাবে। আপাতত আপনার Cart browser-এ محفوظ থাকবে।</p><a class="btn" href="#home">Continue Shopping</a></div></div></section>`}
function render(){const hash=location.hash.slice(1)||"home";if(hash==="home")home();else if(hash==="cart")cartPage();else if(hash==="checkout")checkout();else if(hash==="search")searchPage();else if(hash==="signin")signin();else if(hash==="delivery"){home();setTimeout(()=>document.getElementById("delivery")?.scrollIntoView(),30)}else if(hash==="about"){home();setTimeout(()=>document.getElementById("about")?.scrollIntoView(),30)}else if(hash==="contact"){home();setTimeout(()=>document.getElementById("contact")?.scrollIntoView(),30)}else if(hash.startsWith("product/"))product(hash.split("/")[1]);else if(hash.startsWith("category/"))category(hash.split("/")[1]);else home();updateCartCount();window.scrollTo(0,0)}
document.getElementById("menuTrigger").onclick=()=>{document.getElementById("drawer").classList.add("open");document.getElementById("drawerBackdrop").classList.add("show")};
document.getElementById("drawerClose").onclick=closeDrawer;document.getElementById("drawerBackdrop").onclick=closeDrawer;document.querySelectorAll(".drawer a").forEach(a=>a.onclick=closeDrawer);function closeDrawer(){document.getElementById("drawer").classList.remove("open");document.getElementById("drawerBackdrop").classList.remove("show")}
window.addEventListener("hashchange",render);render();