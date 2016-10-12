<?php
include_once('../config.php');
if(isset($_GET['clear'])){
	file_put_contents(DOCROOT.'/output/mails.txt', '');
}

$cont = file_get_contents(DOCROOT.'/output/mails.txt');

if($cont == '') {
	$cont = '<tr><td colspan="3" style="text-align: center;">There are registration entries found.</td></tr>';
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Kanekta: Registration Form Reponses</title>
	<link rel="shortcut icon" href="<?=BASE?>img/favico.ico" type="image/vnd.microsoft.icon" />
	<link rel="icon" type="image/png" href="<?=BASE?>img/favico.png" />
	<script src="https://use.typekit.net/tpt3mbu.js"></script>
	<script>try{Typekit.load({ async: true });}catch(e){}</script>
	<link rel="stylesheet" href="<?=BASE?>css/style.css" />
</head>
<body>
	<div id="wrapper" style="overflow: auto; padding-top: 40px; padding-bottom: 40px;">
		<div class="contain">
			<div class="kanekta-img">
				<div class="letters" style="white-space: nowrap;">
					<img class="characters l-0" src="http://richardbryanong.com/sites/kanekta/img/svg/k.svg" />
					<img class="characters l-1" src="http://richardbryanong.com/sites/kanekta/img/svg/a.svg" />
					<img class="characters l-2" src="http://richardbryanong.com/sites/kanekta/img/svg/n.svg" />
					<img class="characters l-3" src="http://richardbryanong.com/sites/kanekta/img/svg/e.svg" />
					<img class="characters l-4" src="http://richardbryanong.com/sites/kanekta/img/svg/k.svg" />
					<img class="characters l-5" src="http://richardbryanong.com/sites/kanekta/img/svg/t.svg" />
					<img class="characters l-6" src="http://richardbryanong.com/sites/kanekta/img/svg/a.svg" />
				</div>
			</div>
			<div class="intro-sizer">
				<div class="introduction">
					<div class="copy-sizer">
						<div class="copy">
							<table>
								<thead>
									<tr>
										<th>Date</th>
										<th>Name</th>
										<th>Email Address</th>
									</tr>
								</thead>
								<tbody>
									<?=$cont?>
								</tbody>
							</table>
						</div>
					</div>
					<p class="sign-up-button" style="padding-top: 40px;">
						<a href="<?=BASE?>php/check-records.php?clear" class="submitbtn">Clear All Records</a>
					</p>
				</div>
			</div>
		</div>
	</div>
</body>
</html>