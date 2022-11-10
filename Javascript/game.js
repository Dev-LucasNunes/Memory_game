//Precisa criar os elementos pelo script para eles poderem ser aleatorios

//agora vou criar um array com os nomes das cartas, tem que ser igual está na imagem

const spanPlayer = document.querySelector('.player')
const timer = document.querySelector('.Timer')


const grid = document.querySelector('.grid');

const characters = [
    'cody',
    'happy2',
    'chris',
    'k9999',
    'ken2',
    'luong',
    'mira',
    'necalli',
    'terry',
    'ralph',
    'raiden',
    'joker',
]

const createElement = (tag, className) => {
    const element = document.createElement(tag);//atributo tbm cria o elemento tag(div)
    element.className = className; //classname é um dos atributos da função coloca classe no elemento
    return element;//coloca a classe e retorna o elemento
}
//resumindo, é uma função com dois parametros que ja cria o elemento e coloca a classe

let firstCard = "";
let secondCard = "";

const checkEndGame = () => {
    const disabledCard = document.querySelectorAll('.disabled-card');
    if(disabledCard.length === 24){
        setTimeout(() => {
            clearInterval(this.loop);
            alert(`Parabéns ${spanPlayer.innerHTML}, seu tempo foi: ${timer.innerHTML} segundos`);
        }, 1200)

    }
}

const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    if(firstCharacter === secondCharacter){

        setTimeout(() => {
        firstCard.firstChild.classList.add('disabled-card')
        secondCard.firstChild.classList.add('disabled-card')

        firstCard = "";
        secondCard = "";

        checkEndGame()

    }, 1000);






    }else{

        setTimeout(() => {

            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            firstCard = "";
            secondCard = "";

        }, 1000);//errou espera 500 milisegundos e esconde a carta de novo porque senão antes de vc virar a carta ele ja sabe que vc errou e não deixa a carta virar
    }
}

const revealCard = ({target}) => {

    if(target.parentNode.className.includes('reveal-card')){
    return; //isso é só pra prevenir bug, ele olha e ve se a carta tem a classe review card
    }       //se ela tiver é pq ta virada, ai se tiver ela da o return e encerra pra não dar pra
            //clicar de novo e a carta voltar

      //quando clica na carta vai guardar o resultadoi no firstCard
      //se está vazia é pq a pessoa não clicou ainda
    if(firstCard === "") {
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;
    }else if(secondCard === ""){
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;

        checkCards();
    }

}

//função que cria carta
const createCard = (character) => {

    // const card = document.createElement('div'); tem um jeito melhor de fazer usando a função
    // const front = document.createElement('div'); q eu fiz acima
    // const back = document.createElement('div');

    const card = createElement('div', 'card')// assim eu ja faço as duas coisas de uma vez
    const front = createElement('div', 'face front')//já crio o elemento e dou a classe em uma linha só
    const back = createElement('div', 'face back')

    // front.className = 'face front'; //criei os elementos e dei a classe para cada um
    // back.className = 'back front'; ai eeu não preciso criar o elemento e colocar a classe
    //um de cada vez

    card.appendChild(front); //agora eu acrescentei dois filhos(front e back) na div card
    card.appendChild(back);

    front.style.backgroundImage = `url('imagens/${character}.png')`;

    card.addEventListener('click', revealCard);
    card.setAttribute('data-character', character)//atributo para comparar, data é pra criar o att que quiser

    return card;
}

const loadGame = () => {

    const duplicateCharacter = [...characters, ...characters];

    const shuffle = duplicateCharacter.sort(() => Math.random() -0.5);
    //o sort vai embaralhar por padrão em ordem alfabetica o array, ai ele precisa do math
    //random que vai mostrar se o numero é maior ou menor que 0 por isso que usa o -0.5
    //o sort só quer saber se o numero que vai dar é menor ou maior que 0 e o math randon
    // dá um numero entre 0 e 1 por isso usa o -0.5 pra dar resultado negativo

    //for each percorre o array
    shuffle.forEach((character) => {

        const card = createCard(character)
        grid.appendChild(card);
    });
}

const startTimer = () => {

    this.loop = setInterval(() => {

        const currentTimer = +timer.innerHTML;
        timer.innerHTML = currentTimer + 1

    }, 1000)
}

window.onload = () => {

    spanPlayer.innerHTML = localStorage.getItem('Player');

    startTimer()
    loadGame();

}








