// Define session information in localStorage
localStorage.clientId = "c5004e18b7474d4cb26c1f76af8ab98e";
localStorage.accessToken = "";

// Init Authentication
Auth();

// Init Angular
var app = angular.module('selfieprint', [ ]);

function MainCTRL($http) {
  var main = this,
    includes = {
      landing: "ng-includes/landing.html",
      app: "ng-includes/app.html"
    };

  if (localStorage.authStep != 0)
    main.source = includes.app;
  else
    main.source = includes.landing;


}

app.controller('MainCTRL', [ '$http',  MainCTRL ]);
