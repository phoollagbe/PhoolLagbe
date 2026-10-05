document.getElementById("year").textContent=new Date().getFullYear();

const form=document.getElementById("orderForm");
const select=document.getElementById("productSelect");
const msg=document.getElementById("orderMsg");

document.querySelectorAll(".add").forEach(btn=>{
  btn.addEventListener("click",()=>{
    const product=btn.dataset.product;
    const option=[...select.options].find(o=>o.textContent.startsWith(product));
    if(option) select.value=option.value;
    document.getElementById("order").scrollIntoView({behavior:"smooth"});
  });
});

form.addEventListener("submit",(e)=>{
  e.preventDefault();
  const data=new FormData(form);
  const phone=String(data.get("phone")).replace(/\s+/g,"");
  if(!/^01\d{9}$/.test(phone)){
    alert("সঠিক ১১ সংখ্যার বাংলাদেশি মোবাইল নম্বর দিন।");
    return;
  }
  if((data.get("payment")==="bKash" || data.get("payment")==="Nagad") && !String(data.get("transaction")).trim()){
    alert("Online payment করলে Transaction ID দিন।");
    return;
  }
  const order={
    name:data.get("name"),
    phone:data.get("phone"),
    address:data.get("address"),
    product:data.get("product"),
    delivery:data.get("delivery"),
    payment:data.get("payment"),
    transaction:data.get("transaction"),
    paidFrom:data.get("paidFrom"),
    note:data.get("note"),
    createdAt:new Date().toISOString()
  };
  console.log("PhoolLagbe order (demo):",order);
  msg.hidden=false;
  msg.textContent="অর্ডারের তথ্য নেওয়া হয়েছে। এখন এটি demo mode-এ আছে; Supabase database যুক্ত করলে অর্ডারটি আপনার admin panel-এ সংরক্ষিত হবে।";
  form.reset();
  msg.scrollIntoView({behavior:"smooth",block:"center"});
});
