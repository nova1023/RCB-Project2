console.log("barba-transitions.js has loaded.");


// Set Up JQuery to use the browser cache to reduce loading times on script loads
// This is just in case as there might be a bug with barba.js where it loads
// scripts multiple times.
//------------------------------------------------------------------------------------------
$.ajaxSetup({
  cache: true
});
//==========================================================================================


// Set up for the barba.js transitions
//-------------------------------------------------------------------------------------------
var FadeTransition = Barba.BaseTransition.extend({
  start: function() {
    /**
     * This function is automatically called as soon the Transition starts
     * this.newContainerLoading is a Promise for the loading of the new container
     * (Barba.js also comes with an handy Promise polyfill!)
     */
     // console.log("start");
    // As soon the loading is finished and the old page is faded out, let's fade the new page
    Promise
      .all([this.newContainerLoading, this.fadeOut()])
      .then(this.fadeIn.bind(this));
  },

  fadeOut: function() {
  	// console.log("fade out");
  	// console.log($(this.oldContainer));
    /**
     * this.oldContainer is the HTMLElement of the old Container
     */

    return $(this.oldContainer).css("position", "relative").animate({ opacity: 0, left: "-100%" }, 200).promise();
  },

  fadeIn: function() {
  	// console.log("fade in");
    /**
     * this.newContainer is the HTMLElement of the new Container
     * At this stage newContainer is on the DOM (inside our #barba-container and with visibility: hidden)
     * Please note, newContainer is available just after newContainerLoading is resolved!
     */

    var _this = this;
    var $el = $(this.newContainer);

    $(this.oldContainer).hide();

    $el.css({
      visibility : 'visible',
      opacity : 0
    });

    $el.css({"position":"relative", "left":"50%"}).animate({ opacity: 1, left: "0%" }, 200, function() {
      /**
       * Do not forget to call .done() as soon your transition is finished!
       * .done() will automatically remove from the DOM the old Container
       */

      _this.done();
    });
  }
});

/**
 * Next step, you have to tell Barba to use the new Transition
 */

Barba.Pjax.getTransition = function() {
	// console.log("get transition");
  /**
   * Here you can use your own logic!
   * For example you can use different Transition based on the current page or link...
   */

  return FadeTransition;
};
//===========================================================================================
// End of the Set Up for the barba.js transitions


// Set up for the barba.js Name Spaces
//-------------------------------------------------------------------------------------------

// Landing namespace
//---------------------------
var Landing = Barba.BaseView.extend({
  namespace: 'Landing',
  onEnter: function() {
      // The new Container is ready and attached to the DOM.
      $.get("assets/javascript/nav-bar-change.js");
      console.log("Landing loading worked");
  },
  onLeave: function() {
    // nav-bar-change listeners
    if (eventListenerCreated === true){
      $(document).off("click", "#sign-nav-link", logOut);
    }
  }
});

// Don't forget to init the view!
Landing.init();
//===========================


// Sign Up name space
//---------------------------
var SignUp = Barba.BaseView.extend({
  namespace: 'SignUp',
  onEnter: function() {
      // The new Container is ready and attached to the DOM.
      $.get("assets/javascript/form-test.js");
      $.get("assets/javascript/nav-bar-change.js");
      console.log("SignUp loading worked");
  },
  onLeave: function() {
    // Form-test listeners
    $(document).off("click", "#signUpSubmit", signUp);
    $(document).off("click", "#signInSubmit", signIn);
    $(document).off("click", "#getPlayerAccountInfo", getPlayerAccountInfo);
    $(document).off("click", "#getPlayerListings", getPlayerListings);
    $(document).off("click", "#getPlayersItemsSold", getPlayersItemsSold);
    $(document).off("click", "#getWarehousePrices", getWarehousePrices);
    $(document).off("click", "#placeOrder", placeOrder);
    $(document).off("click", "#getItemListings", getItemListings);
    $(document).off("click", "#makeListing", makeListing); //makeListing

    // nav-bar-change listeners
    if (eventListenerCreated === true){
      $(document).off("click", "#sign-nav-link", logOut);
    }
  }
});

// Don't forget to init the view!
SignUp.init();
//===========================


// Sign In name space
//---------------------------
var SignIn = Barba.BaseView.extend({
  namespace: 'SignIn',
  onEnter: function() {
      // The new Container is ready and attached to the DOM.
      $.get("assets/javascript/form-test.js");
      $.get("assets/javascript/nav-bar-change.js");
      console.log("SignIn loading worked");
  },
  onLeave: function() {
    // Form-test listeners
    $(document).off("click", "#signUpSubmit", signUp);
    $(document).off("click", "#signInSubmit", signIn);
    $(document).off("click", "#getPlayerAccountInfo", getPlayerAccountInfo);
    $(document).off("click", "#getPlayerListings", getPlayerListings);
    $(document).off("click", "#getPlayersItemsSold", getPlayersItemsSold);
    $(document).off("click", "#getWarehousePrices", getWarehousePrices);
    $(document).off("click", "#placeOrder", placeOrder);
    $(document).off("click", "#getItemListings", getItemListings);
    $(document).off("click", "#makeListing", makeListing); //makeListing

    // nav-bar-change listeners
    if (eventListenerCreated === true){
      $(document).off("click", "#sign-nav-link", logOut);
    }
  }
});

// Don't forget to init the view!
SignIn.init();
//===========================


// Make a listing Name space
//---------------------------
var MakeListing = Barba.BaseView.extend({
  namespace: 'MakeListing',
  onEnter: function() {
      // The new Container is ready and attached to the DOM.
      $.get("assets/javascript/make-a-listing-page.js");
      $.get("assets/javascript/form-test.js");
      $.get("assets/javascript/nav-bar-change.js");
      console.log("MakeListing loading worked");
  },
   onLeave: function() {

    // Make A Listing Listeners
    $(document).off("click", ".itemType-selectioff-div", selectItemType);

    // Form-test listeners
    $(document).off("click", "#signUpSubmit", signUp);
    $(document).off("click", "#signInSubmit", signIn);
    $(document).off("click", "#getPlayerAccountInfo", getPlayerAccountInfo);
    $(document).off("click", "#getPlayerListings", getPlayerListings);
    $(document).off("click", "#getPlayersItemsSold", getPlayersItemsSold);
    $(document).off("click", "#getWarehousePrices", getWarehousePrices);
    $(document).off("click", "#placeOrder", placeOrder);
    $(document).off("click", "#getItemListings", getItemListings);
    $(document).off("click", "#makeListing", makeListing); //makeListing

    // nav-bar-change listeners
    if (eventListenerCreated === true){
      $(document).off("click", "#sign-nav-link", logOut);
    }
  }
});

// Don't forget to init the view!
MakeListing.init();
//===========================


// Leaderboard Name space
//---------------------------
var Leaderboard = Barba.BaseView.extend({
  namespace: 'Leaderboard',
  onEnter: function() {
      // The new Container is ready and attached to the DOM.
      $.get("assets/javascript/leaderboard.js");
      $.get("assets/javascript/nav-bar-change.js");
      console.log("Leaderboard loading worked");
  },
  onLeave: function() {
    // nav-bar-change listeners
    if (eventListenerCreated === true){
      $(document).off("click", "#sign-nav-link", logOut);
    }
  }
});

// Don't forget to init the view!
Leaderboard.init();
//===========================


// User homepage name space
//---------------------------
var UserHomepage = Barba.BaseView.extend({
  namespace: 'UserHomepage',
  onEnter: function() {
      // The new Container is ready and attached to the DOM.
      $.get("assets/javascript/user-homepage.js");
      $.get("assets/javascript/nav-bar-change.js");
      console.log("UserHomepage loading worked");
  },
   onLeave: function() {
    // nav-bar-change listeners
    if (eventListenerCreated === true){
      $(document).off("click", "#sign-nav-link", logOut);
    }
  }
});

// Don't forget to init the view!
UserHomepage.init();
//===========================


// All listing name space
//---------------------------
var AllListings = Barba.BaseView.extend({
  namespace: 'AllListings',
  onEnter: function() {
      // The new Container is ready and attached to the DOM.
      $.get("assets/javascript/all-listings.js");
      $.get("assets/javascript/sorttable.js");
      $.get("assets/javascript/nav-bar-change.js");
      console.log("AllListings loading worked");
  },
  onLeave() {
    // nav-bar-change listeners
    if (eventListenerCreated === true){
      $(document).off("click", "#sign-nav-link", logOut);
    }
  }
});

// Don't forget to init the view!
AllListings.init();
//===========================


// Warehouse name space
//---------------------------
var Warehouse = Barba.BaseView.extend({
  namespace: 'Warehouse',
  onEnter: function() {
      // The new Container is ready and attached to the DOM.
      $.get("assets/javascript/warehouse-page.js");
      $.get("assets/javascript/form-test.js");
      $.get("assets/javascript/nav-bar-change.js");
      console.log("Warehouse loading worked");
  },
   onLeave: function() {
    console.log("Event listeners removed.");

    // Warehouse Listeners
    $(document).off("click", ".warehouse-selection-div", selectWarehouse);
    
    // form-test Listeners
    $(document).off("click", "#signUpSubmit", signUp);
    $(document).off("click", "#signInSubmit", signIn);
    $(document).off("click", "#getPlayerAccountInfo", getPlayerAccountInfo);
    $(document).off("click", "#getPlayerListings", getPlayerListings);
    $(document).off("click", "#getPlayersItemsSold", getPlayersItemsSold);
    $(document).off("click", "#getWarehousePrices", getWarehousePrices);
    $(document).off("click", "#placeOrder", placeOrder);
    $(document).off("click", "#getItemListings", getItemListings);
    $(document).off("click", "#makeListing", makeListing);

    // nav-bar-change listeners
    if (eventListenerCreated === true){
      $(document).off("click", "#sign-nav-link", logOut);
    }
    }
});

// Don't forget to init the view!
Warehouse.init();
//===========================






// Extra for easy additions later
//---------------------------
//===========================

// var Homepage = Barba.BaseView.extend({
//   namespace: 'homepage',
//   onEnter: function() {
//       // The new Container is ready and attached to the DOM.
//       $.get("assets/javascript/make-a-listing-page.js");
//       console.log("Homepage loading worked");
//   }
// });

// // Don't forget to init the view!
// Homepage.init();
//===========================


//===========================================================================================
// End of barba.js Name Space Set up




Barba.Pjax.start();