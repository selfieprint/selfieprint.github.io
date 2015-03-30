/*
* Class Photo
* */

var Photo = function (url, user, caption) {
  this.url = url;
  this.user = user;
    //username": "kevin",
    //"full_name": "Kevin S",
    //"profile_picture": "...",
    //"id": "3"
  this.caption = caption;
};

/*
* Get Photos By Hashtag
* */

function getPhotoByTag(tagname, $http) {
  // Generate Tag Query
  var query = "https://api.instagram.com/v1/tags/"+ tagname +"/media/recent?access_token="+ localStorage.accessToken;
  var images = [];

  // Get Data from Instagram
  $http.get(query).success(function (response) {
    // Fill array with images
    for (var i = 0; i < response.data.length; i++) {
      images[i] = new Photo(
        response.data[i].images.standard_resolution.url,
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
  if (localStorage.authStep == 0) {
    // Update authStep
    localStorage.authStep = 1;
    // Redirect to Instagram auth page
    window.location.href = "https://instagram.com/oauth/authorize/?client_id="+ localStorage.clientId +"&redirect_uri="+ window.location.href +"&response_type=token";
  } else {
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
}
