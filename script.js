document.addEventListener("DOMContentLoaded", function () {

    // =========================
    // Product Selection
    // =========================

    window.selectProduct = function (productName) {

        const productSelect = document.getElementById("product");
        const orderSection = document.getElementById("order");

        if (productSelect) {
            productSelect.value = productName;
        }

        if (orderSection) {
            orderSection.scrollIntoView({
                behavior: "smooth"
            });
        }

    };


    // =========================
    // Order Form
    // =========================

    const orderForm = document.getElementById("orderForm");
    const orderMessage = document.getElementById("orderMessage");


    if (orderForm) {

        orderForm.addEventListener("submit", function (event) {

            event.preventDefault();


            // Get form values
            const name =
                document.getElementById("name").value.trim();

            const phone =
                document.getElementById("phone").value.trim();

            const product =
                document.getElementById("product").value;

            const address =
                document.getElementById("address").value.trim();

            const message =
                document.getElementById("message").value.trim();


            // Basic validation
            if (!name || !phone || !product || !address) {

                orderMessage.textContent =
                    "অনুগ্রহ করে প্রয়োজনীয় সব তথ্য পূরণ করুন।";

                orderMessage.style.color = "#d63384";

                return;
            }


            // Bangladesh phone number validation
            const phonePattern = /^01[3-9]\d{8}$/;

            if (!phonePattern.test(phone)) {

                orderMessage.textContent =
                    "সঠিক ১১ সংখ্যার মোবাইল নম্বর দিন।";

                orderMessage.style.color = "#d63384";

                return;
            }


            // Temporary order confirmation
            orderMessage.textContent =
                "ধন্যবাদ " + name +
                "! আপনার " + product +
                " অর্ডারের তথ্য গ্রহণ করা হয়েছে।";


            orderMessage.style.color = "#16834b";


            // Show order details in browser console
            console.log("New Order:");
            console.log("Name:", name);
            console.log("Phone:", phone);
            console.log("Product:", product);
            console.log("Address:", address);
            console.log("Message:", message);


            // Clear form
            orderForm.reset();

        });

    }

});