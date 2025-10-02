const ids = ['tstepMin','hrs','bins','spb'];
ids.forEach(id => document.getElementById(id).addEventListener('input', calc));
function calc(){
  const tmin = +document.getElementById('tstepMin').value || 0;
  const hrs  = +document.getElementById('hrs').value || 0;
  const bins = +document.getElementById('bins').value || 0;
  const spb  = +document.getElementById('spb').value || 0;
  const tsPerHour = tmin > 0 ? 60 / tmin : 0;
  const total = Math.round(tsPerHour * hrs * bins * spb);
  document.getElementById('result').textContent = `Total spillets: ${total.toLocaleString()}`;
}
calc();