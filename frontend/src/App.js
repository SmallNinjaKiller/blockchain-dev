import React, { useState } from "react";
import { BrowserProvider } from "ethers";

function App() {
  const [account, setAccount] = useState(null);

  const connectMetaMask = async () => {
    console.log("Клік відбувся");
    if (window.ethereum) {
      if (!window.ethereum.isMetaMask) {
        alert("Будь ласка, використай MetaMask.");
        return;
      }

      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
      } catch (err) {
        console.error("MetaMask error:", err);
      }
    } else {
      alert("MetaMask не знайдено!");
    }
  };

  return (
    <div className="App">
      <h1>Blockchain Project</h1>
      {account ? (
        <p>Connected Account: {account}</p>
      ) : (
        <button onClick={connectMetaMask}>Connect MetaMask</button>
      )}
    </div>
  );
}

export default App;
