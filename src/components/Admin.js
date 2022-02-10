import React, { useEffect, useState } from 'react';

import { ethers, BigNumber, Contract } from 'ethers';

const Admin = (props) => {
  const [legibleAccounts, setLegibleAccounts] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [leading, setLeading] = useState();

  useEffect(() => {
    handle();
  }, []);

  async function handle() {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(props.ctr, props.abi.abi, signer);
      try {
        const response = await contract.getVoters();
        const start = await contract.getStartDate();
        const end = await contract.getEndDate();
        const win = await contract.winnerName();
        setLeading(win);
        setEndDate(parseInt(ethers.utils.formatUnits(end, 0)));
        setStartDate(parseInt(ethers.utils.formatUnits(start, 0)));
        setLegibleAccounts(response);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  }
  console.log(new Date(startDate));

  console.log(legibleAccounts);
  console.log('start', startDate);
  console.log('end', endDate);
  console.log('win', leading);

  return (
    <div className='container'>
      <div className='row'>
        <strong>
          <label for='basic-url' class='form-label'>
            Add condidates
          </label>
        </strong>
        <div class='input-group mb-3'>
          <span class='input-group-text' id='basic-addon3'>
            <strong>Condidates</strong>
          </span>
          <input
            type='text'
            class='form-control'
            id='basic-url'
            aria-describedby='basic-addon3'
          />
          <button class='btn btn-outline-secondary' type='button'>
            Add to list
          </button>
        </div>
      </div>

      <div className='row mt-3'>
        <div className='col-md-2'>
          <strong>
            <label for='basic-url' class='form-label'>
              Voting starts
            </label>
          </strong>
        </div>
        <div className='col-md-4'>
          <input
            //type='datetime-local'
            class='form-control'
            value={new Date(startDate * 1000)}
            disabled
          />
        </div>
        <div className='col-md-1'>
          <label for='basic-url' class='form-label'>
            To{' '}
          </label>
        </div>
        <div className='col-md-5'>
          <input
            //type='datetime-local'
            class='form-control'
            value={new Date(endDate * 1000)}
            disabled
          />
        </div>
      </div>
      <div className='row mt-3'>
        <strong>
          <h3>Preselect Electors</h3>
        </strong>
        <div className='col-md-12'>
          <table class='table table-striped table-dark'>
            <thead>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>Acount Number</th>
                <th scope='col'>Address</th>
              </tr>
            </thead>
            <tbody>
              {legibleAccounts.map((val, i) => (
                <tr>
                  <th scope='row'>{i}</th>
                  <td>Voter Account {i}</td>
                  <td>{val}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='row mt-5'>
          <div className='col-md-12'>
            <h1>
              Winning Condidate{' '}
              <span class='badge bg-secondary'>{leading}</span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
