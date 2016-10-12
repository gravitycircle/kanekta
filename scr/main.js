(function(){
	var app = angular.module("main", ['htmlcustom', 'configurator', 'siteviews', 'modes', 'ngMap']);

	app.config(['$locationProvider', function($locationProvider) {
		$locationProvider.html5Mode(true);
	}]);

	app.factory('navigator', ['$location', function($location){
		
	}]);

	app.directive('body', ['$compile', '$window', '$timeout', '$location', 'features', 'sources', 'constants', 'email', 'modal', 'submission', function($compile, $window, $timeout, $location, features, sources, constants, email, modal, submission){
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