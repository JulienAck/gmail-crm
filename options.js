// Saves options to chrome.storage
function save_options() {
  var url_0_label = document.getElementById('url_0_label').value;
  var url_0_href  = document.getElementById('url_0_href').value;
  chrome.storage.sync.set({
    url_0_label: url_0_label,
    url_0_href: url_0_href
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 1000);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    url_0_label: '',
    url_0_href: ''
  }, function(items) {
    document.getElementById('url_0_label').value = items.url_0_label;
    document.getElementById('url_0_href').value  = items.url_0_href;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);