        //String
        // let pessoas = '{"pessoas": [' + 
        // '{ "nome":"André", "idade": "18", "sexo":"masculino" },'+
        // '{ "nome":"Ryan", "idade": "18", "sexo":"feminino" },'+
        // '{ "nome":"Ricardo", "idade": "18", "sexo":"masculino" } ]}'

        //Array de objetos(string -- objetos)
        // const obj = JSON.parse(pessoas)
        // console.log(obj)

        //Array de objetos para string
        // let pessoasArray = JSON.stringify(obj)
        
        

        function getProximoId() {
            let id = localStorage.getItem('id')
            if(id === null) {
                id = 0
            }
            return id
        }

        function setProximoId() {
            let id = eval(localStorage.getItem('id'))
            let proximoId = localStorage.setItem('id', id + 1)
            return proximoId
        }


       
        
        function gravar() {
            if(document.getElementById('nome').value 
            != "" && document.getElementById('idade').value  != ""
             && document.getElementById('sexo').value  != "") 
            {
                let pessoa = {
                    nome: document.getElementById('nome').value, 
                    idade:document.getElementById('idade').value,
                    sexo: document.getElementById('sexo').value
                }
            const pessoas = JSON.stringify(pessoa)
            localStorage.setItem(getProximoId(), pessoas)
            setProximoId()
            }
            else {
                alert('dados inválidos')
            }
        }

        function recuperarDados() {
            let pessoas = []
            let id = localStorage.getItem('id')
            for(let x = 0; x < id; x++) {
                pessoas.push(JSON.parse(localStorage.getItem(x)))
            }
            return pessoas
        }

        function carregarPessoas(d) {
           let pessoas = recuperarDados()
           if(d != null || d != "" || d != undefined) {
             pessoas = filtrarPessoas()
           }
              
           let tabela = document.getElementById('tabelaCorpo')
           
           for(x in pessoas) {
             
            let y = parseInt(x) + 1
            let linha = tabela.insertRow()
            linha.insertCell(0).innerHTML = y
            linha.insertCell(1).innerHTML = pessoas[x].nome
            linha.insertCell(2).innerHTML = pessoas[x].idade
            linha.insertCell(3).innerHTML = pessoas[x].sexo
           }

        }
     
        function filtrarPessoas() {
            let pessoas = recuperarDados()

            if(document.getElementById('nome').value != "") {
                let nome = document.getElementById('nome').value
                pessoas = pessoas.filter(d => d.nome == nome)
                
            }

            if(document.getElementById('idade').value != "") {
                let idade = document.getElementById('idade').value
                pessoas = pessoas.filter(d => d.idade == idade)
            }

            if(document.getElementById('sexo').value != "") {
                let sexo = document.getElementById('sexo').value
                pessoas = pessoas.filter(d => d.sexo == sexo)
            }
            
            
            return pessoas
        }

        function pesquisa() {

            let tabela = document.getElementById('tabelaCorpo')
            tabela.innerHTML= ""

            carregarPessoas(filtrarPessoas())
        }


        recuperarDados()