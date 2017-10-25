
function tentarLogin(){
    try{
        $.post("/login", $("#login-form").serialize(),
               function(data, status){
                    var auths = Object.keys(data)
                    if(auths.length == 1){
                        var resultadoObj = data;
                        if(resultadoObj.tabela == "aluno"){
                            URL = "aluno-principal.html";
                        }else if(resultadoObj.tabela == "professor"){
                            URL = "professor-principal.html";
                        }else if(resultadoObj.tabela == "coordenador"){
                            URL = "coordenador-principal.html";
                        }else if(resultadoObj.tabela == "membro-dacc"){
                            URL = "membro-dacc-principal.html";
                        }
                    }else{
                        var authjson = encodeURIComponent(
                                       JSON.stringify(auths)
                                       .toString("base64"));
                        URL = "desambiguacao.html?auths=" + authjson;
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
    }catch(err){
        console.log(err);
        return false;
    }
}

function enviarCadastro(){
    try{
        $.put("/cadastro", 
              $("#cadastro-form").serialize(),
              function(){
                    window.location.href = "login.html";
              })
    }catch(err){
        console.log(err);
        return false;
    }
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function desambigua(tipo){
    var auths = JSON.parse(
                btoa(
                getParameterByName("auths")));
    var auth_selecionado = auths[tipo];
    var URL;
    document.cookie = "auth=" + auth_selecionado;
    if(tipo == "aluno"){
        URL = "aluno-principal.html";
    }else if(tipo == "professor"){
        URL = "professor-principal.html";
    }else if(tipo == "coordenador"){
        URL = "coordenador-principal.html";
    }else if(tipo == "membro-dacc"){
        URL = "membro-dacc-principal.html";
    }
    window.location.href = URL;
}

function mostrarBotoes(){
    var auths = JSON.parse(
                btoa(
                getParameterByName("auths")));
    Object.keys($("form")).forEach(
        function(auth){
            $("#" + auth).display = inline;
        }
    );
}
