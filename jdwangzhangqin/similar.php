<?php
	include "public.php";
	$sql = "select * from similar";
	$res = mysql_query($sql);
	
	$data = array();
	while( $arr = mysql_fetch_array($res) ){
		$data[] = $arr;
	}
	echo json_encode( $data );
?>