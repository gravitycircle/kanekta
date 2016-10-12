(function(){
	var app = angular.module("main", ['htmlcustom', 'configurator', 'siteviews', 'modes', 'ngMap']);

	app.config(['$locationProvider', function($locationProvider) {
		$locationProvider.html5Mode(true);
	}]);

	app.factory('navigator', ['$location', function($location){
		
	}]);

	app.directive('body', ['$compile', '$window', '$timeout', '$location', 'features', 'sources', 'constants', 'email', 'modal', 'submission', 'fetch', function($compile, $window, $timeout, $location, features, sources, constants, email, modal, submission, fetch){
		return{
			restrict: 'E',
			templateUrl: 'shadow/main.html',
			scope: {
				logo : '@',
				temp : '@',
				fields: '@'
			},
			link: function(scope, element, attrs){
				features.run();
				sources.get(function(){
					//post-load
					$('.characters').removeClass('pre');
					setTimeout(function(){
						$('.intro-sizer').removeClass('squelch');

					}, 2000);

					setTimeout(function(){
						scope.animstate = false;
						$('.intro-sizer').css('height' , '');
					}, 3800);
				}, function(content){
					//pre-load
					scope.setup(content);
					scope.sizeIntro();

					setInterval(function(){
						$('.form-sizer').height($(".form").height());
					}, 1);
					
					$(window).on('resize', function(){
						scope.sizeIntro();
					});
				});
			},
			controller: function($scope, $element, $attrs){
				$scope.regstate = false;
				$scope.animstate = true;
				$scope.setup = function(d) {
					$scope.temp = d.contents.template;
					$scope.logo = d.contents.logo;
					$scope.fields = d.contents.fields;
				};

				$scope.sizeIntro = function(){
					if($scope.animstate) {
						var total = parseFloat($('.introduction').css('height'));
						$('.intro-sizer').height(total);
					}
					$('.copy-sizer').height($(".copy").height());
				};

				$scope.openRegister = function(){
					var txt = 'Sign Up';
					var chg = 'Register';

					if($scope.regstate) {
						//register
						var err = [];
						var pass = [];
						for(var g in submission.data) {
							if(submission.data[g] === false) {
								err.push(g);
							}
						}
						
						if(err.length > 0) {
							modal.showmodal('Submission Failed', 'There was an error in your submission. All fields have to be filled in correctly.', 'Close', function(){

							}, function(){

							});
						}
						else{
							fetch.secured(constants.base+'php/verify-shortcut.php?check='+submission.data.email).then(function(resp){
								if(resp.data == 'fail') {
									modal.showmodal('Submission Failed', 'Please provide a valid email address on the Email Address field.', 'Close', function(){

									}, function(){

									});
								}
								else{
									fetch.post(constants.base+'php/save.php?check=1', submission.data).then(function(resp){
										console.log(resp);
									}, function(){
										modal.showmodal('Submission Failed', 'We are experiencing some technical difficulties. We are not able to take in submissions right now. Please try again later. Apologies for the inconvenience.', 'Close', function(){
											submission.reset();
										}, function(){

										});
									});
								}
							}, function(){
								modal.showmodal('Submission Failed', 'We are experiencing some technical difficulties. We are not able to take in submissions right now. Please try again later. Apologies for the inconvenience.', 'Close', function(){
									submission.reset();
								}, function(){

								});
							});
						}
					}
					else{
						$('.copy-sizer').addClass('squelch');
						$('.form-sizer').removeClass('squelch');
						$('.submitbtn').html(chg);
						$scope.regstate = true;
					}
				};
			}
		};
	}]);
})();