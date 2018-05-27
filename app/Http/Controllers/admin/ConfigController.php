<?php

namespace App\Http\Controllers\admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ConfigController extends Controller
{
    public function createForm(){
    	$ret = [
    		'form'=>[
    			'tes'=>['type'=>'text','title'=>'Title Form','info'=>'tes info'],
    			'tes2'=>['type'=>'textarea','id'=>'tesid'],
    			'tes3'=>['info'=>'dww'],
    			'tes4'=>['type'=>'file','accept'=>'image/jpg, image/jpeg, image/png']
    		]
    	];
    	$d = $this->renderJSON($ret);
    	return response()->json($d);
    }

    function renderJSON($arr){
    	$ret=[];
    	foreach ($arr['form'] as $key => $value) {
    		if(is_numeric($key)){
    			$ret[$value]='';
    		}else{
    			$ret[$key] = $value;
    		}
    	}
    	return $ret;
    }
}
