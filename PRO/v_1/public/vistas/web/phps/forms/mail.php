<?php

// Para enviar un correo HTML mail, la cabecera Content-type debe fijarse
$headerHtml  = 'MIME-Version: 1.0' . "\r\n";
$headerHtml .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

// headerHtml adicionales
$headerHtml .= "From: ".$_POST['nombre']."<www.nubeti.co>" . "\r\n";

$message = "nombre: ".$_POST['nombre'].'<br>';
$message = "telefono: ".$_POST['telefono'].'<br>';
$message .= "e-mail: ".$_POST['email'].'<br>';
$message .= "pais: ".$_POST['pais'].'<br>';
$message .= "mensaje: ".$_POST['mensaje'].'<br>';


//se valida si vienen con valor
if( $_POST['nombre'] == "" or $_POST['email'] == "" ){

	header("location: " . $_SERVER[HTTP_REFERER]."#contacto-error");

}else{

	mail("oscar.ortiz@nubeti.co", "Contacto: www.nubeti.co‎", $message, $headerHtml);
	header("location: " . $_SERVER[HTTP_REFERER]."#contacto-gracias");
	
}

?>