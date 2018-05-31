<?php

namespace App\Http\Controllers\admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class FormController extends Controller
{
    function postCreate(Request $req){
    	$dcy = dycrptStr($req->input('t'));
    	$ex = explode("|",$dcy);
    	$t = $ex[0];
    	$cls = $ex[1];
    	$q = $this->frmvalidate($cls);
    	$this->cekValidate($q['rules']);
    	$data = $req->except('t');
    	if(class_exists($t)){
    		$model = new $t();
    		$arrinsert=[];
    		foreach($data as $k=>$v){
    			if($req->file($k)){
    				$file = $req->file($k);
    				$destinationPath = $q['upload'][$k];
    				chmod($destinationPath,0777);
    				$filename = $destinationPath.'/'.md5(date('dMYHis')).'-'.$file->getClientOriginalName();
    				$file->move($destinationPath,$filename);
    				$arrinsert[$k] = $filename;
    			}else{
    				$arrinsert[$k]= ($k == "password" ? md5($v) : $v);
    			}
    		}
    		$model->insert($arrinsert);
    	}else{
    		DB::table($t)->insert($data);
    	}
    }

    private function frmvalidate($class){
    	$c = explode("::",$class);
    	if(!class_exists($c[0]))
    		die('Class Not Found');
    	$cls = new $c[0]();
    	$method = $c[1];
    	$data = json_decode(json_encode($cls->$method()),true);
    	$rules=[];
    	$upload=[];
    	foreach ($data as $key => $value){
    		if(is_array($value)){
    			$keys = array_keys($value);
	    		if(in_array("rules",$keys)){
	    			$rules[$key] = $value['rules'];
	    		}
	    		if(in_array("upload_dir",$keys)){
					$upload[$key] = $value['upload_dir'];
				}
			}
    	}
    	return ['rules'=>$rules,'upload'=>$upload];
    }

    private function cekValidate($rule){
    	$validator = \Validator::make(request()->all(),$rule);
        if ($validator->fails()) {
            die('required');
        }
    }
}
