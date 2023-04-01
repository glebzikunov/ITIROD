let profilePicture = document.getElementById("profile-pic")
let menuProfilePicture = document.getElementById("menu-profile-pic")
let file = {};

firebase.auth().onAuthStateChanged(user => {  
  if(user) {
    $('#username').attr('placeholder', user.email);
    firebase.storage().ref('users/' + user.uid + `/profile.jpg`).getDownloadURL()
      .then(imgUrl => {
        profilePicture.src = imgUrl;
        menuProfilePicture.src = imgUrl;
      })
  } else {
    console.log("User is not logged in!")
  }
})

const updateProfileForm = document.getElementById("update-form");

updateProfileForm.addEventListener("submit", e => {
  e.preventDefault()
  
  const user = firebase.auth().currentUser;
  const newEmail = updateProfileForm["username"].value;
  const newPassword = updateProfileForm["new-password"].value;
  updateProfileForm.reset();

  if(newEmail && newPassword) {
    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(newEmail))) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Email format is wrong!'
      })
      return false;
    }
  
    if (newPassword.length < 8) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Password must contain more than 7 symbols!'
      })
      return false;
    }
    
    const credential = createCredentials(user);
    changeEmail(user, credential, newEmail);
    changePassword(user, credential, newPassword);
  } else if (newPassword) {
      if (newPassword.length < 8) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Password must contain more than 7 symbols!'
        })
        return false;
      }

      const credential = createCredentials(user);
      changePassword(user, credential, newPassword);
  } else if (newEmail) {
      if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(newEmail))) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Email format is wrong!'
        })
        return false;
      }

      const credential = createCredentials(user);
      changeEmail(user, credential, newEmail);
  } else if (!jQuery.isEmptyObject(file)) {
    firebase.storage().ref('users/' + user.uid + `/profile.jpg`).put(file).then(function () {
      Swal.fire({
        icon: 'success',
        title: 'Good job!',
        text: 'Profile picture have been updated!',
      })
    }).catch(error => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${error.message}`
      })
    })
  }
})

function chooseFile(e) {
  file = e.target.files[0];
}

const createCredentials = (user) => {
  const password = prompt('Password: ');
  const credential = firebase.auth.EmailAuthProvider.credential(
    user.email,
    password
  );

  return credential;
}

const changeEmail = (user, credential, newEmail) => {
  user.reauthenticateWithCredential(credential).then(() => {
    user.updateEmail(newEmail);
    Swal.fire({
      icon: 'success',
      title: 'Good job!',
      text: 'User email updated successfully!',
    })

    let userRef = firebase.firestore().collection("users").doc(user.uid) 
    userRef.update({
      "email": newEmail
    })
  }).catch(error => {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: `${error.message}`
    })
  }) 
}

const changePassword = (user, credential, newPassword) => {
  user.reauthenticateWithCredential(credential).then(() => {
    user.updatePassword(newPassword);
    Swal.fire({
      icon: 'success',
      title: 'Good job!',
      text: 'User password updated successfully!',
    })
  }).catch(error => {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: `${error.message}`
    })
  }) 
}