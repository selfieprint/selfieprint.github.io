// Init Authentication
Auth();

// Init Angular
var app = angular.module('selfieprint', [ ]);

app.controller('MainCTRL', [ '$scope', '$http',  MainCTRL ]);

function MainCTRL($scope, $http) {
  var main = this,
    includes = {
      landing: "ng-includes/landing.html",
      app: "ng-includes/app.html"
    };

  if (localStorage.authStep != 0)
    $scope.page = includes.app;
  else
    $scope.page = includes.landing;


  var searchForm = document.querySelector('.search'),
    searchInput = document.getElementById('search_hashtag');

  $scope.search_hashtag = '';

  $scope.searchFormSubmit = function (search_hashtag) {
    console.log(search_hashtag);
    main.images = getPhotoByTag(search_hashtag, $http);
    console.log(main.images);
  }

}
