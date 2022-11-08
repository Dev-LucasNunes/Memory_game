const input = document.querySelector(".login-input")
const button = document.querySelector(".login-button")
const form = document.querySelector(".login-form")

const validateInput = (event) =>{
    if(event.target.value.length > 2){
        button.removeAttribute('disabled');
    }else{
        button.setAttribute('disabled', "");
    }
}

//o set attribute precisa de dois valores o que vc quer colocar e outro, no caso do
//disabled não precisa ai coloca as aspas vazias, mas tem que estudar qeu valores são esses

//posso fazer desse jeito aquio também colocando essas chaves na função
//isso se chama object destructure (estudar isso)
// const validateInput = ({target}) =>{
//     if(target.value.length > 2){
//         button.removeAttribute('disabled');
//     }
// }

//agora vou criar a função para guardar o que a pessoa digitar no formulario no browser local storage
// para isso eu preciso desabilitar o comportamento padrão do brownser de recarregar toda vez
// que der o submit no formulario
const handleSubmit = (event) => {
    event.preventDefault();

    localStorage.setItem("Player", input.value);
    window.location = "game.html";
}
//o input.value serve pra pegar o que esta sendo escrito no input


input.addEventListener('input', validateInput);
form.addEventListener('submit', handleSubmit);