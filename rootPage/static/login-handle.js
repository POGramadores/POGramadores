
function tentarLogin(e){
	alert('cheguei aqui');
	e.preventDefault();
	var a = function (data) {
		alert(data);
	}
	var f = function (err) {
		alert('deu merda!!!');
	}
	$.ajax({
		type: "POST",
		url: "http://localhost:8080/login",
		data: {usuario:"a",senha:"c"},
		sucess: a,
		fail: f,
		dataType: "text/json"
	});
	return true;
}

$('#entrar').click(tentarLogin);
