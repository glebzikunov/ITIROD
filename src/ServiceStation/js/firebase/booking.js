//History section container
const bookingContainer = document.getElementById("history-section-wrapper");
bookingContainer.classList.add("history-section__wrapper");

let menuProfilePicture = document.getElementById("menu-profile-pic");
let profilePic = '';

// Get username
firebase.auth().onAuthStateChanged(user => {  
  if(user) {
    firebase.storage().ref('users/' + user.uid + `/profile.jpg`).getDownloadURL()
      .then(imgUrl => {
        menuProfilePicture.src = imgUrl;
        profilePic = imgUrl;
      })
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
  cardAvatar.src = profilePic;
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

  const vehicleModel = bookingForm["vehicle-model"].value;
  const firstName = bookingForm["first-name"].value;
  const lastName = bookingForm["last-name"].value;
  const appointmentDate = new Date(bookingForm["appointment-date"].value);
  const phoneNumber = bookingForm["phone-number"].value;
  const servicePlan = document.getElementById("dropdown-item").textContent;
  const message = bookingForm["message"].value;
  const today = new Date();
  const inputDate = new Date(
                              appointmentDate.getFullYear(),
                              appointmentDate.getMonth(),
                              appointmentDate.getDate()
                            );
  const currentDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  
  if(inputDate < currentDate) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Service can be ordered today or any day after!'
    })
    return false;
  } else {
    bookingForm.reset();

    const options = {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    };
    const formattedDate = inputDate.toLocaleString('en-US', options);

    let id = timeCounter += 1;
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

        Email.send({
          SecureToken : "115c094e-9f05-4c94-8fdd-86edad573017",
          To : 'zikunovgatrader@gmail.com',
          From : user.email,
          Subject : "New Service!",
          Body : `First Name: ${firstName} <br>
                  Last Name: ${lastName} <br>
                  Vehicle Model: ${vehicleModel} <br>
                  Appointment Date: ${formattedDate} <br>
                  Phone Number: ${phoneNumber} <br>
                  Service Plan: ${servicePlan} <br>
                  Message: ${message}`
        }).then(
          message => Swal.fire({
            icon: 'info',
            title: `${message}`
          })
        );
      }
    })
  }
})

//Real time event listener
firebase.auth().onAuthStateChanged(user => {
  if(user) {
    firebase.firestore().collection(user.uid).onSnapshot(snapshot => {
      bookingContainer.innerHTML = '';
      let changes = snapshot.docChanges();
      changes.forEach(change => {
        if(change.type === "added") {
          renderData(change.doc);
        }
        else if(change.type === "removed") {
          let li = bookingContainer.querySelector("[data-id=" + change.doc.id + "]");
          bookingContainer.removeChild(li);
        }
      })
    })

    const dropdownItems = document.querySelectorAll('.dropdown__menu li');
    dropdownItems.forEach(item => {
      item.addEventListener('click', () => {
        const selectedItem = document.getElementById('dropdown-item-sorted');
        selectedItem.textContent = item.textContent;
        if (selectedItem.textContent === "Desc Date") {
          firebase.firestore().collection(user.uid).orderBy("formattedDate", "desc").get().then((snapshot) => {
            snapshot.forEach(doc => {
              renderData(doc);
            })
          })
        } else if (selectedItem.textContent === "Asc Date") {
          firebase.firestore().collection(user.uid).orderBy("formattedDate", "asc").get().then((snapshot) => {
            snapshot.forEach(doc => {
              renderData(doc);
            })
          })
        } else if (selectedItem.textContent === "All Booking") {
          firebase.firestore().collection(user.uid).get().then((snapshot) => {
            snapshot.forEach(doc => {
              renderData(doc);
            })
          })
        }
      })
    })

    const observer = new MutationObserver(() => {
      bookingContainer.innerHTML = '';
    });
    observer.observe(document.getElementById('dropdown-item-sorted'), { childList: true });
  }
})
