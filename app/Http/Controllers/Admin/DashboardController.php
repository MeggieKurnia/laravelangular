<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\model\DashboardModel;

class DashboardController extends Controller
{
    function getActivity(Request $req){
    	$day = DashboardModel::whereRaw('DAY(date) = DAY(NOW())')->count();
    	$wek = DashboardModel::whereRaw('WEEK(date) = WEEK(NOW())')->count();
    	$mon = DashboardModel::whereRaw('MONTH(date) = MONTH(NOW())')->count();
    	return response()->json(['day'=>$day,'wek'=>$wek,'mon'=>$mon]);
    }
}
