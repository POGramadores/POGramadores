
function tentarLogin(){
    try{
        alert("TÁ BUGADO O SCRIPT, OBRIGADU");
        console.log($("#login-form").serialize());
        $.post("/login", $("#login-form").serialize(),
               function(data, status){
                    if(status == 200){
                        var resultadoObj = JSON.parse(data);
                        if(resultadoObj.tabela == "aluno"){
                            URL = "aluno-principal.html";
                        }else if(resultadoObj.tabela == "professor"){
                            URL = "professor-principal.html";
                        }else if(resultadoObj.tabela == "coordenador"){
                            URL = "coordenador-principal.html";
                        }
                        window.location.href = URL;
                    }else if(status == 400){
                        $("#erro-senha").slideDown(250);
                        setTimeout(function () {
                            $("#erro-senha").slideUp(500);
                        }, 5000);
                    }
               }
               );
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
