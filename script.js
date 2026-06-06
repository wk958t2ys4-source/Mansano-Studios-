// 📋 CADASTRO DE CLIENTES E SENHAS
const albuns = {
    "joao123": { // senha do cliente
        nome: "João",
        fotos: [
            "albuns/joao/foto1.jpg",
            "albuns/joao/foto2.jpg",
            "albuns/joao/foto3.jpg"
        ]
    }
    // Para adicionar mais clientes, copie o modelo acima:
    // "senha_aqui": { nome: "Nome do Cliente", fotos: ["caminho/da/foto.jpg", ...] }
};

// Função para verificar a senha
function verificarSenha() {
    const senhaDigitada = document.getElementById("senhaAcesso").value.trim();
    const aviso = document.getElementById("aviso");
    const albumArea = document.getElementById("album");
    const grade = document.getElementById("gradeFotos");

    if (albuns[senhaDigitada]) {
        aviso.textContent = "";
        albumArea.style.display = "block";
        grade.innerHTML = "";

        // Carrega as fotos do cliente
        albuns[senhaDigitada].fotos.forEach((caminho, indice) => {
            const divFoto = document.createElement("div");
            divFoto.className = "foto-item";
            divFoto.dataset.caminho = caminho;
            divFoto.onclick = () => divFoto.classList.toggle("selecionada");

            const imagem = document.createElement("img");
            imagem.src = caminho;
            imagem.alt = `Foto ${indice + 1}`;

            divFoto.appendChild(imagem);
            grade.appendChild(divFoto);
        });

        albumArea.scrollIntoView({ behavior: "smooth" });
    } else {
        aviso.textContent = "Senha incorreta! Verifique e tente novamente.";
    }
}

// Função para enviar a escolha das fotos
function enviarSelecao() {
    const escolhidas = document.querySelectorAll(".foto-item.selecionada");
    const listaCaminhos = Array.from(escolhidas).map(item => item.dataset.caminho);

    if (listaCaminhos.length === 0) {
        document.getElementById("confirmacao").textContent = "Selecione pelo menos uma foto!";
        document.getElementById("confirmacao").style.color = "#d63031";
        return;
    }

    // Mensagem com as fotos escolhidas (aparece no console do navegador)
    const mensagem = `Cliente escolheu essas fotos:\n${listaCaminhos.join("\n")}`;
    console.log(mensagem);

    document.getElementById("confirmacao").textContent = 
        `Escolha enviada! Você selecionou ${listaCaminhos.length} foto(s). Em breve envio as versões editadas.`;
    document.getElementById("confirmacao").style.color = "#27ae60";
}