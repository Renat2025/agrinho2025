if (role === "menu") {
  card.innerHTML = `
    <h2 class="title">🌿 Produtos Disponíveis</h2>
    <div class="image-gallery" style="display: flex; gap: 10px; margin-bottom: 20px;">
      <img src="https://source.unsplash.com/100x100/?farm" alt="Imagem 1" style="width: 100px; height: 100px; object-fit: cover; border-radius: 8px;" />
      <img src="https://source.unsplash.com/100x100/?vegetables" alt="Imagem 2" style="width: 100px; height: 100px; object-fit: cover; border-radius: 8px;" />
      <img src="https://source.unsplash.com/100x100/?fruit" alt="Imagem 3" style="width: 100px; height: 100px; object-fit: cover; border-radius: 8px;" />
      <img src="https://source.unsplash.com/100x100/?market" alt="Imagem 4" style="width: 100px; height: 100px; object-fit: cover; border-radius: 8px;" />
    </div>
  `;

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
