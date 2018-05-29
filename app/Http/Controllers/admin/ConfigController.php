<?php

namespace App\Http\Controllers\admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ConfigController extends Controller
{
    public function createForm(){
        // $e = encryptStr('s');
        // echo $e."<br/>";
        // echo dycrptStr($e);
        // die;
        //dd(view('vendor.webarq.admin.index'));
    	$ret = [
    		'form'=>[
    			'tes'=>['type'=>'text','title'=>'Title Form','info'=>'tes info'],
    			'tes2'=>['type'=>'textarea','id'=>'tesid'],
    			'tes3'=>['info'=>'dww'],
    			'tes4'=>['type'=>'file','accept'=>'image/jpg, image/jpeg, image/png']
    		],
            'table'=>'config'
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
        if(isset($arr['table']))
            $ret['t'] = encryptStr($arr['table']);  
    	return $ret;
    }
}
