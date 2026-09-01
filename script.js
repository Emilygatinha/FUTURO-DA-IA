const caixaPrincipal = document.querySelector(".caixa-principal");
const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const caixaResultado = document.querySelector(".caixa-resultado");
const textoResultado = document.querySelector(".texto-resultado");

const perguntas = [
    {
        enunciado: "Atualmente o hábito de leitura não é comum entre os jovens, a leitura é algo importânte para a formação desses jovens?",
        alternativas: [
            {
                texto: "Sim, já que, além de inumeros livros servirem de base para vestibulares, eles podem trazer conhecimentos de assuntos diversos e expandir o vacabulario do leitor",
                afirmacao: "Os livros ainda são de uma grande importância para os estudos e para a formação da etica e moral da população, sendo sem dúvidas um grande alicerce da sociedade."
            },
            {
                texto: "A leitura é indiferente, já que, atualmente não são necessarios livros para os estudos ou enterterimento, já que, atualmente não são necessarios livros para estudos levando em conta que hoje é possível encomtrar ambos nas redes sociais",
                afirmacao: "Apesar do grande acesso a informaçõese conteúdos que as redes sociais nos proporcionam, os livros não deixam de ser essenciais na sociedade seja para estudos ou para obter conhecimento."
            }
        ]
    },
    {
        enunciado: "Algumas pessoas tem muita dificuldade para começarem no mundo da leitura, dito isso qual seria a maneira mais recomendada para se começar a ler?",
        alternativas: [
            {
                texto: "Ler livros pequenos, de facíl entendimento e que sejam de assuntos de interesse do leitor.",
                afirmacao: "Para quem não  tem o hábito de ler, porém tem vontadede iniciar no mundo da leitura o mais indicado seria ler livros pequenos e de assuntos que sejam de interesse do leitor para despertar o interesse da leitura e tornar a mesma um habito."
            },
            {
                texto: "Ler livros didáticos e de autores conhecidos.",
                afirmacao: "Para quem tem interessede começar na leitura não seria ideal começar diretamente pelos clássicos já que a leitura dos mesmos pode ser mais dificil dificultando assim a criação do habito da leitura."
            }
        ]
    },
    {
        enunciado: "Atualmente vemos um grande aumentos nos valores dos livros físicos, oque dificulta a aquisição dos mesmos, a leitura digital vem se popularizou entre os leitores nos ultimos anos em parte pelos preços mais acessiveis, então seria ela uma alternativa viavel aos livros físicos?",
        alternativas: [
            {
                texto: "Provavelmente, já que iria possibilitar uma maior aquisição por parte da população.",
                afirmacao: "Já para quem não  tem condições de adquirir livros físicos os livros online são uma otima opção, pois permite a aquisição dos mesmos por um preço muito menor ou até mesmo gratuitamente, o que sem duvidas pode abrir grandes portas para esses leitores."
            },
            {
                texto: "Não teria grande importância já que grande parte da população continuaria adquirindo livros físicos apesar dos preços.",
                afirmacao: "Apesar do consumo de livros físicos ainda ser maioria os livros oline permitem que pessoas que não podem adquirir livros físicos tenham acesso a leitura, podendo gerar grandes oportunidades para esses leitores."
            }
        ]
    },
];


let atual = 0;
let perguntaAtual;
let historiaFinal = "";

function mostraPergunta() {
    if (atual >= perguntas.length) {
        mostraResultado();
        return;
    }
    perguntaAtual = perguntas[atual];
    caixaPerguntas.textContent = perguntaAtual.enunciado;
    caixaAlternativas.textContent = "";
    mostraAlternativas();
}

function mostraAlternativas(){
    for(const alternativa of perguntaAtual.alternativas) {
        const botaoAlternativas = document.createElement("button");
        botaoAlternativas.textContent = alternativa.texto;
        botaoAlternativas.addEventListener("click", () => respostaSelecionada(alternativa));
        caixaAlternativas.appendChild(botaoAlternativas);
    }
}

function respostaSelecionada(opcaoSelecionada) {
    const afirmacoes = opcaoSelecionada.afirmacao;
    historiaFinal += afirmacoes + " ";
    atual++;
    mostraPergunta();
}

function mostraResultado() {
    caixaPerguntas.textContent = "Sobre a leitura...";
    textoResultado.textContent = historiaFinal;
    caixaAlternativas.textContent = "";
}

mostraPergunta();
