function tentarLogin(){
    var form = document.forms["login"];
    var login = form["usuario"];
    var senha = form["senha"];
    var metodo = "POST";
    var URL = "/login";
    var dados = "usuario=" + login + "&senha=" + senha;
    var async = false;
    var request = new XMLHttpRequest;
    request.onload = function () {
        var status = request.status;
        var resultado = request.responseText;
    }
    
    request.open(method, URL, async);
    request.send(dados);
    if(status == 200){
        var resultadoObj = JSON.parse(resultado);
        request = new XMLHttpRequest;
        metodo = "GET";
        request.setRequestHeader("Authorization", resultadoObj.auth);
        if(resultadoObj.tabela == "aluno"){
            URL = "aluno-principal.html";
        }else if(resultadoObj.tabela == "professor"){
            URL = "professor-principal.html";
        }else if(resultadoObj.tabela == "coordenador"){
            URL = "coordenador-principal.html";
        }
        request.open(method, URL, async);
        alert("Resultado: " + status + "\nDados:" + resultado);
    }
}
