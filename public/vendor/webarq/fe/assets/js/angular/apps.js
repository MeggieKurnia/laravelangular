var app = angular.module("apps", ["ngRoute"]);
app.config(function($routeProvider,$locationProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "../view/main.blade.php",
        controller  : "DashboardController"
    })
    .when("/config", {
        templateUrl : "../view/config.blade.php",
        controller  : "ConfigController"
    })
    .otherwise({
        redirectTo: '/'
    });
    $locationProvider.html5Mode(true)
    $locationProvider.hashPrefix('');
});
app.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('{@');
    $interpolateProvider.endSymbol('@}');
});

app.service('createForm',function($http){
    this.generate = function(url){
        var r = null;
        $http({
            method:"POST",
            url:urlapp+"/"+url,
        }).then(function(res){
            return generateForm(res.data);
        });
    }
});

app.directive("frm", function($compile,$http) {
    return {
        restrict: 'A',
        link: function(scope,element, attr){
            $http({
                method:"POST",
                url:urlapp+'/'+attr.atr
            }).then(function(res){
                element.append($compile(generateForm(res.data))(scope));
            });
        }
    }
});

app.controller('DashboardController', function($scope,$http){
    $scope.day=0;
    $scope.wek=0;
    $scope.mon=0;
    $http({
        method:"POST",
        url:urlapp+"/getactivity"
    }).then(function(d){
        $scope.day = d.data.day;
        $scope.wek = d.data.wek;
        $scope.mon = d.data.mon;
    });
});

app.controller('ConfigController', function($scope){
    $scope.tes=function(){
        alert('a');
    }
});

function generateForm(ar){
    var htm='<form action="" method="post" enctype="multipart/form-data">';
        $.each(ar, function(k,v){
            htm+='<div class="form-group">';
            if(Object.keys(v).length){
                var attr = '';
                $.each(v, function(a,b){
                    if(jQuery.inArray(a.toLowerCase(),["class","title","type","info","accept"]) === -1)
                        attr+=a.toLowerCase()+'='+b.trim();
                    if(a == "accept"){
                        var r = b.split(",");
                        if(r.length){
                            var acp = '';
                            var i=1;
                            $.each(r,function(key,val){
                                acp+=val.trim();
                                if(i < r.length)
                                    acp+=',';
                                i++;
                            });
                            attr+=a.toLowerCase()+'='+acp;
                        }else{
                            attr+=a.toLowerCase()+'='+b.trim();
                        }
                    }
                });
                if(v.title){
                    htm+='<label for="'+v.title+'">'+v.title+'</label>';
                }else{
                    htm+='<label for="'+k+'">'+k+'</label>';
                }

                if(typeof v.type !== "undefined"){
                    if(v.type == "textarea"){
                        htm+='<textarea name="'+k+'" class="form-control '+(typeof v.class !== 'undefined' ? v.class : '')+'" '+attr+'></textarea>';
                    }else if(v.type == "text"){
                        htm+='<input type="text" name="'+k+'" class="form-control '+(typeof v.class !== 'undefined' ? v.class : '')+'" '+attr+' />';
                    }else if(v.type == "file"){
                        htm+='<input type="file" name="'+k+'" '+attr+' />';
                    }
                }else{
                    htm+='<input type="text" name="'+k+'" class="form-control '+(typeof v.class !== 'undefined' ? v.class : '')+'" '+attr+' />';
                }
            }else{
                htm+='<label for="'+k+'">'+k+'</label>';
                htm+='<input type="text" name="'+k+'" class="form-control '+(typeof v.class !== 'undefined' ? v.class : '')+'"/>';
            }
            if(v.info)
                htm+='<span class="info">'+v.info+'</span>';
            htm+='</div>';
        });
        htm+='<button type="button" ng-click="tes()" class="btn btn-primary">Submit</button>';
    htm+='</form>';
    return htm;
}