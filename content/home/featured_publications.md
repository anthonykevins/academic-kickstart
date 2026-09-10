+++
# Selected recent publications, shown on the homepage.
#
# NOTE: this uses the `blank` widget, not the theme's `featured` widget. That
# one pulls from `content/publication/` page bundles with `featured = true`,
# and this site has none -- its publications are a hand-written list -- so the
# featured widget would render an empty section. Entries below are maintained
# by hand.
#
# Layout: a stacked "media object" card per paper -- thumbnail left, citation
# right -- rather than a carousel, so all three are visible without
# interaction. Thumbnails are Figure 1 of each paper, taken from the
# publisher's web figure and normalised to a common 500x333 canvas
# (static/img/publications/*_fig1.webp).

widget = "blank"
headless = true  # This file represents a page section.
active = true
weight = 23  # Between "About Me" (20) and "Impact & Engagement" (25).

title = "Featured Publications"
subtitle = ""

[design]
  # Full width, like the "Impact & Engagement" section below. The card list
  # itself is capped at 940px in custom.css, for a readable line length.
  columns = "1"

[design.spacing]
  padding = ["40px", "0", "40px", "0"]
+++

<div class="pub-cards">
  <div class="card pub-card">
    <a class="pub-card-media" href="https://onlinelibrary.wiley.com/doi/epdf/10.1111/pops.70164">
      <img src="/img/publications/sortition_fig1.webp" width="500" height="333" alt="Figure 1 from the article: bar charts showing the distribution of responses across five legitimacy measures." loading="lazy" decoding="async">
    </a>
    <div class="card-text pub-card-body">
      <h3><a href="https://onlinelibrary.wiley.com/doi/epdf/10.1111/pops.70164">Is sortition the ideal? Examining public reactions to climate assemblies</a></h3>
      <p class="pub-card-meta">Anthony Kevins and Joshua Robison. (OnlineFirst) <em>Political Psychology</em>.</p>
    </div>
  </div>
  <div class="card pub-card">
    <a class="pub-card-media" href="https://www.tandfonline.com/doi/epdf/10.1080/01402382.2025.2548167?needAccess=true">
      <img src="/img/publications/projection_fig1.webp" width="500" height="333" alt="Figure 1 from the article: an example survey item describing an individual and asking respondents to place them on a left–right scale." loading="lazy" decoding="async">
    </a>
    <div class="card-text pub-card-body">
      <h3><a href="https://www.tandfonline.com/doi/epdf/10.1080/01402382.2025.2548167?needAccess=true">How we think about the political stances of others: evidence on projection from Canada, Germany, and the UK</a></h3>
      <p class="pub-card-meta">Seonghui Lee and Anthony Kevins. (OnlineFirst) <em>West European Politics</em>.</p>
    </div>
  </div>
  <div class="card pub-card">
    <a class="pub-card-media" href="https://journals.sagepub.com/doi/epub/10.1177/09589287251356978">
      <img src="/img/publications/carers_fig1.webp" width="500" height="333" alt="Figure 1 from the article: a two-by-two diagram of care stressors and buffers associated with psychological wellbeing." loading="lazy" decoding="async">
    </a>
    <div class="card-text pub-card-body">
      <h3><a href="https://journals.sagepub.com/doi/epub/10.1177/09589287251356978">When Caring Comes at a Cost: Psychological Wellbeing of Unpaid and Paid Carers and the Role of Social Expenditure</a></h3>
      <p class="pub-card-meta">Naomi Lightman and Anthony Kevins. (OnlineFirst) <em>Journal of European Social Policy</em>.</p>
    </div>
  </div>
</div>

<p class="pub-cards-more"><a href="/publications/">See all publications</a></p>
