//History section container
const bookingContainer = document.getElementById("history-section-wrapper");
bookingContainer.classList.add("history-section__wrapper");

// Get username
firebase.auth().onAuthStateChanged(user => {  
  if(user) {
    // console.log(user.uid)
    // console.log(user.email)

    const username = document.getElementById("username");
    username.innerText = user.email;
  } else {
    console.log("User is not logged in!")
  }
})

//Get bookings
function renderData(individualDoc) {
  //Booking card
  let bookingCard = document.createElement("div");
  bookingCard.classList.add("history-section__history-card");
  bookingCard.setAttribute('data-id', individualDoc.id);

  //Card image
  let cardAvatar = document.createElement("img");
  cardAvatar.src = "/images/Profile-avatar.jpg";
  cardAvatar.classList.add("history-card__avatar");

  //Wrapper for text fields
  let cardWrapper = document.createElement("div");
  cardWrapper.classList.add("history-card__wrapper");

  //Text fields
  let userName = document.createElement("p");
  userName.classList.add("history-card__username");
  
  firebase.auth().onAuthStateChanged(user => {  
    if(user) {
      userName.innerText = user.email; 
    } else {
      console.log("User is not logged in!")
    }
  })
  
  let vehicle = document.createElement("p");
  vehicle.classList.add("history-card__vehicle-model");
  vehicle.innerText = individualDoc.data().vehicleModel;

  let serviceType = document.createElement("p");
  serviceType.classList.add("history-card__service-type");
  serviceType.innerText = individualDoc.data().servicePlan;

  let serviceDate = document.createElement("p");
  serviceDate.classList.add("history-card__date");
  serviceDate.innerText = individualDoc.data().formattedDate;

  //Status field
  let statusDiv = document.createElement("div");
  statusDiv.classList.add("history-card__status");
  statusDiv.textContent = "Pending"

  //Checkbox
  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("history-card__checkbox");

  //Appending
  bookingContainer.appendChild(bookingCard);
  bookingCard.appendChild(cardAvatar);
  bookingCard.appendChild(cardWrapper);
  cardWrapper.appendChild(userName);
  cardWrapper.appendChild(vehicle);
  cardWrapper.appendChild(serviceType);
  cardWrapper.appendChild(serviceDate);
  cardWrapper.appendChild(statusDiv);
  cardWrapper.appendChild(checkbox);
}

//Adding bookings
const bookingForm = document.getElementById("booking-form");
const date = new Date();
const time = date.getTime();
let timeCounter = time;

bookingForm.addEventListener("submit", e => {
  e.preventDefault();

  const dateRegex = /^\d{2}\.\d{2}\.\d{4}$/;

  const vehicleModel = bookingForm["vehicle-model"].value;
  const firstName = bookingForm["first-name"].value;
  const lastName = bookingForm["last-name"].value;
  const appointmentDate = bookingForm["appointment-date"].value;
  const phoneNumber = bookingForm["phone-number"].value;
  const servicePlan =document.getElementById("dropdown-item").textContent;
  const message = bookingForm["message"].value;

  if(!dateRegex.test(appointmentDate) && appointmentDate.length > 10) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Date format must be: DD.MM.YYYY'
    })
    return false;
  } else {
    const dateParts = appointmentDate.split('.');
    const date = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);

    const options = {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    };
    const formattedDate = date.toLocaleString('en-US', options);

    let id = timeCounter += 1;
    bookingForm.reset();
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        firebase.firestore().collection(user.uid).doc('_' + id).set({
          id: '_' + id,
          vehicleModel,
          firstName,
          lastName,
          formattedDate,
          phoneNumber,
          servicePlan,
          message
        }).then(() => {
          console.log("Booking added")
        }).catch(error => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${error.message}`
          })
        })
      }
    })
  }
})

//Real time event listener
firebase.auth().onAuthStateChanged(user => {
  if(user) {
    firebase.firestore().collection(user.uid).onSnapshot(snapshot => {
      let changes = snapshot.docChanges();
      changes.forEach(change => {
        if(change.type === "added") {
          renderData(change.doc)
        }
        else if(change.type === "removed") {
          let li = bookingContainer.querySelector("[data-id=" + change.doc.id + "]");
          bookingContainer.removeChild(li);
        }
      })
    })
  }
})