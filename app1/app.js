class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    validarDados() {
        for(let i in this) {
            //this acessa o atributo
            //salva o atributo na variável i
            //this[i] acessa o valor do atributo
            if(this[i] == undefined || this[i] == '' || this[i] == null) {
                return false
            }
        }
        return true
    }
}

class Bd {

    constructor() {
        let id = localStorage.getItem('id')

        if(id === null) {
            localStorage.setItem('id', 0)
        }
    }
    
    getProximoId() {
        //Salva o valor atual da key id
        let ProximoId = localStorage.getItem('id') 
        //Retorna o valor atual da key id + 1
        return parseInt(ProximoId) + 1
    }

    //Recebe o objeto despesa (d)
    gravar(d) {
        //Pega o valor da key para armazenar a string do objeto sem que haja sobreposição
        let id = this.getProximoId()
        //Armazena a string do objeto
        localStorage.setItem(id, JSON.stringify(d))
        //Atualiza o valor da key 
        localStorage.setItem('id', id)
    }

    recuperarTodosRegistros() {
        
        //array de despesas (objeto)
        let despesas = Array()


        let id = localStorage.getItem('id')

        //recuperar todas as despesas cadastradas em localStorage
        for(let i = 1; i <= id; i++) {
            
            //recuperar a despesa convertendo-a como objeto
            let despesa = JSON.parse(localStorage.getItem(i))
            
            //verifica se a despesa é nula e a pula
            if(despesa === null) {
                continue
            }

            //armazena o i de criação do objeto
            despesa.id = i
            //Puxa o objeto
            despesas.push(despesa)
        }
        return despesas
    }

    pesquisar(despesa) {
        let despesasFiltradas = Array()
        despesasFiltradas = this.recuperarTodosRegistros()
        
        //filtro de ano
        if(despesa.ano != '') {
           despesasFiltradas = despesasFiltradas.filter(f => f.ano == despesa.ano)
        }
        
        //filtro de mês
        if(despesa.mes != '') {
            despesasFiltradas = despesasFiltradas.filter(f => f.mes == despesa.mes)
        }

         //filtro de dia
         if(despesa.dia != '') {
            despesasFiltradas = despesasFiltradas.filter(f => f.dia == despesa.dia)
        }

         //filtro de tipo
         if(despesa.tipo != '') {
            despesasFiltradas = despesasFiltradas.filter(f => f.tipo == despesa.tipo)
        }

         //filtro de descrição
         if(despesa.descricao != '') {
            despesasFiltradas = despesasFiltradas.filter(f => f.descricao == despesa.descricao)
        }

        //filtro de valor
        if(despesa.valor != '') {
            despesasFiltradas = despesasFiltradas.filter(f => f.valor == despesa.valor)
        }

        return despesasFiltradas
    }

    remover(id) {
        localStorage.removeItem(id)
    }
}

let bd = new Bd()

function cadastrarDespesa() {

    //Salva os elementos em uma variável
    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor =  document.getElementById('valor')

    //Objeto
    let despesa = new Despesa(
        //Recebe os valores dos elementos como parâmetros para os atributos do objeto
        ano.value, mes.value, dia.value, tipo.value, descricao.value, valor.value
    )
    
    if(despesa.validarDados()) {
        //Chamada do método que salva a string do objeto despesa no LocalStorage
        bd.gravar(despesa)
        //dialog de sucesso
        document.getElementById('modalpai').classList.add("text-success")
        document.getElementById('modalpai').classList.remove("text-danger")
        document.getElementById('corpoModal').innerHTML = 'A despesa foi cadastrada com sucesso'
        document.getElementById('botaomsg').classList.add('btn-success')
        document.getElementById('botaomsg').classList.remove('btn-danger')
        document.getElementById('botaomsg').innerHTML = 'Voltar'
        document.getElementById('exampleModalLabel').innerHTML = "Sucesso na gravação"
        $('#Mensagem').modal('show')
        limparDados()
        
    }else {
        //dialog de erro
        document.getElementById('modalpai').classList.add("text-danger")
        document.getElementById('modalpai').classList.remove("text-success")
        document.getElementById('corpoModal').innerHTML = 'Existem campos obrigatórios que não foram preenchidos'
        document.getElementById('botaomsg').classList.add('btn-danger')
        document.getElementById('botaomsg').classList.remove('btn-success')
        document.getElementById('botaomsg').innerHTML = 'Voltar e corrigir'
        document.getElementById('exampleModalLabel').innerHTML = "Erro na gravação"
        $('#Mensagem').modal('show')
    }
   
}

function carregaListaDespesas(despesas = Array(), filtro = false) {
    
    if(despesas.length == 0 && filtro == false) {
        //Recupera todos os objetos
        despesas = bd.recuperarTodosRegistros()
    }
    
    //selecionando o elemento tbody da tabelo
    let listaDespesas = document.getElementById('listaDespesas')
    listaDespesas.innerHTML = ""
    
    //percorrer o Array despesas listando cada despesa de forma dinâmica
    despesas.forEach(function(d) {

        //criando a linha (tr)
        let linha = listaDespesas.insertRow()
        
        //criar as colunas (td)
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`
        
        //ajustar o tipo
        switch(parseInt(d.tipo)) {
            case 1: d.tipo = 'Alimentação'
                break
            case 2: d.tipo = 'Educação'  
                break
            case 3: d.tipo = 'Lazer'  
                break
            case 4: d.tipo = 'Saúde'    
                break
            case 5: d.tipo = 'Transporte'
                break
            
        }

        linha.insertCell(1).innerHTML = d.tipo
        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = d.valor

        //criar o botão de exclusão
        let btn = document.createElement("button")
        btn.className = 'btn btn-danger'
        btn.innerHTML = '<i class="fa fa-times"></i>'
        btn.id = 'id_despesa_' + d.id
        btn.onclick = function() {
            //remover a despesa
            let id = this.id.replace('id_despesa_', '')
            bd.remover(id)
            window.location.reload()
        }
        linha.insertCell(4).append(btn)
    })
}

function pesquisarDespesa() {
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value

    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)

    let despesas = bd.pesquisar(despesa)

    this.carregaListaDespesas(despesas, true)
}

function limparDados() {
    document.getElementById('ano').value = ""
    document.getElementById('mes').value = ""
    document.getElementById('dia').value = ""
    document.getElementById('tipo').value = ""
    document.getElementById('descricao').value = ""
    document.getElementById('valor').value = ""
}
