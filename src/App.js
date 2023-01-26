import React, { useState } from 'react';

function App() {
  const [guests, setGuests] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [deleteFirstName, setDeleteFirstName] = useState('');
  const [deleteLastName, setDeleteLastName] = useState('');

  const handleChangeFirstName = (event) => {
    setFirstName(event.currentTarget.value);
    console.log(firstName);
  };
  const handleChangeLastName = (event) => {
    setLastName(event.currentTarget.value);
    console.log(lastName);
  };
  const handleChangeFirstNameDelete = (event) => {
    setDeleteFirstName(event.currentTarget.value);
    console.log(deleteFirstName);
  };
  const handleChangeLastNameDelete = (event) => {
    setDeleteLastName(event.currentTarget.value);
    console.log(deleteLastName);
  };

  const handleHittingEnter = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const newList = [...guests];
      setFirstName(firstName);
      setLastName(lastName);
      // console.log(firstName + ' ' + lastName);
      // console.log('Initial array:', newList);
      newList.push({
        firstName: firstName,
        lastName: lastName,
        attend: false,
      });
      setGuests(newList);
      setFirstName('');
      setLastName('');
    }
  };
  console.log(guests);
  const handleHittingEnterDelete = (event) => {
    event.preventDefault();
    const newList = [...guests];
    setDeleteFirstName(deleteFirstName);
    setDeleteLastName(deleteLastName);
    newList.filter(() => {
      return (
        guests.firstName !== deleteFirstName &&
        guests.lastName !== deleteLastName
      );
    });
    setGuests(newList);
    setDeleteFirstName('');
    setDeleteLastName('');

    console.log(guests);
  };
  return (
    <div data-test-id="guest">
      <div>
        {/* Adding someone to the list */}
        <div>Add:</div>
        <label htmlFor="firstName">First Name: &nbsp; </label>
        <input
          id="firstName"
          onChange={handleChangeFirstName}
          value={firstName}
        />
      </div>
      <div>
        <label htmlFor="lastName">Last Name: &nbsp;</label>
        <input
          id="lastName"
          onChange={handleChangeLastName}
          onKeyDown={handleHittingEnter}
          value={lastName}
        />
      </div>
      {/* Removing someone from the list */}
      <div>
        <div>Remove:</div>
        <div>
          <label htmlFor="deleteFirstName">First Name: &nbsp; </label>
          <input
            id="deleteFirstName"
            onChange={handleChangeFirstNameDelete}
            value={deleteFirstName}
          />
        </div>
        <div>
          <label htmlFor="deleteLastName">Last Name: &nbsp;</label>
          <input
            id="deleteLastName"
            onChange={handleChangeLastNameDelete}
            onKeyDown={handleHittingEnterDelete}
            value={deleteLastName}
          />
        </div>
        <button>Remove</button>
      </div>
    </div>
  );
}

export default App;
