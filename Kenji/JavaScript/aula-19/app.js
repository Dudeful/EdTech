let invoices = [];

const getFormInput = () => {
  let customerName = document.getElementById('customer_name').value;
  let dueDate = document.getElementById('due_date').value;
  let purchaseTotal = document.getElementById('purchase_total').value;

  invoices.push({
    customerName: customerName,
    dueDate: dueDate,
    purchaseTotal: purchaseTotal,
  });

  appendNewDataToTable(invoices.at(-1));
  clearForm();
};

const clearForm = () => {
  document.getElementById('customer_name').value = '';
  document.getElementById('due_date').value = '';
  document.getElementById('purchase_total').value = '';
};

const appendNewDataToTable = (newCustomerData) => {
  let newTableRow = `
    <tr>
      <td>${newCustomerData.customerName}</td>
      <td>${new Date(newCustomerData.dueDate).toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      })}</td>
      <td>$${newCustomerData.purchaseTotal}</td>
      <td>${
        newCustomerData.interest
          ? '$' + Math.floor(newCustomerData.interest * 100) / 100
          : ''
      }</td>
    </tr>
  `;

  document.getElementById('customers_log').innerHTML += newTableRow;
};

const calculateInterest = (invoiceArray) => {
  const today = new Date().getTime();

  let invoicesWithInterest = invoiceArray.map((el) => {
    let dueDate = new Date(el.dueDate).getTime();
    let daysDiff = (today - dueDate) / (24 * 60 * 60 * 1000);

    if (dueDate < today) {
      //aplica 2% de mora para duplicatas vencidas + 0,1% ao dia
      return {
        customerName: el.customerName,
        purchaseTotal: el.purchaseTotal,
        dueDate: el.dueDate,
        interest: el.purchaseTotal * (0.02 + daysDiff * 0.001),
      };
    } else {
      return {
        customerName: el.customerName,
        purchaseTotal: el.purchaseTotal,
        dueDate: el.dueDate,
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

  invoicesWithInterest.forEach((el) => appendNewDataToTable(el));
};

const groupBy = (arr, property) => {
  return arr.reduce((previousElement, nextElement) => {
    let key = nextElement[property];

    if (!previousElement[key]) {
      previousElement[key] = [];
    }

    previousElement[key].push(nextElement);

    return previousElement;
  }, {});
};

const groupByName = (invoiceArray) => {
  let groupedByName = groupBy(invoiceArray, 'customerName');
  console.log(groupedByName);

  renderGroupedBy(groupedByName);
};

const groupByDueDate = (invoiceArray) => {
  let groupedByDueDate = groupBy(invoiceArray, 'dueDate');
  console.log(groupedByDueDate);

  renderGroupedBy(groupedByDueDate);
};

const renderGroupedBy = (invoiceArray) => {
  document.getElementById('customers_log').innerHTML = `
  <tr>
    <th>Nome</th>
    <th>Vencimento</th>
    <th>Valor</th>
    <th>Juros</th>
  </tr>`;

  Object.keys(invoiceArray).forEach((group) => {
    invoiceArray[group].forEach((invoiceEl) => appendNewDataToTable(invoiceEl));
  });
};
