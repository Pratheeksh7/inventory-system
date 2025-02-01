window.onload = async ()=> {
  try {
      const response = await fetch("products");
      const result = await response.json();

      if (result.success) {
          const productList = result.data;
          const productContainer = document.getElementById("product-list");
          productList.forEach(product => {
              const productRow = document.createElement("tr");

              productRow.innerHTML = `
                  <td>${product.Product_id}</td>
                  <td>${product.Product_Name}</td>
                  <td>${product.Category_id}</td>
                  <td> $${product.Unit_price}</td>
                  <td>${product.Units_instock}</td>
              `;

              productContainer.appendChild(productRow);
          });
      } else {
          alert("Failed to fetch products.");
      }
  } catch (error) {
      console.error("Error:", error);
      alert("Error loading products.");
  }
};
function loadSales(){
  window.location.href="sales.html";
}
