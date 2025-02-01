window.onload = async()=>{
try{
  const response = await fetch('/sales');
  const result = await response.json();
  const salesList = result.data;
  const saleContainer = document.getElementById('sales-list');
  salesList.forEach(sale=>{
      const saleRow = document.createElement("tr");
      saleRow.innerHTML = 
      `<td> ${sale.SaleID} </td>
      <td>${sale.Product_id}</td>
      <td>${sale.SaleDate.split("T")[0]}</td>
      <td>${sale.QuantitySold}</td>`;

      saleContainer.appendChild(saleRow);
  });
}catch(err){
      console.log(err);
      alert("Error loading sales");
}
};