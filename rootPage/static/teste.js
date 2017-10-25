var valida = function(){
    var user = $('nome');
    var senha = $('senha');
    
    $.ajax({
        type: "POST",
        url: "login",
        dataType: 'json',
        async: false,
        data: '{usuario:user, senha:senha}',
        success: function(dados){
                alert(dados);
    }
    
    
    
    
    
    {usuario:user,senha:senha}).done(autenticacao => {alert(autenticacao)}).fail(() => {alert('ERROR');});
    
}