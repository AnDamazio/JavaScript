 
 /**/
 class Pessoa {
    constructor(nome, idade) {
        this.nome = nome
        this.idade = idade
    }

}


//Classe para gerenciar o LocalStorage
class Bd {
    constructor() {
        //Variável inerente ao objeto
        //Salva na memória o valor atual do id
        let id = localStorage.getItem('id')
        
        //Cria a key e define um valor pra ela caso não exista
        if(id === null) {
            localStorage.setItem('id', 0)
        }
        
    }

    getProximoId() {
        //Pega o id atual e salva 
        let proximoId = localStorage.getItem('id')

        //Retorna o valor do id atual + 1, para que não haja sobreposição
        return parseInt(proximoId) + 1
    }

    gravar(d) {
        //Pega a próxima posição para salvar o objeto
        let id = this.getProximoId()
        //Passa o objeto para String e salva na posição 
        localStorage.setItem(id, JSON.stringify(d))
        //Atualiza o valor atual do id no banco
        localStorage.setItem('id', id)
    }

    recuperarTodosRegistros() {

        //Array de pessoas
        let pessoas = Array()

        let id = localStorage.getItem('id')

        for(let i = 1; i <= id; i++) {
            let pessoa = JSON.parse(localStorage.getItem(i))

            if(pessoa === null) {
                continue
            }

            pessoa.id = i
            pessoas.push(pessoa)
        }   
        
        return pessoas
    }
 
   
   
    
}

bd = new Bd()



function cadastrarPessoa() {

    //Salva os valores dos atributos em uma varável
    //Pega os valores dos inputs
    let nome = document.getElementById('nome')
    let idade = document.getElementById('idade')
    

    //Objeto constantemente sobreposto
    //Recebe os dados dos inputs
    pessoa = new Pessoa(
    nome.value,
    idade.value
    )
    
    var pessoas = new Array()
    pessoas.push(JSON.stringify(pessoa))

    //Condicional para impedir que um objeto nulo seja salvo
   if(pessoa.nome == "" || pessoa.idade == "") {
        alert('Erro no preenchimento dos campos')
   }else {
    bd.gravar(pessoa)
    
   }


}

function listarPessoas(pessoas = Array()) {

    pessoas.forEach(function(d) {
        bd.recuperarTodosRegistros()
    })

    
}



