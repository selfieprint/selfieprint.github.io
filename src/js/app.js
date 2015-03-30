// Define session information in localStorage
localStorage.clientId = "c5004e18b7474d4cb26c1f76af8ab98e";
localStorage.accessToken = "";

// Check was user authorized
if (localStorage.authStep != 1)
  localStorage.authStep = 0;

if (localStorage.authStep != 2)
  Auth();

// Init Angular
var app = angular.module('selfieprint', [ ]);

app.controller('MainCTRL', [ '$http',  MainCTRL() ]);

function MainCTRL($http) {

}
