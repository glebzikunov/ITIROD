document.getElementById("logout").onclick = (() => {
  firebase.auth().signOut().then(() => {
    sessionStorage.removeItem("uid")
    Swal.fire({
      icon: 'success',
      title: 'Good job!',
      text: 'You have been successfully logged out!'
    }).then(function () {
      window.location.href = "/html/login.html"
      return false;
    })
  }).catch(error => {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: `${error.message}`,
    }).then(function() {
      return false;
    })
  })
  
  return false;
})