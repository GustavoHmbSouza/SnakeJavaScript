function atualizaPlacar()
{
    //Elimina o placar antigo
    var placar = document.querySelector('#pai #secao #menu #pontuacao h2');
    placar.remove();

    //Cria um placar novo
    var elemento_pai = document.querySelector('#pai #secao #menu #pontuacao');
    var node = document.createElement('h2');
    var texto = document.createTextNode('Pontos: ' + (tamanhoCobra-1));
    node.appendChild(texto);
    elemento_pai.appendChild(node);
}

function atualizaTempoJogado()
{
    //Elimina o placar antigo
    var placar = document.querySelector('#pai #secao #menu #tempoJogado h2');
    placar.remove();

    //Cria um placar novo
    var elemento_pai = document.querySelector('#pai #secao #menu #tempoJogado');
    var node = document.createElement('h2');
    var texto = document.createTextNode('Tempo: ' + tempoJogado);
    node.appendChild(texto);
    elemento_pai.appendChild(node);
}

var tempoJogado = 0;
