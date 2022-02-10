import React from 'react';

const Header = ({ accountAdress }) => {
  console.log(accountAdress);
  return (
    <div className='container-fluid p-0'>
      <nav class='navbar navbar-expand-lg navbar-light bg-light'>
        <div class='container-fluid'>
          <a class='navbar-brand' href='#'>
            Your Address :
          </a>
          <div class='collapse navbar-collapse' id='navbarSupportedContent'>
            {accountAdress && (
              <input
                class='form-control me-2'
                disabled
                type='search'
                value={accountAdress}
                aria-label='Search'
              />
            )}
            <button class='btn btn-outline-success' type='submit'>
              {accountAdress ? 'connected' : 'not connected'}
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
