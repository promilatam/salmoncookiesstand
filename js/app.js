'use strict';

/******************************************CONSTRUCTOR**********************************************************************************/
function Stores(name, minCustomerPerHour, maxCustomersPerHour, avgCookiePerSale) {

  //Properties
  this.name = name;
  this.minCustomerPerHour = minCustomerPerHour;
  this.maxCustomersPerHour = maxCustomersPerHour;
  this.avgCookiePerSale = avgCookiePerSale;
  this.sales = [];
}

/**************************************FUNCTION DEFINITION FOR THE CONSTRUCTOR**********************************************************/

/* Generate random numbers of customers based on the flow of maximum and minimum customers per hour */
Stores.prototype.generateRandomCustomers = function() {
  console.log('max '+ this.maxCustomersPerHour + ' min: '+ this.minCustomerPerHour);
  var result = Math.floor(Math.random() * (this.maxCustomersPerHour - this.minCustomerPerHour)) + this.minCustomerPerHour; //Generate random numbers betn: MIN & MAX
  console.log('result: ' +result);
  return result;
};

/* Generates total sales and puts into results of each stores */
Stores.prototype.generateSalesForecast = function() {
  var calculation; //Number of cookies sold based on average cookies and random number of customers
  var startTime = 6; //Military Standard hours for 6 am
  var endTime = 20; //Military Standard hours for 8 pm
  var totalSales = 0; //Sum of total cookies from start to end time

  for (var j = startTime; j <= endTime; j++) {
    calculation = Math.round (this.avgCookiePerSale * this.generateRandomCustomers()); //Calculates and round to nearest integer
    totalSales += calculation;
    this.sales.push(calculation);
  }
  this.sales.push(totalSales); //Make a final push of total cookies

};
/*  Rendering function for the store object */
Stores.prototype.generateRendering = function() {
  var tableEl = document.getElementById('sales-forecast');
  var trEl = document.createElement('tr');
  var tdNameEl = document.createElement('td');
  tdNameEl.textContent = this.name;
  trEl.appendChild(tdNameEl);
  tableEl.appendChild(trEl);
  var tdEl = [];
  for (var i = 0; i < this.sales.length; i++) {
    tdEl[i] = document.createElement('td');
    tdEl[i].textContent = this.sales[i];
    trEl.appendChild(tdEl[i]);
    tableEl.appendChild(trEl);
  }

};

/*****************************************************HELPER FUNCTION*****************************************************************/

function generateTotalRows() {
  ColumnCount++;
  totalOfColumns = 0;
  var totalOfColumns = [];
  var totalColSum;
  /* Generates total of the columns in the display and store in the array*/
  for (var i = 0; i < arrayOfStores[0].sales.length; i++) {
    totalColSum = 0;
    for (var j = 0; j < arrayOfStores.length; j++) {
      totalColSum += arrayOfStores[j].sales[i];
    }
    totalOfColumns.push(totalColSum);
  }

  /* Final Rendering for the 'Totals' row */
  var tableEl = document.getElementById('sales-forecast');

  var trEl = document.createElement('tr');
  var tdNameEl = document.createElement('td');
  tdNameEl.textContent = 'Totals';
  trEl.appendChild(tdNameEl);
  tableEl.appendChild(trEl);
  var tdEl = [];
  for (i = 0; i < totalOfColumns.length; i++) {
    tdEl[i] = document.createElement('td');
    tdEl[i].textContent = totalOfColumns[i];
    trEl.appendChild(tdEl[i]);
    tableEl.appendChild(trEl);
  }
}

/**************************************MAIN FUNCTION TO RUN THE SCRIPT*****************************************************************/
var arrayOfStores = [];
var newRow = -1; //New row when submitted
var ColumnCount = 0;
var rowDisplayFlag = false;

function generateStoreData(location, minCustomerPerHour, maxCustomersPerHour, avgCookiePerSale) {
  rowDisplayFlag = true;

  if (ColumnCount >= 1) {
    ColumnCount = 0;
    newRow++;
    document.getElementById('sales-forecast').deleteRow(-1);
    arrayOfStores.push(new Stores(location, minCustomerPerHour, maxCustomersPerHour, avgCookiePerSale));
    arrayOfStores[newRow].generateSalesForecast();
    arrayOfStores[newRow].generateRendering();
    generateTotalRows();
  } else {
    newRow++;
    arrayOfStores.push(new Stores(location, minCustomerPerHour, maxCustomersPerHour, avgCookiePerSale));
    arrayOfStores[newRow].generateSalesForecast();
    arrayOfStores[newRow].generateRendering();
    generateTotalRows();
  }

}

/* ***********************************DRIVER**********************************************************************************************************/

var form = document.getElementById('add-store');
var handleFormSubmit = function(formSubmitEvent){

  formSubmitEvent.preventDefault();
  var locationName = formSubmitEvent.target.locationName.value;
  var minCustomer = formSubmitEvent.target.minCustomer.value;
  var maxCustomer = formSubmitEvent.target.maxCustomer.value;
  var avgCookies = formSubmitEvent.target.avgCookies.value;
  
  generateStoreData(locationName, parseInt(minCustomer), parseInt(maxCustomer), parseFloat(avgCookies));
};
form.addEventListener('submit', handleFormSubmit);
/*===================================================