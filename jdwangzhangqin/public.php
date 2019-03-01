<?php
	header("content-type:text/html;charset=utf-8");
	$con = mysql_connect("localhost","root","root");
	
	mysql_select_db("db1824",$con);
	
	mysql_query("set names utf8");
?>