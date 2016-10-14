<?php
if(isset($_GET['check'])){
	if(filter_var($_GET['check'], FILTER_VALIDATE_EMAIL)){
		echo 'pass';
	}
	else{
		echo 'fail';
	}
}
else{
	header("HTTP/1.0 404 Not Found");
	?>
	<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
	<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>404 Page Not Found</title>
	<style type="text/css">
	<!--
	body {
		margin: 0px;
		padding: 0px;
		font-family: Arial, Helvetica, sans-serif;
		font-color: #000000;
	}
	#wrapper {
		text-align: left;
		width: 580px;
		margin-top: 50px;
		margin-right: auto;
		margin-bottom: 0px;
		margin-left: auto;
	}
	.title{
		font-size: 20px;
		font-weight: bold;
	}

	.linktext {	font-size: 12px
	}
	-->
	</style>
	</head>

	<body>

	<div id="wrapper">
	  <p class="title">404 Page Not Found</p>
	  <p>Sorry! The page you requested is unavailable. Please use your browser's Back button, or go to the <a href="/" target="_self">home page</a>.</p>
	  </div>

	</body>
	</html><?php
}
?>