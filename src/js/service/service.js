var app = require('../app')


app.factory('Address', ['$location',function($location){
  return {
    API_ADDRESS: $location.protocol() +'://'+ $location.host()+':'+$location.port() +'/webapi/v1',
  }
}])

app.factory('Api', ['$resource', 'Address', function($resource, Address){
  return {
    Lines: function(){
      return $resource(Address.API_ADDRESS + '/line/:id', {id: '@id'});
    }
  }
}])
