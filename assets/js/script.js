const form = document.querySelector('.form_add');
form.addEventListener('submit', function(ev){
    ev.preventDefault(); // não atualiza a página
    
    let pessoa = receberValoresDaTabela(form);
 
    let imagemCodificada = converterParaBase64(pessoa.imagem); // converte a imagem do form para base 64
    localStorage.setItem('imagem', imagemCodificada); // adiciona imagem no local storage

    let row;

    switch (pessoa.time){
        case 'fullStack':
            row = document.querySelector('.full_stack');
            pessoa.corFundo = '#5cb85c';
            break;

        case 'frontEnd':
            row = document.querySelector('.front_end');
            pessoa.corFundo = '#0275d8';
            break;
        
        case 'backEnd':
            row = document.querySelector('.back_end');
            pessoa.corFundo = '#f0ad4e';
            break;
            
        case 'dataScience':
            row = document.querySelector('.data_science');
            pessoa.corFundo = '#d9534f';
            break;

        case 'mobile':
            row = document.querySelector('.mobile');
            pessoa.corFundo = '#333';
            break;
        
        case 'uxEDesign':
            row = document.querySelector('.ux_design');
            pessoa.corFundo = '#5bc0de';
            break;
    }

    row.appendChild(montarCard(pessoa));
})

const receberValoresDaTabela = (form) => { // função de tipo arrow function
    let pessoa = {
        nome: form.nome.value,
        cargo: form.cargo.value,
        foto: form.foto.files[0],
        time: form.time.value
    };

    return pessoa;
}

function adicionarDescricao(pessoa){
    let nomeDescricao = document.createElement('h4'); // criando um título h4 para o nome da pessoa
    nomeDescricao.textContent = pessoa.nome; // adicionando o nome da pessoa na tag h4
    nomeDescricao.style.color = pessoa.corFundo;

    let cargoDescricao = document.createElement('p'); // criando um parágrafo p
    cargoDescricao.textContent = pessoa.cargo; // adicionando o cargo da pessoa ao parágrafo p
    cargoDescricao.style.color = pessoa.corFundo;

    let figcaption = document.createElement('figcaption'); // criando um figcaption
    figcaption.classList.add('text-center'); // adiciona uma classe de html ao figcaption
    figcaption.appendChild(nomeDescricao); // adiciona o nome dentro do figcaption
    figcaption.appendChild(cargoDescricao); //adiciona o cargo dentro do figcaption

    return figcaption;
}

function montarCard(pessoa){

    let foto = document.createElement('img')
    let figure = document.createElement('figure'); // criando uma figure
    figure.classList.add('col-md-3');
    figure.classList.add('card');
    figure.classList.add('ms-3');
    figure.style.backgroundImage = 'linear-gradient(to top, white 60%, ' + pessoa.corFundo + ' 40%)';
    figure.appendChild(adicionarDescricao(pessoa)); // adiciona figcaption 'descrição' ao figure

    return figure;
}

function converterParaBase64(imagem){
    return new Promise(resolve => {
        let reader = new FileReader();
        reader.readAsDataURL(imagem);
        reader.onload = function () {
            let imagemCodificada = reader.result.split(',')[1];
            resolve(imagemCodificada);
        };
    });
}