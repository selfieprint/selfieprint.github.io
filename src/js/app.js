// Init Authentication
Auth();

// Init Angular
var app = angular.module('selfieprint', [ ]);

// Main Controller
app.controller('MainCTRL', [ '$scope', '$http',  MainCTRL ]);

function MainCTRL($scope, $http) {
  var main = this;

  // Includes
  $scope.includes = {
    landing: "ng-includes/landing.html",
    app: "ng-includes/app.html",
    print: "ng-includes/print.html"
  };

  // Show exit button
  if (localStorage.authStep === "2") {
    $scope.showExit = true;
  } else {
    $scope.showExit = false;
  }

  // Call Exit function
  $scope.Exit = function () {
    Exit();
  };

  // Include Page
  if (localStorage.authStep != 0)
    $scope.page = $scope.includes.app;
  else
    $scope.page = $scope.includes.landing;

  // Search by hash tag
  $scope.search_hashtag = '';
  $scope.searchFormSubmit = function (search_hashtag) {
    main.images = getPhotoByTag(search_hashtag, $http);
  };

  // Set view mode
  main.view = '-grid';

  // Print images
  // Get images to print
  main.imagesToPrint = function () {
    var checkedPhotos = document.querySelectorAll('.photos_item_checkbox:checked');

    main.printsPhotos = [];
    for (var i = 0; i < checkedPhotos.length; i++) {
      main.printsPhotos[i] = main.images[checkedPhotos[i].name];
    }

    $scope.page = $scope.includes.print;
  };

  // Call page print
  main.print = function () {
    window.print();
  }

}
