$(document).ready(function() {
  $('#root').append(`
    <div id='request_data'>
      <span>
        Currency: <select id='currencies' name='currencies'>
          <option id='first_option'>$</option>
        </select>
      </span>
      <span>
        Initial date: 
          <input type='date' id='initial_date' />
      </span>
      <span>
        Final date: 
          <input type='date' id='final_date' />
      </span>
      <button type='button' id='get_period_quotations'>Get Data</button>
    </div>
  `)

  $('#quotation_data').hide();
  
  $.ajax({url: 'https://economia.awesomeapi.com.br/json/all'})
    .done(res => Object.keys(res).forEach(currency => appendOption(currency)))
    .fail(error => console.error(error));

  $('#currencies').change(function(){
    $('#first_option').hide();

    const currency = $('#currencies').val();
    
    getCurrentDateQuotation(currency);
  });

  $('#get_period_quotations').click(function(){
    const currency = $('#currencies').val();
    const initialDate = $('#initial_date').val();
    const finalDate = $('#final_date').val();

    getPeriodQuotations(currency, initialDate, finalDate);
  });
})

const appendOption = (currency) => {
  $('#currencies').append(`
    <option>${currency}</option>
  `);
}

const getCurrentDateQuotation = (currency) => {
  const date = new Date().toISOString().split('T')[0].replaceAll('-', '');

  $.ajax({url: `https://economia.awesomeapi.com.br/${currency}/?start_date=${date}&end_date=${date}`})
    .done(res => renderCurrentDateQuotation(res[0]))
    .fail(error => console.error(error));
}

const renderCurrentDateQuotation = (data) => {
  console.log(data);

  if(!data){
    alert("No quotation for this currency on the selected date");
    return;
  }
  
  $('#quotation_data').remove();
  
  const date = new Date(Number(data.timestamp)*1000).toLocaleDateString('pt-BR', {year: 'numeric', month: 'numeric', day: 'numeric'})

  const time = new Date(Number(data.timestamp)*1000).toLocaleTimeString('pt-BR')
  console.log(time)

  $('#root').append(`
    <table id='quotation_data'>
      <tr>
        <th>Date</th>
        <th>From</th>
        <th>To</th>
        <th>Last</th>
        <th>High</th>
        <th>Low</th>
        <th>Closing</th>
      </tr>
      <tr>
        <td>${date} - ${time}</td>
        <td>${data.name.split('/')[0]}</td>
        <td>${data.name.split('/')[1]}</td>
        <td>${data.ask}</td>
        <td>${data.high}</td>
        <td>${data.low}</td>
        <td>${data.bid}</td>
      </tr>
    </table>
  `)
}

const getPeriodQuotations = (currency, initialDate, finalDate) => {
  if(new Date(initialDate) > new Date(Date.now())){
    alert('Initial date must be previous than current date');
    return;
  }

  $.ajax({url: `https://economia.awesomeapi.com.br/${currency}/100000?start_date=${initialDate.replaceAll('-', '')}&end_date=${finalDate.replaceAll('-', '')}`})
    .done(res => renderPeriodQuotations(res))
    .fail(error => console.error(error));
}

const renderPeriodQuotations = (data) => {
  console.log(data);

  if(!data){
    alert("No quotation for this currency on the selected date");
    return;
  }
  
  $('#quotation_data').remove();

  $('#root').append(`
    <table id='quotation_data'>
      <tr>
        <th>Date</th>
        <th>From</th>
        <th>To</th>
        <th>Last</th>
        <th>High</th>
        <th>Low</th>
        <th>Closing</th>
      </tr>
    </table>
  `)
  
  data.forEach(quotation => {
    const date = new Date(Number(quotation.timestamp)*1000).toLocaleDateString('pt-BR', {year: 'numeric', month: 'numeric', day: 'numeric'});
    const time = new Date(Number(quotation.timestamp)*1000).toLocaleTimeString('pt-BR');

    $('#quotation_data').append(`
      <tr>
        <td>${date} - ${time}</td>
        <td>${data[0].name.split('/')[0]}</td>
        <td>${data[0].name.split('/')[1]}</td>
        <td>${quotation.ask}</td>
        <td>${quotation.high}</td>
        <td>${quotation.low}</td>
        <td>${quotation.bid}</td>
      </tr>
    `);
  });
}

