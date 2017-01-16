myAppModule.factory('mainFactory', function($http) {
  var images = [];
  var factory = {};
  factory.getImages = function(callback) {
    $http.get('/images').success(function(output) {
      images = output.result;
      images.forEach(function(item){
        // console.log(item);
      })
      callback(images);
    })
  }
  return factory;
});
