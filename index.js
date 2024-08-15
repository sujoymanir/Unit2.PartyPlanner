console.log("dog");
const url = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/2407-FTB-ET-WEB-FT/events`;

// const name= document.querySelector("#name");
// const date= new Date(document.querySelector("#date".value))
// const location= document.querySelector("#location").value;
// const description =document. querySelector("#description").value
const eventslist = document.querySelector("#events");
const addEvent = document.querySelector("#addEvent");
const addEventButton = document.querySelector("eventButton");
addEvent.addEventListener("submit", addEvents);

const state = {
  events: [],
};

async function render() {
  await getParties();
  renderPartyList();
}

render();

async function getParties() {
  try {
    const response = await fetch(url);
    const json = await response.json();
    console.log(json.data);
    state.events = json.data;
  } catch (error) {
    console.log(error);
  }
}

//Adds events to the API
async function addEvents(event) {
  event.preventDefault();
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: addEvent.name.value,
        description: addEvent.description.value,
        date: new Date(addEvent.date.value).toISOString(),
        location: addEvent.location.value,
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to add event");
    }
    render();
    //Initiates render function
  } catch (error) {
    console.log(error);
  }
}

//Deletes Events from API

async function deleteEvent(id) {
  try {
    const delete_response = await fetch(`${url}/${id}`, {
      method: "DELETE",
    });
    if (!delete_response.ok) {
      throw new Error("Party could not be deleted");
    }
    render();
  } catch (error) {
    console.log(error);
  }
  //Uses Hoisting to Render Changes
}
// const state = {
//   events: [],
// };
// const eventlist = document.querySelector("#events");
// async function getEvents() {
//   try {
//     const response = await fetch(API_URL, {
//       method: "POST",
//       headers:{
//         "content-type": "application/json",
//       },
//       body:JSON.stringify(newParty),
//     });

//     const json = await response.json();
//     state.events = json.data;
//   } catch (error) {
//     console.error(error);
//   }
// }

// async function addParty(event){
//   event.preventDefault();

//   const name=document.querySelector("#name").value;
//   const date= new Date(document.querySelector("#date").value)
//   const location=document.querySelector("#location").value
//   const description= document.querySelector("#description").value;

//   const newParty={
//     name,
//     date,
//     location,
//     description,
// };

// try {
//   const response = await fetch(API_URL, {
//     method: "POST",
//     headers:{
//       "content-type": "application/json",
//     },
//     body:JSON.stringify(newParty),
//   });

//   const json = await response.json();
//   state.events = json.data;
// } catch (error) {
//   console.error(error);
// }};

// function rendersArtists() {
//   if (!state.events.length) {
//     eventsList.innerHTML = `<li> No Events</li>`;
//     return;
//   }
// }
// const eventCards = state.events.map((event) => {
//   const li = document.createElement("li");

//   li.innerHTML;
// });

// async function render() {
//   await getEvents();
//   renderEvents();
// }
// render();

// async function deleteParty(event){
//   if (event.target.classList.contains("delete-button")){
//     const partyID=event.target.datatset.partyID;
//     console.log(partyID)
//   }
// }
//   try{
//     await fetch(`${API_IRL}/${partyID}`, {
//       method:"DELETE"
//     });

//     event.target.parentElement.remove();
//   } catch (error){
//    console.log(error);
//   }

function renderPartyList() {
  eventslist.replaceChildren();
  state.events.forEach((event) => {
    renderParty(event);
  });
}

function renderParty(party) {
  const li = document.createElement("li");
  li.innerHTML = `
    Name:${party.name}</strong><br>
    Description: ${new Date(party.date).toLocaleDateString()}<br>
    Date: ${party.location} <br>
    Location: ${party.description}<br>
    <button onclick="deleteEvent(${
      party.id
    })" class="delete-button" data-party-id="${party.id}">Delete</button>`;
  eventslist.appendChild(li);
}
