/*
* Class Photo
* */

var Photo = function (large, thumb, user, caption) {
  this.large = large;
  this.thumb = thumb;
  this.user = user;
    //username: kevin,
    //full_name: Kevin S,
    //profile_picture: ...,
    //id: 3
  this.caption = caption;
};

/*
* Get Photos By Hashtag
* */

function getPhotoByTag(tagname, $http) {
  // Generate Tag Query
  var query = "https://api.instagram.com/v1/tags/"+ tagname +"/media/recent?access_token="+ localStorage.accessToken + '&callback=JSON_CALLBACK';
  var images = [];

  // Get Data from Instagram
  $http.jsonp(query).success(function (response) {
    // Fill array with images
    for (var i = 0; i < response.data.length; i++) {
      images[i] = new Photo(
        response.data[i].images.standard_resolution.url,
        response.data[i].images.thumbnail.url,
        response.data[i].user,
        response.data[i].caption.text
      );
    }
  });

  return images;
}

/*
* Authentication
*   localStorage.authStep
*   0 - need auth
*   1 - get access token
*   2 - access token in localStorage
* */

function Auth() {
  // Define session information in localStorage
  localStorage.clientId = "c5004e18b7474d4cb26c1f76af8ab98e";

  // Check was user authorized
  if (localStorage.authStep != 1 && localStorage.authStep != 2) {
    localStorage.authStep = 0;
  }

  if (localStorage.authStep == 0) {
    // Update authStep
    localStorage.authStep = 1;
    // Redirect to Instagram auth page
    window.location.href = "https://instagram.com/oauth/authorize/?client_id="+ localStorage.clientId +"&redirect_uri="+ window.location.href +"&response_type=token";
  }
  else if (localStorage.authStep == 1) {
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

  console.log('Already authorized');
  return true;
}

/*
* Exit
* Clear access token and reset authStep on exit
* */

function Exit() {
  localStorage.accessToken = "";
  localStorage.authStep = 0;
  //return true;
}
