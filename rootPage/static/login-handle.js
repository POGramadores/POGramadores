
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
                        global.auths = auths;
                        URL = "desambiguacao.html";
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

function desambigua(tipo){
    var auths = global.auths;
    var auth_selecionado = auths[tipo];
    var URL;
    document.cookie = "auth=" + auth_selecionado;
    if(auth_selecionado == "aluno"){
        URL = "aluno-principal.html";
    }else if(auth_selecionado == "professor"){
        URL = "professor-principal.html";
    }else if(auth_selecionado == "coordenador"){
        URL = "coordenador-principal.html";
    }else if(auth_selecionado == "membro-dacc"){
        URL = "membro-dacc-principal.html";
    }
    window.location.href = URL;
}
