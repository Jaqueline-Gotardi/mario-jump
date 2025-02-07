const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const reiniciarButton = document.getElementById('Reiniciar');

const audiocenario = document.getElementById('audioEsperando');
const audiogameover = new Audio('./audio/gameover.mp3'); // Defina o caminho correto do seu áudio de game over

let loop; // Variável para o loop de verificação do jogo
let jogoAtivo = true; // Flag para verificar se o jogo está ativo


const gameOver = () => {
    if (!jogoAtivo) return; // Previne múltiplos game overs

    jogoAtivo = false; // Desativa o jogo após a colisão

    pipe.style.animation = 'none'; // Interrompe o movimento do pipe
    pipe.style.left = `${pipe.offsetLeft}px`;

    mario.style.animation = 'none'; // Interrompe o movimento do Mario
    mario.style.bottom = `${window.getComputedStyle(mario).bottom}`; // Fixa a posição do Mario

    mario.src = './imagens/mario2.png'; // Altera a imagem do Mario para a de game over
    mario.style.width = '134px';
    mario.style.marginLeft = '-60px';

    audiocenario.pause(); // Pausa a música de fundo
    audiogameover.play(); // Toca a música de game over

    // Exibe o botão de reiniciar
    reiniciarButton.style.display = 'block';

    // Para o loop de colisão
    clearInterval(loop);
};

// Função chamada quando o botão de reiniciar é clicado
const reiniciarJogo = () => {
    // Restaura o estado inicial do jogo
    mario.src = './imagens/mario.gif';
    mario.style.width = '150px';
    mario.style.marginLeft = '0px';
    mario.style.bottom = '0px'; // Garante que o Mario volte ao chão

    pipe.style.animation = 'pipe-animation 2s infinite linear'; // Reinicia o movimento do pipe
    pipe.style.left = ''; // Se refere a posição fixa do pipe

    // Oculta o botão de reiniciar
    reiniciarButton.style.display = 'none';

    // Reinicia o estado do jogo
    jogoAtivo = true;

    //o "currentTime" Reinicia a música de fundo e o game over, não permitindo que a musica retome onde parou, mas sim "reinicia"!
    audiocenario.currentTime = 0;;
    audiocenario.play();
    audiogameover.pause();
    audiogameover.currentTime = 0;

    // Reinicia o loop de verificação de colisão
    iniciarLoop();
};

// Função para iniciar o loop de colisão
const iniciarLoop = () => {
    loop = setInterval(() => {
        const pipePosition = pipe.offsetLeft; // Posição do pipe
        const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', ''); // Posição do Mario

        // Verifica se o Mario colidiu com o pipe
        if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
            gameOver(); // Chama a função de game over
        }
    }, 10);
};


function marioJump() {
    if (!mario.classList.contains('jump')) {
        mario.classList.add('jump'); // Adiciona a classe de pulo

        setTimeout(() => {
            mario.classList.remove('jump'); // Remove a classe após o tempo do pulo
        }, 500); // Ajuste o tempo (500ms) para a duração do pulo
    }
}

// Evento de pulo do Mario
document.addEventListener('keydown', marioJump);

// Evento de reiniciar o jogo
reiniciarButton.addEventListener('click', function(event) {
    event.preventDefaul();
    
});

reiniciarButton.style.display = 'none';

// Inicializa o jogo ao carregar a página
reiniciarJogo();