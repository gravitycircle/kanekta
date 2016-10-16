<?php
if(isset($_GET['request']) && $_GET['request'] == 1) {
	include_once('../config.php');
}

function main($json = true) {
	$output = array();
	$filearr = array();

	if(isset($_GET['svg']) && $_GET['svg'] == 'true'){
		$folder = 'img/svg';
	}
	else{
		$folder = 'img/png';
	}

	$arr = scandir (DOCROOT.'/'.$folder.'/');
	foreach($arr as $file)
	{
		if(substr($file, 0, 1) !== '.' && substr($file, 0, 6) !== 'favico')
		{
			array_push($filearr, BASE.$folder.'/'.$file);
		}
	}

	$folder = 'img/all';
	$arr = scandir (DOCROOT.'/'.$folder.'/');
	foreach($arr as $file)
	{
		if(substr($file, 0, 1) !== '.' && substr($file, 0, 6) !== 'favico')
		{
			array_push($filearr, BASE.$folder.'/'.$file);
		}
	}

	$output['nav'] = array(
		array(
			'name' => 'Home',
			'path' => ''
		)
	);

	$output['site_name'] = 'Kanekta';

	$output['preload'] = $filearr;

	$output['contents'] = array(
		'logo' => array(
			(isset($_GET['svg']) && $_GET['svg'] == 'true' ? BASE.'img/svg/k.svg' : BASE.'img/png/k.png'),
			(isset($_GET['svg']) && $_GET['svg'] == 'true' ? BASE.'img/svg/a.svg' : BASE.'img/png/a.png'),
			(isset($_GET['svg']) && $_GET['svg'] == 'true' ? BASE.'img/svg/n.svg' : BASE.'img/png/n.png'),
			(isset($_GET['svg']) && $_GET['svg'] == 'true' ? BASE.'img/svg/e.svg' : BASE.'img/png/e.png'),
			(isset($_GET['svg']) && $_GET['svg'] == 'true' ? BASE.'img/svg/k.svg' : BASE.'img/png/k.png'),
			(isset($_GET['svg']) && $_GET['svg'] == 'true' ? BASE.'img/svg/t.svg' : BASE.'img/png/t.png'),
			(isset($_GET['svg']) && $_GET['svg'] == 'true' ? BASE.'img/svg/a.svg' : BASE.'img/png/a.png')
		),
		'template' => BASE.'img/all/template.png',
		'fields' => array(
			array(
				'label' => 'Name',
				'id' => 'name',
				'type' => 'text',
				'require' => true
			),
			array(
				'label' => 'Email Address',
				'id' => 'email',
				'type' => 'email',
				'require' => true
			)
		)
	)
	;
	if($json) {
		return json_encode($output);
	}
	else{
		$output['meta'] = array(
			'home' => array(
				'title' => '',
				'description' => 'Kanekta is an agency representing artisan brands from across the globe within the Canadian apparel industry. Our mission is to increase the availability of ethically-sourced products in the mainstream market by connecting and managing the relationship between producers and retailers.',
				'og' => array(
					'title' => 'Kanekta',
					'description' => 'Kanekta is an agency representing artisan brands from across the globe within the Canadian apparel industry. Our mission is to increase the availability of ethically-sourced products in the mainstream market by connecting and managing the relationship between producers and retailers.',
					'site_name' => 'Kanekta',
					'url' => BASE,
					'image' => BASE.'img/non-render/og-logo.jpg' 
				),
				'tw' => array(
					'card' => 'summary',
					'title' => 'Kanekta',
					'description' => 'Kanekta is an agency representing artisan brands from across the globe within the Canadian apparel industry. Our mission is to increase the availability of ethically-sourced products in the mainstream market by connecting and managing the relationship between producers and retailers.',
					'image' => BASE.'img/non-render/og-logo.jpg'
				)
			),
			'lost' => array(
				'title' => '',
				'description' => 'Kanekta is an agency representing artisan brands from across the globe within the Canadian apparel industry. Our mission is to increase the availability of ethically-sourced products in the mainstream market by connecting and managing the relationship between producers and retailers.',
				'og' => array(
					'title' => 'Kanekta',
					'description' => 'Kanekta is an agency representing artisan brands from across the globe within the Canadian apparel industry. Our mission is to increase the availability of ethically-sourced products in the mainstream market by connecting and managing the relationship between producers and retailers.',
					'site_name' => 'Kanekta',
					'url' => BASE,
					'image' => BASE.'img/non-render/og-logo.jpg' 
				),
				'tw' => array(
					'card' => 'summary',
					'title' => 'Kanekta',
					'description' => 'Kanekta is an agency representing artisan brands from across the globe within the Canadian apparel industry. Our mission is to increase the availability of ethically-sourced products in the mainstream market by connecting and managing the relationship between producers and retailers.',
					'image' => BASE.'img/non-render/og-logo.jpg'
				)
			)
		);
		return $output;
	}
}



if(isset($_GET['request']) && $_GET['request'] == '1') {
	header('Cache-Control: no-cache, must-revalidate');
	header('Expires: '.date('D, d M Y H:i:s T', (strtotime('now') + 3600)));
	header('Content-type: application/json');
	echo main();
}
else{
	if(__FILE__ != realpath($_SERVER['SCRIPT_FILENAME'])){
		$GLOBALS['data'] = main(false);
	}
	else{
		include_once('../config.php');
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

		<div id="wrapper"><p><img src="<?=BASE?>hplogo.gif" width="580" height="70" /></p>
		  <p class="title">404 Page Not Found</p>
		  <p>Sorry! The page you requested is unavailable. Please use your browser's Back button, or go to the <a href="/" target="_self">home page</a>.</p>
		  </div>

		</body>
		</html>

		<?php
	}
}
?>