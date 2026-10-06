document.getElementById("year").textContent = new Date().getFullYear();

const form = document.getElementById("orderForm");
const select = document.getElementById("productSelect");
const msg = document.getElementById("orderMsg");

// Delivery
const deliveryDate = document.getElementById("deliveryDate");
const deliveryTime = document.getElementById("deliveryTime");
const deliveryChargeBox = document.getElementById("deliveryChargeBox");
const deliveryChargeText = document.getElementById("deliveryChargeText");
const deliveryChargeNote = document.getElementById("deliveryChargeNote");

// Payment
const paymentMethod = document.getElementById("paymentMethod");
const onlinePaymentBox = document.getElementById("onlinePaymentBox");
const bkashPaymentInfo = document.getElementById("bkashPaymentInfo");
const nagadPaymentInfo = document.getElementById("nagadPaymentInfo");
const bankPaymentInfo = document.getElementById("bankPaymentInfo");
const transactionId = document.getElementById("transactionId");
const paidFrom = document.getElementById("paidFrom");
const copyBkash = document.getElementById("copyBkash");

// Supabase
const SUPABASE_URL = "https://tvjunajofnsaxpqkftga.supabase.co";
const SUPABASE_KEY = "sb_publishable_luOKViG1-9d55dba4KQ8rg_aQtwn3L3";

// --------------------------------------------------
// Product button
// --------------------------------------------------

document.querySelectorAll(".add").forEach(btn => {
  btn.addEventListener("click", () => {

    const product = btn.dataset.product;

    const option = [...select.options].find(
      o => o.textContent.startsWith(product)
    );

    if (option) {
      select.value = option.value;
    }

    document.getElementById("order").scrollIntoView({
      behavior: "smooth"
    });
  });
});


// --------------------------------------------------
// Set minimum delivery date = today
// --------------------------------------------------

function setMinimumDate() {

  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  deliveryDate.min = `${year}-${month}-${day}`;
}

setMinimumDate();


// --------------------------------------------------
// Calculate delivery charge
// 10:00 AM - 10:00 PM = 40
// 10:00 PM - 10:00 AM = 80
// --------------------------------------------------

function updateDeliveryCharge() {

  if (!deliveryDate.value || !deliveryTime.value) {
    deliveryChargeBox.hidden = true;
    return;
  }

  const [hour, minute] = deliveryTime.value.split(":").map(Number);

  let charge;
  let note;

  if (hour >= 10 && hour < 22) {

    charge = 40;

    note =
      "☀️ Daytime delivery (সকাল ১০টা–রাত ১০টা)";

  } else {

    charge = 80;

    note =
      "🌙 Midnight delivery (রাত ১০টা–সকাল ১০টা)";

  }

  deliveryChargeText.textContent = `৳${charge}`;
  deliveryChargeNote.textContent = note;

  deliveryChargeBox.hidden = false;
}

deliveryDate.addEventListener("change", updateDeliveryCharge);
deliveryTime.addEventListener("change", updateDeliveryCharge);


// --------------------------------------------------
// Payment method
// --------------------------------------------------

function updatePaymentFields() {

  const payment = paymentMethod.value;

  // Hide everything first
  onlinePaymentBox.hidden = true;

  bkashPaymentInfo.hidden = true;
  nagadPaymentInfo.hidden = true;
  bankPaymentInfo.hidden = true;

  transactionId.required = false;
  paidFrom.required = false;

  // Cash on Delivery
  if (payment === "Cash on Delivery") {
    return;
  }

  // Online payment
  onlinePaymentBox.hidden = false;

  transactionId.required = true;
  paidFrom.required = true;

  if (payment === "bKash") {

    bkashPaymentInfo.hidden = false;

  } else if (payment === "Nagad") {

    nagadPaymentInfo.hidden = false;

  } else if (payment === "Bank") {

    bankPaymentInfo.hidden = false;
  }
}

paymentMethod.addEventListener("change", updatePaymentFields);

updatePaymentFields();


// --------------------------------------------------
// Copy bKash number
// --------------------------------------------------

copyBkash.addEventListener("click", async () => {

  const number = "01614151656";

  try {

    await navigator.clipboard.writeText(number);

    const oldText = copyBkash.textContent;

    copyBkash.textContent = "✅ Copied!";

    setTimeout(() => {
      copyBkash.textContent = oldText;
    }, 1500);

  } catch (error) {

    alert("Number copy করা যায়নি। Numberটি হলো 01614151656");
  }
});


// --------------------------------------------------
// Order submit
// --------------------------------------------------

form.addEventListener("submit", async (e) => {

  e.preventDefault();

  const data = new FormData(form);

  // -----------------------------------------------
  // Phone validation
  // -----------------------------------------------

  const phone = String(data.get("phone") || "")
    .replace(/\s+/g, "");

  if (!/^01\d{9}$/.test(phone)) {

    alert("সঠিক ১১ সংখ্যার বাংলাদেশি মোবাইল নম্বর দিন।");

    return;
  }


  // -----------------------------------------------
  // Delivery date/time
  // -----------------------------------------------

  const selectedDate = String(
    data.get("deliveryDate") || ""
  ).trim();

  const selectedTime = String(
    data.get("deliveryTime") || ""
  ).trim();

  if (!selectedDate || !selectedTime) {

    alert("Delivery date এবং time নির্বাচন করুন।");

    return;
  }


  // -----------------------------------------------
  // Calculate delivery charge again
  // -----------------------------------------------

  const [hour] = selectedTime
    .split(":")
    .map(Number);

  const deliveryCharge =
    hour >= 10 && hour < 22 ? 40 : 80;


  // -----------------------------------------------
  // Payment validation
  // -----------------------------------------------

  const payment = String(
    data.get("payment") || ""
  ).trim();

  const transaction = String(
    data.get("transaction") || ""
  ).trim();

  const paidFromNumber = String(
    data.get("paidFrom") || ""
  ).trim();


  if (payment !== "Cash on Delivery") {

    if (!transaction) {

      alert("Online payment করলে Transaction ID দিন।");

      return;
    }

    if (!paidFromNumber) {

      alert("যে নম্বর থেকে payment করেছেন সেটি দিন।");

      return;
    }

    if (!/^01\d{9}$/.test(paidFromNumber)) {

      alert(
        "Payment করা নম্বরটি সঠিক ১১ সংখ্যার বাংলাদেশি মোবাইল নম্বর দিন।"
      );

      return;
    }
  }


  // -----------------------------------------------
  // Show saving message
  // -----------------------------------------------

  msg.hidden = false;

  msg.textContent =
    "অর্ডারটি সংরক্ষণ করা হচ্ছে...";


  // -----------------------------------------------
  // Supabase order
  // -----------------------------------------------

  const order = {

    customer_name:
      String(data.get("name") || "").trim(),

    phone: phone,

    address:
      String(data.get("address") || "").trim(),

    product:
      String(data.get("product") || "").trim(),

    delivery_date:
      selectedDate,

    delivery_time:
      selectedTime,

    delivery_charge:
      deliveryCharge,

    payment_method:
      payment,

    transaction_id:
      payment === "Cash on Delivery"
        ? ""
        : transaction,

    paid_from:
      payment === "Cash on Delivery"
        ? ""
        : paidFromNumber,

    status: "pending"
  };


  // -----------------------------------------------
  // Send to Supabase
  // -----------------------------------------------

  try {

    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/orders`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "apikey": SUPABASE_KEY
        },

        body: JSON.stringify(order)
      }
    );


    if (!response.ok) {

      const errorText = await response.text();

      console.error(
        "Supabase error:",
        response.status,
        errorText
      );

      throw new Error(errorText);
    }


    // ---------------------------------------------
    // Success
    // ---------------------------------------------

    msg.textContent =
      "✅ আপনার অর্ডার সফলভাবে গ্রহণ করা হয়েছে। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।";


    form.reset();

    deliveryChargeBox.hidden = true;

    updatePaymentFields();


    msg.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });


  } catch (error) {

    console.error(
      "ORDER ERROR:",
      error
    );

    msg.textContent =
      "❌ Supabase Error: " + error.message;

    msg.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  }

});
