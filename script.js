const caixaPrincipal = document.querySelector(".caixa-principal");
const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const caixaResultado = document.querySelector(".caixa-resultado");
const textoResultado = document.querySelector(".texto-resultado");
const btnRecomeco = document.getElementById("btnRecomeco");
const btnInicio = document.getElementById("btnInicio");
const progressoBar = document.getElementById("progressoBar");
const progressoTexto = document.getElementById("progressoTexto");

const perguntas = [
    {
        enunciado: "A Inteligência Artificial está cada vez mais presente em nosso dia a dia. Você acredita que a IA deve ser amplamente utilizada para tomar decisões importantes na sociedade, como em áreas da saúde, justiça e educação?",
        alternativas: [
            {
                texto: "Sim, a IA pode processar grandes volumes de dados e encontrar padrões que humanos não conseguem, o que pode levar a decisões mais precisas e eficientes.",
                afirmacao: "A IA tem o potencial de revolucionar áreas como saúde e educação, oferecendo diagnósticos mais rápidos e personalização do ensino. No entanto, é essencial que haja supervisão humana para evitar vieses e garantir decisões éticas."
            },
            {
                texto: "Não, decisões importantes devem ser tomadas exclusivamente por humanos, pois a IA pode conter vieses e não possui capacidade de compreensão ética e moral.",
                afirmacao: "Embora a IA seja uma ferramenta poderosa, decisões cruciais devem manter o julgamento humano no centro, garantindo que valores como empatia, justiça e responsabilidade sejam preservados."
            }
        ]
    },
    {
        enunciado: "Com o avanço da IA, muitas profissões podem ser automatizadas. Como você acha que a sociedade deve lidar com essa transição?",
        alternativas: [
            {
                texto: "Devemos investir em programas de requalificação profissional e educação continuada para preparar as pessoas para as novas oportunidades criadas pela IA.",
                afirmacao: "A automação de tarefas repetitivas pode libertar os humanos para se concentrarem em atividades criativas e estratégicas. O investimento em educação e requalificação é fundamental para uma transição justa e inclusiva."
            },
            {
                texto: "É necessário criar regulamentações que limitem o uso da IA em certas áreas para proteger os empregos humanos.",
                afirmacao: "A regulamentação do uso da IA pode ajudar a proteger trabalhadores e garantir que a tecnologia seja usada de forma ética, mas deve ser equilibrada para não sufocar a inovação."
            }
        ]
    },
    {
        enunciado: "A IA generativa, como modelos de linguagem e criação de imagens, está se tornando cada vez mais sofisticada. Como você enxerga o futuro da criatividade com essas ferramentas?",
        alternativas: [
            {
                texto: "A IA generativa pode ser uma aliada incrível para artistas e criadores, expandindo os limites da criatividade e permitindo a criação de obras que seriam impossíveis sozinhos.",
                afirmacao: "A IA generativa tem o poder de democratizar a criatividade, permitindo que mais pessoas expressem suas ideias artisticamente, mesmo sem habilidades técnicas avançadas."
            },
            {
                texto: "A criação de conteúdo por IA pode desvalorizar o trabalho humano e gerar uma saturação de conteúdo artificial e sem originalidade.",
                afirmacao: "A IA generativa, se usada de forma ética, pode complementar a criatividade humana, não substituí-la. O valor humano ainda será central, pois a IA não possui vivência, emoções ou contexto cultural genuíno."
            }
        ]
    },
    {
        enunciado: "A IA pode aprender e evoluir com base nos dados que recebe. Como você acredita que devemos garantir que a IA seja desenvolvida de forma ética e inclusiva?",
        alternativas: [
            {
                texto: "É fundamental ter diversidade nas equipes de desenvolvimento de IA e incluir representantes da sociedade nos processos de criação e avaliação.",
                afirmacao: "O desenvolvimento ético da IA requer transparência, diversidade e participação social para garantir que os sistemas reflitam os valores e necessidades de toda a população."
            },
            {
                texto: "As empresas de tecnologia devem ser responsáveis pela ética da IA, com mecanismos de autorregulação e fiscalização interna.",
                afirmacao: "Embora as empresas tenham um papel crucial, a ética da IA é uma responsabilidade compartilhada entre desenvolvedores, usuários e governos, exigindo regulamentações claras e participação ativa da sociedade."
            }
        ]
    },
    {
        enunciado: "Como você imagina o relacionamento entre humanos e IA no futuro?",
        alternativas: [
            {
                texto: "Veremos uma colaboração harmoniosa, onde humanos e IA trabalharão juntos para resolver os grandes desafios da humanidade.",
                afirmacao: "O futuro da IA depende das escolhas que fazemos hoje. Com consciência e responsabilidade, podemos construir um mundo onde humanos e máquinas colaboram para um futuro melhor e mais sustentável."
            },
            {
                texto: "Precisamos ter cautela, pois a IA pode se tornar uma ameaça se não for devidamente controlada e regulamentada.",
                afirmacao: "A inteligência artificial é uma ferramenta extraordinária, mas seu desenvolvimento deve ser guiado por princípios éticos sólidos. A humanidade é a responsável por definir os limites e direções dessa tecnologia."
            }
        ]
    }
];

let atual = 0;
let perguntaAtual;
let historiaFinal = "";
let respostasSelecionadas = [];

// Criar partículas
function criarParticulas() {
    const container = document.getElementById('particulas');
    const numParticulas = 60;
    
    for (let i = 0; i < numParticulas; i++) {
        const particula = document.createElement('div');
        particula.className = 'particula';
        const tamanho = Math.random() * 4 + 2;
        const duracao = Math.random() * 15 + 10;
        const offset = (Math.random() - 0.5) * 200;
        const atraso = Math.random() * 15;
        
        particula.style.cssText = `
            width: ${tamanho}px;
            height: ${tamanho}px;
            left: ${Math.random() * 100}%;
            bottom: -10px;
            --duracao: ${duracao}s;
            --offset: ${offset};
            animation-delay: ${atraso}s;
            background: ${Math.random() > 0.5 ? '#b300ff' : '#d580ff'};
            box-shadow: 0 0 ${tamanho * 3}px ${Math.random() > 0.5 ? '#b300ff' : '#d580ff'};
        `;
        
        container.appendChild(particula);
    }
}

function atualizarProgresso() {
    const total = perguntas.length;
    const progresso = ((atual) / total) * 100;
    progressoBar.style.width = `${Math.min(progresso, 100)}%`;
    progressoTexto.textContent = `${Math.min(atual + 1, total)} / ${total}`;
}

function mostraPergunta() {
    if (atual >= perguntas.length) {
        mostraResultado();
        return;
    }
    perguntaAtual = perguntas[atual];
    caixaPerguntas.textContent = perguntaAtual.enunciado;
    caixaAlternativas.textContent = "";
    caixaResultado.classList.remove("ativo");
    atualizarProgresso();
    mostraAlternativas();
}

function mostraAlternativas() {
    for (const alternativa of perguntaAtual.alternativas) {
        const botaoAlternativas = document.createElement("button");
        botaoAlternativas.textContent = alternativa.texto;
        botaoAlternativas.addEventListener("click", () => respostaSelecionada(alternativa));
        caixaAlternativas.appendChild(botaoAlternativas);
    }
}

function respostaSelecionada(opcaoSelecionada) {
    const afirmacoes = opcaoSelecionada.afirmacao;
    respostasSelecionadas[atual] = opcaoSelecionada;
    historiaFinal += afirmacoes + " ";
    atual++;
    mostraPergunta();
}

function mostraResultado() {
    caixaPerguntas.textContent = "";
    textoResultado.textContent = historiaFinal;
    caixaAlternativas.textContent = "";
    caixaResultado.classList.add("ativo");
    atualizarProgresso();
    // Esconde o progresso quando chega no resultado
    document.querySelector('.progresso-container').style.opacity = '0.3';
}

function recomecar() {
    atual = 0;
    historiaFinal = "";
    respostasSelecionadas = [];
    caixaResultado.classList.remove("ativo");
    document.querySelector('.progresso-container').style.opacity = '1';
    progressoBar.style.width = '0%';
    progressoTexto.textContent = '0 / 5';
    mostraPergunta();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function voltarInicio() {
    atual = 0;
    historiaFinal = "";
    respostasSelecionadas = [];
    caixaResultado.classList.remove("ativo");
    document.querySelector('.progresso-container').style.opacity = '1';
    progressoBar.style.width = '0%';
    progressoTexto.textContent = '0 / 5';
    mostraPergunta();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

btnRecomeco.addEventListener("click", recomecar);
btnInicio.addEventListener("click", voltarInicio);

// Inicializa
criarParticulas();
mostraPergunta();
