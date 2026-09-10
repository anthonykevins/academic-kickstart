+++
# Sélection de publications récentes, affichée sur la page d’accueil.
# Voir la note dans featured_publications.md : ce bloc utilise le widget
# `blank`, pas le widget `featured` du thème.
#
# Mise en page : une carte par article (vignette à gauche, référence à
# droite), empilées, plutôt qu’un carrousel. Les vignettes sont la figure 1
# de chaque article (static/img/publications/*_fig1.webp).

widget = "blank"
headless = true
active = true
weight = 23

title = "Sélection de publications"
subtitle = ""

[design]
  # Pleine largeur, comme la section « Impact & engagement » ci-dessous.
  columns = "1"

[design.spacing]
  padding = ["40px", "0", "40px", "0"]
+++

<div class="pub-cards">
  <div class="card pub-card">
    <a class="pub-card-media" href="https://onlinelibrary.wiley.com/doi/epdf/10.1111/pops.70164">
      <img src="/img/publications/sortition_fig1.webp" width="500" height="333" alt="Figure 1 de l’article : diagrammes en barres montrant la distribution des réponses pour cinq mesures de légitimité." loading="lazy" decoding="async">
    </a>
    <div class="card-text pub-card-body">
      <h3><a href="https://onlinelibrary.wiley.com/doi/epdf/10.1111/pops.70164">Is sortition the ideal? Examining public reactions to climate assemblies</a></h3>
      <p class="pub-card-meta">Anthony Kevins et Joshua Robison. (OnlineFirst) <em>Political Psychology</em>.</p>
    </div>
  </div>
  <div class="card pub-card">
    <a class="pub-card-media" href="https://www.tandfonline.com/doi/epdf/10.1080/01402382.2025.2548167?needAccess=true">
      <img src="/img/publications/projection_fig1.webp" width="500" height="333" alt="Figure 1 de l’article : exemple d’item d’enquête décrivant une personne et demandant de la situer sur une échelle gauche-droite." loading="lazy" decoding="async">
    </a>
    <div class="card-text pub-card-body">
      <h3><a href="https://www.tandfonline.com/doi/epdf/10.1080/01402382.2025.2548167?needAccess=true">How we think about the political stances of others: evidence on projection from Canada, Germany, and the UK</a></h3>
      <p class="pub-card-meta">Seonghui Lee et Anthony Kevins. (OnlineFirst) <em>West European Politics</em>.</p>
    </div>
  </div>
  <div class="card pub-card">
    <a class="pub-card-media" href="https://journals.sagepub.com/doi/epub/10.1177/09589287251356978">
      <img src="/img/publications/carers_fig1.webp" width="500" height="333" alt="Figure 1 de l’article : diagramme en quadrants des facteurs de stress et des facteurs protecteurs liés au bien-être psychologique." loading="lazy" decoding="async">
    </a>
    <div class="card-text pub-card-body">
      <h3><a href="https://journals.sagepub.com/doi/epub/10.1177/09589287251356978">When Caring Comes at a Cost: Psychological Wellbeing of Unpaid and Paid Carers and the Role of Social Expenditure</a></h3>
      <p class="pub-card-meta">Naomi Lightman et Anthony Kevins. (OnlineFirst) <em>Journal of European Social Policy</em>.</p>
    </div>
  </div>
</div>

<p class="pub-cards-more"><a href="/fr/publications/">Voir toutes les publications</a></p>
