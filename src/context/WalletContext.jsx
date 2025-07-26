import { createContext, useContext, useState } from 'react';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send('wallet_switchEthereumChain', [{ chainId: '0x5' }]); // Kaia Testnet
        const signer = provider.getSigner();
        const account = await signer.getAddress();
        setProvider(provider);
        setSigner(signer);
        setAccount(account);
        toast.success('Wallet connected to Kaia Testnet!');
      } catch (error) {
        toast.error('Failed to connect wallet');
        console.error(error);
      }
    } else {
      toast.error('Please install MetaMask!');
    }
  };

  return (
    <WalletContext.Provider value={{ account, provider, signer, connectWallet }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);