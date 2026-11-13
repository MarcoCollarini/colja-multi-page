/* Wine catalog with an embedded fallback for direct file:// use. */
(() => {
  "use strict";
  const fallbackWines = [
    {
      id: "vitovska",
      name: "Vitovska",
      category: "Vino bianco",
      filter: "bianchi",
      description:
        "Vitigno autoctono, rustico, capace di sopportare le frustate della Bora, i freddi inverni e la siccità della stagione calda. Produce un vino moderno per la sua finezza ed eleganza e moderatamente alcolico. Rispetta le caratteristiche varietali con profumi fini basati sulla mineralità.",
      notes:
        "Colore: Giallo paglierino",
      price: "Prezzo disponibile su richiesta",
      availability: "Disponibilità da verificare",
      image: "assets/images/vini/bottles_limestone.jpg",
      imageWebp: "assets/images/vini/bottles_limestone.webp",
      position: "34% center",
    },
    {
      id: "malvasia",
      name: "Malvasia",
      category: "Vino bianco",
      filter: "bianchi",
      description:
        "Considerata ormai autoctona, è stata importata secoli fa dalla vicina Istria. Produce un vino mediamente alcolico, fruttato e leggermente aromatico.",
      notes:
        "Malvasia 2017 è stata inserita tra i Vini da non perdere dalla Guida ViniBuoni D’Italia.",
      price: "Prezzo disponibile su richiesta",
      availability: "Disponibilità da verificare",
      image: "assets/images/vini/bottles_limestone.jpg",
      imageWebp: "assets/images/vini/bottles_limestone.webp",
      position: "47% center",
    },
    {
      id: "terrano",
      name: "Terrano",
      category: "Vino rosso",
      filter: "rossi",
      description:
        "Il rosso più rappresentativo del territorio carsico. Vinificato attraverso fermentazione spontanea e affinato più a lungo in barrique usate.",
      notes:
        "Fermentazione spontanea e affinamento in barrique usate sono informazioni documentate; annata e disponibilità sono da confermare.",
      price: "Prezzo disponibile su richiesta",
      availability: "Disponibilità da verificare",
      image: "assets/images/vini/bottles_limestone.jpg",
      imageWebp: "assets/images/vini/bottles_limestone.webp",
      position: "62% center",
    },
    {
      id: "womanvision",
      name: "WOMAN VISION",
      category: "Vino macerato",
      filter: "macerati",
      description:
        "Un vino pensato da una donna per le donne. Un vino dalla forte personalità, come Noris, responsabile dell'azienda Colja, aderente all'associazione Donne Del Vino Friuli Venezia Giulia che ha saputo crearsi con autorevolezza e passione uno spazio nel settore notoriamente maschile. Noris ha scelto una selezione di tre varietà: Vitovska – Malvasia – Sauvignon, che dopo un lungo periodo di affinamento creano un vino molto bilanciato, con sentori di frutta matura, fiori gialli ed erbe aromatiche.",
      notes:
        "Uvaggio storico di Vitovska e Malvasia. Annata e disponibilità sono da confermare con l’azienda.",
      price: "Prezzo disponibile su richiesta",
      availability: "Disponibilità da verificare",
      image: "assets/images/vini/bottles_limestone.jpg",
      imageWebp: "assets/images/vini/bottles_limestone.webp",
      position: "center",
    },
    {
      id: "spumante",
      name: "SPUMANTE BRUT JC",
      category: "Vino bianco",
      filter: "bianchi",
      description:
        "Anche per lo spumante il lavoro inizia in vigna, anticipando in modo mirato la vendemmia in modo da ottenere una acidità con freschezza e poco alcol. Il blend viene scelto a seconda delle annate migliori, Malvasia e Vitovska, oppure Malvasia e Glera, a tutto vantaggio della qualità e delle sensazioni. Per il nostro BRUT utilizziamo un Metodo Charmat di durata medio lunga ed un affinamento di circa un anno in bottiglia, in modo da esaltarne la complessità dei profumi e la freschezza, a tutto vantaggio di un consumo, sia come aperitivo che a tutto pasto. I sentori sono quelli di fiori gialli e frutta matura.",
      notes:
        "",
      price: "Prezzo disponibile su richiesta",
      availability: "Disponibilità da verificare",
      image: "assets/images/vini/bottles_limestone.jpg",
      imageWebp: "assets/images/vini/bottles_limestone.webp",
      position: "78% center",
    },
  ];

  const grid = document.querySelector("#wine-grid");
  const modal = document.querySelector("#wine-modal");
  if (!grid || !modal) return;
  let wines = fallbackWines;
  let activeFilter = "tutti";

  const escape = (value) =>
    String(value).replace(
      /[&<>'"]/g,
      (char) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          "'": "&#39;",
          '"': "&quot;",
        })[char],
    );
  const card = (wine) => `
    <article class="wine-card reveal" id="${escape(wine.id)}" data-category="${escape(wine.filter)}">
      <div class="wine-card__image">
        <picture>
          <source srcset="${escape(wine.imageWebp)}" type="image/webp">
          <img src="${escape(wine.image)}" alt="Composizione editoriale di bottiglie su pietra carsica per ${escape(wine.name)}" loading="lazy" style="object-position:${escape(wine.position || "center")}">
        </picture>
      </div>
      <div class="wine-card__body">
        <span class="wine-card__category">${escape(wine.category)}</span>
        <h3>${escape(wine.name)}</h3>
        <p class="wine-card__availability">${escape(wine.price)}</p>
        <div class="wine-card__actions">
          <button class="btn btn--ghost" type="button" data-wine-id="${escape(wine.id)}">Dettagli</button>
          <a class="btn" href="contatti.html?motivo=vini&vino=${encodeURIComponent(wine.name)}#modulo-contatti">Richiedi informazioni</a>
        </div>
      </div>
    </article>`;

  const render = () => {
    const shown =
      activeFilter === "tutti"
        ? wines
        : wines.filter((wine) => wine.filter === activeFilter);
    grid.innerHTML = shown.map(card).join("");
    grid
      .querySelectorAll("[data-wine-id]")
      .forEach((button) =>
        button.addEventListener("click", () => openWine(button.dataset.wineId)),
      );
    grid
      .querySelectorAll(".reveal")
      .forEach((el, index) =>
        window.setTimeout(
          () => el.classList.add("is-visible"),
          Math.min(index * 80, 320),
        ),
      );
  };

  const openWine = (id) => {
    const wine = wines.find((item) => item.id === id);
    if (!wine) return;
    modal.querySelector("[data-modal-category]").textContent = wine.category;
    modal.querySelector("[data-modal-name]").textContent = wine.name;
    modal.querySelector("[data-modal-description]").textContent =
      wine.description;
    modal.querySelector("[data-modal-notes]").textContent = wine.notes;
    modal.querySelector("[data-modal-price]").textContent = wine.price;
    modal.querySelector("[data-modal-availability]").textContent =
      wine.availability;
    const image = modal.querySelector("[data-modal-image]");
    image.src = wine.image;
    image.alt = `Composizione editoriale per ${wine.name}`;
    image.style.objectPosition = wine.position || "center";
    const request = modal.querySelector("[data-modal-request]");
    request.href = `contatti.html?motivo=vini&vino=${encodeURIComponent(wine.name)}#modulo-contatti`;
    window.BudinDialog.open(modal);
  };

  document.querySelectorAll("[data-wine-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.wineFilter;
      document.querySelectorAll("[data-wine-filter]").forEach((item) => {
        const on = item === button;
        item.classList.toggle("is-active", on);
        item.setAttribute("aria-pressed", on ? "true" : "false");
      });
      render();
    });
  });

  render();
  if (location.protocol !== "file:") {
    fetch("data/wines.json")
      .then((response) => {
        if (!response.ok) throw new Error("Catalogo non disponibile");
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length) {
          wines = data;
          render();
        }
      })
      .catch(() => {
        /* embedded data already rendered */
      });
  }
})();
