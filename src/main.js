import api from './api'; // importando nossa api

class App{
    constructor(){
        this.repositories = []; // guardará a lista de repositórios
        this.inputElement = document.querySelector("input[name=repository]"); // guardando nosso input
        this.formElement = document.getElementById("repo-form"); // guardando o formulário
        this.listElement = document.getElementById("repo-list"); // guardando a lista de elementos

        this.registerHandlers();
    }

    // registra os eventos
    registerHandlers(){
        this.formElement.onsubmit = event => this.addRepository(event); // utilizando arrow-function
    }

    // função que avisa ao usuário que estamos carregando a resposta
    setLoading(loading = true){ // usando a funcionalidade de parâmetros padrão
        if(loading === true){
            let loadingElement = document.createElement('span');
            loadingElement.appendChild(document.createTextNode('Carregando...'));
            loadingElement.setAttribute('id', 'loading');

            this.formElement.appendChild(loadingElement);
        } else {
            document.getElementById('loading').remove();
        }
    }

    // adiciona um repositório à lista
    async addRepository(){
        event.preventDefault(); // impede o reload da página no caso do submit

        let valorInput = this.inputElement.value; // guardando o valor do input

        if(valorInput.length === 0)
            return; // se o input estiver vazio, não faça nada ( saia da função )

        this.setLoading(); // colocando a informação de loading

        try{ // executa esse bloco de código caso seja sucedida a nossa requisição à api
            const response = await api.get(`/repos/${valorInput}`); // buscando o repositório digitado
        
            // console.log(response.data);

            const {name, description, html_url, owner: {avatar_url} } = response.data; // desestruturando a nosa resposta para diminuir o código

            this.repositories.push({
                name,
                description,
                avatar_url,
                html_url,
            });

            this.inputElement.value = ''; // limpando o input

            this.render();
        } catch{
            alert('O repositório não foi encontrado ou não existe!'); // mostra essa mensagem de erro caso não consiga encontrar o repositório
        }

        this.setLoading(false); // retira a informação de loading, se achar algum repositório ou não ( entrar no try ou no catch)
    }

    // renderiza a lista novamente
    render(){
        this.listElement.innerHTML = ''; // limpando o html da lista
        this.repositories.forEach(repo => {
            let imgElement = document.createElement('img'); // criando o elemento de imagem
            imgElement.setAttribute('src', repo.avatar_url); // setando o src dela

            let titleElement = document.createElement('strong'); // criando o elemento do texto(título)
            titleElement.appendChild(document.createTextNode(repo.name)); // inserindo um texto dentro do título

            let descriptionElement = document.createElement('p'); // criando o elemento da descrição (p)
            descriptionElement.appendChild(document.createTextNode(repo.description)); // inserindo um texto dentro da descrição

            let linkElement = document.createElement('a'); // criando o elemento de link
            linkElement.setAttribute('target', '_blank'); // dando a propriedade _blank
            linkElement.setAttribute('href', repo.html_url); // dando a propriedade _blank
            linkElement.appendChild(document.createTextNode('Acessar')); //colocando o texto 'Acessar'

            let listItemElement = document.createElement('li');
            listItemElement.appendChild(imgElement); // inserindo a imagem ao item da lista
            listItemElement.appendChild(titleElement); // inserindo o título ao item da lista
            listItemElement.appendChild(descriptionElement); // inserindo a descrição ao título da lista
            listItemElement.appendChild(linkElement); // inserindo o link ao título da lista

            this.listElement.appendChild(listItemElement); // jogando o nosso item da lista dentro da nossa lista ( que está dentro do html )
        })
    }
}

new App(); // executando a classe sem salvar em nenhuma variável