(function(){
	//differing frameworks
	var mode = angular.module("modes", []);

	mode.factory('modal', [function(){
		return {
			'htmlmodal' : function(html, onload){
				var o = this;
				$('body').append('<div class="modal-shader"><div class="modal-window"><div class="modal-text">'+html+'</div></div></div>');

				$('.modal-shader').transition({
					'opacity' : 1,
					'width' : '100%',
					'height' : '100%'
				}, 500, function(){
					$('.modal-shader .modal-window').transition({
						'scale' : [1,1],
						'x' : '-50%',
						'y' : '-50%',
						'opacity' : 1
					}, 300, function(){
						$('.modal-text, .modal-control').transition({
							'opacity' : 1
						}, 300, function(){
							if(typeof onload == 'function'){
								onload();
							}
						});
					});
				});


			},
			'hidemodal' : function(afterclose){
				if($('.modal-shader').length > 0){
					$('.modal-window').transition({
						'opacity' : 0
					}, 300, function(){
						$('.modal-shader').transition({
							'width' : 0,
							'height' : 0,
							'opacity' : 0
						}, 500, function(){
							$('.modal-shader').off('click');
							$('.modal-window').off('click');
							$('.modal-control a').off('click');

							$('.modal-shader').remove();

							if(typeof afterclose == 'function'){
								afterclose();
							}
						});
					});
				}
			},
			'showmodal' : function(heading, message, buttontext, onload, onclose){
				var o = this;
				$('body').append('<div class="modal-shader"><div class="modal-window"><div class="modal-text"><h2>'+heading+'</h2>'+message+'</div><div class="modal-control"><a href="#" class="action">'+buttontext+'</a></div></div></div>');

				$('.modal-shader').transition({
					'opacity' : 1,
					'width' : '100%',
					'height' : '100%'
				}, 500, function(){
					$('.modal-shader .modal-window').transition({
						'scale' : [1,1],
						'x' : '-50%',
						'y' : '-50%',
						'opacity' : 1
					}, 300, function(){
						$('.modal-text, .modal-control').transition({
							'opacity' : 1
						}, 300, function(){
							$('.modal-shader').on('click', function(){
								if(typeof onclose == 'function'){
									o.hidemodal(onclose);
								}
								else{
									o.hidemodal();
								}
							});

							$('.modal-window').on('click', function(e){
								e.stopPropagation();
							});

							$('.modal-control a').on('click', function(e){
								e.preventDefault();
								if(typeof onclose == 'function'){
									o.hidemodal(onclose);
								}
								else{
									o.hidemodal();
								}
							});
							if(typeof onload == 'function'){
								onload();
							}
						});
					});
				});
			}
		};
	}]);

	mode.factory('submission', ['constants', 'fetch',function(constants, fetch){
		return{
			data : {},
			required: [],
			set : function(name, value, require, type){
				var d = this;
				var r = false;
				if(require){
					r = true;
				}

				if(r && value === ''){
					d.data[name] = false;
				}else{
					d.data[name] = value;
				}
			},
			register : function(name, require, type){
				var d = this;
				var r = false;
				
				if(require){
					r = true;
				}

				if(r){
					d.data[name] = false;
					d.required.push(name);
				}else{
					d.data[name] = '';
				}
			},
			reset : function(){
				var d = this;
				for(var i in d.data){

					if(d.required.indexOf(i) >= 0){
						d.data[i] = false;
					}
					else{
						d.data[i] = '';
					}
				}

				$('.field-text input').val('');
				$('.field-dropdown .selected').html('');
				$('.field-checkbox label').removeClass('check');
			},
			secure : function(pass, fail, technical, guid){
				var o = this;
				fetch.post(constants.base+'php/lasso.php?frm='+guid, o.data).then(function(response){
					if(response.data.status == 'failed'){
						//fail
						fail(response.data);
					}
					else{
						//pass
						pass(response.data);
					}
				}, function(){
					if(typeof technical == 'function'){
						technical();
					}
				});
			}
		};
	}]);

	mode.directive('field', ['$compile', 'submission', function($compile, submission){
		return{
			restrict: 'E',
			templateUrl: 'shadow/modified-elements/field.html',
			replace: true,
			scope : {
				field : '@'
			},
			link: function(scope, element, attrs){
				setTimeout(function(){
					scope.initialize();
				}, 1);
			},
			controller: function($scope, $element, $attrs){
				$scope.$on('$destroy', function(){
					if(g !== null){
						g.$destroy();
					}
				});
				var g = null;
				$scope.initialize = function(){
					$scope.field = $scope.$parent.fields[$attrs.index];
					submission.register($scope.field.id, $scope.field.require, $scope.field.type);
					var compose;
					if($scope.field.type == 'text' || $scope.field.type == 'email'){
						compose = '<text-field class="rendering"></text-field>';
					}

					$($element).append(compose);

					g = $scope.$new();

					$compile($($element).find('.rendering'))(g);
				};
			}
		};
	}]);

	mode.directive('textField', ['submission', function(submission){
		return {
			restrict: 'E',
			templateUrl: 'shadow/fields/text.html',
			replace: true,
			scope : {
				render: '@',
				mrk: '@'
			},
			link: function(scope, element, attrs){

			},
			controller: function($scope, $element, $attrs){
				$scope.render = $scope.$parent.field;
				$scope.render.idname = $scope.render.id.replace('[', '-').replace(']', '');
				if($scope.$parent.field.require){
					$scope.mrk = '*';
				}
				else{
					$scope.mrk = '';
				}

				$scope.typing = function(){
					$('.field-handler').removeClass('red');
					submission.set($scope.render.id, $($element).find('input').val(), $scope.render.require, $scope.render.type);
					if($($element).find('.input-error').length > 0){
						$($element).find('.input-error').removeClass('input-error');
					}

					if($('body').find('.input-error').length < 1){
						$('body').find('.error-msg').removeClass('shown');
					}
				};
			}
		};
	}]);
})();