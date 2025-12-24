export function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return; 

  const toast = document.getElementById("toast");
  const button = form.querySelector("button");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    button.disabled = true;

    const formData = new FormData(form);

    const response = await fetch(form.action, {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    });

    button.disabled = false;
    if (response.ok) {
      showToast("Message sent successfully!");
      form.reset();
    }
    else {
        showToast("Failed to send message. Please try again.");
    }
  });

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  }
}
