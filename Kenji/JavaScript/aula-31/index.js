$(document).ready(function() {
  $('#root').append(`
    <div id='request_data'>
      <span>Currency: <select id='currencies' name='currencies'></select></span>
      <span>Quotation date: <input type='date' id='quotation_date' /></span>
    </div>
    <table id='quotation_data'>
      <tr>
        <th>Date</th>
        <th>From</th>
        <th>To</th>
        <th>High</th>
        <th>Low</th>
        <th>Closing</th>
      </tr>
    </table>
  `)

  $('#quotation_data').hide();
  
  $.ajax({url: 'https://economia.awesomeapi.com.br/json/all'})
    .done(res => Object.keys(res).forEach(currency => appendOption(currency)))
    .fail(error => console.error(error));

  $('#quotation_date').change(function(){
    const currency = $('#currencies').val();
    const date = $(this).val();

    getQuotation(currency, date);
  })
})

const appendOption = (currency) => {
  $('#currencies').append(`
    <option>${currency}</option>
  `);
}

const getQuotation = (currency, date) => {
  if(new Date(date) > new Date(Date.now())){
    alert('Date must be previous than current time');
    return;
  }

  $.ajax({url: `https://economia.awesomeapi.com.br/${currency}/?start_date=${date.replaceAll('-', '')}&end_date=${date.replaceAll('-', '')}`})
    .done(res => renderQuotation(res[0]))
    .fail(error => console.error(error));
}

const renderQuotation = (data) => {
  console.log(data)
  if(!data){
    alert("No quotation for this currency on the selected date");
    return;
  }
  
  $('#quotation_data').show();

  const date = new Date(Date(data.timestamp)).toLocaleDateString('pt-BR', {year: 'numeric', month: 'numeric', day: 'numeric'})

  $('#quotation_data').append(`
      <tr>
        <td>${date}</td>
        <td>${data.code}: ${data.name.split('/')[0]}</td>
        <td>${data.codein}: ${data.name.split('/')[1]}</td>
        <td>${data.high}</td>
        <td>${data.low}</td>
        <td>${data.bid}</td>
      </tr>
  `)
}