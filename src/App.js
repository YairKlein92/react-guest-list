import React, { useEffect, useState } from 'react';

function App() {
  const [guests, setGuests] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [attend, setAttend] = useState(false);
  const baseUrl = 'http://localhost:4000';
  // const [refetch, setRefetch] = useState(false);
  const [loading, setLoading] = useState(true);
  // synchronizing API and app
  useEffect(() => {
    document.title = 'Guest list';
    async function getUsers() {
      const response = await fetch(`${baseUrl}/guests`);
      const allGuests = await response.json();
      console.log(allGuests);
      setGuests(allGuests);
      setLoading(false);
    }

    getUsers().catch((error) => console.log(error));
  }, []);

  // const response = await fetch(`${baseUrl}/guests`);
  // const allGuests = await response.json();
  //   const response = await fetch(`${baseUrl}/guests/:id`);
  // const guest = await response.json();

  // async function createApi() {
  //   const response = await fetch(`${baseUrl}/guests/`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       firstName: 'Csaba',
  //       lastName: 'Klein',
  //       attend: attend,
  //     }),
  //   });
  //   const createdGuest = await response.json();
  //   console.log(createdGuest);
  // }
  // createApi().catch((error) => console.log(error));

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

      async function createApi() {
        const response = await fetch(`${baseUrl}/guests/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            attend: attend,
          }),
        });
        const createdGuest = await response.json();
        console.log(createdGuest);
      }
      createApi().catch((error) => console.log(error));
      setFirstName('');
      setLastName('');
    }
  };
  console.log(guests);
  const handleHittingEnterDelete = (event) => {
    event.preventDefault();
    const newList = [...guests];
    setFirstName(firstName);
    setLastName(lastName);
    const newListed = newList.filter((obj) => {
      return obj.firstName !== firstName;
    });
    setGuests(newListed);

    setFirstName('');
    setLastName('');
  };

  const handleHittingRemoveAll = (event) => {
    event.preventDefault();
    const emptyList = [];
    setGuests(emptyList);
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
        <button onClick={handleHittingRemoveAll}>Remove all guests</button>
      </div>
      <div>
        <div>{loading ? 'Loading...' : <h2>Guests:</h2>}</div>
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

                  async function updateAttend() {
                    const response = await fetch(
                      `${baseUrl}/guests/${guest.id}`,
                      {
                        method: 'PUT',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ attending: guest.attend }),
                      },
                    );
                    const updatedGuest = await response.json();
                    console.log(updatedGuest);
                  }
                  updateAttend().catch((error) => console.log(error));
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
