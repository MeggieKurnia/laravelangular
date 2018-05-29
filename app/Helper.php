<?php
	function encryptStr($val){
		return \Crypt::encryptString($val);
	}

	function dycrptStr($val){
		return \Crypt::decryptString($val);
	}
?>