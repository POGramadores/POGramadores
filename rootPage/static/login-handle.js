
function tentarLogin(){
    try{
        $.post("/login", $("#login-form").serialize(),
               function(data, status){
                    var resultadoObj = data;
                    if(resultadoObj.tabela == "aluno"){
                        URL = "aluno-principal.html";
                    }else if(resultadoObj.tabela == "professor"){
                        URL = "professor-principal.html";
                    }else if(resultadoObj.tabela == "coordenador"){
                        URL = "coordenador-principal.html";
                    }
                    window.location.href = URL;
               }).fail(function(jqobj, status, error){
                    if(jqobj.status == 400){
                        $("#erro-senha").slideDown(250);
                        setTimeout(function () {
                            $("#erro-senha").slideUp(500);
                        }, 5000);
                    }
                },
               "json");
        return false;
        //alert("ESSA MERDA NUM FUNFA!!!! CONSERTA AI");
        /*var form = document.forms["login"];
        var login = form["usuario"];
        var senha = form["senha"];
        var metodo = "POST";
        var URL = "/login";
        var dados = "usuario=" + login + "&senha=" + senha;
        var request = new XMLHttpRequest();
        request.onload = function () {
            var status = request.status;
            var resultado = request.responseText;
            alert(status);
            
        };*/
        /*
        request.open(method, URL);
        request.send(dados);
        */
    }catch(err){
        console.log(err);
        return false;
    }
}

$('#entrar').click(tentarLogin);
