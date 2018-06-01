<div class="header"> 
    <h1 class="page-header">
        Dashboard <small>Welcome John Doe</small>
    </h1>
	<ol class="breadcrumb">
	  <li><a href="/admin-cp">System</a></li>
	  <li class="active">{{ param.params }}</li>
	</ol> 				
</div>
<div id="page-inner">
	<div class="row">
		<div ng-if="msg != ''" class="alert alert-success">{{msg}}</div>
		<div frm  atr="{{ param.params }}"></div>
	</div>
</div>