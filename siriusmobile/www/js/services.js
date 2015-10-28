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

.service('ServerConfig', function () {
    this.serverUrl = "http://cpro29838.publiccloud.com.br:8080/SiriusRestAPI";
})

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
            sleep(3000);
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
    
    function sleep(delay) {
        var start = new Date().getTime();
        while (new Date().getTime() < start + delay);
    }
}])

.service('PadroesService', [function(f){
    var filtros = f;
    return {
        filtros: filtros
    };
}]);

