this.seiyuJs = this.seiyuJs || {};
(function ($) {
	seiyuJs.map = {isLoaded:false};
	seiyuJs.map.initialize = function(){
		seiyuJs.map.isLoaded = true;

		var $add_store_map = $("#store-header .add-store-map");
		if ($add_store_map[0]) {
			seiyuJs.map.setMap($add_store_map);
		}

		var $add_store_map_seach = $("#content-area .area_googlemap .googlemap_block");
		if ($add_store_map_seach[0]) {
			seiyuJs.map.setAreaMap($add_store_map_seach, area_store_data);
		}
	};
	seiyuJs.map.setAreaMap = function(_target, arr){
		var $target = _target;
		var data = arr;
		var $elem = $('<div style="width:100%;height:298px">');
		$target.append($elem);

		//地図
		var map = new google.maps.Map($elem.get(0), {
			scrollwheel: true,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		});

		var latitudeArr = [];
		var longitudeArr = [];

		//マーカー
		$.each( data, function (i) {
			var point = data[i].latlng.split(',');
			var latitude = point[0];
			var longitude = point[1];
			var logo = data[i].logotype;
			var name = data[i].name;
			new seiyuJs.map.SetAreaMapMarker( name, latitude, longitude, logo, map );
			latitudeArr.push(latitude);
			longitudeArr.push(longitude);
		} );

		var minLatLng = new google.maps.LatLng(Math.min.apply(null, latitudeArr), Math.min.apply(null, longitudeArr) );
		var maxLatLng = new google.maps.LatLng(Math.max.apply(null, latitudeArr), Math.max.apply(null, longitudeArr) );
		var latLngBounds = new google.maps.LatLngBounds(minLatLng, maxLatLng);
		var bounds = new google.maps.LatLngBounds();
		bounds.extend(minLatLng);
		bounds.extend(maxLatLng);
		google.maps.event.addListenerOnce(map, 'idle', function() {
	        map.setZoom( map.getZoom() + zoom_adjust);
	        if ( center_position ) {
	        	var ary = center_position.split(",");
	        	var latlng = new google.maps.LatLng(ary[0], ary[1]);
	        	map.setCenter(latlng);
	        }
	 	});
		map.fitBounds(bounds);

		$('#content-area .area_googlemap .store_num span').text(data.length);

	};
	seiyuJs.map.SetAreaMapMarker = function ( name, latitude, longitude, logo, map ) {
		
		var myicon = new google.maps.MarkerImage('/common/img/c/m_' + logo + '.png',
			new google.maps.Size(40,40),
			new google.maps.Point(0,0),
			new google.maps.Point(20,20)
		);

		var myMarker = new google.maps.Marker({
			position: new google.maps.LatLng(latitude, longitude )
			,map: map
			,icon: myicon
		});

		var $balloon = $('<div style="padding-top:5px; width:120px; height:auto; text-align: center;">');
		var balloon_inner = '<p style="padding: 0 15px 0 0; display: inline-block; *display: inline; *zoom: 1; text-align: left; line-height: 1.3; font-size: 13px; color: #666; background: url(/common/img/c/m_link_arrow.png) right center no-repeat;">' + name + '</p>';
		//var balloon_inner = '<p style="margin-bottom: 10px; padding-bottom: 8px; border-bottom: 1px solid #666; font-size: 13px; color: #666;">' + name + '</p><p><a style="padding-right: 12px; background: url(/common/img/c/m_link_arrow.png) right center no-repeat; font-size: 15px; color: #666; text-decoration: none; font-weight: bold; line-height: 1;" href="/shop/' + name + '">アイコンクリックで店舗詳細を見る</a></p>';
		$balloon.append(balloon_inner);
		var myInfoWindow = new google.maps.InfoWindow({
			content: $balloon[0]
		});

		// google.maps.event.addListener(myInfoWindow, 'mouseover', function(){
		// 	console.log('in');
		// 	//myInfoWindow.open(map, myMarker);
		// });

		// mouseoverイベントを取得するListenerを追加

		// var  $balloon__;

		google.maps.event.addListener(myMarker, 'mouseover', function(e){
			myInfoWindow.open(map, myMarker);
			// $balloon__ = $(myInfoWindow.getContent()/*.parentNode.parentNode.parentNode*/);

			// $balloon__.on('mouseover', function () {
			// 	console.log('ss');
			// });
			// $balloon__.on('mouseout', function () {
			// 	console.log('aa');
			// });
		});
		google.maps.event.addListener(myMarker, 'mouseout', function(e){
			myInfoWindow.close();
		});

		google.maps.event.addListener(myMarker, 'click', function(e){
			location.href='/shop/' + name;
		});

		// mouseoutイベントを取得するListenerを追加
		//google.maps.event.addListener(myMarker, 'mouseout', function(){
		//	myInfoWindow.close();
		//});

		//$(myInfoWindow.getContent()).on("mouseover", function (e) {
		//});

		//$(myInfoWindow.getContent()).on("mouseout", function (e) {
		//});

		

		// google.maps.event.addListenerOnce(myMarker, "click", function(event) {
		// 	myInfoWindow.open(map, myMarker);
		// });
		
		// google.maps.event.addListener(myInfoWindow, "closeclick", function() {
		// 	google.maps.event.addListenerOnce(myMarker, "click", function(event) {
		// 		myInfoWindow.open(map, myMarker);
		// 	});
		// });
	};
	seiyuJs.map.setMap = function(_target){
		var $target = $(_target);
		$target.attr("data-isload","1");
		//mapに表示する文字列と座標を変数にセット（実際は店舗毎に動的に値を設定します）
		var BalloonTitle = '<div style="margin:5px;">'+$target.attr("data-title")+'</div>';
		var Coordinate1 = $target.attr("data-LatLng").split(",")[0];
		var Coordinate2 = $target.attr("data-LatLng").split(",")[1];

		// 地図
		var map = new google.maps.Map($target.find("div").get(0), {
			zoom: 16,
			center: new google.maps.LatLng(Coordinate1, Coordinate2),
			scrollwheel: true,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			mapTypeControl: false
		});

		// マーカー
		var myicon = new google.maps.MarkerImage('/common/img/c/m_'+$target.attr("data-logotype")+'.png',
			new google.maps.Size(40,40),
			new google.maps.Point(0,0),
			new google.maps.Point(20,20)
		);

		var myMarker = new google.maps.Marker({
			position: new google.maps.LatLng(Coordinate1, Coordinate2)
			,map: map
			,icon: myicon
		});

		if( $target.hasClass('add-store-map') ) {
			var contentString =  '<div style="padding-top:5px; padding-bottom:5px; width:140px; height:auto; text-align:center">'+
			BalloonTitle+
			'</div>';
			var myInfoWindow = new google.maps.InfoWindow({
				content: contentString
			});

			google.maps.event.addListenerOnce(myMarker, "click", function(event) {
				myInfoWindow.open(map, myMarker);
			});
			google.maps.event.addListener(myInfoWindow, "closeclick", function() {
				google.maps.event.addListenerOnce(myMarker, "click", function(event) {
					myInfoWindow.open(map, myMarker);
				});
			});
		} else {
			var $balloon = $('<div style="padding-top:5px; width:120px; height:auto; text-align: center;">');
			var balloon_inner = '<p style="padding: 0 15px 0 0; display: inline-block; *display: inline; *zoom: 1; text-align: left; line-height: 1.3; font-size: 13px; color: #666; background: url(/common/img/c/m_link_arrow.png) right center no-repeat;">' + $target.attr("data-title") + '</p>';
			$balloon.append(balloon_inner);
			var myInfoWindow = new google.maps.InfoWindow({
				content: $balloon[0]
			});

			google.maps.event.addListener(myMarker, 'mouseover', function(e){
				myInfoWindow.open(map, myMarker);
			});
			google.maps.event.addListener(myMarker, 'mouseout', function(e){
				myInfoWindow.close();
			});
			google.maps.event.addListener(myMarker, 'click', function(e){
				location.href='/shop/' + $target.attr("data-title");
			});
		}
	};
	function loadScript() {
		var script = document.createElement("script");
		script.type = "text/javascript";
		script.src = "http://maps.google.com/maps/api/js?sensor=false&callback=seiyuJs.map.initialize";
		document.body.appendChild(script);
	}
	$(function(){
		loadScript();
	});
})(jQuery);

