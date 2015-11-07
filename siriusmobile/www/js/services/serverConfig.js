angular.module('app.services')

.factory('ServerConfig', function () {
    var data = {
        serverUrl: ''
    }
    
    return {
        getServerUrl: function(){
            return data.serverUrl;
        },
        config: function(url){
            data.serverUrl = url;
        }
    }
});