// Debug Tool
console.log("warehouse-page.js file has loaded");

// Event Listeners
//-------------------------------------------------------------------------------
// Mouse hover on the warehouse choices
$(document).on({
    mouseenter: function () {
      $(this).addClass("hover-shadow");
      $(this).css("z-index", "10");
    },
    mouseleave: function () {
      if ($(this).attr("data-warehouse") === selectedWarehouse){
        $(this).removeClass("hover-shadow");
        $(this).css("z-index", "5");
      } else {
        $(this).removeClass("hover-shadow");
        $(this).css("z-index", "0");
      }
    }
}, ".warehouse-selection-div");

// Triggers when the user clicks on a warehouse selector
$(document).on("click", ".warehouse-selection-div", selectWarehouse);

// Updates the order summary when the mouse leaves the number input field
$(":input[name=numberOfUnits]").on("keyup mouseup", function(){
  changeOrderSummary();
});
//===============================================================================


// Global Variables
//-------------------------------------------------------------------------------
var fashionPricePerUnit;
var electronicsPricePerUnit;
var collectablesPricePerUnit;
var numberOfUnits;
var selectedWarehouse = "none";
var total = 0;
//===============================================================================


// GET Warehouse Prices
//-------------------------------------------------------------------------------
// This Function runs when the warehouse page loads so It pulls the most recent 
// info from the database
//-------------------------------------------------------------------------------
$.ajax({
  method: 'GET',
  url: '/api/warehouse'
})
.done(function(data) {
  console.log(data);
  fashionPricePerUnit = data[1].price;
  electronicsPricePerUnit = data[0].price;
  collectablesPricePerUnit = data[2].price;

  console.log(fashionPricePerUnit, electronicsPricePerUnit, collectablesPricePerUnit);

  $("#fashionPrice").html(fashionPricePerUnit + " Bit(s)");
  $("#electronicsPrice").html(electronicsPricePerUnit + " Bit(s)");
  $("#collectablesPrice").html(collectablesPricePerUnit + " Bit(s)");

});
//===============================================================================


// Function to store the warehouse that gets selected by the user
//-------------------------------------------------------------------------------
function selectWarehouse(){
  console.log("Warehouse selected.");

  if (selectedWarehouse === "none"){
    $(this).addClass("selected-shadow");
    $(this).css("z-index", "5");
    selectedWarehouse = $(this).attr("data-warehouse");
    changeOrderSummary();

  } else {

    if ($(this).attr("data-warehouse") === selectedWarehouse){
      // Do Nothing 
    
    } else {
      var currentlySelectedDiv = $(document).find("[data-warehouse='" + selectedWarehouse + "']");
      
      $(currentlySelectedDiv).removeClass("selected-shadow");
      $(currentlySelectedDiv).css("z-index", "0");

      $(this).addClass("selected-shadow");
      $(this).css("z-index", "5");
      selectedWarehouse = $(this).attr("data-warehouse");
      changeOrderSummary();
    }
  }
};
//===============================================================================


// Helper Function to change the order summary Div
//-------------------------------------------------------------------------------
function changeOrderSummary(){
  numberOfUnits = $(":input[name=numberOfUnits]").val();
  $("#orderSummaryUnits").html(numberOfUnits);
  $("#orderSummaryWarehouse").html(selectedWarehouse);

  if (selectedWarehouse === "fashion"){
    total = fashionPricePerUnit * numberOfUnits;
    $("#orderSummaryTotal").html(total);
  
  } else if (selectedWarehouse === "electronics"){
    total = electronicsPricePerUnit * numberOfUnits;
    $("#orderSummaryTotal").html(total);
  
  } else {
    total = collectablesPricePerUnit * numberOfUnits;
    $("#orderSummaryTotal").html(total);
  }
}
//===============================================================================


//
//-------------------------------------------------------------------------------
//===============================================================================

//
//-------------------------------------------------------------------------------
//===============================================================================
