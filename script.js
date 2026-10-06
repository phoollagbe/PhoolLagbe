document.getElementById("year").textContent = new Date().getFullYear();

const form = document.getElementById("orderForm");
const select = document.getElementById("productSelect");
const msg = document.getElementById("orderMsg");

// Supabase
const SUPABASE_URL = "https://tvjunajofnsaxpqkftga.supabase.co";
const SUPABASE_KEY = "sb_publishable_luOKViG1-9d55dba4KQ8rg_aQtwn3L3";

// Product button
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

// Order submit
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = new FormData(form);

  const phone = String(data.get("phone") || "").replace(/\s+/g, "");

  // Check phone number
  if (!/^01\d{9}$/.test(phone)) {
    alert("সঠিক ১১ সংখ্যার বাংলাদেশি মোবাইল নম্বর দিন।");
    return;
  }

  // Check online payment transaction ID
  if (
    (data.get("payment") === "bKash" ||
      data.get("payment") === "Nagad") &&
    !String(data.get("transaction") || "").trim()
  ) {
    alert("Online payment করলে Transaction ID দিন।");
    return;
  }

  // Show saving message
  msg.hidden = false;
  msg.textContent = "অর্ডারটি সংরক্ষণ করা হচ্ছে...";

  // Data for Supabase
  const order = {
    customer_name: String(data.get("name") || "").trim(),
    phone: phone,
    address: String(data.get("address") || "").trim(),
    product: String(data.get("product") || "").trim(),
    delivery_time: String(data.get("delivery") || "").trim(),
    payment_method: String(data.get("payment") || "").trim(),
    transaction_id: String(data.get("transaction") || "").trim(),
    status: "pending"
  };

  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/orders`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": SUPABASE_KEY,
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

    // Success
    msg.textContent =
      "✅ আপনার অর্ডার সফলভাবে গ্রহণ করা হয়েছে। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।";

    form.reset();

    msg.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

  } catch (error) {
    console.error("ORDER ERROR:", error);

    msg.textContent =
      "❌ Supabase Error: " + error.message;

    msg.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  }
});
