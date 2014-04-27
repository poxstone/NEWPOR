;// JavaScript Document
/*modernizr*//*modernizr*/
	if(!Modernizr.input.placeholder){
		$('html').addClass('no-placeholder');
	}
	if (!Modernizr.backgroundsize) {
		$('html').addClass('no-backgroundsize');
	}
/*modernizr*/

//browser User Agent
	var ua = navigator.userAgent.toLowerCase();

	if ( ua.indexOf('firefox')!=-1 ) {
		$('html').addClass('firefox');
	}else if ( ua.indexOf('chrome')!=-1 ) {
		$('html').addClass('chrome');
	}else if ( ua.indexOf('msie')!=-1 ) {
		$('html').addClass('msie');
	}else if ( ua.indexOf('opera')!=-1 ) {
		$('html').addClass('opera');
	}else if ( ua.indexOf('safari')!=-1 ) {
		$('html').addClass('safari');
	}

	if ( ua.indexOf('ipad')!=-1 ) {
		$('html').addClass('ipad');
	}else if ( ua.indexOf('ipod')!=-1 ) {
		$('html').addClass('ipod');
	}
//

//funcion para eliminar los eventos por defecto en click de attributo onclick y compatibilidad con ie
var remEvent = {
    del : function(evento){
        if(event){}else{ var event = evento}
        (event.preventDefault)? event.preventDefault() : event.returnValue = false;
    }
};
var nueva = {
	master : function(){
		console.log('he añadido mas cositas en desarrollo desde la maestra');
	}
};nueva.master();

