// RecSys — interactive widgets. Built with safe DOM APIs (no innerHTML on
// user-derived content). Pulls theme colors from CSS variables so both
// dark/light modes look right.

(function () {
  'use strict';

  // ---------- Sparsity matrix demo ----------
  function buildSparsityDemo() {
    const host = document.getElementById('sparsity-demo');
    if (!host) return;

    const wrap = document.createElement('div');
    wrap.className = 'sparsity';

    const grid = document.createElement('div');
    grid.className = 'sparsity__grid';
    grid.id = 'sparsity-grid';
    grid.setAttribute('aria-hidden', 'true');

    const legend = document.createElement('div');
    legend.className = 'sparsity__legend';

    legend.appendChild(makeLegendItem('Rated cell (6.3%)', true));
    legend.appendChild(makeLegendItem('Missing (93.7%)', false));

    const regen = document.createElement('button');
    regen.type = 'button';
    regen.className = 'btn btn--ghost';
    regen.textContent = '↻ Regenerate';
    regen.addEventListener('click', renderMatrix);
    legend.appendChild(regen);

    wrap.appendChild(grid);
    wrap.appendChild(legend);
    host.replaceChildren(wrap);
    renderMatrix();
  }

  function makeLegendItem(text, filled) {
    const item = document.createElement('span');
    item.className = 'sparsity__legend-item';
    const sw = document.createElement('span');
    sw.className = 'sparsity__sw' + (filled ? ' sparsity__sw--filled' : '');
    item.appendChild(sw);
    item.appendChild(document.createTextNode(' ' + text));
    return item;
  }

  function ratingColor(r) {
    return ['', '#ff6b6b', '#ffa726', '#ffd93d', '#66bb6a', '#34c759'][r] || '#9e9e9e';
  }

  function renderMatrix() {
    const grid = document.getElementById('sparsity-grid');
    if (!grid) return;
    const cols = window.innerWidth < 600 ? 12 : 18;
    const rows = 8;
    grid.style.gridTemplateColumns = 'repeat(' + cols + ', 1fr)';
    grid.replaceChildren();
    for (let i = 0; i < cols * rows; i++) {
      const cell = document.createElement('div');
      cell.className = 'sparsity__cell';
      if (Math.random() < 0.063) {
        const r = Math.floor(Math.random() * 5) + 1;
        cell.textContent = String(r);
        cell.style.background = ratingColor(r);
        cell.classList.add('sparsity__cell--filled');
      }
      grid.appendChild(cell);
    }
  }

  // ---------- Prediction calculator ----------
  function buildPredictionDemo() {
    const host = document.getElementById('prediction-controls');
    if (!host) return;

    const wrap = document.createElement('div');
    wrap.className = 'predictor';

    const row = document.createElement('div');
    row.className = 'predictor__row';
    row.setAttribute('role', 'group');
    row.setAttribute('aria-label', 'Three similar users — set their rating for Avatar and their similarity to you');

    const defaults = [
      { rating: 5, sim: 0.8 },
      { rating: 4, sim: 0.7 },
      { rating: 5, sim: 0.6 },
    ];

    defaults.forEach((d, idx) => {
      row.appendChild(makeUserCard(idx + 1, d));
    });

    const result = document.createElement('div');
    result.className = 'predictor__result';

    const kicker = document.createElement('span');
    kicker.className = 'kicker';
    kicker.textContent = 'Predicted rating · Σ(r·s)/Σs';
    result.appendChild(kicker);

    const value = document.createElement('div');
    value.className = 'predictor__value mono';
    value.id = 'pred-result';
    value.textContent = '4.67';
    result.appendChild(value);

    wrap.appendChild(row);
    wrap.appendChild(result);
    host.replaceChildren(wrap);

    wrap.querySelectorAll('input').forEach(inp => inp.addEventListener('input', recalc));
    recalc();
  }

  function makeUserCard(i, d) {
    const user = document.createElement('div');
    user.className = 'predictor__user';
    user.dataset.user = String(i);

    const lbl = document.createElement('div');
    lbl.className = 'predictor__user-label';
    lbl.textContent = 'User ' + i;
    user.appendChild(lbl);

    user.appendChild(makeField('Rating', 'rating', 1, 5, 1, d.rating, String(d.rating)));
    user.appendChild(makeField('Similarity', 'sim', 0, 1, 0.1, d.sim, d.sim.toFixed(1)));

    return user;
  }

  function makeField(label, role, min, max, step, value, displayText) {
    const fld = document.createElement('label');
    fld.className = 'predictor__field';

    const lbl = document.createElement('span');
    lbl.textContent = label;
    fld.appendChild(lbl);

    const inp = document.createElement('input');
    inp.type = 'range';
    inp.min = String(min);
    inp.max = String(max);
    inp.step = String(step);
    inp.value = String(value);
    inp.dataset.role = role;
    fld.appendChild(inp);

    const display = document.createElement('span');
    display.className = 'mono predictor__val';
    display.dataset.display = role;
    display.textContent = displayText;
    fld.appendChild(display);

    return fld;
  }

  function recalc() {
    const host = document.getElementById('prediction-controls');
    if (!host) return;
    let num = 0, den = 0;
    host.querySelectorAll('.predictor__user').forEach(u => {
      const r = parseFloat(u.querySelector('input[data-role="rating"]').value);
      const s = parseFloat(u.querySelector('input[data-role="sim"]').value);
      u.querySelector('[data-display="rating"]').textContent = String(r);
      u.querySelector('[data-display="sim"]').textContent = s.toFixed(1);
      num += r * s;
      den += s;
    });
    const pred = den > 0 ? (num / den) : 0;
    const out = document.getElementById('pred-result');
    if (out) out.textContent = pred.toFixed(2);
  }

  // ---------- Init ----------
  function init() {
    buildSparsityDemo();
    buildPredictionDemo();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
