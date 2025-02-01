window.onload = async () => {
    await loadProducts(); 
    document.getElementById("add-product-form").addEventListener("submit", async  (event)=> {
        event.preventDefault();
        const productID = document.getElementById('product-id').value;
        const productName = document.getElementById("product-name").value;
        const categoryId = document.getElementById("category-id").value;
        const unitPrice = document.getElementById("unit-price").value;
        const unitsInStock = document.getElementById("units-instock").value;

        // Create a new product object
        const newProduct = {
            Product_id :productID,
            Product_Name: productName,
            Category_id: categoryId,
            Unit_price: unitPrice,
            Units_instock: unitsInStock
        };

        try {
            const response = await fetch("/products/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newProduct),
            });

            const result = await response.json();
            if (result.success) {
                alert("Product added successfully!");
                addProductToTable(result.newProduct); // Add to table dynamically
                this.reset(); // Reset form after adding product
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error("Error adding product:", error);
            alert("Failed to add product.");
        }
    });

    // Event delegation for increment and decrement buttons
    document.getElementById("product-list").addEventListener("click", async (event) => {
        if (event.target.classList.contains("increment")) {
            const productId = event.target.getAttribute("data-id");
            await updateStock(productId, "increase");
        }

        if (event.target.classList.contains("decrement")) {
            const productId = event.target.getAttribute("data-id");
            await updateStock(productId, "decrease");
        }

        if(event.target.classList.contains("delete")){
            const productId = event.target.getAttribute("data-id");
            await deleteStock(productId);
        }
    });
};

// Function to load products from backend
async function loadProducts() {
    try {
        const response = await fetch("/products");
        const result = await response.json();

        if (result.success) {
            const productList = result.data;
            const productContainer = document.getElementById("product-list");
            productContainer.innerHTML = ""; 

            productList.forEach(product => {
                addProductToTable(product);
            });

        } else {
            alert("Failed to fetch products.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Error loading products.");
    }
}

// Function to update stock
async function updateStock(productId, action) {
    try {
        const response = await fetch(`/products/update-stock`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ productId, action }),
        });

        const result = await response.json();
        if (result.success) {
            // Update the UI dynamically
            document.getElementById(`stock-${productId}`).textContent = result.newStock;
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.error("Error updating stock:", error);
        alert("Failed to update stock.");
    }
}
async function deleteStock(productID) {
    try{
        const response = await fetch("/products/delete",{
            method:"DELETE",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({productID})
        })

        const result = await response.json();
        if(result.success){
            alert("Item deleted succesfully");
            const productRow = document.querySelector(`tr[data-row-id='${productID}']`);
            if (productRow) {
                productRow.remove();
            }
        }else{
            alert(result.message);
        }
    }catch(error){
        console.error("Error deleting stock",error);
    }
}
function addProductToTable(product) {
    const productContainer = document.getElementById("product-list");
    const productRow = document.createElement("tr");
    productRow.setAttribute("data-row-id", product.Product_id);

    productRow.innerHTML = `
        <td>${product.Product_id}</td>
        <td>${product.Product_Name}</td>
        <td>${product.Category_id}</td>
        <td> $${product.Unit_price}</td>
        <td id="stock-${product.Product_id}">${product.Units_instock}</td>
        <td>
            <button class="increment" data-id="${product.Product_id}">Increment</button>
        </td>
        <td>
            <button class="decrement" data-id="${product.Product_id}">Decrement</button>
        </td>
        <td>
            <button class="delete" data-id="${product.Product_id}">Delete</button>
        </td>
    `;

    productContainer.appendChild(productRow);
}

// Function to navigate to sales page
function loadSales() {
    window.location.href = "sales.html";
}
