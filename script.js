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