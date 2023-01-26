import React, { useEffect, useState } from 'react';

function App() {
  const [guests, setGuests] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [attend, setAttend] = useState(false);
  const baseUrl = 'http://localhost:4000';
  const [refetch, setRefetch] = useState(false);

  // const response = await fetch(`${baseUrl}/guests`);
  // const allGuests = await response.json();
  //   const response = await fetch(`${baseUrl}/guests/:id`);
  // const guest = await response.json();
  // const create = useEffect(() => {
  //   async function fetchApi() {
  //     const response = await fetch(`${baseUrl}/guests/1`, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         firstName: firstName,
  //         lastName: lastName,
  //         attend: attend,
  //       }),
  //     });
  //     const createdGuest = await response.json();
  //     console.log(createdGuest);
  //   }
  //   fetchApi().catch((error) => console.log(error));
  // });
  function randomID() {
    return Math.floor(Math.random() + Math.random() * 10000000000);
  }
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
        id: randomID(),
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
  // console.log(guests);
  const handleHittingEnterDelete = (event) => {
    event.preventDefault();
    const newList = [...guests];
    setFirstName(firstName);
    console.log(firstName);
    setLastName(lastName);
    const newListed = newList.filter((obj) => {
      console.log(obj.firstName);
      return obj.firstName !== firstName;
    });
    setGuests(newListed);

    setFirstName('');
    setLastName('');
  };
  // console.log(guests);

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
            <div key={`guest-name-${guest.firstName}-${guest.lastName}`}>
              <input
                type="checkbox"
                aria-label={`${guest.firstName} ${guest.lastName} attending status`}
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
