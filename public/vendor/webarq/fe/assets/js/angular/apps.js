var app = angular.module("apps", ["ngRoute"]);
app.config(function($routeProvider,$locationProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "../view/main.blade.php",
        controller  : "DashboardController"
    })
    .when("/form/:params", {
        templateUrl : "../view/form.php",
        controller  : "FormController"
    })
     .when("/listing/:params", {
        templateUrl : "../view/listing.php",
        controller  : "ListingController"
    })
    .otherwise({
        redirectTo: '/'
    });
    $locationProvider.html5Mode(true)
    $locationProvider.hashPrefix('');
});
app.service('createForm',function($http){
    this.generate = function(url){
        var r = null;
        $http({
            method:"POST",
            url:urlapp+"/form/"+url,
        }).then(function(res){
            return generateForm(res.data);
        });
    }
});

app.directive("frm", function($compile,$http) {
    return {
        restrict: 'A',
        scope: true,
        link: function(scope,element, attr){
            $http({
                method:"POST",
                url:urlapp+'/form/'+attr.atr
            }).then(function(res){
                element.append($compile(generateForm(res.data))(scope));
                scope.tes=function(r){
                    var fmdata = new FormData(document.getElementById('frmPost'));
                    $http.post("../postCreate", fmdata,{
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    });
                }
            });

        }
    }
});

app.directive('list', function($compile,$http){
    return {
        restrict: 'A',
        scope: true,
        link: function(scope,element, attr){
            $http({
                method:"POST",
                url:urlapp+'/listing/'+attr.tbl
            }).then(function(res){
                element.append($compile(generateTable(res.data))(scope));
                // scope.tes=function(r){
                //     var fmdata = new FormData(document.getElementById('frmPost'));
                //     $http.post("../postCreate", fmdata,{
                //         transformRequest: angular.identity,
                //         headers: {'Content-Type': undefined}
                //     });
                // }
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

app.controller('FormController', function($scope,$routeParams){
   $scope.param = $routeParams;
});

app.controller('ListingController', function($scope,$routeParams){
    console.log($routeParams);
    $scope.param = $routeParams;
});

function generateForm(ar){
    console.log(ar);
    var htm='<form action="postCreate" method="post" enctype="multipart/form-data" id="frmPost">';
        htm+='<input type="hidden" name="t" value="'+ar.t+'">';
        $.each(ar, function(k,v){
            if(k != 't'){
                htm+='<div class="form-group">';
                if(typeof v === 'object'){
                    var attr = '';
                    $.each(v, function(a,b){
                        if(jQuery.inArray(a.toLowerCase(),["class","title","type","info","accept","t","upload_dir","rules"]) === -1)
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
                        }else if(jQuery.inArray(v.type.toLowerCase(),["text","password"]) !== -1){
                            htm+='<input type="'+v.type+'" name="'+k+'" class="form-control '+(typeof v.class !== 'undefined' ? v.class : '')+'" '+attr+' />';
                        }else if(v.type == "file"){
                            htm+='<input type="file" name="'+k+'" '+attr+' />';
                        }
                    }else{
                        htm+='<input type="text" name="'+k+'" class="form-control '+(typeof v.class !== 'undefined' ? v.class : '')+'" '+attr+' />';
                    }
                }else{
                    htm+='<label for="'+k+'">'+k+'</label>';
                    htm+='<input type="text" name="'+k+'" class="form-control"/>';
                }
                if(v.info)
                    htm+='<span class="info">'+v.info+'</span>';
                htm+='</div>';
            }
        });
        htm+='<button type="button" ng-click="tes(\'#frmPost\')" class="btn btn-primary">Submit</button>';
    htm+='</form>';
    return htm;
}

function generateTable(arr){
    if(Object.keys(arr).length){
        var htm='<table class="table table-striped table-bordered table-hover" id="dataTables-example">';
        htm+='<thead><tr>';
        $.each(arr, function(k,v){
            if(k == 0){
                $.each(v, function(ky,vy){
                    if(ky != 'id'){
                        htm+='<th>'+ky+'</th>';
                    }
                });
            }
        });
        htm+='</tr></thead><tbody>';
        $.each(arr, function(k,v){
            htm+='<tr>';
                 $.each(v, function(ky,vy){
                    if(ky != 'id'){
                        htm+='<td>'+vy+'</td>';
                    }
                 });
            htm+='</tr>';
        });
        htm+='</tbody></table>';
        htm+='<script>'
                +'$(document).ready(function () {'
                    +'$("#dataTables-example").dataTable();'
                +'});'
            +'</script>';
        return htm;
    }
}