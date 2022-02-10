import { useEffect, useState } from 'react';
import votingAbi from './VotingAbi.json';
import Header from './components/Header';
import Admin from './components/Admin';
import PublicVoting from './components/PublicVoting';
import { ethers, BigNumber, Contract } from 'ethers';

function App() {
  const [topics, setTopics] = useState([]);
  const [contractAdress, setContractAdress] = useState(
    localStorage.getItem('contract')
  );
  const [account, setAccount] = useState(); // state variable to set account.
  const [accounts, setAccounts] = useState(); // state variable to set accounts.

  const [defaultAccount, setDefaultAccount] = useState(null);

  const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount);
    //updateEthers();
  };

  // listen for account changes
  window.ethereum.on('accountsChanged', accountChangedHandler);

  console.log('contract', contractAdress);
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
  }, [defaultAccount, contractAdress]);

  async function deployContract(presidents, voters, start, end) {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.ContractFactory(
        votingAbi.abi,
        votingAbi.bytecode,
        signer
      );
      try {
        const response = await contract.deploy(
          presidents,
          voters,
          start / 1000,
          end / 1000
        );
        localStorage.setItem('contract', response.address);
        setContractAdress(response.address);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  }
  console.log('default', defaultAccount);
  console.log('pimary', '0x4Ff53bc9466f027A1aC2cf68cdafeEFc608F9ac5');

  return (
    <div className='App shadow-lg p-3 mb-5 bg-white rounded'>
      <Header accountAdress={defaultAccount} abi={votingAbi} />
      {defaultAccount && (
        <>
          <div className='row mt-5'>
            <div className='col-md-6'>
              {defaultAccount[0] ===
              '0x4ff53bc9466f027a1ac2cf68cdafeefc608f9ac5' ? (
                <Admin
                  ctr={contractAdress}
                  abi={votingAbi}
                  deploy={deployContract}
                  setTopic={setTopics}
                />
              ) : (
                <>
                  <img src='/Locked!.gif' alt='image' />
                </>
              )}
            </div>
            <div className='col-md-6'>
              <PublicVoting
                ctr={contractAdress}
                abi={votingAbi}
                topics={topics}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
