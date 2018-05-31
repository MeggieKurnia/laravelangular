<?php
	function encryptStr($val){
		return \Crypt::encryptString($val);
	}

	function dycrptStr($val){
		return \Crypt::decryptString($val);
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
        if(!isset($arr['table']))
            die('Table Required'); 
       	$ret['t'] = encryptStr($arr['table']);
    	return $ret;
    }
?>