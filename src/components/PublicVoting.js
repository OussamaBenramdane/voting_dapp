import React from 'react';

const PublicVoting = () => {
  return (
    <div className='container'>
      <div className='row'>
        <table class='table'>
          <thead>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>First</th>
              <th scope='col'>Last</th>
              <th scope='col'>Handle</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope='row'>1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope='row'>2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope='row'>3</th>
              <td>Larry</td>
              <td>the Bird</td>
              <td>@twitter</td>
            </tr>
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
            >
              <option selected>Choose...</option>
              <option value='1'>One</option>
              <option value='2'>Two</option>
              <option value='3'>Three</option>
            </select>
            <button class='btn btn-outline-secondary' type='button'>
              Vote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicVoting;
