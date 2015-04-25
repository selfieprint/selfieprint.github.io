/*
* Authentication
*   localStorage.authStep
*   0 - need auth
*   1 - get access token
*   2 - access token in localStorage
* */
// Define session information in localStorage
localStorage.clientId = "c5004e18b7474d4cb26c1f76af8ab98e";

// Check was user authorized
if (localStorage.authStep != 1 && localStorage.authStep != 2) {
  localStorage.authStep = 0;
}

if (localStorage.authStep == 1) {
  // Parse access token
  var url = window.location.href,
    slice = "access_token=",
    index = url.indexOf(slice);

  if (index != -1) {
    // Get access token
    localStorage.accessToken = url.substring(index + slice.length);
    // Update authStep
    localStorage.authStep = 2;
    console.log('Auth success');
  } else {
    // Reset authStep
    localStorage.authStep = 0;
    console.log("You need auth");
  }
}

if (localStorage.authStep == 2)
  console.log('Already authorized');

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

  /*
  * Exit
  * Clear access token and reset authStep on exit
  * */
  $scope.Exit = function () {
    localStorage.accessToken = "";
    localStorage.authStep = 0;
    location.reload();
  };

  // Include Page
  if (localStorage.authStep == 2)
    $scope.page = $scope.includes.app;
  else
    $scope.page = $scope.includes.landing;

  main.login = function () {
    // Update authStep
    localStorage.authStep = 1;
    // Redirect to Instagram auth page
    window.location.href = "https://instagram.com/oauth/authorize/?client_id="+ localStorage.clientId +"&redirect_uri="+ window.location.href +"&response_type=token";
  }

  // Search by hash tag
  $scope.search_hashtag = 'itclub_psuti';
  $scope.searchFormSubmit = function (search_hashtag) {
    main.images = getPhotosByTag($http, $scope, reload = false, search_hashtag);
  };

  // AJAX loading
  main.updatePhotos = function () {
    // console.log("Start update");
    // var photosBlock = document.querySelector('.photos'),
    //     endPoint = photosBlock.offsetTop + photosBlock.offsetHeight;

    // window.addEventListener('scroll', function () {
    //   var scrollPosition = window.scrollY + window.innerHeight;

    //   if (scrollPosition >= endPoint) {

        // TODO: callback func
        console.log("Loading...");
        var newImgs = getPhotosByTag($http, $scope, reload = true, $scope.search_hashtag);
        main.images = main.images.concat(newImgs);
      // }
    // });
    // console.log("End update");
  }

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
