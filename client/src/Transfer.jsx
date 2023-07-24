import { useState } from "react";
import server from "./server";
import *as secp from "ethereum-cryptography/secp256k1";
import { keccak256 } from "ethereum-cryptography/keccak";
import { utf8ToBytes,toHex } from "ethereum-cryptography/utils.js";

function Transfer({ address, setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [PrivateKey,setPrivateKey]=useState("");
  

  const setValue = (setter) => (evt) => setter(evt.target.value);
 

 
  

  async function transfer(evt) {
    evt.preventDefault();

    try {
        
      const publicKey=secp.secp256k1.getPublicKey(PrivateKey);
     
      const Sliced=publicKey.slice(1)
    
      const keccak=keccak256(Sliced);
     
      const Address=toHex(keccak).slice(-20);
      const derivedAddress=`0x${Address}`;
    

      if(derivedAddress===address){
      const {
        data: { balance },
      } = await server.post(`send`, {
        sender: address,
        amount: parseInt(sendAmount),
        recipient,
      });
      setBalance(balance);
      console.log("transfered")
      alert("Ether Transfered");
    }else{
     alert("Invalid Private key")
    }
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <label>
        Private Key:
        <input
          placeholder="Your signature will be send to server"
          value={PrivateKey}
          onChange={setValue(setPrivateKey)}
        ></input>
        </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
