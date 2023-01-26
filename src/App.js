import React, { useState } from 'react';

function App() {
  const [guests, setGuests] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [attend, setAttend] = useState(false);

  const handleChangeFirstName = (event) => {
    setFirstName(event.currentTarget.value);
    console.log(firstName);
  };
  const handleChangeLastName = (event) => {
    setLastName(event.currentTarget.value);
    console.log(lastName);
  };

  const handleHittingEnter = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const newList = [...guests];
      setFirstName(firstName);
      setLastName(lastName);
      newList.push({
        firstName: firstName,
        lastName: lastName,
        attend: attend,
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
    setFirstName(firstName);
    console.log(firstName);
    setLastName(lastName);
    newList.filter((guest) => {
      console.log(guest.firstName);
      return guest.firstName !== firstName;
    });
    setGuests(newList);

    console.log(guests);
  };

  return (
    <div data-test-id="guest">
      <div>
        {/* Adding someone to the list */}
        <div>Add:</div>
        <label htmlFor="firstName">First Name: </label>
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
        {/* <div>Remove:</div> */}
        {/* <div>
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
        </div> */}
        <button onClick={handleHittingEnterDelete}>Remove</button>
      </div>
      <div>
        <h2>Participating:</h2>
        {guests.map((guest) => {
          return (
            <div key={`guest-name${guest.firstName}-${guest.lastName}`}>
              <input
                type="checkbox"
                onChange={(event) => {
                  const newAttend = [...guests];
                  guest.attend = event.currentTarget.checked;
                  setGuests(newAttend);
                }}
              />
              {guest.firstName} {guest.lastName} is{' '}
              {guest.attend === true ? 'attending' : 'not attending'}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
