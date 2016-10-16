this.seiyuJs = this.seiyuJs || {};
if (!('console' in window)) {
	window.console = {};
	window.console.log = function(str){
		return str;
	};
}
(function ($) {
	$(function(){
		// setting mypanel
		if ($("#my-panel-area.store-registered")[0]) {
			// cookiecheck
			// if($.cookie("mypanel-open") == "1"){
				// $("#my-panel-area").addClass('close');
				// $("#my-panel-area > .wrap").css("display","none");
			// }else{
				$("#my-panel-area").addClass('close');
				$("#my-panel-area > .wrap").css("display","none");
			// }
			$("#my-panel-area .btn-panel .click-area").click(function () {
				$("#my-panel-area > .wrap").slideToggle(300,"swing", function(){
					$("#my-panel-area").toggleClass('close');
					// if($("#my-panel-area").hasClass('close')){
					// 	$.cookie("mypanel-open", "0", { expires: 14, path:'/' });
					// }else{
					// 	$.cookie("mypanel-open", "1", { expires: 14, path:'/' });
					// }
				});
			});
		}
		// return to top
		if ($("#footer .btn_page-top")[0]) {
			$("#footer .btn_page-top a").click(function(e){
				e.preventDefault();
				$('html,body').animate({ scrollTop: 0 }, 300);
			});
		}
		$('a[href^="#"]').SmoothScroll({
			duration : 700,
			easing : 'easeOutQuint'
		});
		// setting list-columns (appendClass .even)
		if ($("#content-area .list-columns")[0]) {
			$("#content-area .list-columns").each(function(){
				$(this).find(".column:even").addClass("even");
			});
		}
	});
})(jQuery);






//phase1
( function ($) {
	var callBack = function() {
		$( function () {
			if( $('#contents.index')[0] ) seiyuJs.addIndexInput();
			if( $('#contents.result')[0] ) seiyuJs.addSearchInput();
			google.search.cse.element.render( {
				div: "g-input-block",
				attributes: {
					resultsUrl:"/search/"
				},
				tag: 'searchbox-only',
				gname:"page-search"
			 } );
			var $target = $('#g-input-block');
			$target.find('input').blur( function () {
				( $(this).val().length != '0' ) ?
					$(this).addClass('nodisp') :
					$(this).removeClass('nodisp');
			} );

			$target.find('.gsc-search-button').attr('src', '/common/img/pc/g_top_nav_4_search_btn.png');
		} );
	};
	window.__gcse = {
		parsetags: 'explicit',
		callback: callBack
	};
	// ( function () {
	// 	var cx = '012113029335891655027:ggrqeiwsybc';
	// 	var gcse = document.createElement('script');
	// 	gcse.type = 'text/javascript';
	// 	gcse.async = true;
	// 	gcse.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') +
	// 	'//www.google.com/cse/cse.js?cx=' + cx;
	// 	var s = document.getElementsByTagName('script')[0];
	// 	s.parentNode.insertBefore(gcse, s);
	// } ) ();

	(function() {
		var cx = '004511393322054727599:tdeu4iklvqi';
		var gcse = document.createElement('script');
		gcse.type = 'text/javascript';
		gcse.async = true;
		gcse.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') +
		'//www.google.com/cse/cse.js?cx=' + cx;
		var s = document.getElementsByTagName('script')[0];
		s.parentNode.insertBefore(gcse, s);
	})();

} ) ( jQuery );



$(function () {
	$(window).load( function () {
		var onFlag = false;
		var dispFlag = false;
		var dispRange  = 130;
		var sn = 0;
		var $tab = $('.priceoff');
		var $tabBtn = $tab.find('.push-btn');
		$(window).on('scroll', function () {
			sn = $(this).scrollTop();
			if( sn <= dispRange && !dispFlag ) {
				dispFlag = true;
				$tab.stop().animate( {
					right: '-430px'
				}, 200 );
			} else if( sn > dispRange && dispFlag ) {
				dispFlag = false;
				onFlag = false;
				$tab.stop().animate( {
					right: '-533px'
				}, 200 );
			}
		} ).trigger('scroll');

		$tabBtn.on('click', function () {
			if( !onFlag ) {
				onFlag = true;
				$tab.stop().animate( {
					right: '0px'
				}, 200 );
			} else if( onFlag ) {
				onFlag = false;
				$tab.stop().animate( {
					right: '-430px'
				}, 200 );
			}
		} );

		$tab.find('.close').on('click', function () {
			onFlag = false;
			$tab.stop().animate( {
				right: '-430px'
			}, 200 );
		} );
	} );
} );

// (function() {
// 	var navSlide = {
// 		initialize: function() {
// 			//var self = this;
// 			var touchDevice = (typeof window.ontouchstart) !== 'undefined';
// 			var start = ( touchDevice ) ? this.clickFunc : this.hoverFunc;
			
// 			$(function () {
// 				//navSlide.$target = $('.nav');
// 				start.call( navSlide );
// 			} );

// 			//$('#contents').on('click',function () {
// 			//	alert('aaaa');
// 			//} );
// 		},
// 		hoverFunc: function () {
// 			$('.g-under-nav').hover(
// 				function() {
// 					var $self = $(this);
// 					var _height = $self.find('.sdw-wrap').outerHeight();
// 					$self.addClass('now');
// 					setTimeout( function () {
// 						if( !$self.hasClass('now') ) return;
// 						$self.addClass('on');
// 						$self.find('.detail').stop().animate( {
// 							bottom: _height * -1 + 'px'
// 						}, 300 );
// 					}, 300 );	
// 				},
// 				function(){
// 					var $self = $(this);
// 						$self.removeClass('now');
// 						setTimeout( function () {
// 							$self.removeClass('on');
// 							$self.find('.detail').stop().animate( {
// 								bottom: '0px'
// 							}, 300 );
// 					}, 300 );
// 				}
// 			);
// 		},
// 		clickFunc: function () {
// 			$('.g-under-nav').on('click', function () {
// 				$(window).off('.nav');
// 				var $self = $(this);
// 				var _height = $self.find('.sdw-wrap').outerHeight();


// 				$self.addClass('on');
// 				$('.g-under-nav.now').find('.detail').stop().animate( {
// 					bottom: '0px'
// 				}, 300, function () {

// 					$self.removeClass('now');

					
// 				} );
				
// 				$self.find('.detail').stop().animate( {
// 					bottom: _height * -1 + 'px'
// 				}, 300, function () {

// 					$self.addClass('now');

// 					$(window).on('click.nav', function (e) {
// 						alert('on');
// 						console.log( $(e.target).hasClass('now') );
						
// 						if ( $(e.target).parents('.second_header').length == 0 ) {

// 							e.preventDefault();
							
// 							$('.g-under-nav').find('.detail').stop().animate( {
// 								bottom: '0px'
// 							}, 300, function () { $(this).removeClass('now'); } );
// 							$(this).off('.nav');
// 						}	
// 					} );
// 				} );

// 			} );
// 		}
	
// 	};

// 	navSlide.initialize();
// })();

$(function () {

	var touchDevice = (typeof window.ontouchstart) !== 'undefined';

	if( !touchDevice ) {

		$('.pulldown').hover(
			function() {
				var $self = $(this);
				var _height = $self.find('.sdw-wrap').outerHeight();
				$self.addClass('now');
				setTimeout( function () {
					if( !$self.hasClass('now') ) return;
					$self.addClass('on');
					$self.find('.detail').stop().animate( {
						bottom: _height * -1 + 'px'
					}, 300 );
				}, 300 );	
			},
			function(){
				var $self = $(this);
					$self.removeClass('now');
					setTimeout( function () {
						$self.removeClass('on');
						$self.find('.detail').stop().animate( {
							bottom: '0px'
						}, 300 );
				}, 300 );
			}
		);

	} else {
		$('#header, #contents, #footer').on('click', function () {  } );
		$('.pulldown').on('click', function () {
			$(window).off('.nav');
			var $self = $(this);
			var _height = $self.find('.sdw-wrap').outerHeight();

			if( $(this).hasClass('now') ) {
				$(this).removeClass('now').find('.detail').stop().animate( { bottom: '0px' }, 300 );
			} else {
				$('.pulldown.now').removeClass('now').find('.detail').stop().animate( { bottom: '0px' }, 300 );
				$self.addClass('now').find('.detail').stop().animate( { bottom: _height * -1 + 'px'}, 300,function () {
					$(window).bind('click.nav', function (e) {
						if ( $(e.target).parents('.second_header').length == 0  ) {
							$(this).off('.nav');
							$('.pulldown').removeClass('now').find('.detail').stop().animate( { bottom: '0px' }, 300 );
							e.preventDefault();
						}	
					} );
				} );
			}
		} );
	}

	$('#header .clickdisp .btn-wrap').on('click', function () {
		$('body').off('.search');
		$('#header .clickdisp').toggleClass('on');
		$('.search').css( {top: '20px'} ).animate( { top: '23px' } , 150 );
		$('#g-input-block input').val('').removeClass('nodisp');

		setTimeout( function() {
			$('body').on('click.search', function (e) {
				if ( $(e.target).parents('.clickdisp').length == 0  ) {
					e.preventDefault();
					
						$('#header .clickdisp').removeClass('on');
					
					$(this).off('.search');
				}	
			} );
		}, 0 );
	} );
	
} );

( function () {
	function setting ( target ) {
		
		var html = $('html'), top = html.scrollTop();
		var el = $('<div/>').height(10000).prependTo('body');
		html.scrollTop(10000);
		var rs = !!html.scrollTop();
		html.scrollTop(top);
		el.remove();

		var $target = $( target );
		var $html2 =(rs) ? $( 'html' ) : $( 'body' );

		$target.on('click',function( e ){	
			var posi = $( $(this).attr( 'data-to' ) ).offset().top;
			$html2.animate({
				scrollTop: posi
			}, 1000, 'easeOutQuint');
		});
	}
	$( function () {
		setting('#footer .sc-btn'); 
	} );
} ) ();

( function () {
	$( function () {
		var dispRange = 130;
		var $target = $("#footer .btn_page-top");
		$(window).on('scroll', function () {
			sn = $(this).scrollTop();
			if( sn <= dispRange ) {
				$target.removeClass('on').addClass('off');
			} else {
				$target.removeClass('off').addClass('on');
			}
		} ).trigger('scroll');
	} );
} ) ();
