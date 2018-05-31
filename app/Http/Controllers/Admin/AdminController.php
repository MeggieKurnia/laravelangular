<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AdminController extends Controller
{
    public function createForm(){
    	$ret = [
    		'form'=>[
    			'email',
    			'username',
    			'password'=>['type'=>'password']
    		],
            'table'=>'App\Model\AdminModel|'.__METHOD__
    	];
        return renderJSON($ret);
    }

    function listing(){
    	$data = new \App\Model\AdminModel();
    	return $data->get();
    }
}
