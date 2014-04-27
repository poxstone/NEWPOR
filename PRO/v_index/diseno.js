// JavaScript Document

function ocultar(obj){
	$(obj).parent('li').children('ul').slideUp();
	$(obj).children('.minMax').text('+');
}

function mostrar(obj){
	$(obj).parent('li').children('ul').slideDown();
	$(obj).children('.minMax').text('-');
}

function mosOcIni(e){
	$('ol.listaPrincipal > li > a').each(function(index, element) {
	   if( $(element).children('.minMax').text() == '-'){
		   mostrar(element);
	   }else{
		   ocultar(element);
	   }
	});
}

function hoverImg(e){
	$('ol.listaPrincipal > li ul li a').each(function(index, element) {
		
		
		
			$('<span class="mensaje">Ver en html</span>').appendTo(this);
			
			$(element).hover(function(e){
				var nameImg = $(this).attr('data-rel');
				var nameLink = $(this).attr('href');
				
				var namePngNum = nameLink.length-4;
				var namePng = nameLink.substr(0,namePngNum)+'png';
	
				$('#muestraImgs').children('a').children('span').text('Clic para ver imagen');
				$('#muestraImgs').children('a').children('img').attr('src',nameImg);
				
				var nameImgBig = $(element).attr('data');

				if(nameImgBig==''){		
				
					$('#muestraImgs').children('a').attr({'href':namePng, 'target':'_blank'});
				}else{
					$('#muestraImgs').children('a').attr({'href':nameImgBig, 'target':'_blank'});
				}
			})
		
	
    });
	
}

/*para cambiar imagenes internamente*//*para cambiar imagenes internamente*/
function cambiarImagesFondo(e){

	var imageprefijo = 'pro',
	imageName = imageprefijo + imageNumPropuesta,
	imageType = '.png',
	//imageMatriz = ['','b','c','d','e'],//sufijo de imagenes va en el html
	imageMatrizLength = imageMatriz.length,
	imgActual = 0;
	
	//SEGUN LA RUTA ESTABLECE CUAL IMAGEN ELEGIR
	if (imageMatrizLength>1){
	var rutaActual= location.href,
		verificaSubmenu = rutaActual.lastIndexOf('#');
		rutaActual = rutaActual.substr(rutaActual.lastIndexOf('#')+1);//extrae pagina
		
		if(verificaSubmenu != -1){
			imageSuma= 'url('+rutaActual+imageType+')'
			$('body').css('background-image',imageSuma);
		}
	}
	console.log(imageMatrizLength);
	//

	$('body').on({
		'click': function(e){
			if(imgActual < ( imageMatrizLength-1 )){
				imgActual ++;
			}else{
				imgActual = 0;
			}
			
			imageSuma= 'url('+imageName+(imageMatriz[imgActual])+imageType+')'
			
			$(this).css('background-image',imageSuma);
		}
	});
}
/*para cambiar imagenes internamente*/

$(document).ready(function(e) {

	var cantidadSubmenus = $('.listaPrincipal ul li').length;

	mosOcIni(e);
	hoverImg(e);

	$('ol.listaPrincipal > li > a').each(function(index, element) {
		
        $(element).click(
		function(){
			var activo =  $(element).parent('li').children('ul').css('display');

			if(activo=='none' ){
				 mostrar(element);
			}else if('block'){
				ocultar(element);
			}
		}
		
	);
    });

    cambiarImagesFondo(e);
});