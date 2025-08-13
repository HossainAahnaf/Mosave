document.addEventListener('DOMContentLoaded', function() {
  var btn = document.getElementById('clickCounterBtn');
  var count = 0;

  btn.addEventListener('click', function() {
    count++;
    btn.textContent = 'Clicked ' + count + ' times';
  });
});