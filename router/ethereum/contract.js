const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

const address = "0xcc36a3e7ae7c6333D599C0200e7C1a5bA9Bec88A";

const abi =[
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			}
		],
		"name": "querySurvey",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "createAt",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "surveyNum",
						"type": "string"
					},
					{
						"internalType": "string[]",
						"name": "surveyQuestion",
						"type": "string[]"
					},
					{
						"internalType": "string[]",
						"name": "surveyResult",
						"type": "string[]"
					}
				],
				"internalType": "struct myLittleDoctor.survey[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "createAt",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "surveyNum",
				"type": "string"
			},
			{
				"internalType": "string[]",
				"name": "surveyQuestion",
				"type": "string[]"
			},
			{
				"internalType": "string[]",
				"name": "surveyResult",
				"type": "string[]"
			}
		],
		"name": "saveSurvey",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

const contract = new web3.eth.Contract(abi, address);
module.exports = contract;
