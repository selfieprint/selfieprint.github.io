// Init Authentication
Auth();

// Init Angular
var app = angular.module('selfieprint', [ ]);

app.controller('MainCTRL', [ '$scope', '$http',  MainCTRL ]);

function MainCTRL($scope, $http) {
  var main = this;
  $scope.includes = {
    landing: "ng-includes/landing.html",
    app: "ng-includes/app.html",
    print: "ng-includes/print.html"
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

  // Print photos
  main.printPhotos = function () {
    var checkedPhotos = document.querySelectorAll('.photos_item_checkbox:checked'),
      printsIds = [];

    console.log(checkedPhotos);

    for (var i = checkedPhotos.length - 1; i >= 0; i--) {
      printsIds[i] = checkedPhotos[i].name;
    }

    main.printsPhotos = [];
    for (var i = 0; i < printsIds.length; i++) {
      main.printsPhotos[i] = main.images[printsIds[i]];
    }

    console.log(printsIds);
    console.log(main.printsPhotos);

    $scope.page = $scope.includes.print;
  }
}
