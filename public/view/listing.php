<div class="header"> 
	<br/>
	<ol class="breadcrumb">
	  <li><a href="/admin-cp">System</a></li>
	  <li class="active">{{ param.params }}</li>
	</ol> 				
</div>

<div id="page-inner">
    <div class="row">
        <div class="col-md-12">
        	<div ng-if="msg != ''" class="alert alert-success">{{msg}}</div>
            <div class="panel panel-default">
                <div class="panel-body">
                    <div class="table-responsive">
                        <div list cnf="{{param.params}}">
                        </div>
                	</div>
           		</div>
       		 </div>
        </div>
    </div>
</div>