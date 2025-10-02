const ids = ['tstepMin','hrs','spb','bins'];
ids.forEach(id => {
  const el = document.getElementById(id);
  if(el) el.addEventListener('input', calc);
});

// Toggle advanced settings
document.getElementById('advanced').addEventListener('change', e => {
  const show = e.target.checked;
  document.getElementById('binsRow').style.display = show ? 'grid' : 'none';
  document.getElementById('warning').style.display = show ? 'block' : 'none';
  calc();
});

function calc(){
  const tmin = +document.getElementById('tstepMin').value || 0;
  const hrs  = +document.getElementById('hrs').value || 0;
  const spb  = +document.getElementById('spb').value || 0;
  const bins = document.getElementById('advanced').checked ? 
               (+document.getElementById('bins').value || 10) : 10;

  const tsPerHour = tmin > 0 ? 60 / tmin : 0;
  const total = Math.round(tsPerHour * hrs * bins * spb);
  document.getElementById('result').textContent = `Total spillets: ${total.toLocaleString()}`;
}
calc();
