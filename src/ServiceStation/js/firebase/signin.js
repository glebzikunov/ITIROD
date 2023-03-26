const loginBtn = document.getElementById("signin").onclick = ((e) => {
  e.preventDefault()

  const password = document.getElementById("password").value
  const email = document.getElementById("email").value

  // Verify username and password
  if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Email format is wrong!'
    })
    return false;
  } else {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredentials) => {
      sessionStorage.setItem("uid", userCredentials.user.uid)
      window.location.href = "/html/booking.html"
    }).catch((error) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${error.message}`,
        confirmButtonText: 'Try again!'
      }).then(function() {
        return false;
      })
    })
  }
}) 