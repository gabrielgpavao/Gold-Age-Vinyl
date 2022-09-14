let formPesquisar = document.querySelector('.pesquisa-produto')
formPesquisar.addEventListener('submit', event => {
    event.preventDefault()
})




let main = document.querySelector('main')
let ulProdutos = document.createElement('ul')
ulProdutos.className = 'lista-produtos'


let aside = document.querySelector('aside')
let ulCarrinho = document.createElement('ul')

let conteinerCarrinho = document.querySelector("#conteiner-carrinho")
console.log(conteinerCarrinho.children.length)
let quantiaFinal = document.querySelector("#quantiaFinal")
let valorFinal = document.querySelector("#valorFinal")

let pCarrinhoVazio = document.querySelector(".carrinho-vazio")




//----------------------------- V I T R I N E -------------------------------------

function criarLiProdutos (listaProdutos) {
    for (let i = 0; i < listaProdutos.length; i++) {
        let liProduto = document.createElement('li')
        liProduto.className = 'card-produto'

        let div1 = document.createElement('div')
        div1.innerHTML = 
        `
            <img src="${listaProdutos[i].imagem}"
            class="img"
            alt="${listaProdutos[i].descricaoImagem}"
            title="${listaProdutos[i].descricaoImagem}">

            <h3>${listaProdutos[i].album}</h3>            
            <small>${listaProdutos[i].banda}</small>
            <span>${listaProdutos[i].estilo}</span>
        `

        let div2 = document.createElement('div')
        div2.innerHTML = 
        `
            <p class="preco">R$ ${listaProdutos[i].preco.toFixed(2)}</p>
            <small>Frete grátis</small>
            <div class="adicionar-carrinho">
                <button class="butao" id=${listaProdutos[i].id} >Adicionar ao carrinho</button>
            </div>
        `

        liProduto.append(div1, div2)

        ulProdutos.appendChild(liProduto)
    }
}
criarLiProdutos(discos)


main.appendChild(ulProdutos)








let butaoAdicionar = document.getElementsByClassName('butao')

for (let i = 0; i < butaoAdicionar.length; i++) {

    butaoAdicionar[i].addEventListener('click', function(event){
        
        let disco = {}
        
        for (let j = 0; j < discos.length; j++) {
            if (discos[j].id == event.target.id) {
                disco = discos[j]
                if (!verificarDuplicidade(disco.id)) {
                    pCarrinhoVazio.remove()
                    
                    criaProdutoCarrinho(disco)
                    itensAdicionados.push(disco)

                    quantiaFinal.innerHTML = `${contarQuantidade(itensAdicionados)}`
                    valorFinal.innerHTML = `R$ ${calcularPrecoTotal(itensAdicionados)}`
                    

                } else {
                    alert(' produto já se encontra no carrinho!')
                }
            }
        }
    })
}




function verificarDuplicidade (id) {
    let elemento = document.getElementById(`#${id}`)
    if (elemento == null)  {
        return false
    } else {
        return true
    }
}





// ------------------ C A R R I N H O-----------------------

function criaProdutoCarrinho (itemSelecionado) {

    let liCarrinho = document.createElement('li')
    liCarrinho.id = `#${itemSelecionado.id}`
    liCarrinho.className = 'produto-carrinho'

    let imgCarrinho = document.createElement('img')
    imgCarrinho.setAttribute('class', 'icone-album')
    imgCarrinho.setAttribute('src', `${itemSelecionado.imagem}`)
    imgCarrinho.setAttribute('alt', `${itemSelecionado.descricaoImagem}`)
    imgCarrinho.setAttribute('title', `${itemSelecionado.descricaoImagem}`)
    

    let divCarrinho = document.createElement('div')
    divCarrinho.innerHTML = 
    `
        <h3>
            ${itemSelecionado.album}
        </h3>
        <p>
            ${itemSelecionado.banda}
        </p>
        <small>R$ ${itemSelecionado.preco.toFixed(2)}</small>
    `


    let inputCarrinho = document.createElement('input')
    inputCarrinho.setAttribute('type', 'image')
    inputCarrinho.setAttribute('src', './assets/img/para-pagina/trash.png')
    inputCarrinho.setAttribute('alt', 'Excluir item')
    inputCarrinho.setAttribute('title', 'Excluir item')
    inputCarrinho.setAttribute('class', 'lixeira')

    inputCarrinho.addEventListener('click', function(){
       
        if (itensAdicionados.length === 1) {
            ulCarrinho.remove()
            conteinerCarrinho.append(pCarrinhoVazio)
        }
        liCarrinho.remove()
        itensAdicionados.pop()
        quantiaFinal.innerText = `${contarQuantidade(itensAdicionados)}`
        valorFinal.innerText = `R$ ${calcularPrecoTotal(itensAdicionados)}`
        
    })

    
    
    liCarrinho.append(imgCarrinho, divCarrinho, inputCarrinho)
    

    ulCarrinho.appendChild(liCarrinho)
    ulCarrinho.insertAdjacentElement("afterbegin", liCarrinho)
    conteinerCarrinho.appendChild(ulCarrinho)
}


























// function criarInfoCarrinho (itensSelecionados) {
//     let infoCarrinho = document.createElement('section')
//     infoCarrinho.className = 'info-carrinho'
    
//     let divQuantidade = document.createElement('div')
//     divQuantidade.className = 'quantidade-itens'
//     divQuantidade.innerHTML = 
//     `
//     <p>Quantidade:</p>
//     <p>${contarQuantidade(itensSelecionados)}</p>
//     `
    
//     let divTotal = document.createElement('div')
//     divTotal.className = 'preco-total'
//     divTotal.innerHTML = 
//     `
//         <p>Total:</p>
//         <p>R$ ${calcularPrecoTotal(itensSelecionados)}</p>
//     `

//     infoCarrinho.append(divQuantidade, divTotal)
//     aside.appendChild(infoCarrinho)
// }
// criarInfoCarrinho(itensAdicionados)



function contarQuantidade(itens) {
    return itens.length
}


function calcularPrecoTotal (itens) {
    let somatoria = 0
    
    for (let i = 0; i < itens.length; i++) {
        somatoria += itens[i].preco
    }
    return somatoria.toFixed(2)
}



