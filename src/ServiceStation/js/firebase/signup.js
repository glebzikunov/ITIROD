const registerBtn = document.getElementById("signup").onclick = ((e) => {
  e.preventDefault()

  const email = document.getElementById("email").value
  const password = document.getElementById("password").value

  // Verify username and password
  if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Email format is wrong!'
    })
    return false;
  }

  if (password.length < 8) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Password must contain more than 7 symbols!'
    })
    return false;
  }

  {
    const registerDate = new Date();

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredentials) => {
      firebase.firestore().collection("users").doc(userCredentials.user.uid).set({
        email: email,
        userId: userCredentials.user.uid,
        registrationDate: registerDate.getDate() + "." + (registerDate.getMonth() + 1) + "." + registerDate.getFullYear()
      })
      Swal.fire({
        icon: 'success',
        title: 'Good job!',
        text: 'You have been successfully registered!',
        confirmButtonText: 'Login?'
      }).then(function() {
        window.location.href = "/html/login.html"
      })
    }).catch(error => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${error.message}`
      })
      return false;
    })
  }
})