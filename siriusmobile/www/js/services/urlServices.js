angular.module('app.services')

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

.service('PDVService', [function(){
    return {
        url: "/Application/GetListaPdv/"
    }
}]);