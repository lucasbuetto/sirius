angular.module('app.services')

.service('DataService', ['$http', function ($http) {
    delete $http.defaults.headers.common['X-Requested-With'];
    this.url = "";
    this.params = "";
    this.data = "";
    this.getData = function (successCallback, errorCallback) {
        $http({
            method: 'GET',
            url: this.url,
            params: this.params
            //headers: {'Authorization': 'Token token=xxxxYYYYZzzz'}
        }).success(function (data) {
            successCallback(data);
        }).error(function (data) {
            errorCallback(data);
        });
    }
    this.postData = function (successCallback, errorCallback) {
        $http({
            method: 'POST',
            url: this.url,
            data: this.data
            //headers: {'Authorization': 'Token token=xxxxYYYYZzzz'}
        }).success(function (data) {
            successCallback(data);
        }).error(function (data) {
            errorCallback(data);
        });
    }
}]);