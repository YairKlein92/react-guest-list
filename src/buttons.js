// // The code that works in a console logged version
// const showNonAttendingGuests = (event) => {
//   // 1. Click on this first
//   // event.preventDefault();
//   setNonAttending(guests); // 2. Trying to set the guests list back to its original, i.e. all guests full form
//   console.log(nonAttending); // 3. logs the full list
//   const nonAttendingGuests = [...guests];
//   console.log(nonAttendingGuests); // 4. logs the full list
//   const newListOfNonAttendingGuests = nonAttendingGuests.filter((guest) => {
//     return guest.attending === false;
//   });
//   console.log(newListOfNonAttendingGuests); // 5. logs the non-attending ppl
//   setNonAttending(newListOfNonAttendingGuests); // 6. changes the list -> only the non-attending people remain in the list
// };

// const showAttendingGuests = (event) => {
//   // event.preventDefault(); // same result without this line
//   setAttending(guests); // 7 Trying to set the guests list back to its original, i.e. all guests form
//   console.log(attending); // it shows a mutated list of non-attending ppl for some reason, even that it wasn't touched in the showNonAttendingGuests function
//   const attendingGuests = [...guests];
//   console.log(attendingGuests);
//   const newListOfAttendingGuests = attendingGuests.filter((guest) => {
//     return guest.attending === true;
//   });
//   console.log(newListOfAttendingGuests);
//   setAttending(newListOfAttendingGuests);
// };

// old version - the logic is fine
const showNonAttendingGuests = (event) => {
  // 1. Click on this first
  // event.preventDefault();
  setGuests(guests); // 2. Trying to set the guests list back to its original, i.e. all guests full form
  console.log(guests); // 3. logs the full list
  const attendingGuests = [...guests];
  console.log(attendingGuests); // 4. logs the full list
  const newListOfNonAttendingGuests = attendingGuests.filter((guest) => {
    return guest.attending === false;
  });
  console.log(newListOfNonAttendingGuests); // 5. logs the non-attending ppl
  setGuests(newListOfNonAttendingGuests); // 6. changes the list -> only the non-attending people remain in the list
};

const showAttendingGuests = (event) => {
  // event.preventDefault(); // same result without this line
  setGuests(guests); // 7 Trying to set the guests list back to its original, i.e. all guests form
  console.log(guests); // it shows a mutated list of non-attending ppl for some reason, even that it wasn't touched in the showNonAttendingGuests function
  const newList = [...guests];
  console.log(newList);
  const newListed = newList.filter((guest) => {
    return guest.attending === true;
  });
  console.log(newListed);
  setGuests(newListed);
};
