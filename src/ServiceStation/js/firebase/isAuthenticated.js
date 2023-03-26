const uid = sessionStorage.getItem("uid")

  if (uid == null) {
    window.location.href = "/html/login.html"
  }