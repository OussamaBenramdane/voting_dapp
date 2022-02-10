import React, { useEffect, useState } from 'react';

import { ethers, BigNumber, Contract } from 'ethers';

const Admin = (props) => {
  //Adding candidates
  const [candidat, setCandidat] = useState('');
  const [candidates, setCandidates] = useState([]);
  //Get the added account
  const [legibleAccounts, setLegibleAccounts] = useState([]);
  //Get the dates
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [leading, setLeading] = useState();
  // Add elector
  const [elector, setElector] = useState('');
  const [electors, setElectors] = useState([]);

  useEffect(() => {
    handle();
  }, []);
  console.log(candidates);
  console.log(startDate);
  console.log(endDate);
  console.log('electors', legibleAccounts);
  console.log(new Date(startDate).getTime() / 1000);

  async function handle() {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(props.ctr, props.abi.abi, signer);
      // try {
      const response = await contract.getVoters();
      //   const start = await contract.getStartDate();
      //   const end = await contract.getEndDate();
      //   const win = await contract.winnerName();
      //   setLeading(win);
      //   setEndDate(parseInt(ethers.utils.formatUnits(end, 0)));
      //   setStartDate(parseInt(ethers.utils.formatUnits(start, 0)));
      setLegibleAccounts(response);
      //   console.log(response);
      // } catch (error) {
      //   console.log(error);
      // }
    }
  }
  return (
    <div className='container shadow-sm p-3 mb-5 bg-white rounded'>
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
            onChange={(e) => setCandidat(e.target.value)}
          />
          <button
            class='btn btn-outline-secondary'
            type='button'
            onClick={() => {
              setCandidates([...candidates, candidat]);
              props.setTopic([...candidates, candidat]);
            }}
          >
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
            type='datetime-local'
            class='form-control'
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className='col-md-1'>
          <label for='basic-url' class='form-label'>
            To{' '}
          </label>
        </div>
        <div className='col-md-5'>
          <input
            type='datetime-local'
            class='form-control'
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>
      <div className='row mt-3'>
        <strong>
          <h3>Preselect Electors</h3>
        </strong>
        <div className='col-md-12'>
          <div className='row mb-2'>
            <div className='col-md-2'>
              <strong>
                <label>Add elector</label>
              </strong>
            </div>
            <div className='col-md-8'>
              <input
                type='text'
                class='form-control'
                onChange={(e) => setElector(e.target.value)}
              />
            </div>
            <div className='col-md-2'>
              <button
                type='button'
                class='btn btn-primary'
                onClick={() => {
                  elector.length > 0 && setElectors([...electors, elector]);
                }}
              >
                <strong>+</strong>
              </button>
            </div>
          </div>
          <table class='table table-striped table-dark'>
            <thead>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>Acount Number</th>
                <th scope='col'>Address</th>
              </tr>
            </thead>
            <tbody>
              {legibleAccounts.length < 0
                ? electors.map((val, i) => (
                    <tr>
                      <th scope='row'>{i}</th>
                      <td>Voter Account {i}</td>
                      <td>{val}</td>
                    </tr>
                  ))
                : legibleAccounts.map((val, i) => (
                    <tr>
                      <th scope='row'>{i}</th>
                      <td>Voter Account {i}</td>
                      <td>{val}</td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
        <div className='row'>
          <button
            type='button'
            class='btn btn-primary'
            onClick={() => {
              if (candidates && electors && startDate && endDate) {
                props.deploy(
                  candidates,
                  electors,
                  new Date(startDate).getTime(),
                  new Date(endDate).getTime()
                );
              }
            }}
          >
            Deploy
          </button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
