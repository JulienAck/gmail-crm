function findEmailBlocks(linkList) {
	let emailAddressBlocs = document.querySelectorAll('[class="gD"]');
	console.log('email blocs count '+emailAddressBlocs.length);
	for (let j=0; j<emailAddressBlocs.length; j++) {
		var emailAddress = emailAddressBlocs[j].getAttribute('email');
		console.log('email bloc '+emailAddress);
		if (emailAddress != undefined) {
			for (let i = 0 ; i<linkList.length; i++) {
				var linkToCrm = document.createElement('a');
				let hrefValue = linkList[i][1];;
				if (hrefValue.indexOf('%%EMAIL%%')>-1) hrefValue = hrefValue.replace('%%EMAIL%%',emailAddress);
				linkToCrm.setAttribute('href','https://'+hrefValue);
				linkToCrm.textContent = linkList[i][0];
				linkToCrm.setAttribute('style','margin:0 0 0 10px;');
				emailAddressBlocs[j].parentNode.appendChild(linkToCrm);
			}
		} 
	}
	
}

function getStorageGmailCrmLinkList() {
	let linkList  = new Array();
	let r = '';
	chrome.storage.sync.get(['link_list'], function(result) {
		r = result.link_list;
		var tempArray = r.split("\n");
		for (let i = 0; i < tempArray.length; i++) {
			linkList.push(tempArray[i].split("|"));
		}
		findEmailBlocks(linkList);
	});
}

console.log('GMail CRM activated');
window.onhashchange = getStorageGmailCrmLinkList;
