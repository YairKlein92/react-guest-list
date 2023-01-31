import React, { useEffect, useState } from 'react';

function App() {
  const [guests, setGuests] = useState([]);
  const [guestsDisplay, setGuestsDisplay] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  // const [changeFirstName, setChangeFirstName] = useState('');
  // const [changeLastName, setChangeLastName] = useState('');
  // const [attend, setAttend] = useState(false);
  const [noEdit, setNoEdit] = useState(true);
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
      setLoading(false);
      setGuests(allGuests);
      setGuestsDisplay(allGuests);
    }

    getUsers().catch((error) => console.log(error));
  }, []);

  const handleFirstName = (event) => {
    setFirstName(event.currentTarget.value);
  };
  const handleLastName = (event) => {
    setLastName(event.currentTarget.value);
  };
  // const handleChangeFirstName = (event) => {
  //   setChangeFirstName(event.currentTarget.value);
  // };
  // const handleChangeLastName = (event) => {
  //   setChangeLastName(event.currentTarget.value);
  // };
  const handleHittingEnter = (event) => {
    event.preventDefault();
    if (event.key === 'Enter') {
      event.preventDefault();
      const newList = [...guests];
      setFirstName(firstName);
      setLastName(lastName);
      newList.push({
        firstName: firstName,
        lastName: lastName,
        // attend: attend,
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
            // attend: attend,
          }),
        });
        const createdGuest = await response.json();
        console.log(createdGuest);
      }
      createApi().catch((error) => console.log(error));
      setFirstName('');
      setLastName('');
      console.log(guestsDisplay);
    }
  };
  // const checkingChangingName = (event) => {
  //   if (event.key === 'Enter') {
  //     event.preventDefault();
  //     const newList = [...guests];
  //     setChangeFirstName(changeFirstName);
  //     setChangeLastName(changeLastName);
  //     const result = newList.find(
  //       ({ firstName }) => firstName === changeFirstName,
  //     );
  //     console.log(typeof result.id);
  //     return result.id;
  // const changingName

  // async function createApi() {
  //   const response = await fetch(`${baseUrl}/guests/`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       firstName: firstName,
  //       lastName: lastName,
  //       attend: attend,
  //     }),
  //   });
  //   const createdGuest = await response.json();
  //   console.log(createdGuest);
  //   createdGuest.push(guestsDisplay);
  // }
  // createApi().catch((error) => console.log(error));
  // setFirstName('');
  // setLastName('');
  //   }
  // };
  const handleHittingEnterDelete = (event) => {
    event.preventDefault();
    const newList = [...guests];
    setFirstName(firstName);
    setLastName(lastName);
    const newListed = newList.filter((obj) => {
      return obj.firstName !== firstName;
    });
    setGuests(newListed);
    async function deleteGuest() {
      const response = await fetch(`${baseUrl}/guests/1`, { method: 'DELETE' });
      const deletedGuest = await response.json();
      console.log(deletedGuest);
    }
    deleteGuest().catch((error) => console.log(error));

    setFirstName('');
    setLastName('');
  };

  const handleHittingRemoveAll = (event) => {
    event.preventDefault();
    const emptyList = [];
    setGuests(emptyList);
  };

  const showAllGuestsAgain = (event) => {
    event.preventDefault();
    setGuests(guestsDisplay);
    const newList = [...guestsDisplay];
    setGuests(newList);
  };

  const showNonAttendingGuests = () => {
    // 1. Click on this first
    // event.preventDefault();
    // setGuests(guestsDisplay); // 2. Trying to set the guests list back to its original, i.e. all guests full form
    // console.log(guests); // 3. logs the full list
    const attendingGuests = [...guestsDisplay];
    // console.log(attendingGuests); // 4. logs the full list
    const newListOfNonAttendingGuests = attendingGuests.filter((guest) => {
      return guest.attending === false;
    });
    console.log(newListOfNonAttendingGuests); // 5. logs the non-attending ppl
    setGuests(newListOfNonAttendingGuests); // 6. changes the list -> only the non-attending people remain in the list
  };

  const showAttendingGuests = () => {
    // event.preventDefault(); // same result without this line
    // setGuests(guestsDisplay); // 7 Trying to set the guests list back to its original, i.e. all guests form
    console.log(guests); // it shows a mutated list of non-attending ppl for some reason, even that it wasn't touched in the showNonAttendingGuests function
    const newList = [...guestsDisplay];
    console.log(newList);
    const newListed = newList.filter((guest) => {
      return guest.attending === true;
    });
    console.log(newListed);
    setGuests(newListed);
  };

  // console.log(guests);
  const showInputFieldForUpdate = () => {
    return setNoEdit(!noEdit);
  };
  return (
    <div data-test-id="guest">
      {/* {loading ? (
        ''
      ) : ( */}
      <div>
        {/* Adding someone to the list */}
        <form onSubmit={handleHittingEnter}>
          <label htmlFor="firstName">First name</label>
          <input
            onChange={handleFirstName}
            value={firstName}
            name="firstName"
          />
          <label htmlFor="lastName">Last name</label>
          <input
            onChange={handleLastName}
            onKeyDown={handleHittingEnter}
            value={lastName}
            name="lastName"
          />
        </form>
      </div>
      {/* )} */}
      <div>
        <button onClick={handleHittingEnterDelete}>Remove</button>
        <button onClick={handleHittingRemoveAll}>Remove all guests</button>
        <button onClick={showAllGuestsAgain}>Show all guests</button>
        <button onClick={showAttendingGuests}>
          Show only attending guests
        </button>
        <button onClick={showNonAttendingGuests}>Show non-attendees</button>
      </div>
      <div>
        <div>{loading ? 'Loading...' : <h2>Guests:</h2>}</div>
        {/* Guest component */}
        {guests.map((guest) => {
          return (
            <div key={`guest-name-${guest.firstName}-${guest.lastName}`}>
              <input
                checked={guest.attending}
                type="checkbox"
                aria-label={`${guest.firstName} ${guest.lastName} attending status`}
                onChange={(event) => {
                  const newAttend = [...guests];
                  guest.attending = event.currentTarget.checked;
                  setGuests(newAttend);

                  async function updateAttend() {
                    const response = await fetch(
                      `${baseUrl}/guests/${guest.id}`,
                      {
                        method: 'PUT',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ attending: guest.attending }),
                      },
                    );
                    const updatedGuest = await response.json();
                    console.log(updatedGuest);
                  }
                  updateAttend().catch((error) => console.log(error));
                }}
              />
              {guest.firstName} {guest.lastName} is
              {guest.attending === true ? ' attending' : ' not attending'}
            </div>
          );
        })}{' '}
        {/* end of mapping */}
        <button onClick={showInputFieldForUpdate}>Edit</button>
        {/* onClick={setNoEdit(!noEdit)} */}
        {noEdit ? (
          ''
        ) : (
          <div>
            <label htmlFor="firstNameChange">
              First Name:
              <input
              /* onChange={handleChangeFirstName}*/
              />
            </label>

            <label htmlFor="lastNameChange">
              Last Name:
              {
                <input
                  id="lastNameChange" /* onChange={handleChangeLastName}*/
                />
              }
            </label>

            {/* {checkingChangingName === undefined
              ? 'Something went wrong'
              : 'The guest was found!'}                         console log shows undefined on calling checkingChangingName, but VSC says checkingChangingName is always truthy...*/}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
