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

function getPhotoByTag (tagname, $http) {
  // Generate Tag Query
  var query = "https://api.instagram.com/v1/tags/"+ tagname +"/media/recent?access_token="+ SESSION.access_token;
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
* */

function Authentication () {
  var step = localStorage.getItem("AuthorizeStep");

  if (step == 0) {
    // Update AuthorizeStep
    localStorage.setItem("AuthorizeStep", 1);
    // Redirect to Instagram auth page
    window.location.href = "https://instagram.com/oauth/authorize/?client_id="+ SESSION.client_id +"&redirect_uri="+ window.location.href +"&response_type=token";
  } else {
    // Parse access token
    var url = window.location.href;
    var slice = "access_token=";
    var index = url.indexOf(slice);

    if (index != -1) {
      SESSION.access_token = url.substring(index + slice.length);
    } else {
      // TODO: catch error with auth

    }

  }
}
