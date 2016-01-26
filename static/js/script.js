(function(){

    var aInputs = document.getElementsByClassName('form__container');

    var buttonMenu = document.getElementById('button_menu');

    var menuItems = document.getElementsByClassName('nav');

    document.getElementById('send').addEventListener('click', function(e){
        checkMail(this, e);
    });

    buttonMenu.addEventListener('click', function(e){
        menu(this, e);
    });
    buttonMenu.addEventListener('focus', function(e){
        menu(this, e);
    });

    function checkMail(input, oEvent){
        var errors = [], msgError;
        //Check value length
        for( i = -1 ; ++i<aInputs.length ; ){
            if(aInputs[i].children[1].value == ''){ // si le champ est vide
                if(aInputs[i].children.length == 3){ // si le champ a déjà un message d'erreur
                    aInputs[i].removeChild(aInputs[i].children[2]);
                }
                msgError = document.createElement('p');
                msgError.innerHTML = 'Ce champ ne peut être vide';
                aInputs[i].appendChild(msgError);
                aInputs[i].className = "form__container error";
                errors[i] = false;
            }
            else{ // Si le champ n'est pas vide
                if( i == 1 ){ // Si le champ est l'email
                    if(!validateEmail(aInputs[i].children[1].value)){ // Si l'email n'est pas valide
                        if(aInputs[i].children.length == 3){
                            aInputs[i].removeChild(aInputs[i].children[2]); // On supprime le message précédant et on créé un nouveau
                        }
                        msgError = document.createElement('p');
                        msgError.innerHTML = 'Il semblerait que l\'adresse mail fournie soit invalide';
                        aInputs[i].appendChild(msgError);
                        aInputs[i].className = "form__container error";
                        errors[i] = false;
                    }else{ // Si l'email est valide
                        if(aInputs[i].children.length == 3){
                            aInputs[i].removeChild(aInputs[i].children[2]);
                            aInputs[i].className = "form__container";
                            errors[i] = true;
                        }
                    }
                }
                else{ // Si le champ est le nom ou l'objet
                    if(aInputs[i].children.length == 3){
                        aInputs[i].removeChild(aInputs[i].children[2]);
                        aInputs[i].className = "form__container";
                        errors[i] = true;
                    }
                }
            }
        }

        var hasErrors = 0;

        for( i = -1 ; ++i < 4 ; ){
            if(errors[i] === false) hasErrors++;
        }

        //Check the useless anti bot input
        if(document.getElementById('useless').value != '') hasErrors++;

        //Check errors
        if(hasErrors == 0){
            input.type = 'submit';
            input.checked = true;
        }

    }

    function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    function menu(input, oEvent){
        if(menuItems[0].className == "nav" || menuItems[0].className == "nav hide"){
            menuItems[0].className = "nav active";
            buttonMenu.className = "button_menu fa fa-bars active";
        }
        else if(menuItems[0].className == "nav active"){
            menuItems[0].className = "nav hide";
            buttonMenu.className = "button_menu fa fa-bars";
        }
    }
})();

