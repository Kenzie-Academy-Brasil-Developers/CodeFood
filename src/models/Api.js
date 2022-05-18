import { Modals } from './../js e handlers/dom.js'

class ListarProdutos{
    static BASE_URL = 'https://api-kenzie-food.herokuapp.com'
    static async metodoGet(){
        
        const response = await fetch(`${this.BASE_URL}/products`) 
        const data     = await response.json()

        return data
    }

}
class Cadastro{
    static BASE_URL ='https://api-kenzie-food.herokuapp.com'

    static async metodoPost(dadosCadastro){
        await fetch(`${this.BASE_URL}/auth/register`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dadosCadastro)
        })
        .then(response => response.json())
        .then((response) => {
        console.log(response)
        /*
        Armazenar com local storage a resposta, para na hora do cadastro da um getLocalStorage

        Baseado nessa mensagem, a gente pode redirecionanar a pessoa com windows location com set timeout, caso o cadas
        apareca uma mensagem de erro, mostrar
        a resposta do cadastro é um objeto, do login é um token
        */
                
        })
        .catch((err) => {
        console.error(err);
    })
    }
}

class Login {
    static BASE_URL = "https://api-kenzie-food.herokuapp.com"
    
    static async metodoPost(dadosLogin) {
        await fetch(`${this.BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dadosLogin)
        })
        .then(response => response.json())
        .then((response) => {
            if(response.error === "password invalid") {
                const body = document.querySelector('body')
    
               const div = document.createElement('div')
               div.id = 'erroCadastro'
               div.innerText = 'Problema na sua senha, verifique-a'
               body.appendChild(div)
    
               setTimeout(() => {
                    div.remove()
               }, 1500);
            }
            else {
                localStorage.setItem('token', response)
                window.location = `/src/pages/homeAdmin.html`
            }
            })
      
        .catch((err) => {
            console.error(err);
        })
            
    }  
}

/// Rotas Privadas
class Privados{
    
    static async listarProdutosGet(){
        const URL = "https://api-kenzie-food.herokuapp.com"
 
        const produtos = await fetch(`${URL}/my/products`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
        const data = await produtos.json()
        return data
    }

    static async criarProdutosPost(dadosProduto, id) {
        const URL = "https://api-kenzie-food.herokuapp.com"
        
        return await fetch(`${URL}/my/products/${id}`, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(dadosProduto)
        })
        .then(response => response.json())
        .then(response => response)
        .catch(err => console.error(err));
    }

    static async editarProdutosPost(dadosParaAlterar, id){
        const URL = "https://api-kenzie-food.herokuapp.com"

        return await fetch(`${URL}/my/products/${id}`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(dadosParaAlterar)
        })
        .then(response => response.json())
        .then(response => response)
        .catch(err => console.error(err));
    }

    static async deletarProdutos(id) {
        const URL = "https://api-kenzie-food.herokuapp.com"

        return await fetch(`${URL}/my/products/${id}`, {
            method: "DELETE",
            headers:  {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
        })
        .then(response => console.log(response))
        .catch(err => console.error(err));
    }
}

export {ListarProdutos}
export {Cadastro}
export {Login}
// Exports privados
export {Privados}