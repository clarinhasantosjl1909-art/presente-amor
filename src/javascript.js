function atualizarContador() {
    const inicio = new Date("2025-05-09T00:00:00");
    const agora = new Date();

    // CALCULO DE MESES COMPLETOS
    let anos = agora.getFullYear() - inicio.getFullYear();
    let meses = agora.getMonth() - inicio.getMonth();
    let totalMeses = anos * 12 + meses;

    // Se ainda não chegou o dia 9 deste mês → não completou mês
    if (agora.getDate() < inicio.getDate()) {
        totalMeses--;
    }

    if (totalMeses < 0) totalMeses = 0;

    // Calcula a data do "último mês completo"
    let dataUltimoMes = new Date(inicio);
    dataUltimoMes.setMonth(inicio.getMonth() + totalMeses);

    // DIFERENÇA entre agora e o último mês completo
    const diferenca = agora - dataUltimoMes;

    const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferenca / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((diferenca / (1000 * 60)) % 60);
    const segundos = Math.floor((diferenca / 1000) % 60);

    document.getElementById("tempo_de_namoro").textContent =
        totalMeses + " meses, " +
        dias + " dias, " +
        horas + "h, " +
        minutos + "m, " +
        segundos + "s";
}

setInterval(atualizarContador, 1000);
atualizarContador();

// Logica do carrossel automatico //
function iniciarCarrossel() {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(document.querySelectorAll('.carousel-slide'));
    const nextButton = document.querySelector('.next');
    const prevButton = document.querySelector('.prev');
    
    if (!track || slides.length === 0) return; // Parar se não houver slides

    let currentSlideIndex = 0;
    const getSlideWidth = () => slides[0].clientWidth; 

    const moveToSlide = (track, currentSlide) => {
        const slideWidth = getSlideWidth();
        const amountToMove = currentSlide * slideWidth;
        track.style.transform = 'translateX(-' + amountToMove + 'px)';
    };

    const autoAdvance = () => {
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;
        moveToSlide(track, currentSlideIndex);
    };

    // Configuração do Intervalo de Tempo (3000 ms = 3 segundos)
    const intervalTime = 3000; 
    let autoPlay = setInterval(autoAdvance, intervalTime);

    // Função para parar e reiniciar o temporizador após interação manual
    const restartInterval = () => {
        clearInterval(autoPlay); 
        autoPlay = setInterval(autoAdvance, intervalTime);
    };

    // Eventos dos Botões (Manual)
    nextButton.addEventListener('click', () => {
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;
        moveToSlide(track, currentSlideIndex);
        restartInterval(); 
    });

    prevButton.addEventListener('click', () => {
        currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length; 
        moveToSlide(track, currentSlideIndex);
        restartInterval(); 
    });

    // Ajusta a posição do slide se a janela for redimensionada
    window.addEventListener('resize', () => {
        moveToSlide(track, currentSlideIndex); 
    });
}

// ------------------------------------------------------------------
// INICIA TUDO QUANDO A PÁGINA CARREGA
// ------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicia o Contador de Tempo e atualiza a cada segundo
    atualizarContador();
    setInterval(atualizarContador, 1000); 

    // 2. Inicia o Carrossel
    iniciarCarrossel();
});

// FUNÇÃO CHUVA DE CORAÇÕES//
function criarCoracao() {
    const coracao = document.createElement('span');
    coracao.innerHTML = '💗'; // Conteúdo do coração
    coracao.classList.add('floating-heart');
    
    // Posição aleatória na largura da tela (0 a 100vw)
    coracao.style.left = Math.random() * 100 + 'vw'; 
    
    // Tamanho aleatório (para criar profundidade)
    coracao.style.fontSize = Math.random() * 20 + 10 + 'px'; 
    
    // Duração de queda aleatória
    coracao.style.animationDuration = Math.random() * 5 + 5 + 's'; 

    document.body.appendChild(coracao);

    // Remove o coração da tela após a animação terminar (limpeza)
    setTimeout(() => {
        coracao.remove();
    }, parseFloat(coracao.style.animationDuration) * 1000);
}

// Chamar a função para criar um novo coração a cada 300 milissegundos
// Altere 300 para um número menor (ex: 150) se quiser mais corações
setInterval(criarCoracao, 300);