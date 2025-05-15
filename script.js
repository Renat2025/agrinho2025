let produtos = [];

function escolher(papel) {
  document.getElementById("escolha").classList.add("hidden");
  if (papel === "agricultor") {
    document.getElementById("form-agricultor").classList.remove("hidden");
  } else {
    document.getElementById("form-consumidor").classList.remove("hidden");
    mostrarProdutos();
  }
}

function cadastrarProduto() {
  const nome = document.getElementById("nome").value;
  const cidade = document.getElementById("cidade").value;
  const produto = document.getElementById("produto").value;
  const valor = document.getElementById("valor").value;
  const contato = document.getElementById("contato").value;

  if (nome && cidade && produto && valor && contato) {
    produtos.push({ nome, cidade, produto, valor, contato });
    alert("Produto cadastrado com sucesso!");
    document.getElementById("form-agricultor").reset();
  } else {
    alert("Preencha todos os campos.");
  }
}

function mostrarProdutos(filtro = "") {
  const lista = document.getElementById("lista-produtos");
  lista.innerHTML = "";

  produtos
    .filter(p => 
      p.cidade.toLowerCase().includes(filtro.toLowerCase()) ||
      p.produto.toLowerCase().includes(filtro.toLowerCase())
    )
    .forEach(p => {
      const div = document.createElement("div");
      div.className = "produto";
      div.innerHTML = `<strong>${p.produto}</strong> - R$ ${p.valor}<br><small>${p.nome}, ${p.cidade} - Contato: ${p.contato}</small>`;
      lista.appendChild(div);
    });
}

function filtrarProdutos() {
  const filtro = document.getElementById("filtro").value;
  mostrarProdutos(filtro);
}
