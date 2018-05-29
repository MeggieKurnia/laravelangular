<?php

namespace App\Http\Controllers\admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class FormController extends Controller
{
    function postCreate(Request $req){
    	$table = dycrptStr($req->input('t'));
    	echo $table;
    }
}
