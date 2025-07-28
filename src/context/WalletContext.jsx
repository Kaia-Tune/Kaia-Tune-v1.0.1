// src/context/WalletContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);

  // Check current chain ID on mount
  useEffect(() => {
    const checkChain = async () => {
      if (window.ethereum) {
        try {
          const currentChainId = await window.ethereum.request({ method: 'eth_chainId' });
          if (currentChainId !== '0x3d5') {
            toast.info('Please switch to Kaia Testnet manually if not already connected.');
          }
        } catch (error) {
          console.error('Chain check error:', error);
        }
      }
    };
    checkChain();
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        // Request accounts
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        // Get current chain ID
        const currentChainId = await window.ethereum.request({ method: 'eth_chainId' });

        // Only proceed if on Kaia Testnet or user has manually switched
        if (currentChainId === '0x3d5' || accounts.length > 0) {
          const signer = provider.getSigner();
          const account = await signer.getAddress();
          setProvider(provider);
          setSigner(signer);
          setAccount(account);
          toast.success('Wallet connected to Kaia Testnet!');
        } else {
          toast.error('Please switch to Kaia Testnet and reconnect.');
        }
      } catch (error) {
        if (error.code === 4001) {
          toast.error('Wallet connection was rejected. Please approve the request in MetaMask and try again.');
        } else {
          toast.error('Failed to connect wallet: ' + error.message);
        }
        console.error('Wallet Connection Error:', error);
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



// src/context/WalletContext.jsx
// import { createContext, useContext, useState, useEffect } from 'react';
// import { ethers } from 'ethers';
// import { toast } from 'react-toastify';

// const WalletContext = createContext();

// export const WalletProvider = ({ children }) => {
//   const [account, setAccount] = useState(null);
//   const [provider, setProvider] = useState(null);
//   const [signer, setSigner] = useState(null);

//   // Check current chain ID on mount
//   useEffect(() => {
//     const checkChain = async () => {
//       if (window.ethereum) {
//         try {
//           const currentChainId = await window.ethereum.request({ method: 'eth_chainId' });
//           if (currentChainId !== '0x3d5') {
//             toast.info('Please switch to Kaia Testnet manually if not already connected.');
//           }
//         } catch (error) {
//           console.error('Chain check error:', error);
//         }
//       }
//     };
//     checkChain();
//   }, []);

//   const connectWallet = async () => {
//     if (window.ethereum) {
//       try {
//         // Request accounts
//         await window.ethereum.request({ method: 'eth_requestAccounts' });
//         const provider = new ethers.providers.Web3Provider(window.ethereum);

//         // Get current chain ID
//         const currentChainId = await window.ethereum.request({ method: 'eth_chainId' });

//         // Only switch if not on Kaia Testnet (0x3d5)
//         if (currentChainId !== '0x3d5') {
//           const kaiaTestnetChain = {
//             chainId: '0x3d5', // 1001 in hex
//             chainName: 'Kaia Testnet',
//             nativeCurrency: {
//               name: 'Kaia Kairos Testnet',
//               symbol: 'KAIA',
//               decimals: 18,
//             },
//             rpcUrls: ['https://public-en-kairos.node.kaia.io','https://public-en-kairos.node.kaia.io'],
//             blockExplorerUrls: ['https://kairos.kaiascan.io','https://baobab.scope.klaytn.com'],
//           };

//           try {
//             await provider.send('wallet_switchEthereumChain', [{ chainId: kaiaTestnetChain.chainId }]);
//           } catch (switchError) {
//             if (switchError.code === 4902) {
//               await window.ethereum.request({
//                 method: 'wallet_addEthereumChain',
//                 params: [kaiaTestnetChain],
//               });
//               await provider.send('wallet_switchEthereumChain', [{ chainId: kaiaTestnetChain.chainId }]);
//             } else {
//               throw switchError;
//             }
//           }
//         }

//         const signer = provider.getSigner();
//         const account = await signer.getAddress();
//         setProvider(provider);
//         setSigner(signer);
//         setAccount(account);
//         toast.success('Wallet connected to Kaia Testnet!');
//       } catch (error) {
//         if (error.code === 4001) {
//           toast.error('Wallet connection was rejected. Please approve the request in MetaMask.');
//         } else {
//           toast.error('Failed to connect wallet: ' + error.message);
//         }
//         console.error('Wallet Connection Error:', error);
//       }
//     } else {
//       toast.error('Please install MetaMask!');
//     }
//   };

//   return (
//     <WalletContext.Provider value={{ account, provider, signer, connectWallet }}>
//       {children}
//     </WalletContext.Provider>
//   );
// };

// export const useWallet = () => useContext(WalletContext);



// // src/context/WalletContext.jsx
// import { createContext, useContext, useState } from 'react';
// import { ethers } from 'ethers'; // Ensure this import is correct
// import { toast } from 'react-toastify';

// const WalletContext = createContext();

// export const WalletProvider = ({ children }) => {
//   const [account, setAccount] = useState(null);
//   const [provider, setProvider] = useState(null);

//   const [signer, setSigner] = useState(null);

//   const connectWallet = async () => {
//     if (window.ethereum) {
//       try {
//         await window.ethereum.request({ method: 'eth_requestAccounts' });
//         const provider = new ethers.providers.Web3Provider(window.ethereum); // Line 16
//         console.log(provider);
        
//         await provider.send('wallet_switchEthereumChain', [{ chainId: '0x3d5' }]); // Kaia Testnet chain ID
//         const signer = provider.getSigner();
//         const account = await signer.getAddress();
//         setProvider(provider);
//         setSigner(signer);
//         setAccount(account);
//         toast.success('Wallet connected to Kaia Testnet!');
//       } catch (error) {
//         toast.error('Failed to connect wallet: ' + error.message);
//         console.error('Wallet Connection Error:', error);
//       }
//     } else {
//       toast.error('Please install MetaMask!');
//     }
//   };

//   return (
//     <WalletContext.Provider value={{ account, provider, signer, connectWallet }}>
//       {children}
//     </WalletContext.Provider>
//   );
// };

// export const useWallet = () => useContext(WalletContext);