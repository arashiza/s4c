this.seiyuJs = this.seiyuJs || {};

( function (  ) {

	var isEnabled = function(){
		 seiyuJs.htmlScroll = this.htmlScroll();
		 seiyuJs.positionFixed = this.positionFixed();
		 seiyuJs.displayInlineBlock = this.displayInlineBlock();
	}

	isEnabled.prototype = {
		htmlScroll:  function(){
			var html = $('html'), top = html.scrollTop();
			var el = $('<div/>').height(10000).prependTo('body');
			html.scrollTop(10000);
			var rs = !!html.scrollTop();
			html.scrollTop(top);
			el.remove();
			return rs;
		},
		positionFixed:  function(){
			var el = $('<div/>').add('<div/>').css({height:8,position:'fixed',top:0}).prependTo('body');
			var rs = el.eq(0).offset().top == el.eq(1).offset().top
			el.remove();
			return rs;
		},
		displayInlineBlock: function(){
			var el = $('<div class="sss">').add('<div class="rrrr">').css({height:8,display:'inline-block'}).prependTo('body');
			var rs = el.eq(0).offset().top == el.eq(1).offset().top
			el.remove();
			return rs;
		}
	};

	$ ( function () {
		new isEnabled();
	} );

} ) ( );



( function () {
	function setting ( control, target, targetNav ) {
		this.openFlag = false;
		this.sto =  null;
		this.controlClass = control;
		this.$target = $( target );
		this.$targetNav = $( targetNav );
		this.$container = $( '#container' );
		this.$header = $( '#header' );
		var that = this;
		this.$target.on('click', function (e) { that.slideflick.apply( that, [e] ); } );
		this.$container.on('click', function (e) { that.touchContainer.apply( that, [e] ); } );
	}
	setting.prototype = {
		slideflick: function (e) {
			if ( this.$container.hasClass ( this.controlClass ) ) {
				this.closeFunc();
			} else {
				this.openFunc();
			}	
		},
		touchContainer: function (e) {
			if( this.openFlag ) {
				e.preventDefault();
				this.closeFunc();
			}
		},
		closeFunc: function () {
			this.openFlag = false;
			this.$target.find('img').removeClass( 'active' );
			this.$container.removeClass( this.controlClass );
			this.$header.removeClass( 'active' ).removeClass( this.controlClass );
			var that = this;
			this.sto = setTimeout( function () {
				that.$targetNav.removeClass('active');
			}, 400 );
		},
		openFunc: function () {
			this.openFlag = true;
			clearTimeout( this.sto );
			this.$target.find('img').addClass( 'active' );
			this.$targetNav.addClass( 'active' );
			this.$container.addClass( this.controlClass );
			this.$header.addClass( 'active' ).addClass( this.controlClass );
		}
	};
	seiyuJs.NavSystem = setting;
} ) ();

// ( function () {
// 	function setting ( classname, btn, area ) {
// 		if ( $( classname ).size() != 0 ) {
// 			$( btn ).click( function () {
// 				$( area ).slideToggle( 200, "swing", function () {
// 					$( btn ).toggleClass('open');
// 					if ( btn != '#myPanelToggleBtn') return;
// 					// if ( $( btn ).hasClass('open') ){
// 					// 	$.cookie("mypanel-open", "1", { expires: 14, path:'/' });
// 					// }else{
// 					// 	$.cookie("mypanel-open", "0", { expires: 14, path:'/' });
// 					// }
// 				});
// 			});
// 		}
// 	}
// 	seiyuJs.MyPanelToggle = setting;
// } ) ();

( function () {
	function setting ( elem ) {
		if ( $( elem ).size() != 0 ) {
			var $html = (seiyuJs.htmlScroll) ? $('html') : $('body');
			var moveflag;
			$( elem ).on('click',function( e ){
				//switch ( e.type ) {
					// case 'touchstart':
					// 	moveflag = false;
					// 	break;
					// case 'touchmove':
					// 	moveflag = true;
					// 	break;
					// case 'touchend':
						if( moveflag ) return;
						//var posi = $( $(this).attr( 'data-to' ) ).offset().top - 50;
						$html.animate({
							scrollTop: 0
						}, 300);
						//break;
				//}
			});
		}
	}
	seiyuJs.PageTop = setting;
} ) ();

(function () {
  var tapClass = "";
  var hoverClass = "";

	var Hover = window.Hover = function (ele) {
		return new Hover.fn.init(ele);
	};
	Hover.fn = {
		//Hover Instance
		 init : function (ele) {
			this.prop = ele;
		}

		, bind : function (_hoverClass, _tapClass) {
			hoverClass = _hoverClass;
			tapClass = _tapClass;

			$(window).bind("touchstart", function(event) {
				var target = event.target || window.target;

				var bindElement = null;
				if (target.tagName == "A" || $(target).hasClass(tapClass)) {
					bindElement = $(target);
				} else if ($(target).parents("a").length > 0) {
					bindElement = $(target).parents("a");
				} else if ($(target).parents("." + tapClass).length > 0) {
					bindElement = $(target).parents("." + tapClass);
				}

				if (bindElement != null) {
					if ( ! $( '#header' ).hasClass('active') ) {
						Hover().touchstartHoverElement(bindElement);
					} else {
						if ( bindElement.parents('.common-nav')[0] ) {
							Hover().touchstartHoverElement(bindElement);
						}
					}
				}
			});
			$(window).bind("touchend", function(event) {
				$('.hover').removeClass('hover');
			});
		}
		, touchstartHoverElement : function (bindElement) {
			bindElement.addClass(hoverClass);
			bindElement.unbind("touchmove", Hover().touchmoveHoverElement);
			bindElement.bind("touchmove", Hover().touchmoveHoverElement);
			bindElement.unbind("touchend", Hover().touchendHoverElement);
			bindElement.bind("touchend", Hover().touchendHoverElement);
		}
		, touchmoveHoverElement : function (event) {
			$(this).removeClass(hoverClass);
		}
		, touchendHoverElement : function (event) {
			$(this).removeClass(hoverClass);
		}
	}
	Hover.fn.init.prototype = Hover.fn;
	Hover().bind("hover", "tap");
}
)();

( function () {
	function setting ( classname, btn, area ) {
		if ( $( classname ).size() != 0 ) {
			// if ( $.cookie("mypanel-open") == "1" ){
			// 	$( btn ).addClass('open');
			// 	$( area ).css("display","block");
			// }  else {
				$( btn ).removeClass('open');
				$( area ).css("display","none");
			// }
		}
	}
	seiyuJs.CheckCookie = setting;
} ) ();



$( function () {
	//new seiyuJs.NavSystem( 'left', '.main-title', '#common-nav' );
	new seiyuJs.NavSystem('right','.company-title', '#common-nav' );
	//seiyuJs.MyPanelToggle('#my-panel-area.store-registered', '#myPanelToggleBtn', '#myPanelToggleArea');
	//seiyuJs.MyPanelToggle('#exceptional_information', '#ei_btn', '#ei_area');
	seiyuJs.PageTop('.btn-pagetop');
	seiyuJs.CheckCookie('#my-panel-area.store-registered', '#myPanelToggleBtn', '#myPanelToggleArea');
} );



//phase1




( function ($, document) {
	var callBack = function() {
		$( function () {
			if( $('#contents.index')[0] ) seiyuJs.addIndexInput();

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

				$(document).one('click', function (e) {
					//$(this).off('.cancel');
					return false;
				} );

				( $(this).val().length != '0' ) ?
					$(this).addClass('nodisp') :
					$(this).removeClass('nodisp');
			} );
			$target.find('.gsc-search-button').attr('src', '/common/img/sp/gnav_gsc_btn.png');
			if( $('#contents.result')[0] ) seiyuJs.addSearchInput();
		} );
	};
	window.__gcse = {
		parsetags: 'explicit',
		callback: callBack
	};
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
} ) ( jQuery, document);


( function ($, document) {
	$( function () {
		//$(document).on('click', '.acd-btn', function () {
		$('.acd-btn').on('click', function () {
			//alert();
			$(this).toggleClass('active');
			$(this).next('.inner-wrap').slideToggle("fast");
		} );
		// $(document).on('click', '.acd-close-btn', function () {
		$('.acd-close-btn').on('click', function () {
			$(this).parents('.inner-wrap').prev('.acd-btn').removeClass('active');
			$(this).parents('.inner-wrap').slideToggle("fast");
		} );
		// $(document).on('click', '.lang-btn', function () {
		$('.lang-btn').on('click', function () {
			var which = ( $(this).hasClass('jp-btn') ) ?
				$('.toggle-lang').removeClass( 'en' ) :
				$('.toggle-lang').addClass( 'en' );
		} );
	} );
} ) ( jQuery, document);