// Add the web3 node module
var Web3 = require('web3');

function main() {

	// Change it MainNet URL for Production Use https://mainnet.infura.io/API-TOKEN-HERE
	var web3Provider = 'https://ropsten.infura.io'; 			
	
	// 'https://ropsten.infura.io/API-TOKEN-HERE'
	// In case of local host use it as - 'http://localhost:8545'

	// Specify web3 provider for the Web3 too look for ethereum nodes
	web3 = new Web3(new Web3.providers.HttpProvider(web3Provider));

	// Contract Address to check for the events.
	var contractAddrForMPE = "0x7e06cecbac16e33692dee141d73dbbb807a09b4c";  // Address from Ropsten Deployment

	// Event Listeners will start from this block - Give the Contract Creation Blocknumber as Parameter instead of Zero
	var startingBlock = 4394767;

	// Specify the contract ABI
	var abiMPE = [{"constant":false,"inputs":[{"name":"channelId","type":"uint256"},{"name":"amount","type":"uint256"}],"name":"channelAddFunds","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"channelId","type":"uint256"},{"name":"amount","type":"uint256"},{"name":"v","type":"uint8"},{"name":"r","type":"bytes32"},{"name":"s","type":"bytes32"},{"name":"isSendback","type":"bool"}],"name":"channelClaim","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"channelId","type":"uint256"}],"name":"channelClaimTimeout","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"channelId","type":"uint256"},{"name":"newExpiration","type":"uint256"}],"name":"channelExtend","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"channelId","type":"uint256"},{"name":"newExpiration","type":"uint256"},{"name":"amount","type":"uint256"}],"name":"channelExtendAndAddFunds","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"value","type":"uint256"}],"name":"deposit","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"recipient","type":"address"},{"name":"value","type":"uint256"},{"name":"expiration","type":"uint256"},{"name":"groupId","type":"uint256"},{"name":"signer","type":"address"}],"name":"depositAndOpenChannel","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"channelIds","type":"uint256[]"},{"name":"amounts","type":"uint256[]"},{"name":"isSendbacks","type":"bool[]"},{"name":"v","type":"uint8[]"},{"name":"r","type":"bytes32[]"},{"name":"s","type":"bytes32[]"}],"name":"multiChannelClaim","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"recipient","type":"address"},{"name":"value","type":"uint256"},{"name":"expiration","type":"uint256"},{"name":"groupId","type":"uint256"},{"name":"signer","type":"address"}],"name":"openChannel","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"receiver","type":"address"},{"name":"value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"value","type":"uint256"}],"name":"withdraw","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_token","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"channelId","type":"uint256"},{"indexed":true,"name":"sender","type":"address"},{"indexed":true,"name":"recipient","type":"address"},{"indexed":true,"name":"groupId","type":"uint256"},{"indexed":false,"name":"signer","type":"address"},{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"expiration","type":"uint256"}],"name":"ChannelOpen","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"channelId","type":"uint256"},{"indexed":true,"name":"recipient","type":"address"},{"indexed":false,"name":"claimAmount","type":"uint256"},{"indexed":false,"name":"sendBackAmount","type":"uint256"},{"indexed":false,"name":"keepAmpount","type":"uint256"}],"name":"ChannelClaim","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"channelId","type":"uint256"},{"indexed":false,"name":"claimAmount","type":"uint256"}],"name":"ChannelSenderClaim","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"channelId","type":"uint256"},{"indexed":false,"name":"newExpiration","type":"uint256"}],"name":"ChannelExtend","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"channelId","type":"uint256"},{"indexed":false,"name":"newFunds","type":"uint256"}],"name":"ChannelAddFunds","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"sender","type":"address"},{"indexed":true,"name":"receiver","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"TransferFunds","type":"event"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balances","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"channels","outputs":[{"name":"sender","type":"address"},{"name":"recipient","type":"address"},{"name":"groupId","type":"uint256"},{"name":"value","type":"uint256"},{"name":"nonce","type":"uint256"},{"name":"expiration","type":"uint256"},{"name":"signer","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"nextChannelId","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"token","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"}]

	// Create the contract instance from the given ABI & Contract Address
	//var contractMPE = new web3.eth.contract(abiMPE, contractAddrForMPE);
	var contractMPE = web3.eth.contract(abiMPE);
	var instanceContractMPE = contractMPE.at(contractAddrForMPE);

	// Search the contract events for the hash in the event logs and show matching events.
	var evt = instanceContractMPE.allEvents({fromBlock: startingBlock, toBlock: 'latest'});

	// In case of specific events & filters
	//var evt =instanceContractMPE.ChannelOpen({sender: senderAddress}, {fromBlock: startingBlock, toBlock: 'latest'});

	evt.watch(function(err, result) {
		if (err) {
			console.log("Error while watching for contract events => " + err)
		}
		else
		{
			// Get the event name
			var event = result.event;

			if(event == "ChannelOpen")
			{
				// Insert a record into the persistent storage
				var channeId = result.args.channelId;
				var sender = result.args.sender;
				var recipient = result.args.recipient; 
				var groupId = result.args.groupId;
				
				var amount = result.args.amount;
				var nonce = 0; // For new channel
				var expiration = result.args.expiration;
				var signer = result.args.signer;

				console.log("channeId : " + channeId);

				// Call function to insert into the storage
				createChannel(channelId, sender, recipient, groupId, amount, nonce, expiration, signer);

			}
			else if(event != "TransferFunds" && (event == "ChannelClaim" || event == "ChannelSenderClaim" || event  == "ChannelExtend" || event == "ChannelAddFunds")) {
				// Update the details by reading the values from Blockchain
				var channeId = result.args.channelId;

				// Get the channle details
				instanceContractMPE.channels(channeId, (err, channel) => {

					if (err) {
						console.log("Error while fetching channel " + channeId + " details => " + err); // See if we can log the error into log files
						return;
					}

					var sender = channel[0];
					var recipient = channel[1];
					var groupId = channel[2];
					var value = channel[3];
					var nonce = channel[4];
					var expiration = channel[5];
					var signer = channel[6]

					console.log("sender: " + sender);

					// Call the function to update with the latest channel details
					updateChannel(channelId, sender, recipient, groupId, value, nonce, expiration, signer);

				});
			}
		}
	});

}

function createChannel(channelId, sender, recipient, groupId, value, nonce, expiration, signer){
	// Still check for the existance of the channel in case if we rerun from the starting block number

}

function updateChannel(channelId, sender, recipient, groupId, value, nonce, expiration, signer) {
	// Definitely it will be an update until unless there was an error with the createChannel

}

// Call main function to initiate the call
main();

// Use utilities like forever to run this code forever as we have the subscription for the events