---
title: "Signing Transactions"
category: "uport-connect"
type: "guide"
source: "https://github.com/uport-project/uport-project.github.io/blob/develop/markdown/docs/guides/SignTransactions.md"
---

# Ethereum Transactions and Contract Calls

`uport-connect` offers two Ethereum interaction models. The first is similar to above, where all Ethereum interactions get encoded as uPort requests for a uPort client. You can create these requests in both and `uport-connect` and `uport-credentials` and then send them the same way as the examples above. The second allows you to create a web3 style provider wrapped with uPort functionality.

## uPort Requests

Get the address of a uPort Id, simply use the standard `requestDislcosure` method with no arguments:

```javascript
connect.requestDisclosure()

connect.onResponse('disclosureReq').then(payload => {
  const address = connect.address
  const did = connect.did
})
```

To create a transaction request either the `contract()` or `sendTransaction()` methods can be used. `sendTransaction` consumes any valid transaction object, creates a uPort transaction request from it, and uses an appropriate transport (as described in examples above). The response is a transaction hash.

```javascript
const txObj = {
  address: '0x71845bbfe5ddfdb919e780febfff5eda62a30fdc',
  value: 1 * 1.0e18
}
connect.sendTransaction(txObj, 'ethSendReq')
connect.onResponse('ethSendReq').then(res => {
  const txId = res.payload
})
```

Additionally you can create transaction requests with an interface similar to the familiar contract object in web3 (web3.eth.contract). Once given an ABI and address `connect.contract(abi).at(address)`, you can call the contract functions with this object. Keep in mind thought functionality is limited to function calls which require sending a transaction, as these are the only calls which require interaction with a uPort client. For reading and/or events use web3 along or a similar library along with `uport-connect`. _Also note that `Connect.contract` conforms to the *old* web3 contract API, which has changed in web3 v1.0.  This new API does not work entirely with uport's requirement that requests and responses are handled in separate function calls, so our contract is based on the older specification._

Using this object over the provider examples below gives you more flexibility and control over the uPort request and response handling flows, where as the provider is more restrictive. It also gives you better access to uPort specific features.

```js
  const statusContractABI = [
      {
        "constant": false,
        "inputs": [
          {
            "name": "status",
            "type": "string"
          }
        ],
        "name": "updateStatus",
        "outputs": [],
        "type": "function"
      }
    ]

  const statusContract = connect.contract(statusContractABI).at("0xB42E70a3c6dd57003f4bFe7B06E370d21CDA8087")
  const reqId = 'updateStatus'
  statusContract.updateStatus('hello', reqId)

  connect.onResponse(reqId).then(payload => {
    const txId = payload.res
  })
```

## Using with a Provider (Web3)

With `uport-connect` you can create a web3 style provider wrapped with uPort functionality and then go and use that with any library which supports these types of providers, for example with web3 or  [ethjs](https://github.com/ethjs/ethjs). If you already have an existing application built on Ethereum using web3 then this may be the simplest uPort integration.

Create a uPort wrapped provider:

```javascript
const connect = new Connect(yourAppName, {network: 'rinkeby'})
const provider = connect.getProvider()
```

Using the provider in web3:

```javascript
const connect = new Connect(yourAppName, {network: 'rinkeby'})
const provider = connect.getProvider()
const web3 = new Web3(provider)
```

After the above setup, you can now use the `web3` object as normal.

The following calls will initiate a uPort request, by default this will show a QR code or use the mobile flow.

* `web3.eth.getCoinbase()` - returns your uport address, if not set already
* `web3.eth.getAccounts()`- returns your uport address in a list, if not set already
* `web3.eth.sendTransaction(txObj)` - returns a transaction hash
* `myContract.myMethod()` - returns a transaction hash

While this may be the most convenient approach, it's important to note that because the web3 transaction handling is stateful, it requires that uPort requests and responses are handled on the same page. This means that for some mobile browsers, using a web3 object with a uport subprovider to send transactions may not work properly. Instead, for full mobile support we recommend using `Connect.sendTransaction`, or creating contracts via `Connect.contract`, and listening for responses from the mobile app with `Connect.onResponse`.
