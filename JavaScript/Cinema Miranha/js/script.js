//Obter os elementos da página
const frm = document.querySelector("form");
const dvPalco = document.querySelector("#divPalco");

//Constante para definir o número de poltronas
const POLTRONAS = 240;

//Vetor com as poltronas reservadas pelo cliente
const reservadas = [];

window.addEventListener("load", () => {
    //Operador ternário
    //Se houver dados salvos em localstorage, faz um split(";") e atribui esses dados ao array, caso contrario, inicializamos o array
    const ocupadas = localStorage.getItem("teatroOcupadas")
    ? localStorage.getItem("teatroOcupadas").split(";")
    : [];

    //Montar o número total de poltronas (definidas pela constante)
    for (let i = 1; i <= POLTRONAS; i++){
        const figure = document.createElement("figure"); //Cria a tag figure
        const imgStatus = document.createElement("img"); //Cria a tag img

        //Se a posição estiver ocupada, exibe a imagem ocupada, caso contrario mostra a imagem disponivel
        imgStatus.src = ocupadas.includes(i.toString())
        ? "img/ocupada.jpg"
        : "img/disponivel.jpg";
        imgStatus.className = "poltrona"; //Classe com a dimensão da imagem

        const figureCap = document.createElement("figcaption"); //Cria figcaption

        //Quantidade de zeros antes do número da poltrona
        const zeros = i < 10 ? "00" : i < 100 ? "0" : "";

        const num = document.createTextNode(`[${zeros}${i}]`); //Cria o texto

        //Define os pais de cada tag
        figureCap.appendChild(num);
        figure.appendChild(imgStatus);
        figure.appendChild(figureCap);

        //Se i módulo 24 == 12 (é o corredor: desfile margem direita 60px)
        if (i % 24 == 12) figure.style.marginRight = "60px"

        dvPalco.appendChild(figure); //Indica que a figura é filha de divPalco

        //Se i módulo 24 == 0: o código apos o && será executado (inserindo quebra de linha)
        (i % 24 == 0) && dvPalco.appendChild(document.createElement("br"));
    }
})


frm.addEventListener("submit", (e) => {
    e.preventDefault();

    //Obtem o Conteúdo do Input
    const poltrona = Number(frm.inPoltrona.value);

    //Válida o Preenchimento de Entrada
    if(poltrona > POLTRONAS){
        alert("Informe um Número de Poltronas Válido");
        frm.inPoltrona.focus();
        return;
    }


    const ocupadas = localStorage.getItem("teatroOcupadas")
    ? localStorage.getItem("teatroOcupadas").split(";")
    : [];

    //Validar Se a Poltrona Ja estiver Ocupada
    if (reservadas.includes(poltrona)){
        alert(`Poltrona ${poltrona} ja esta reservada...`);
        frm.inPoltrona.value = "";
        frm.inPoltrona.focus();
        return;
    }

    //Validar Se a Poltrona Ja estiver Ocupada
    if (ocupadas.includes(poltrona.toString())){
        alert(`Poltrona ${poltrona} ja esta ocupada...`);
        frm.inPoltrona.value = "";
        frm.inPoltrona.focus();
        return;
    }

    //Capturar a Imagem da Poltrona, Filha da dvPalco
    const imgPoltrona = dvPalco.querySelectorAll("img")[poltrona -1];

    //Modifica o Atributo do Img
    imgPoltrona.src = "img/reservada.jpg";

    //Adiciona a Poltrona ao Valor
    reservadas.push(poltrona);

    frm.inPoltrona.value = "";
    frm.inPoltrona.focus(); 
})