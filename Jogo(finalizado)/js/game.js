    //Gera a cobra
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
            var valorNum;
            var texto = document.createTextNode("o");

            //Eu uso a var movimentos para pegar a onde 
            //a ultima posição está apontando e não a primeira posição está apontando
            //A primeira pode ta apontando pra cima, e a ultima pra esqueda,
            //assim, o bloco deve ser criado a direita e não para baixo.
            if (movimentos[auxMovimentos-tamanhoCobra] == 'cima')
            {
                valorString = nodeRabo.style.top;
                valorNum = parseInt(valorString.substring(0, valorString.length - 2));
                valorNum += 20;
                node.style.top = valorNum + 'px'; 

                node.style.left = nodeRabo.style.left;
            }
            else if (movimentos[auxMovimentos-tamanhoCobra] == 'direita')
            {
                valorString = nodeRabo.style.left;
                valorNum = parseInt(valorString.substring(0, valorString.length - 2));
                valorNum -= 20;
                node.style.left = valorNum + 'px'; 

                node.style.top = nodeRabo.style.top; 
            }
            else if (movimentos[auxMovimentos-tamanhoCobra] == 'baixo')
            {
                valorString = nodeRabo.style.top;
                valorNum = parseInt(valorString.substring(0, valorString.length - 2));
                valorNum -= 20;
                node.style.top = valorNum + 'px'; 

                node.style.left = nodeRabo.style.left;
            }
            else if (movimentos[auxMovimentos-tamanhoCobra] == 'esquerda')
            {
                valorString = nodeRabo.style.left;
                valorNum = parseInt(valorString.substring(0, valorString.length - 2));
                valorNum += 20;
                node.style.left = valorNum + 'px'; 

                node.style.top = nodeRabo.style.top;             
            }         
        }
        else
        {
            node.style.top = '100px'; 
            node.style.left = '100px'; 
            var texto = document.createTextNode('#');
        }

        node.appendChild(texto);

        //seta o css
        node.style.background = tamanhoCobra == 0 ? 'rgb(105, 43, 43)' : 'white';
        node.style.width = '20px';
        node.style.height = '20px';
        node.style.textAlign = 'center';
        node.style.position= 'absolute';    

        if(velocidadeGame > 158)
        {
            node.className = "velocidade2";
            
        }
        else if (velocidadeGame >= 109)
        {

            node.className = "velocidade15";      
        }
        else if (velocidadeGame < 109)  
        {
            node.className = "velocidade1";      
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
        var valorNum;

        if (seta == 'cima')
        {
            valorString = nodeCobra.style.top;
            valorNum = parseInt(valorString.substring(0, valorString.length - 2));
            valorNum -= 20;
            nodeCobra.style.top = valorNum + 'px'; 
        }
        else if (seta == 'direita')
        {
            valorString = nodeCobra.style.left;
            valorNum = parseInt(valorString.substring(0, valorString.length - 2));
            valorNum = valorNum + 20;
            nodeCobra.style.left = valorNum + 'px'; 
        }
        else if (seta == 'baixo')
        {
            valorString = nodeCobra.style.top;
            valorNum = parseInt(valorString.substring(0, valorString.length - 2));
            valorNum += 20;
            nodeCobra.style.top = valorNum + 'px'; 
        }
        else if (seta == 'esquerda')
        {
            valorString = nodeCobra.style.left;
            valorNum = parseInt(valorString.substring(0, valorString.length - 2));
            valorNum -= 20;
            nodeCobra.style.left = valorNum + 'px'; 
        }
    }

    //Captura a tecla e troca a direção da cobra
    function alocaTecla()
    {
        if(event.keyCode == '119')
        {
            if (!(movimentos[auxMovimentos-1] == 'baixo' && tamanhoCobra > 2))
            {
                seta ='cima';   
            }
        } 
        else if (event.keyCode == '100')
        {
            if (!(movimentos[auxMovimentos-1] == 'esquerda' && tamanhoCobra > 2))
            {
                seta = 'direita';
            }
        }
        else if (event.keyCode == '97')
        {
            if (!(movimentos[auxMovimentos-1] == 'direita' && tamanhoCobra > 2))
            {
                seta = 'esquerda';
            }
        }
        else if (event.keyCode == '115')
        {
            if (!(movimentos[auxMovimentos-1] == 'cima' && tamanhoCobra > 2))
            {
                seta = 'baixo';
            }
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
        //Preciso que os numeros gerados seja divisiveis por 20
        while(true)
        {
            if(num % 20 == 0)
            {
                break;
            }
            num++;
        }    
        return num + "px";
    }

    //gera a maça recebendo os parametros x e y
    function geraMaca(x, y)
    {
        var elemento_pai = document.querySelector('#principal');
        var texto = document.createTextNode('M');
        var node = document.createElement('div');

        node.appendChild(texto);
        node.id = 'M-' + tamanhoMaca;

        //seta o css
        node.style.top = x; 
        node.style.left = y; 
        node.style.background = 'green';
        node.style.width = '20px';
        node.style.height = '20px';
        node.style.textAlign = 'center';
        node.style.position= 'absolute';        

        //joga o pedaço novo da cobra na tela
        elemento_pai.appendChild(node);
        tamanhoMaca++;
    }

    //Verifica se comeu uma maça
    function comeuMaca()
    {
        var cabecaCobra = document.querySelector('#principal #C-0');
        var maca;
        for(var i=0; i!=tamanhoMaca; i++)
        {
            maca = document.querySelector('#principal #M-' + i);
            //O for continua percorrendo o id das maças que ja foram comidas
            //Por isso eu fiz esse tratamento
            if (maca)
            {
                if(maca.style.top == cabecaCobra.style.top && maca.style.left == cabecaCobra.style.left)
                {
                    geraCobra(); 
                    maca.remove();
                    aumentaVelocidadeCobra();  
                    atualizaPlacar(); 
                    verificaGeraMaça();               
                }
            }
        }
    }

    //A maça não pode nascer dentro da cobra
    function verificaGeraMaça()
    {
        var xM = getRandom(0,780);
        var yM = getRandom(0,780);
        var achou = false;
        for(var i=0; i!=tamanhoCobra; i++)
        {
            nodeCobra = document.querySelector('#principal #C-' + i);
            if(xM == nodeCobra.style.top && yM == nodeCobra.style.left)
            {
                console.log("Encontrou inconsistencia");
                verificaGeraMaça();
                return;
            }
        }
        

        geraMaca(xM, yM);
        return;
    }

    function verificaBateuParede()
    {
        var cabecaCobra = document.querySelector('#principal #C-0');

        //console.log(cabecaCobraTopTemp + " " )
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
    function aumentaVelocidadeCobra() //transition-duration
    {
        if(velocidadeGame > 100)
        {

            if(velocidadeGame == 158)
            {
                for(var i=0; i!=tamanhoCobra; i++)
                {
                    nodeCobra = document.querySelector('#principal #C-' + i);
                    nodeCobra.className = 'velocidade15';
                }
            }
            else if (velocidadeGame == 109)
            {
                for(var i=0; i!=tamanhoCobra; i++)
                {
                    nodeCobra = document.querySelector('#principal #C-' + i);
                    nodeCobra.className = 'velocidade1';
                }
            }

            velocidadeGame-=7;
            clearInterval(frame);
            frame = setInterval(function() 
            {
                gatilhoMovimento(); 
                comeuMaca(); 
                verificaBateuParede();
                verificaBateuEmSi();
            }, velocidadeGame);
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
            var nodeCobra = document.querySelector('#principal #C-' + tamanhoCobra);

            nodeCobra.innerHTML = "*";
            nodeCobra.style.background = "rgb(255, 56, 56)";

            nodeCobra = document.querySelector('#principal #C-' + (tamanhoCobra-1));
            nodeCobra.innerHTML = "o";
            nodeCobra.style.background = "white";

        }
    }


    //Código começa aqui
    var seta = 'esquerda';
    var tamanhoCobra = 0;
    var tamanhoMaca = 0;
    var movimentos = [];
    var auxMovimentos = 0;
    var velocidadeGame = 200;

    //Cabeça
    geraCobra();

    //Primeira maça
    geraMaca(getRandom(0,780),getRandom(0,780));                

    //Ativa as teclas WASD
    document.body.onkeypress = alocaTecla;

    //Executa o frame do jogo
    var frame = setInterval(function() 
    {
        gatilhoMovimento(); 
        comeuMaca(); 
        verificaBateuParede();
        verificaBateuEmSi();
    }, velocidadeGame);

    //Executa a cada 1S o tempo jogado
    var frameTempoJogo = setInterval(function() 
    {
        tempoJogado++;
        atualizaTempoJogado();
    }, 1000);