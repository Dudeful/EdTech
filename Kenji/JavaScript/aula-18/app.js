let invoices = [];

const formHandler = () => {
  let customerName = document.getElementById('customer_name').value;
  let purchaseDueDate = document.getElementById('due_date').value;
  let purchaseTotal = document.getElementById('purchase_total').value;

  invoices.push({
    customerName: customerName,
    purchaseDueDate: purchaseDueDate,
    purchaseTotal: purchaseTotal,
  });

  appendNewDataToTable(invoices.at(-1));

  document.getElementById('customer_name').value = '';
  document.getElementById('due_date').value = '';
  document.getElementById('purchase_total').value = '';
};

const appendNewDataToTable = (newCustomerData) => {
  let newTableRow = `
    <tr>
      <td>${newCustomerData.customerName}</td>
      <td>${new Date(newCustomerData.purchaseDueDate).toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      })}</td>
      <td>$${newCustomerData.purchaseTotal}</td>
      <td>${
        newCustomerData.interest ? '$' + Math.floor(newCustomerData.interest * 100) / 100 : ''
      }</td>
    </tr>
  `;

  document.getElementById('customers_log').innerHTML += newTableRow;
};

const calculateInterest = () => {
  const today = new Date().getTime();

  let invoicesWithInterest = invoices.map((el) => {
    let dueDate = new Date(el.purchaseDueDate).getTime();
    let daysDiff = (today - dueDate) / (24 * 60 * 60 * 1000);

    if (dueDate < today) {
      //aplica 2% de mora para duplicatas vencidas + 0,1% ao dia
      return {
        customerName: el.customerName,
        purchaseTotal: el.purchaseTotal,
        purchaseDueDate: el.purchaseDueDate,
        interest: el.purchaseTotal * (0.02 + daysDiff * 0.001),
      };
    } else {
      return {
        customerName: el.customerName,
        purchaseTotal: el.purchaseTotal,
        purchaseDueDate: el.purchaseDueDate,
      };
    }
  });

  document.getElementById('customers_log').innerHTML = `
    <tr>
      <th>Nome</th>
      <th>Vencimento</th>
      <th>Valor</th>
      <th>Juros</th>
    </tr>`;

  invoicesWithInterest.map((el) => appendNewDataToTable(el));
};
