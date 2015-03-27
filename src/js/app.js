var ACCESSTOKEN;

var SESSION = {
  access_token : "",
  client_id : "c5004e18b7474d4cb26c1f76af8ab98e"
};

localStorage.setItem("AuthorizeStep", 0);

// Init Angular
var app = angular.module('selfieprint', [ ]);

app.controller('MainCTRL', [ '$http',  MainCTRL() ]);

function MainCTRL($http) {

}
