// 📋 CADASTRO DE CLIENTES
const albuns = {
    "veronica123": {
        nome: "Veronica",
        fotos: [
            "albuns/Veronica/foto1.JPG",
            "albuns/Veronica/foto2.JPG"
        ]
    }
};

// 🛡️ PROTEÇÃO
document.addEventListener("contextmenu", e => e.preventDefault());
document.addEventListener("keydown", e => {
    if (e.ctrlKey && ["c","s","p","u","i"].includes(e.key.toLowerCase())) e.preventDefault();
    if (e.key === "PrintScreen") e.preventDefault();
});
document.body.style.userSelect = "none";

// 💧 MARCA D'ÁGUA
function adicionarMarcaDagua(img) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    const texto = "Mansano Studios";
    ctx.font = "bold 20px Arial";
    ctx.fillStyle = "rgba(255,255,255,0.35)";
    ctx.shadowColor = "rgba(0,0,0,0.5)";
    ctx.shadowBlur = 2;

    ctx.fillText(texto, 15, 30);
    ctx.fillText(texto, canvas.width - ctx.measureText(texto).width - 15, 30);
    ctx.fillText(texto, 15, canvas.height - 15);
    ctx.fillText(texto, canvas.width - ctx.measureText(texto).width - 15, canvas.height - 15);

    img.src = canvas.toDataURL("image/jpeg", 0.85);
}

// 🔑 VERIFICAR SENHA
function verificarSenha() {
    const senha = document.getElementById("senhaAcesso").value.trim();
    const aviso = document.getElementById("aviso");
    const albumArea = document.getElementById("album");
    const grade = document.getElementById("gradeFotos");

    if (albuns[senha]) {
        aviso.textContent = "";
        albumArea.style.display = "block";
        grade.innerHTML = "";

        albuns[senha].fotos.forEach(caminho => {
            const divFoto = document.createElement("div");
            divFoto.className = "foto-item";
            divFoto.onclick = () => divFoto.classList.toggle("selecionada");

            const img = document.createElement("img");
            img.src = caminho;
            img.draggable = false;
            img.oncontextmenu = e => e.preventDefault();
            img.onload = () => adicionarMarcaDagua(img);

            divFoto.appendChild(img);
            grade.appendChild(divFoto);
        });
    } else {
        aviso.textContent = "Senha incorreta! Tente novamente.";
    }
}

// 📤 ENVIAR SELEÇÃO
function enviarSelecao() {
    const escolhidas = document.querySelectorAll(".foto-item.selecionada");
    if (escolhidas.length === 0) {
        document.getElementById("confirmacao").textContent = "Selecione pelo menos uma foto!";
        document.getElementById("confirmacao").style.color = "#d63031";
        return;
    }
    const lista = Array.from(escolhidas).map(el => el.querySelector("img").src);
    console.log("Cliente escolheu:", lista);
    document.getElementById("confirmacao").textContent = "Escolha enviada com sucesso!";
    document.getElementById("confirmacao").style.color = "#27ae60";
}
