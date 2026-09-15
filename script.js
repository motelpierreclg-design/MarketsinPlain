// Mobile nav toggle
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('header nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
    });
  }

  // Mark active nav link
  var path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Mockup email forms (subscribe blocks)
  document.querySelectorAll('form.email-form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('button');
      var input = form.querySelector('input');
      if (btn) btn.textContent = 'Subscribed';
      if (input) input.disabled = true;
    });
  });

  // Mockup contact form
  var contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = contactForm.querySelector('button[type="submit"]');
      if (btn) btn.textContent = 'Message sent';
      contactForm.querySelectorAll('input, textarea').forEach(function (el) {
        el.disabled = true;
      });
    });
  }

  // Articles page: category filter + search
  var filterPills = document.querySelectorAll('.filter-pill');
  var searchInput = document.querySelector('.search-wrap input');
  var rows = document.querySelectorAll('.article-list .article-row');
  var emptyState = document.querySelector('.empty-state');
  var resultCount = document.querySelector('.result-count');
  var activeCategory = 'all';

  function applyFilters() {
    if (!rows.length) return;
    var query = searchInput ? searchInput.value.trim().toLowerCase() : '';
    var visible = 0;
    rows.forEach(function (row) {
      var category = row.getAttribute('data-category');
      var text = row.textContent.toLowerCase();
      var matchesCategory = activeCategory === 'all' || category === activeCategory;
      var matchesSearch = query === '' || text.indexOf(query) !== -1;
      if (matchesCategory && matchesSearch) {
        row.hidden = false;
        visible++;
      } else {
        row.hidden = true;
      }
    });
    if (emptyState) emptyState.classList.toggle('visible', visible === 0);
    if (resultCount) {
      resultCount.textContent = visible + (visible === 1 ? ' article' : ' articles');
    }
  }

  filterPills.forEach(function (pill) {
    pill.addEventListener('click', function () {
      filterPills.forEach(function (p) { p.classList.remove('active'); });
      pill.classList.add('active');
      activeCategory = pill.getAttribute('data-category');
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
  }

  if (rows.length) applyFilters();
});
