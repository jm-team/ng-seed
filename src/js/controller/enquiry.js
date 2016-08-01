/**
 * Created by Administrator on 2016/7/4 0004.
 */
var app = require('app');

app.registerController('EnquiryCtrl', ['$scope', 'API', function ($scope, API)  {
  var lineTypes = [
    {name:'公路', value:1},
    {name:'铁路', value:2},
    {name:'内河航运', value:3},
    {name:'海运', value:4},
    {name:'空运', value:63},
    {name:'仓储', value:33},
    {name:'联运', value:34}
  ]
  angular.extend($scope, {
    search:{
      lineType: 2,
      departure:'',
      destination:'',
      startDate:'',
      endDate:'',
      custService:1,
      custClear:0,
    },

    lineTypes:lineTypes,
    getLists: function(){
      API.Enquiry().get({}, function(data){
        console.log(data);
      })
    }
  });

  $scope.getLists();
}]);
