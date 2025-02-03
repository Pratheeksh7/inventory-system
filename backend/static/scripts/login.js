document.getElementById("login-btn").addEventListener("click", async function(event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
try{
    const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });

    const result = await response.json();
    if (result.success) {
        window.location.href = "products.html"; 
    } else {
        alert("Invalid credentials!");
    }
}catch{
  console.error("Error:", error);
  alert("Server error. Please try again.");
}
});

