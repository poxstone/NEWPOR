function getStyle(elemento, propiedadCss) {
  var valor = "";
  if(document.defaultView && document.defaultView.getComputedStyle){
    valor = document.defaultView.getComputedStyle(elemento, '').getPropertyValue(propiedadCss);
  }
  else if(elemento.currentStyle) {
    propiedadCss = propiedadCss.replace(/\-(\w)/g, function (strMatch, p1) {
      return p1.toUpperCase();
    });
    valor = elemento.currentStyle[propiedadCss];
  }
  return valor;
}

var valide = {
	select_single : function(input_type,input){

		var inp_leg = input_type.length; //cantidad actual del array que guarda los input:text 
		//se asigna el elemento al array de los input:text segun la cantidad
		( input_type[inp_leg] == undefined )? inp_leg = input_type.length : inp_leg = input_type.length+1;
		input_type[inp_leg] = input ;

	},
	select_group : function(input_type,input){

		var inp_name = input.name; //captura el nombre para asignar a el grupo

		if( input_type[inp_name] == undefined ) { input_type[inp_name] = 0; } //la primera vez asigna cero al grupo para crear un nuevo array

		var grp_leg = input_type.length; //cantidad de grupos al no haber elemntos creados su valor es 0 (ninguno)

		//si el grupo actual es de valor 0 crea un hijo de array para asignar los inputs
		if( input_type[inp_name] == 0 ){
			input_type[grp_leg] = new Array(); //al ser primera vez creará el array
			input_type[inp_name] = 1; //asigna numero 1 para no volver a crear array
		}else{
			grp_leg = grp_leg-1; //se resta en uno ya que al haber elementos cuenta/devuelve desde 1 y no 0
		}

		var inp_leg = input_type[grp_leg].length; //cantidad de elemntos comenzando en 0; en realidad selecciona el siguiente
		input_type[grp_leg][inp_leg] = input; //asigna el elemnto al siguiente elemento (length)

	},
	valide_text : function(input){

		return ( (/[\w.~-Ý\-]/i).test(input.value) );
	},
	valide_email : function(input){

		return ( (/^\w+[\w\.]*\w+@\w{2,}(\.)*(\w{2,})*\.\w{2,}$/i).test(input.value) );
	},
	valide_number : function(input){

		return ( (/^[ ]*[\d]+[\d ]*$/i).test(input.value) );
	},
	valide_clave : function(input){

		return ( (/[\w.~-Ý\-\S]{6,}/i).test(input.value) );
	},
	valide_file : function(input){
		var format = input.getAttribute('data-type');
		
		//se verifica la existencia de especificacion de formatos
		if( (/\([\w\.\,]+\)/i).test(format) ){
			
			//se extraen los formatos de los parentesis
			format = format.substr(format.indexOf('(')+1);
			format = format.substr(0,format.indexOf(')'));
			var formats = format.split(',');

			//creamos la expresión regular añadiendo los formatos
			var regExp = '^[\\w.~-Ý\\-]+\\.(';//inicio
			for(var i = 0; i<formats.length; i++){
				regExp += '('+formats[i]+')';
				//mientras no sea la última
				if( i<formats.length-1) { regExp +='|'; }
			}
			regExp += ')$';//fin

			//convierte la cadena a una expresion regular
			var rExpresion = new RegExp(regExp,'i');

			//extraemos el directorio del valor para simplificar la validacion con test
			var val = input.value;
			val = val.substr(val.lastIndexOf('\\')+1);

			//retornamos la validacion
			return ( rExpresion.test(val) );

		}else{
			//si no se especifican tipos de archivos se utiliza esta
			return ( (/^\w/i).test(input.value) );
		}

	},
	valide_inpGroup : function(input){

		return ( input.checked );
	},
	valide_select : function(input){

		return ( input.value );
	},
	itm : new Object(),//contiene los elementos seleccionados
	selectInputs : function(forma){
		//formulario
		this.itm.form = forma;
		//camos
		this.itm.inputs = this.itm.form.getElementsByTagName('input');
		this.itm.textarea = this.itm.form.getElementsByTagName('textarea');
		this.itm.select = this.itm.form.getElementsByTagName('select');
		this.itm.button = this.itm.form.getElementsByTagName('button');
		this.itm.inp_text = new Array();
		this.itm.grp_radio = new Array();
		this.itm.grp_check = new Array();
		this.itm.inp_file = new Array();
		this.itm.inp_hidden = new Array();
		this.itm.inp_password = new Array();
		this.itm.inp_area = new Array();
		this.itm.inp_select = new Array();
		this.itm.inp_selectMultiple = new Array();
		//botones
		this.itm.btn_submit = new Array();
		this.itm.btn_reset = new Array();
		this.itm.btn_imputButton = new Array();
		this.itm.button = new Array();
		this.itm.button_reset = new Array();
		this.itm.button_button = new Array();

		//filtramos el type del input
		for (var i=0; i<this.itm.inputs.length; i++){
			var inp = this.itm.inputs[i];//input evaluado
			//filtro de texto
			if( inp.type == 'text' || inp.type == undefined ){
				this.select_single( this.itm.inp_text , inp );
			}else if( inp.type=='checkbox' ){
				this.select_group( this.itm.grp_check, inp );
			}else if( inp.type=='radio' ){
				this.select_group( this.itm.grp_radio, inp );
			}else if( inp.type == 'file' ){
				this.select_single( this.itm.inp_file , inp );
			}else if( inp.type == 'hidden' ){
				this.select_single( this.itm.inp_hidden , inp );
			}else if( inp.type == 'password' ){
				this.select_single( this.itm.inp_password , inp );
			}
			//botones de acciones
			else if( inp.type == 'image' || inp.type == 'image' ){
				this.select_single( this.itm.btn_submit , inp );
			}else if( inp.type == 'reset' ){
				this.select_single( this.itm.btn_reset , inp );
			}else if( inp.type == 'button' ){
				this.select_single( this.itm.btn_imputButton , inp );
			}
		};

		//textarea
		for (var i=0; i<this.itm.textarea.length; i++){
			var inp = this.itm.textarea[i];//input evaluado
			this.select_single( this.itm.inp_area , inp );
		};

		//select
		for (var i=0; i<this.itm.select.length; i++){
			var inp = this.itm.select[i];//input evaluado

			if( inp.multiple ){
				this.select_single( this.itm.inp_selectMultiple , inp );
			}else{
				this.select_single( this.itm.inp_select , inp );
			}
		};

		//button
		for (var i=0; i<this.itm.button.length; i++){
			var inp = this.itm.button[i];//input evaluado

			if( inp.type == 'submit' || inp.type == undefined ){
				this.select_single( this.itm.button , inp );
			}else if( inp.type == 'reset' ){
				this.select_single( this.itm.button_reset , inp );
			}else if( inp.type == 'button' ){
				this.select_single( this.itm.button_button , inp );
			}
		};
	},
	selErr : function(input){

		var elemento = document.getElementById(input.name+'Err');
		if( elemento ){
			elemento.show = function(){ 
				this.style.display = 'block';
				valide.val = valide.val && false;

				//variables para focalizar objeto //offsetTop funciona en base a la posision relativa del padre
				if( getStyle(input.parentNode,'position') !='static' ){
					var top = input.parentNode.offsetTop;
					var left = input.parentNode.offsetLeft;
				}else{
					var top = input.offsetTop;
					var left = input.offsetLeft;
				}

				console.log(input.getAttribute('id'),top);

				var tol = 3;//rango de tolerancia para comparación de pixeled alrededor del input

				//establece primeros valores
				if( !valide.pos.y ){
					valide.pos.y = top;
					valide.pos.x = left;
					valide.focuse = input;
				}else if( top < valide.pos.y && top < valide.pos.y-tol && top < valide.pos.y+tol ){//verifica un rango de tolerancia en pixeles
					//compara y
					valide.pos.y = top;
					valide.focuse = input;

					//compara x
					if( left < valide.pos.x && left < valide.pos.x-tol && left < valide.pos.x+tol ){//verifica un rango de tolerancia en pixeles
						valide.pos.x = left;
						valide.focuse = input;					
					}

				}
			};
			elemento.hide = function(){ 
				this.style.display = 'none';
				valide.val = valide.val && true;
			};
			return ( elemento );
		}else{
			alert('no se encontró: id="'+name+'Err"');//mensaje de error frecuente para depurar
		}
	},
	pos : {x:null,y:null},
	focuse : null,//objeto a dar focus
	val : null,//guarda el valor booleano para enviar o no el formulario
	valide : function(){
		//inicia el validador
		valide.val = true;
		focuse : null,
		valide.pos.y=null;
		valide.pos.x=null;
		//validar textos
		if(this.itm.inp_text.length){
			var inp_text = this.itm.inp_text;//selecciona los textos en ruta mas corta
			for( var i=0; i<inp_text.length; i++ ){
				var inp = inp_text[i];
			
				if( inp.getAttribute('data-type') == 'text' ){
					var error = this.selErr(inp);
					
					if ( this.valide_text(inp) ){
						error.hide();
					}else{
						error.show();
					}
				}else if( inp.getAttribute('data-type') == 'email' ){
					var error = this.selErr(inp);
					
					if ( this.valide_email(inp) ) {
						error.hide();
					}else{
						error.show();
					}
				}else if( inp.getAttribute('data-type') == 'number' ){
					var error = this.selErr(inp);
					
					if ( this.valide_number(inp) ) {
						error.hide();
					}else{
						error.show();
					}
				}
			}
		};

		//validar password
		if(this.itm.inp_password.length){
			var inp_password = this.itm.inp_password;//selecciona los textos en ruta mas corta
			for( var i=0; i<inp_password.length; i++ ){
				var inp = inp_password[i];
				if( inp.getAttribute('data-type') == 'password' ){
					var error = this.selErr(inp);

					if ( this.valide_clave(inp) ) {
						error.hide();
					}else{
						error.show();
					}
				}
			}
		};
		//validar file
		if(this.itm.inp_file.length){
			var inp_file = this.itm.inp_file;//selecciona los files en ruta mas corta
			for( var i=0; i<inp_file.length; i++ ){
				var inp = inp_file[i];
				var error = this.selErr(inp);
				
				if( inp.getAttribute('data-type').indexOf('file') !=-1 ){
					var inp = inp_file[i];

					if ( this.valide_file(inp) ) {
						error.hide();
					}else{
						error.show();
					}
				}
			}
		};
		//validar textarea
		if( this.itm.inp_area.length ){
			var inp_area = this.itm.inp_area;//selecciona los textarea en ruta mas corta
						
			for( var i=0; i<inp_area.length; i++ ){
				var inp = inp_area[i];
				var error = this.selErr(inp);

				if( inp.getAttribute('data-type') == 'text' ){

					if ( this.valide_text(inp) ){
						error.hide();
					}else{
						error.show();
					}

				}
			}
		};
		//validar radio
		if( this.itm.grp_radio.length ){
			var grp_radio = this.itm.grp_radio;//selecciona los radio en ruta mas corta
						
			for( var i=0; i<grp_radio.length; i++ ){
				var grp = grp_radio[i].reverse();//reverse permite que se focalise el primer objeto

				for( var j=0; j<grp.length; j++ ){
					var inp = grp[j];
					var error = this.selErr(inp);

					if( inp.getAttribute('data-type') == 'radio' ){

						if ( this.valide_inpGroup(inp) ){
							error.hide();
							break;
						}else if( j==grp.length-1 ){
							error.show();
						}

					}
				}
			}
		};
		//validar check
		if( this.itm.grp_check.length ){
			var grp_check = this.itm.grp_check;//selecciona los check en ruta mas corta
						
			for( var i=0; i<grp_check.length; i++ ){
				var grp = grp_check[i].reverse();//reverse permite que se focalise el primer objeto

				for( var j=0; j<grp.length; j++ ){
					var inp = grp[j];
					var error = this.selErr(inp);

					if( inp.getAttribute('data-type') == 'check' ){

						if ( this.valide_inpGroup(inp) ){
							error.hide();
							break;
						}else if( j==grp.length-1 ){
							error.show();
						}

					}
				}
			}
		};
		//validar select
		if( this.itm.inp_select.length ){
			var inp_select = this.itm.inp_select;//selecciona los select en ruta mas corta

			for( var i=0; i<inp_select.length; i++ ){
				var inp = inp_select[i];
				var error = this.selErr(inp);

				if( inp.getAttribute('data-type') == 'select' ){

					if ( this.valide_select(inp) ){
						error.hide();
					}else{
						error.show();
					}

				}
			}
		};
		//validar select multiple
		if( this.itm.inp_selectMultiple.length ){
			var inp_selectMultiple = this.itm.inp_selectMultiple;//selecciona los select en ruta mas corta

			for( var i=0; i<inp_selectMultiple.length; i++ ){
				var inp = inp_selectMultiple[i];
				var error = this.selErr(inp);

				if( inp.getAttribute('data-type') == 'select' ){

					if ( this.valide_select(inp) ){
						error.hide();
					}else{
						error.show();
					}

				}
			}
		};
		//envía o no el formulario
		if ( valide.val ){
			//envía formulario
			this.itm.form.submit();
		}else{
			//enfoca primer elemento
			valide.focuse.focus();
		}

	},
	ini : function(este,event){
		//selecciona y clasifica los inputs
		this.selectInputs(este);
		//inicia validacion
		this.valide(este);
		//detiene el evento submit por defecto
        (event.preventDefault)? event.preventDefault() : event.returnValue = false;

	}

};