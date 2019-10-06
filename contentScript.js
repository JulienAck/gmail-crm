
// Adds links below the email card.
// To be updated if GMail changes its document tree.
function addLinksToEmailCard(arrLinkList) {
	var arrEmailCards = getEmailCards();
	for (var j = 0 ; j < arrEmailCards.length; j++) {
		var divCrmLinkTR = document.createElement('tr');
		var divCrmLinkTD = document.createElement('td');
		divCrmLinkTD.setAttribute('id','arrEmailCards-'+j);
		divCrmLinkTD.setAttribute('style','max-width:100%;display:block;');
		for (var i = 0 ; i<arrLinkList.length; i++) {
			var linkToCrm = document.createElement('a');
			var hrefValue = arrLinkList[i][1];;
			if (hrefValue.indexOf('%%EMAIL%%')>-1) hrefValue = hrefValue.replace('%%EMAIL%%',arrEmailCards[j].emailAddress);
			if (hrefValue.indexOf('%%NAME%%')>-1) hrefValue = hrefValue.replace('%%NAME%%',arrEmailCards[j].emailName);
			linkToCrm.setAttribute('href','https://'+hrefValue);
			linkToCrm.textContent = arrLinkList[i][0];
			linkToCrm.setAttribute('style','margin:0 10px 0 0px;font-size:.8em;');
			divCrmLinkTD.appendChild(linkToCrm);
		}
		divCrmLinkTR.appendChild(divCrmLinkTD);
		if (arrEmailCards[j].docNode.parentNode.nodeName == "TD") {
			var insertedElement = arrEmailCards[j].docNode.parentNode.parentNode.parentNode.insertBefore(divCrmLinkTR, arrEmailCards[j].docNode.parentNode.parentNode.parentNode.children[1]);
		}
		if (arrEmailCards[j].docNode.parentNode.nodeName == "SPAN") {
			arrEmailCards[j].docNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.appendChild(divCrmLinkTR);
		}
	}
}

// Finds email sender cards and returns an array of objects with emailAddress, emailName and the specific node
function getEmailCards() {
	var arrEmailAddressBlocs = document.querySelectorAll('span[class="gD"]'); //This is where GMail displays the emails
	var arrEmailCards = [] ;
	for (var j=0; j < arrEmailAddressBlocs.length; j++) {
		var emailAddress = arrEmailAddressBlocs[j].getAttribute('email');
		var emailName = arrEmailAddressBlocs[j].getAttribute('name');
		if (emailAddress != undefined) {
			arrEmailCards.push({"emailAddress":emailAddress,"emailName":emailName,"docNode":arrEmailAddressBlocs[j]});
		} 
	}
	return arrEmailCards;
}

function listenHashChanged(arrLinkList) {
	window.onhashchange = function() {
		addLinksToEmailCard(arrLinkList);
	}
}

// Get CRM Link lists in local storage, then calls enrichEmailBlocks
function getStorageGmailCrmLinkList() {
	var arrLinkList = new Array();
	var r = '';
	chrome.storage.sync.get(['link_list'], function(result) {
		r = result.link_list;
		var tempArray = r.split("\n");
		for (var i = 0; i < tempArray.length; i++) {
			arrLinkList.push(tempArray[i].split("|"));
		}
		listenHashChanged(arrLinkList);
	});
}

function main() {
	console.log('GMail CRM activated 20191006 1839');
	getStorageGmailCrmLinkList();
}

main();
