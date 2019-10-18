function geraCobra()
{
    var elemento_pai = document.querySelector('#principal');
    var node = document.createElement('div');

    node.id = 'C-' + tamanhoCobra;

    //tem que gerar atras do ultimo nó da cobra
    if (tamanhoCobra!=0)
    {
        var nodeRabo = document.querySelector('#principal #C-' + (parseInt(tamanhoCobra) - 1));
        var valorString;
        var texto = document.createTextNode("o");

        //Verifica pra onde ta apontando a ultima posição da cobra
        if (movimentos[auxMovimentos-tamanhoCobra] == 'cima')
        {
            valorString = nodeRabo.style.top;
            node.style.top = (parseInt(valorString.substring(0, valorString.length - 2)) + 20) + 'px'; 
            node.style.left = nodeRabo.style.left;
        }
        else if (movimentos[auxMovimentos-tamanhoCobra] == 'direita')
        {
            valorString = nodeRabo.style.left;
            node.style.left = (parseInt(valorString.substring(0, valorString.length - 2)) - 20) + 'px'; 
            node.style.top = nodeRabo.style.top; 
        }
        else if (movimentos[auxMovimentos-tamanhoCobra] == 'baixo')
        {
            valorString = nodeRabo.style.top;
            node.style.top = (parseInt(valorString.substring(0, valorString.length - 2)) - 20) + 'px'; 
            node.style.left = nodeRabo.style.left;
        }
        else if (movimentos[auxMovimentos-tamanhoCobra] == 'esquerda')
        {
            valorString = nodeRabo.style.left;
            node.style.left = (parseInt(valorString.substring(0, valorString.length - 2)) + 20) + 'px'; 
            node.style.top = nodeRabo.style.top;             
        }         
    }
    else
    {
        node.style.top = '200px'; 
        node.style.left = '200px'; 
        var texto = document.createTextNode('#');
    }

    node.appendChild(texto);

    node.style.background = tamanhoCobra == 0 ? 'rgb(105, 43, 43)' : 'white';
    if(velocidadeGame > 158)
    {
        node.className = "velocidade2 cobra";
        
    }
    else if (velocidadeGame >= 109)
    {
        node.className = "velocidade15 cobra";      
    }
    else if (velocidadeGame < 109)  
    {
        node.className = "velocidade1 cobra";      
    }

    //joga o pedaço novo da cobra na tela
    elemento_pai.appendChild(node);
    setaRado();
    
    tamanhoCobra++;
}

//executa o movimento
function movimento(idNodeCobra, seta)
{
    var nodeCobra = document.querySelector('#principal #C-' + idNodeCobra);
    var valorString;

    if (seta == 'cima')
    {
        valorString = nodeCobra.style.top;
        nodeCobra.style.top = (parseInt(valorString.substring(0, valorString.length - 2)) - 20) + 'px'; 
    }
    else if (seta == 'direita')
    {
        valorString = nodeCobra.style.left;
        nodeCobra.style.left = (parseInt(valorString.substring(0, valorString.length - 2)) + 20) + 'px'; 
    }
    else if (seta == 'baixo')
    {
        valorString = nodeCobra.style.top;
        nodeCobra.style.top = (parseInt(valorString.substring(0, valorString.length - 2)) + 20) + 'px'; 
    }
    else if (seta == 'esquerda')
    {
        valorString = nodeCobra.style.left; 
        nodeCobra.style.left = (parseInt(valorString.substring(0, valorString.length - 2)) - 20) + 'px'; 
    }
}

//Captura a tecla e troca a direção da cobra
function alocaTecla()
{
    if(event.keyCode == '119')
    {
        if (!(movimentos[auxMovimentos-1] == 'baixo' && tamanhoCobra > 2)) { seta = 'cima'; }
    } 
    else if (event.keyCode == '100')
    {
        if (!(movimentos[auxMovimentos-1] == 'esquerda' && tamanhoCobra > 2)) { seta = 'direita'; }
    }
    else if (event.keyCode == '97')
    {
        if (!(movimentos[auxMovimentos-1] == 'direita' && tamanhoCobra > 2)) { seta = 'esquerda'; }
    }
    else if (event.keyCode == '115')
    {
        if (!(movimentos[auxMovimentos-1] == 'cima' && tamanhoCobra > 2)) { seta = 'baixo'; }
    }
}

//Cria um delay para a execução da operação para cada bloco
function gatilhoMovimento()
{
    movimentos[auxMovimentos] = seta;
    for(var i=0; i!= tamanhoCobra; i++)
    {
        movimento(i, movimentos[auxMovimentos-i]);
    }
    auxMovimentos++;
}

//gera um numero aleatório 
function getRandom(min, max) 
{
    var num = Math.floor(Math.random() * max + min); 
    return (num - (num % 20)) + "px";
}

//gera a maça recebendo os parametros x e y
function geraMaca(x, y)
{
    $("#principal").append("<div id='M-" + tamanhoMaca + "' ></div>");

    $("#M-" + tamanhoMaca).css(
        {
            top: x,
            left: y,
        }
    ).attr("class", "maca")
    .text("M");

    tamanhoMaca++;
}

//Verifica se comeu uma maça
function comeuMaca()
{
    var cabecaCobra = document.querySelector('#principal #C-0');
    var maca = document.querySelector('#principal #M-' + (tamanhoMaca - 1));

    if(maca.style.top == cabecaCobra.style.top && maca.style.left == cabecaCobra.style.left)
    {
        geraCobra(); 
        maca.remove();
        aumentaVelocidadeCobra();  
        atualizaPlacar(); 
        verificaGeraMaça();               
    }
}

//A maça não pode nascer dentro da cobra
function verificaGeraMaça()
{
    var xM = getRandom(0,780);
    var yM = getRandom(0,780);
    for(var i=0; i!=tamanhoCobra; i++)
    {
        nodeCobra = document.querySelector('#principal #C-' + i);
        if(xM == nodeCobra.style.top && yM == nodeCobra.style.left)
        {
            verificaGeraMaça();
            return;
        }
    }     

    geraMaca(xM, yM);
}

function verificaBateuParede()
{
    var cabecaCobra = document.querySelector('#principal #C-0');

    //Como eu adiciono um padding no css, eu tive que descontar ele daqui tbm
    if(cabecaCobra.style.top== (-20+"px") || cabecaCobra.style.top==(800+"px") || cabecaCobra.style.left==(-20+"px") || cabecaCobra.style.left==(800+"px"))
    {
        finalizarJogo();
    }
}

function verificaBateuEmSi()
{
    var cabecaCobra = document.querySelector('#principal #C-0');
    for(var i=1; i!=tamanhoCobra; i++)
    {
        nodeCobra = document.querySelector('#principal #C-' + i);
        if(cabecaCobra.style.top == nodeCobra.style.top && cabecaCobra.style.left == nodeCobra.style.left)
        {
            finalizarJogo();
        }
    }
}

//Aumenta a velocidade da cobra
function aumentaVelocidadeCobra()
{
    if(velocidadeGame > 100)
    {
        atualizaVelocidadeAnimacao();            

        velocidadeGame-=7;
        setaFrame();
    }
}

function atualizaVelocidadeAnimacao()
{
    if(velocidadeGame == 158)
    {
        $("#principal div[class='velocidade2']").attr("class", "velocidade15");
    }
    else if (velocidadeGame == 109)
    {
        $("#principal div[class='velocidade15']").attr("class", "velocidade1");
    }
}

function finalizarJogo()
{
    clearInterval(frameTempoJogo);
    clearInterval(frame);
}

function setaRado()
{
    if(tamanhoCobra >= 2)
    {
        $("#C-" + tamanhoCobra).text("*").css("background", "rgb(255, 56, 56)");
        $("#C-" + (tamanhoCobra-1)).text("o").css("background", "white");
    }
}

//atualiza a função de frame do game
function setaFrame()
{
    clearInterval(frame);
    frame = setInterval(function() 
    {
        gatilhoMovimento(); 
        comeuMaca(); 
        verificaBateuParede();
        verificaBateuEmSi();
    }, velocidadeGame);
}

//Código começa aqui
var seta = 'direita';
var tamanhoCobra = 0;
var tamanhoMaca = 0;
var movimentos = [];
var auxMovimentos = 0;
var velocidadeGame = 200;

//Gera Cabeça
geraCobra();

//Gera Primeira maça
geraMaca(getRandom(0,780),getRandom(0,780));                

//Ativa as teclas WASD
document.body.onkeypress = alocaTecla;

//Executa o frame do jogo
var frame;
setaFrame();

//Executa a cada 1S o tempo jogado
var frameTempoJogo = setInterval(function() 
{
    tempoJogado++;
    atualizaTempoJogado();
}, 1000);