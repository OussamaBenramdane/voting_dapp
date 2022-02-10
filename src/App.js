import { useEffect, useState } from 'react';
import votingAbi from './VotingAbi.json';
import Web3 from 'web3';
import Header from './components/Header';
import Admin from './components/Admin';
import PublicVoting from './components/PublicVoting';
import { ethers, BigNumber, Contract } from 'ethers';

function App() {
  const contractAdress = '0xDafFBCCB615056145413c4cdAf594eCa746c47F4';

  const [account, setAccount] = useState(); // state variable to set account.
  const [accounts, setAccounts] = useState(); // state variable to set accounts.

  async function load() {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      setAccounts(accounts);
      setAccount(accounts[0]);
    }
  }

  useEffect(() => {
    load(account);
    console.log();
  }, [account]);

  async function handleMint() {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAdress,
        votingAbi.abi,
        signer
      );
      try {
        const response = await contract.getVoters();
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className='App'>
      <Header accountAdress={account} abi={votingAbi} />
      {accounts?.length > 0 && (
        <>
          <div className='row mt-5'>
            <div className='col-md-6'>
              <Admin accountAdress={account} abi={votingAbi} />
            </div>
            <div className='col-md-6'>
              <PublicVoting accountAdress={account} abi={votingAbi} />
            </div>
          </div>
          <div className='row'>
            <button type='button' class='btn btn-primary' onClick={handleMint}>
              Test
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
