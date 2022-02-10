import React, { useEffect, useState } from 'react';
import PieChart from './PieChart';

import { ethers, BigNumber, Contract } from 'ethers';

const PublicVoting = (props) => {
  const [vote, setVote] = useState();
  const [candidates, setCandidats] = useState([]);

  console.log(vote);

  useEffect(() => {
    handle();
  }, []);

  async function handle() {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(props.ctr, props.abi.abi, signer);
      try {
        const response = await contract.getCandidates();
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function voteTo(topic) {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(props.ctr, props.abi.abi, signer);
      try {
        const response = await contract.vote(vote);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  }

  console.log(candidates);
  return (
    <div className='container shadow-sm p-3 mb-5 bg-white rounded'>
      <div className='row'>
        <table class='table table-striped'>
          <thead>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Account</th>
              <th scope='col'>Name</th>
              <th scope='col'>Votes</th>
            </tr>
          </thead>
          <tbody>
            {props.topics.map((val, i) => (
              <tr>
                <th scope='row'>{i}</th>
                <td>Topic Account {i}</td>
                <td>{val}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='row mt-5'>
        <div className='col-md-12'>
          <div class='input-group'>
            <select
              class='form-select'
              id='inputGroupSelect04'
              aria-label='Example select with button addon'
              onChange={(e) => setVote(e.target.value)}
            >
              <option selected>Are with ..</option>
              {props.topics.map((val, i) => (
                <option value={`${i}`}>{val}</option>
              ))}

              {/* <option value='0'>The crypto currency globalisation</option>
              <option value='1'>
                Or against crypto currency globalisation{' '}
              </option> */}
            </select>
            <button
              class='btn btn-outline-secondary'
              type='button'
              onClick={voteTo(vote)}
            >
              Vote
            </button>
          </div>
        </div>
      </div>
      <div className='row mt-5'>
        <div className='col-md-12'>
          <h1>
            Winning Condidate <span class='badge bg-secondary'>Oussama</span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default PublicVoting;
