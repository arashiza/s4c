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
  // �f�t�H���g�̓���ƃC�x���g�`�����X�g�b�v�ireturn false�����j
  evt.preventDefault();
  evt.stopPropagation();
  if (evt.returnValue) { evt.returnValue = false }; // IE�p
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
  // �f�t�H���g�̓���ƃC�x���g�`�����X�g�b�v�ireturn false�����j
  evt.preventDefault();
  evt.stopPropagation();
  if (evt.returnValue) { evt.returnValue = false }; // IE�p
  }
}
