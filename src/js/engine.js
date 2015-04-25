/*
* Class Photo
* */

var Photo = function (id, large, thumb, caption, user, link) {
  this.id = id;
  this.large = large;
  this.thumb = thumb;
  this.caption = caption;
  this.user = user;
    //username: kevin,
    //full_name: Kevin S,
    //profile_picture: ...,
    //id: 3
  this.link = link;
};

/*
* Get Photos By Hashtag
* */

function instaRequest (query, $http, $scope) {
  var images = [];
  console.log("instaRequest start");
  $http.jsonp(query).success(function (response) {
    console.log(response);

    // Fill array with images
    for (var i = 0; i < response.data.length; i++) {
      images[i] = new Photo(
        response.data[i].id,
        response.data[i].images.standard_resolution.url,
        response.data[i].images.low_resolution.url,
        response.data[i].caption.text,
        response.data[i].user,
        response.data[i].link
      );
    }

    $scope.instaNextUrl = response.pagination.next_max_id;
    console.log(images);
    console.log($scope.instaNextUrl);
  });

  return images;
}

function getPhotosByTag($http, $scope, reload, tagname) {
  // Generate Tag Query
  var query = "https://api.instagram.com/v1/tags/"+ tagname +"/media/recent?access_token="+ localStorage.accessToken + "&callback=JSON_CALLBACK";

  if (reload === true) {
    query += "&max_tag_id=" + $scope.instaNextUrl;
  }

  console.log(query);

  return instaRequest(query, $http, $scope);
}
