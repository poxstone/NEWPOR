<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body style="white-space: pre-line;">
	

<?php

// Para enviar un correo HTML mail, la cabecera Content-type debe fijarse
$headerHtml  = 'MIME-Version: 1.0' . "\r\n";
$headerHtml .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

// headerHtml adicionales
$headerHtml .= "From: ".$_POST['nombre']."<www.nubeti.co>" . "\r\n";

$message = "nombre: ".$_POST['nombre'].'<br>';
$message = "telefono: ".$_POST['telefono'].'<br>';
$message .= "clave: ".$_POST['clave'].'<br>';
$message .= "sexo: ".$_POST['sexo'].'<br>';
$message .= "intereses: ".$_POST['intereses'].'<br>';
$message .= "pais: ".$_POST['pais'].'<br>';
$message .= "archivo: ".$_POST['archivo'].'<br>';
$message .= "estudios: ".$_POST['estudios'].'<br>';
$message .= "mensaje: ".$_POST['mensaje'].'<br>';

var_dump($_POST);
//echo ( $message );
//echo ( isset($_POST['intereses']) );

/*

//se valida si vienen con valor
if( $_POST['nombre'] == "" or $_POST['email'] == "" ){

	header("location: " . $_SERVER[HTTP_REFERER]."#contacto-error");

}else{

	mail("oscar.ortiz@nubeti.co", "Contacto: www.nubeti.co‎", $message, $headerHtml);
	header("location: " . $_SERVER[HTTP_REFERER]."#contacto-gracias");
	
}

*/

?>
</body>
</html>
