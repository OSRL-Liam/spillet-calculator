(function(){
  const $ = id => document.getElementById(id);

  function number(el, fallback=0){
    const n = +el.value;
    return Number.isFinite(n) ? n : fallback;
  }

  function calc(){
    const tmin = Math.max(1, number($('tstepMin'), 0));
    const hrs  = Math.max(0, number($('hrs'), 0));
    const spb  = Math.max(1, number($('spb'), 0));

    // Bins default to 10 unless Advanced is on
    const bins = $('advanced').checked ? Math.max(1, number($('bins'), 10)) : 10;

    const tsPerHour = 60 / tmin;
    const total = Math.round(tsPerHour * hrs * bins * spb);

    $('result').textContent = 'Total spillets: ' + total.toLocaleString();

    // Guidance logic
    let msg = '';
    let cls = 'info';

    if (hrs < 4) {
      msg = '💡 Short spill (<4 hrs): Aim for 2,000–5,000 spillets total. Current = ' + total.toLocaleString() + '.';
      if (total < 2000) {
        msg += ' (Consider increasing spillets for smoother representation.)';
        cls = 'info';
      } else if (total > 5000) {
        msg += ' (Above recommended range for a short spill.)';
        cls = 'warn';
      } else {
        cls = 'ok';
      }
    } else {
      msg = 'ℹ️ Longer release (>4 hrs): Higher spillet counts are justified. Current = ' + total.toLocaleString() + '.';
      if (total > 40000) {
        msg += ' ⚠️ Warning: This is at the top end of model capacity. Runs will be slower, exports large, and files may be too big to email.';
        cls = 'warn';
      } else {
        cls = 'info';
      }
    }

    const g = $('guidance');
    g.textContent = msg;
    g.className = 'guidance ' + cls;
  }

  // Wire up listeners
  ['tstepMin','hrs','spb','bins'].forEach(id => {
    const el = $(id);
    if (el) el.addEventListener('input', calc);
  });

  $('advanced').addEventListener('change', e => {
    const show = e.target.checked;
    $('binsRow').style.display = show ? 'grid' : 'none';
    $('warning').style.display = show ? 'block' : 'none';
    calc();
  });

  // Initial render
  calc();
})();