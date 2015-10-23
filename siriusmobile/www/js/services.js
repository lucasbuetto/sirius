angular.module('app.services', [])

.factory('UsuarioService', [function(){
    return {
        url: '',
        
        login: function(email, senha){
            return 'http://cpro29838.publiccloud.com.br:8080/SiriusRestAPI/';
        },
        
        gravaUrl: function(url){
            this.url = url;
        }
    }
}])

.service('SegmentoService', [function(){
    return {
        url: '/Application/GetListaSegmento/'
    }
}])

.service('EmpresaService', [function(){
    return {
        url: '/Application/GetListaEmpresa/'
    }
}])

.service('serverConfig', function () {
    this.serverUrl = "http://cpro29838.publiccloud.com.br:8080/SiriusRestAPI";
})

.service('dataService', ['$http', function ($http) {
    delete $http.defaults.headers.common['X-Requested-With'];
    this.url = "";
    this.params = "";
    this.data = "";
    this.getData = function (callbackFunc) {
        $http({
            method: 'GET',
            url: this.url,
            params: this.params
            //headers: {'Authorization': 'Token token=xxxxYYYYZzzz'}
        }).success(function (data) {
            callbackFunc(data);
        }).error(function (data) {
            console.log(data);

        });
    }
    this.postData = function (callbackFunc) {
        $http({
            method: 'POST',
            url: this.url,
            data: this.data
            //headers: {'Authorization': 'Token token=xxxxYYYYZzzz'}
        }).success(function (data) {
            callbackFunc(data);
        }).error(function (data) {
            console.log(data);
        });
    }
}]);;

