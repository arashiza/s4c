function trackClick(evt,val,taget,opt_noninteraction) {
	if (opt_noninteraction) {
		ga('set', 'nonInteraction', true);
	}
	ga('send', 'event', val ,'Click', taget,{
  'hitCallback': function() {
	if (evt.target.href != undefined){
	  if (taget !=undefined){
	  }else{
		  document.location.href = evt.target.href;
	  }
	}
  }});
	
  if (taget ==undefined){
  // デフォルトの動作とイベント伝搬をストップ（return false相当）
  evt.preventDefault();
  evt.stopPropagation();
  if (evt.returnValue) { evt.returnValue = false }; // IE用
  }
}

function trackExternalLink(evt,val,taget,opt_noninteraction) {
	if (opt_noninteraction) {
		ga('set', 'nonInteraction', true);
	}
	ga('send', 'event', val ,'External_Link', taget,{
  'hitCallback': function() {
	if (evt.target.href != undefined){
	  if (taget !=undefined){
	  }else{
		  document.location.href = evt.target.href;
	  }
	}
  }});
	
  if (taget ==undefined){
  // デフォルトの動作とイベント伝搬をストップ（return false相当）
  evt.preventDefault();
  evt.stopPropagation();
  if (evt.returnValue) { evt.returnValue = false }; // IE用
  }
}
