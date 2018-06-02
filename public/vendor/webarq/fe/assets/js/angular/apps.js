var msgsuccess='';
var app = angular.module("apps", ["ngRoute"]);
app.config(function($routeProvider,$locationProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "../view/main.blade.php",
        controller  : "DashboardController",
        cache: false
    })
    .when("/form/:params", {
        templateUrl : "../view/form.php",
        controller  : "FormController",
        cache: false
    })
     .when("/listing/:params", {
        templateUrl : "../view/listing.php",
        controller  : "ListingController",
        cache: false
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

app.directive("frm", function($compile,$http,$route) {
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
                    }).then(function(){
                        $route.reload();
                        msgsuccess = "Process Success";
                        clearMsg();
                    });
                }
            });

        }
    }
});

app.directive('list', function($compile,$http,$route,$location){
    return {
        restrict: 'A',
        scope: true,
        link: function(scope,element, attr){
            $http({
                method:"POST",
                url:urlapp+'/listing/'+attr.cnf
            }).then(function(res){
                element.append($compile(generateTable(res.data))(scope));
                var ids = new Array();
                scope.appnd = function(id){
                    $(".ck").each(function(){
                        if($(this).val() == id){
                            if($(this).is(":checked")){
                                ids.push(id);
                            }else{
                                var index = ids.indexOf(id);
                                if (index > -1) {
                                  ids.splice(index, 1);
                                }
                            }
                        }
                    });
                }
                scope.create=function(){
                    $location.path('/form/'+attr.cnf);
                }
                scope.delete = function(){
                    if(ids.length){
                        var x = {ids:ids,ctrl:attr.cnf};
                         $http.post("../deleteData", x).then(function(){
                            $route.reload();
                            msgsuccess = "Delete Success";
                            clearMsg();
                         });
                    }else{
                        alert('Select Data');
                    }
                }

                scope.edit=function(){
                    if(ids.length && ids.length == 1){

                    }else{
                        alert('Please Select 1 Data');
                    }
                }

                scope.selectall=function(){
                    var e = $("#ca").is(":checked");
                    if(e){
                        $(".ck").each(function(){
                            $(this).prop("checked",true);
                            scope.appnd($(this).val());
                        });
                    }else{
                        ids=new Array();
                        $(".ck").prop("checked",false);
                    }
                }
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
   $scope.msg = msgsuccess;
});

app.controller('ListingController', function($scope,$routeParams){
    $scope.param = $routeParams;
    $scope.msg = msgsuccess;
});

function generateForm(ar){
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
     var htm = '<div class="btn-group" style="margin-bottom:10px;"><button data-toggle="dropdown" class="btn btn-primary dropdown-toggle" aria-expanded="true">Action <span class="caret"></span></button>';
        if(Object.keys(arr.actions).length){
            htm+='<ul class="dropdown-menu">';
            $.each(arr.actions, function(ackey,acval){
                var a = '';
                var ac = acval.toLowerCase();
                if(ac == "delete"){
                    a='ng-click="delete()"';
                }else if(ac == "edit"){
                    a='ng-click="edit()"';
                }else if(ac == "active"){
                    a='ng-click="active()"';
                }else if(ac == "create"){
                    a='ng-click="create()"';
                }

                htm+='<li><a href="#" '+a+'>'+ac+'</a></li>';
            });
            htm+='</ul>';
        }
        htm+='</div>';
    if(Object.keys(arr.data).length){
        htm+='<table class="table table-striped table-bordered table-hover" id="dataTables-example">';
        htm+='<thead><tr>';
        htm+='<th><input type="checkbox" ng-click="selectall()" id="ca" title="Select All"/></th>';
        $.each(arr.data, function(k,v){
            if(k == 0){
                $.each(v, function(ky,vy){
                    if(ky != 'id'){
                        htm+='<th>'+ky+'</th>';
                    }
                });
            }
        });
        htm+='</tr></thead><tbody>';
        $.each(arr.data, function(k,v){
            htm+='<tr>';
            htm+='<td><input type="checkbox" class="ck" value="'+v.id+'" ng-click="appnd(\''+v.id+'\')"></td>';
                 $.each(v, function(ky,vy){
                    if(ky != 'id'){
                        htm+='<td>'+vy+'</td>';
                    }
                 });
            htm+='</tr>';
        });
        htm+='</tbody></table>';
    }else{
        htm+='<table class="table table-striped table-bordered table-hover" id="dataTables-example">';
        htm+='<thead><tr><th>Data</th></tr><tbody><tr><td>Not Found</td></tr></tbody>';
    }
    htm+="<script>"
                +"$(document).ready(function () {"
                    +"$('#dataTables-example').dataTable({"
                        +"\"columnDefs\" : [{\"targets\" : 0,\"orderable\" : false}]"
                    +"});"
                    +"$('#dataTables-example').on( 'page.dt', function () {"
                        +"$('.ck').prop('checked',false);"
                        +"$('#ca').prop('checked',false);"
                    +"});"
                +"});"
            +"</script>";
    return htm;
}

function clearMsg(){
    setTimeout(function(){
        if(msgsuccess != ''){
            msgsuccess='';
        }
    },100);
}