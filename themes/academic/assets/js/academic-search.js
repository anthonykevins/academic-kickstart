/*************************************************
 *  Academic
 *  https://github.com/gcushen/hugo-academic
 *
 *  In-built Fuse based search algorithm.
 **************************************************/

/* ---------------------------------------------------------------------------
* Configuration.
* --------------------------------------------------------------------------- */

// Configure Fuse.
let fuseOptions = {
  shouldSort: true,
  includeMatches: true,
  tokenize: true,
  // A threshold of exactly 0.0 requires a mathematically perfect score, but
  // Fuse's scoring always carries a small nonzero location-proximity term
  // even for a true exact substring match -- so with location:0 this could
  // only ever match text sitting right at the very start of a field. Longer
  // fields like `content` (e.g. the full Publications page) never matched
  // at all as a result. 0.1 keeps matching effectively exact/near-exact
  // (confirmed real substring matches like "input" now hit, while a
  // nonsense query like "zzznonexistentqueryxyz" still returns nothing)
  // while no longer requiring the match to be at position 0.
  threshold: 0.1,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 2,
  keys: [
    {name:'title', weight:0.99}, /* 1.0 doesn't work o_O */
    {name:'summary', weight:0.6},
    {name:'authors', weight:0.5},
    {name:'content', weight:0.2},
    {name:'tags', weight:0.5},
    {name:'categories', weight:0.5}
  ]
};

// Configure summary.
let summaryLength = 60;

/* ---------------------------------------------------------------------------
* Functions.
* --------------------------------------------------------------------------- */

// Get query from URI.
function getSearchQuery(name) {
  return decodeURIComponent((location.search.split(name + '=')[1] || '').split('&')[0]).replace(/\+/g, ' ');
}

// Set query in URI without reloading the page.
function updateURL(url) {
  if (history.pushState) {
    window.history.pushState({path:url}, '', url);
  }
}

// Pre-process new search query.
function initSearch(force, fuse) {
  let query = $("#search-query").val();

  // If query deleted, clear results.
  if ( query.length < 1) {
    $('#search-hits').empty();
  }

  // Check for timer event (enter key not pressed) and query less than minimum length required.
  if (!force && query.length < fuseOptions.minMatchCharLength)
    return;

  // Do search.
  $('#search-hits').empty();
  searchAcademic(query, fuse);
  let newURL = window.location.protocol + "//" + window.location.host + window.location.pathname + '?q=' + encodeURIComponent(query) + window.location.hash;
  updateURL(newURL);
}

// Fuse matches raw character substrings with no concept of word boundaries,
// so a query like "test" will match inside "latest" -- tokenize:true only
// splits the query, not the text being searched. Restricting matches to
// word-start boundaries removes that false-positive class while still
// allowing legitimate prefix typing (e.g. "wel" finding "welfare" as the
// user types), since a boundary check anchors on the start of a word, not
// the whole word.
let searchableKeys = ['title', 'summary', 'authors', 'content', 'tags', 'categories'];
function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
function matchesWordBoundary(query, item) {
  let re = new RegExp('\\b' + escapeRegExp(query), 'i');
  return searchableKeys.some(function(key) {
    let value = item[key];
    if (Array.isArray(value)) value = value.join(' ');
    return value && re.test(value);
  });
}

// Perform search.
function searchAcademic(query, fuse) {
  let results = fuse.search(query).filter(function(r) {
    return matchesWordBoundary(query, r.item);
  });
  // console.log({"results": results});

  if (results.length > 0) {
    $('#search-hits').append('<h3 class="mt-0">' + results.length + ' ' + i18n.results + '</h3>');
    parseResults(query, results);
  } else {
    $('#search-hits').append('<div class="search-no-results">' + i18n.no_results + '</div>');
  }
}

// Parse search results.
function parseResults(query, results) {
  $.each( results, function(key, value) {
    let content = value.item.content || "";
    let summary = value.item.summary || "";
    let snippet = "";
    let snippetHighlights = [];

    // Prefer a snippet centered on wherever the query text actually appears
    // in the full content, so results show relevant context rather than
    // always showing the start of the page. (Fuse's own match indices
    // aren't reliable here since `tokenize` matching doesn't map cleanly
    // back to a single substring position.)
    let matchIndex = query ? content.toLowerCase().indexOf(query.toLowerCase()) : -1;
    if (matchIndex > -1) {
      let start = (matchIndex - summaryLength > 0) ? matchIndex - summaryLength : 0;
      let end = (matchIndex + query.length + summaryLength < content.length) ? matchIndex + query.length + summaryLength : content.length;
      snippet = content.substring(start, end);
      snippetHighlights.push(query);
    }

    // If the query wasn't found verbatim in the body content (a fuzzy/
    // tokenized match, or a page with little body text -- e.g. an outreach
    // card that's mostly just a title + external link), fall back to the
    // page's own summary field, then to the start of its content.
    if (snippet.length < 1 && summary.length > 0) {
      snippet = summary;
      if (query) snippetHighlights.push(query);
    }
    if (snippet.length < 1) {
      snippet = content.substring(0, summaryLength*2);
    }

    // Load template.
    var template = $('#search-hit-fuse-template').html();

    // Localize content types.
    let content_key = value.item.section;
    if (content_key in content_type) {
      content_key = content_type[content_key];
    }

    // Format the page date (if any) as a plain year for a quick recency cue.
    let dateLabel = "";
    if (value.item.date) {
      let d = new Date(value.item.date * 1000);
      if (!isNaN(d.getTime()) && d.getFullYear() > 1970) {
        dateLabel = d.getFullYear().toString();
      }
    }

    // Parse template.
    let templateData = {
      key: key,
      title: value.item.title,
      type: content_key,
      date: dateLabel,
      relpermalink: value.item.relpermalink,
      snippet: snippet
    };
    let output = render(template, templateData);
    $('#search-hits').append(output);

    // Highlight search terms in result.
    $.each( snippetHighlights, function(hlKey, hlValue){
      $("#summary-"+key).mark(hlValue);
    });

  });
}

function render(template, data) {
  // Replace placeholders with their values.
  let key, find, re;
  for (key in data) {
    find = '\\{\\{\\s*' + key + '\\s*\\}\\}';  // Expect placeholder in the form `{{x}}`.
    re = new RegExp(find, 'g');
    template = template.replace(re, data[key]);
  }
  return template;
}

/* ---------------------------------------------------------------------------
* Initialize.
* --------------------------------------------------------------------------- */

// If Academic's in-built search is enabled and Fuse loaded, then initialize it.
if (typeof Fuse === 'function') {
// Wait for Fuse to initialize.
  $.getJSON(search_index_filename, function (search_index) {
    let fuse = new Fuse(search_index, fuseOptions);

    // On page load, check for search query in URL.
    if (query = getSearchQuery('q')) {
      $("body").addClass('searching');
      $('.search-results').css({opacity: 0, visibility: "visible"}).animate({opacity: 1},200);
      $("#search-query").val(query);
      $("#search-query").focus();
      initSearch(true, fuse);
    }

    // On search box key up, process query.
    $('#search-query').keyup(function (e) {
      clearTimeout($.data(this, 'searchTimer')); // Ensure only one timer runs!
      if (e.keyCode == 13) {
        initSearch(true, fuse);
      } else {
        $(this).data('searchTimer', setTimeout(function () {
          initSearch(false, fuse);
        }, 250));
      }
    });
  });
}
