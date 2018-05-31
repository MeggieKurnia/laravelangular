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
    			'tes3',
    			'tes4'=>['type'=>'file','accept'=>'image/jpg, image/jpeg, image/png','upload_dir'=>'site/upload']
    		],
            'table'=>'App\Model\ConfigModel|'.__METHOD__
    	];
        return renderJSON($ret);
    }
}
