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
let quantiaFinal = document.querySelector("#quantiaFinal")
let valorFinal = document.querySelector("#valorFinal")

let pCarrinhoVazio = document.querySelector(".carrinho-vazio")




//----------------------------- V I T R I N E -------------------------------------

function criarLiProdutos (listaProdutos) {
    ulProdutos.innerHTML = ''
    
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

function adicionarProdutoCarrinho (itensCarrinho) {

    let butaoAdicionar = document.getElementsByClassName('butao')
    
    for (let i = 0; i < butaoAdicionar.length; i++) {
    
        butaoAdicionar[i].addEventListener('click', function(event){
            
            let disco = {}
            
            for (let j = 0; j < itensCarrinho.length; j++) {
                if (itensCarrinho[j].id == event.target.id) {
                    disco = itensCarrinho[j]
                    if (!verificarDuplicidade(disco.id)) {
                        pCarrinhoVazio.remove()
                        
                        criaProdutoCarrinho(disco)
                        itensAdicionados.push(disco)
    
                        quantiaFinal.innerHTML = `${contarQuantidade(itensAdicionados)}`
                        valorFinal.innerHTML = `R$ ${calcularPrecoTotal(itensAdicionados)}`
                        
    
                    } else {
                        alert('Este produto já se encontra no carrinho!')
                    }
                }
            }
        })
    }
}
adicionarProdutoCarrinho(discos)




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


function filtrarProdutos (lista) {
    const buttonSearch = document.querySelector('.butao-pesquisar')
    const inputSearch = document.querySelector('.input')

    buttonSearch.addEventListener('click', () => {
        const filteredList = lista.filter((element) => {
            const byCategory = element.estilo.toLowerCase().includes(inputSearch.value.toLowerCase())
            const byAlbum = element.album.toLowerCase().includes(inputSearch.value.toLowerCase())
            const byBand = element.banda.toLowerCase().includes(inputSearch.value.toLowerCase())

            return byCategory || byAlbum || byBand
        })

        criarLiProdutos(filteredList)
        adicionarProdutoCarrinho(filteredList)
    })

    inputSearch.addEventListener('keyup', () => {
        if (inputSearch.value === '') {
            criarLiProdutos(discos)  
            adicionarProdutoCarrinho(discos)
        }
    })
}
filtrarProdutos(discos)


function filtroPorEstilo () {
    const navMenu = document.querySelector('nav')
    navMenu.addEventListener('click', (event) => {
        const discosFiltrados = discos.filter((element) => element.estilo === event.target.innerText)
        
        switch (event.target.innerText) {
            case 'Rock Classics':
                criarLiProdutos(discosFiltrados)
                adicionarProdutoCarrinho(discosFiltrados)
                break;
            case 'Soft Rock':
                criarLiProdutos(discosFiltrados)
                adicionarProdutoCarrinho(discosFiltrados)
                break;
            case 'Heavy Metal':
                criarLiProdutos(discosFiltrados)
                adicionarProdutoCarrinho(discosFiltrados)
                break;
            default:
                criarLiProdutos(discos)
                adicionarProdutoCarrinho(discos)
        }
    })
}
filtroPorEstilo()