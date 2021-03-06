﻿<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <base href="/admin-cp/">
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta content="" name="description" />
    <meta content="webthemez" name="author" />
    <meta name="token" content="{{csrf_token()}}" />
    <title>BRILLIANT Free Bootstrap Admin Template - WebThemez</title>
    <!-- Bootstrap Styles-->
    <link href="{{URL::asset('vendor/webarq/fe/assets/css/bootstrap.css')}}" rel="stylesheet" />
    <!-- FontAwesome Styles-->
    <link href="{{URL::asset('vendor/webarq/fe/assets/css/font-awesome.css')}}" rel="stylesheet" />
    <!-- Morris Chart Styles-->
    <link href="{{URL::asset('vendor/webarq/fe/assets/js/morris/morris-0.4.3.min.css')}}" rel="stylesheet" />
    <!-- Custom Styles-->
    <link href="{{URL::asset('vendor/webarq/fe/assets/css/custom-styles.css')}}" rel="stylesheet" />
    <link href="{{URL::asset('vendor/webarq/fe/assets/js/dataTables/dataTables.bootstrap.css')}}" rel="stylesheet" />
    <!-- Google Fonts-->
    <link href='http://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css' />
    <script>
        var urlapp = "{{URL::to('/')}}";
    </script>
    <script src="{{URL::asset('vendor/webarq/fe/assets/js/jquery-1.10.2.js')}}"></script> 
    <script src="{{URL::asset('vendor/webarq/fe/assets/js/angular/angular.min.js')}}"></script>
    <script src="{{URL::asset('vendor/webarq/fe/assets/js/angular/route.js')}}"></script>
    <script src="{{URL::asset('vendor/webarq/fe/assets/js/angular/apps.js')}}"></script>
</head>
<body ng-app="apps">
    <div id="wrapper">
        <nav class="navbar navbar-default top-navbar" role="navigation">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".sidebar-collapse">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="index.html"><strong><i class="icon fa fa-plane"></i> BRILLIANT</strong></a>
				
		<div id="sideNav" href="">
		<i class="fa fa-bars icon"></i> 
		</div>
            </div>

            <ul class="nav navbar-top-links navbar-right">
                <!-- /.dropdown -->
                <li class="dropdown">
                    <a class="dropdown-toggle" data-toggle="dropdown" href="#" aria-expanded="false">
                        <i class="fa fa-user fa-fw"></i> <i class="fa fa-caret-down"></i>
                    </a>
                    <ul class="dropdown-menu dropdown-user">
                        <li><a href="#"><i class="fa fa-user fa-fw"></i> User Profile</a>
                        </li>
                        <li><a href="#"><i class="fa fa-gear fa-fw"></i> Settings</a>
                        </li>
                        <li class="divider"></li>
                        <li><a href="#"><i class="fa fa-sign-out fa-fw"></i> Logout</a>
                        </li>
                    </ul>
                    <!-- /.dropdown-user -->
                </li>
                <!-- /.dropdown -->
            </ul>
        </nav>
        <!--/. NAV TOP  -->
        <nav class="navbar-default navbar-side" role="navigation">
            <div class="sidebar-collapse">
                <ul class="nav" id="main-menu">

                    <li>
                        <a href="#"><i class="fa fa-sitemap"></i> System<span class="fa arrow"></span></a>
                        <ul class="nav nav-second-level">
                            <li>
                                <a href="/admin-cp">Dashboard</a>
                            </li>
                            <li>
                                <a href="form/config">Configuration</a>
                            </li>
                            <li>
                                <a href="listing/admin">Admin</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="element"><i class="fa fa-desktop"></i> UI Elements</a>
                    </li> 
					 
					<li>
                        <a href="#"><i class="fa fa-sitemap"></i> Charts<span class="fa arrow"></span></a>
                        <ul class="nav nav-second-level">
                            <li>
                                <a href="chart.html">Charts JS</a>
                            </li>
                            <li>
                                <a href="morris-chart.html">Morris Chart</a>
                            </li>
							</ul>
					</li>	
							
                    <li>
                        <a href="tab-panel.html"><i class="fa fa-qrcode"></i> Tabs & Panels</a>
                    </li>
                    
                    <li>
                        <a href="table.html"><i class="fa fa-table"></i> Responsive Tables</a>
                    </li>
                    <li>
                        <a href="form.html"><i class="fa fa-edit"></i> Forms </a>
                    </li>


                    <li>
                        <a href="#"><i class="fa fa-sitemap"></i> Multi-Level Dropdown<span class="fa arrow"></span></a>
                        <ul class="nav nav-second-level">
                            <li>
                                <a href="#">Second Level Link</a>
                            </li>
                            <li>
                                <a href="#">Second Level Link</a>
                            </li>
                            <li>
                                <a href="#">Second Level Link<span class="fa arrow"></span></a>
                                <ul class="nav nav-third-level">
                                    <li>
                                        <a href="#">Third Level Link</a>
                                    </li>
                                    <li>
                                        <a href="#">Third Level Link</a>
                                    </li>
                                    <li>
                                        <a href="#">Third Level Link</a>
                                    </li>

                                </ul>

                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="empty.html"><i class="fa fa-fw fa-file"></i> Empty Page</a>
                    </li>
                </ul>

            </div>

        </nav>
        <div id="page-wrapper" ng-view></div>
    </div>
    <script src="{{URL::asset('vendor/webarq/fe/assets/js/bootstrap.min.js')}}"></script>
    <script src="{{URL::asset('vendor/webarq/fe/assets/js/jquery.metisMenu.js')}}"></script>
    <script src="{{URL::asset('vendor/webarq/fe/assets/js/dataTables/jquery.dataTables.js')}}"></script>
    <script src="{{URL::asset('vendor/webarq/fe/assets/js/dataTables/dataTables.bootstrap.js')}}"></script>
    <script src="{{URL::asset('vendor/webarq/fe/assets/js/custom-scripts.js')}}"></script>
</body>

</html>