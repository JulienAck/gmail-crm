function findEmailBlocks() {
	// Adds links on the side of the sender's email address in Gmail
	
	let senderBlock = document.querySelectorAll('[class="iw"]');
	if (senderBlock[0] != undefined) {
		let spanList = senderBlock[0].getElementsByTagName("span");
		for (let i = 0 ; i<spanList.length; i++) {
			let emailAddress = spanList[i].getAttribute("email");
			if (emailAddress!=undefined) {
				var linkToCrm = document.createElement('a');
				linkToCrm.setAttribute('style','margin:0 0 0 10px;');
				linkToCrm.setAttribute('href','https://mail.google.com/mail/u/0/#search/'+emailAddress);
				linkToCrm.textContent="All conversations";
				spanList[i].parentNode.appendChild(linkToCrm);
			}
		}
	} 
}
console.log('GMail CRM activated');
window.onhashchange = findEmailBlocks;
