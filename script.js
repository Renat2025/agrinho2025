(() => {
  // Estado
  let role = "";
  let email = "";
  let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
  let form = { nome: "", cidade: "", produto: "", valor: "", contato: "" };
  let filtro = { cidade: "", produto: "" };

  // Elemento raiz
  const app = document.getElementById("app");

  // Funções auxiliares
  function saveProdutos() {
    localStorage.setItem("produtos", JSON.stringify(produtos));
  }

  function filtrarProdutos() {
    return produtos.filter(
      (p) =>
        p.cidade.toLowerCase().includes(filtro.cidade.toLowerCase()) &&
        p.produto.toLowerCase().includes(filtro.produto.toLowerCase())
    );
  }

  // Renderiza tudo
  function render() {
    app.innerHTML = "";

    // Header
    const header = document.createElement("header");
    header.className = "header";
    header.innerHTML = `
      <h1 class="header-title">🌾 Agrinho 2025</h1>
      <p class="subtitle">Conexão Campo e Cidade</p>
    `;
    app.appendChild(header);

    // Navbar
    const nav = document.createElement("nav");
    nav.className = "navbar";
    const buttons = [
      { label: "🏠 Início", key: "" },
      { label: "📋 Menu", key: "menu" },
      { label: "❓ Ajuda", key: "ajuda" },
      { label: "ℹ️ Sobre", key: "sobre" },
      { label: "🔍 Pesquisar", key: "pesquisar" },
    ];

    buttons.forEach(({ label, key }) => {
      const btn = document.createElement("button");
      btn.className = "nav-btn";
      btn.textContent = label;
      btn.onclick = () => {
        role = key;
        render();
      };
      nav.appendChild(btn);
    });
    app.appendChild(nav);

    // Conteúdo principal
    const card = document.createElement("div");
    card.className = "card";

    // Renderiza cada role
    if (role === "" && !email) {
      card.innerHTML = `
        <h2 class="title">Bem-vindo! Cadastre-se para continuar:</h2>
        <input type="email" placeholder="Digite seu e-mail" class="input" id="input-email" value="${email}" />
        <div class="button-group">
          <button class="btn btn-green" id="btn-agricultor">🧑‍🌾 Sou Agricultor</button>
          <button class="btn btn-yellow" id="btn-consumidor">🛒 Sou Consumidor</button>
        </div>
      `;
      app.appendChild(card);

      // Eventos do cadastro inicial
      document.getElementById("input-email").oninput = (e) => {
        email = e.target.value;
      };
      document.getElementById("btn-agricultor").onclick = () => {
        if (!email.trim()) {
          alert("Digite seu e-mail para continuar!");
          return;
        }
        role = "agricultor";
        render();
      };
      document.getElementById("btn-consumidor").onclick = () => {
        if (!email.trim()) {
          alert("Digite seu e-mail para continuar!");
          return;
        }
        role = "consumidor";
        render();
      };
      return;
    }

    if (role === "agricultor") {
      card.innerHTML = `
        <h2 class="title">Cadastro de Produto</h2>
        <input placeholder="Nome" class="input" id="input-nome" value="${form.nome}" />
        <input placeholder="Cidade" class="input" id="input-cidade" value="${form.cidade}" />
        <input placeholder="Produto" class="input" id="input-produto" value="${form.produto}" />
        <input placeholder="Valor" class="input" id="input-valor" value="${form.valor}" />
        <input placeholder="Contato" class="input" id="input-contato" value="${form.contato}" />
        <button class="btn btn-green" id="btn-cadastrar">Cadastrar Produto</button>
      `;
      app.appendChild(card);

      // Eventos inputs
      ["nome", "cidade", "produto", "valor", "contato"].forEach((field) => {
        document.getElementById(`input-${field}`).oninput = (e) => {
          form[field] = e.target.value;
        };
      });

      document.getElementById("btn-cadastrar").onclick = () => {
        if (
          form.nome.trim() &&
          form.cidade.trim() &&
          form.produto.trim() &&
          form.valor.trim() &&
          form.contato.trim()
        ) {
          produtos.push({ ...form });
          saveProdutos();
          form = { nome: "", cidade: "", produto: "", valor: "", contato: "" };
          alert("Produto cadastrado com sucesso!");
          role = "menu";
          render();
        } else {
          alert("Preencha todos os campos!");
        }
      };
      return;
    }

    if (role === "consumidor") {
      card.innerHTML = `
        <h2 class="title">Olá, Consumidor!</h2>
        <p>Acesse o menu para ver os produtos disponíveis.</p>
      `;
      app.appendChild(card);
      return;
    }

    if (role === "menu") {
      card.innerHTML = `<h2 class="title">🌿 Produtos Disponíveis</h2>`;
      if (produtos.length > 0) {
        produtos.forEach((p) => {
          const div = document.createElement("div");
          div.className = "produto";
          div.innerHTML = `
            <strong>${p.produto}</strong> - R$ ${p.valor}<br />
            <small>
              <strong>Produtor:</strong> ${p.nome}<br />
              <strong>Cidade:</strong> ${p.cidade}<br />
              <strong>Contato:</strong> ${p.contato}
            </small>
          `;
          card.appendChild(div);
        });
      } else {
        const emptyMsg = document.createElement("p");
        emptyMsg.className = "empty-message";
        emptyMsg.textContent = "Nenhum produto cadastrado.";
        card.appendChild(emptyMsg);
      }
      app.appendChild(card);
      return;
    }

    if (role === "pesquisar") {
      card.innerHTML = `
        <h2 class="title">🔍 Pesquisar Produtos</h2>
        <div class="filter-group">
          <input placeholder="Filtrar por cidade..." class="input" id="filter-cidade" value="${filtro.cidade}" />
          <input placeholder="Filtrar por produto..." class="input" id="filter-produto" value="${filtro.produto}" />
        </div>
      `;
      app.appendChild(card);

      // Eventos dos filtros
      document.getElementById("filter-cidade").oninput = (e) => {
        filtro.cidade = e.target.value;
        render();
      };
      document.getElementById("filter-produto").oninput = (e) => {
        filtro.produto = e.target.value;
        render();
      };

      const lista = filtrarProdutos();
      if (lista.length > 0) {
        lista.forEach((p) => {
          const div = document.createElement("div");
          div.className = "produto";
          div.innerHTML = `
            <strong>${p.produto}</strong> - R$ ${p.valor}<br />
            <small>
              <strong>Produtor:</strong> ${p.nome}<br />
              <strong>Cidade:</strong> ${p.cidade}<br />
              <strong>Contato:</strong> ${p.contato}
            </small>
          `;
          card.appendChild(div);
        });
      } else {
        const emptyMsg = document.createElement("p");
        emptyMsg.className = "empty-message";
        emptyMsg.textContent = "Nenhum produto encontrado.";
        card.appendChild(emptyMsg);
      }
      return;
    }

    if (role === "ajuda") {
      card.innerHTML = `
        <h2 class="title">Ajuda</h2>
        <p>Se você for agricultor, clique em "Sou Agricultor" para cadastrar seus produtos.</p>
        <p>Se for consumidor, clique em "Sou Consumidor" ou vá para o Menu para ver os produtos.</p>
      `;
      app.appendChild(card);
      return;
    }

    if (role === "sobre") {
      card.innerHTML = `
        <h2 class="title">Sobre</h2>
        <p>Este projeto faz parte do Agrinho 2025, com o tema "Conexão Campo e Cidade".</p>
        <p>O objetivo é aproximar os agricultores dos consumidores, promovendo vendas diretas.</p>
      `;
      app.appendChild(card);
      return;
    }
  }

  render();
})();
