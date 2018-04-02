// config
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/token"));
var Accounts = require('web3-eth-accounts');
var accounts = new Accounts('https://ropsten.infura.io/token');

var abi = require('./SupplyChain');
var contractAddress = '0xfcea742d66b56647de4793d78ee12173dc6b1b19';


var private_key = "your own private key";  // this is random
var my_account = web3.eth.accounts.privateKeyToAccount(private_key);

var address =  my_account[Object.keys(my_account)[0]];

console.log("The address is: " + address);
// console.log("The private key is: " + private_key);
console.log("End");



web3.eth.getBalance(address, function(e, result){
  console.log("the balance of the account is  " + result);
  console.log(web3.utils.fromWei(result, 'ether') + "ether");
});


var mycontract = new web3.eth.Contract(abi, contractAddress);


// getdata from function
mycontract.methods.getInfo(address).call().then(function(Resp){
  console.log("scaned in item: " + web3.utils.hexToUtf8((Resp[Object.keys(Resp)[0]]).toString()) + " at time: " +  time_converter(Resp[Object.keys(Resp)[1]]));
});


// get function ABI data
var getData = mycontract.methods.ScanItem(web3.utils.fromAscii("A20160528")).encodeABI();
console.log("the encode abi is  " + getData);


// time converter
 const time_converter = (time) =>{
   date1 = new Date(time*1000);
   return date1.toUTCString()
 }


// sign transaction and send

var signed_transaction = web3.eth.accounts.signTransaction({
    to: contractAddress,
    data:getData,
    gas: 2000000
}, private_key).then(function(raw){
  web3.eth.sendSignedTransaction(raw[Object.keys(raw)[4]])
.on('receipt', function(result){
  mycontract.methods.getInfo().call(address).then(console.log);

});
})
