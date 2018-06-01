<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ListingController extends Controller
{
    function deleteData(Request $req){
    	$t = $req->input('ctrl');
    	foreach($req->input('ids') as $k ){
    		if(class_exists("App\\Model\\".ucfirst($t)."Model")){
    			$m = "App\\Model\\".ucfirst($t)."Model";
    			$cls = new $m();
    			$cls->where('id',$k)->delete();
    		}else{
    			DB::table($t)->whereId($k)->delete();
    		}
    	}
    }
}
