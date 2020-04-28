// utilizando o axios para fazer requisições assíncronas a uma API externa

import axios from 'axios';

const userName = document.getElementById("userName"); // pegando o input
const searchUserButton = document.querySelector("#searchUser"); // pegando o botão

class Api {
    static async getUserInfo(usuario){
        try{ // tenta fazer isso
            const response = await axios.get(`https://api.github.com/users/${usuario}`);
            console.log(response.data);
            window.location = response.data.avatar_url;
        } catch(err){ // se der erro, executa esse bloco
            console.warn('Erro na API');
        }
    }
}

userName.onpaste = function(){
    setTimeout(() => {Api.getUserInfo(userName.value)}, 500); // timeout apenas para dar tempo de o valor atualizar depois de colar
    //Api.getUserInfo(userName.value); // não funciona pois não dá tempo do valor atualizar antes de efetivar o texto colado
};

searchUserButton.onclick = function(){
    Api.getUserInfo(userName.value);
}