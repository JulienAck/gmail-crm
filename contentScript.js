function findEmailBlocks() {
	let senderBlock = document.querySelectorAll('[class="iw"]');
	if (senderBlock[0] != undefined) {
		let spanList = senderBlock[0].getElementsByTagName("span");
		for (let i = 0 ; i<spanList.length; i++) {
			let emailAddress = spanList[i].getAttribute("email");
			if (emailAddress!=undefined) {
				var linkToCrm = document.createElement('a');
				linkToCrm.setAttribute('style','margin:0 0 0 10px;');
				let hrefValue = url_0_href.replace('%%EMAIL%%',emailAddress);
				linkToCrm.setAttribute('href','https://'+hrefValue);
				linkToCrm.textContent = url_0_label;
				spanList[i].parentNode.appendChild(linkToCrm);
			}
		}
	} 
}
console.log('GMail CRM activated');

var url_0_label = "";
var url_0_href  = "";
chrome.storage.sync.get(['url_0_label'], function(result) {
	url_0_label = result.url_0_label;
});
chrome.storage.sync.get(['url_0_href'], function(result) {
	url_0_href = result.url_0_href;
});
window.onhashchange = findEmailBlocks;
