// Saves options to chrome.storage
function save_options() {
  var link_list = document.getElementById('link-list').value;
  chrome.storage.sync.set({
    link_list: link_list,
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.style.display = 'block';
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
      status.style.display = 'none';
    }, 1000);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    link_list: '',
  }, function(items) {
    if (items.link_list.length==0) items.link_list='All conversations|mail.google.com/mail/u/0/#search/%%EMAIL%%';
    document.getElementById('link-list').value = items.link_list;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);