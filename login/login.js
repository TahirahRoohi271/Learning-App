import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";


const firebaseConfig = {
    apiKey: "AIzaSyD0wzAzIeL6MA8oPV_2IxItPWD-a9zRGuM",
    authDomain: "devathon-98b72.firebaseapp.com",
    projectId: "devathon-98b72",
    storageBucket: "devathon-98b72.appspot.com",
    messagingSenderId: "343245133334",
    appId: "1:343245133334:web:b434e69ce2a369d9110737"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

var btn = document.getElementById("loginBtn")
btn.addEventListener("click", () => {
  var email = document.getElementById("email").value
  var password = document.getElementById("pass").value
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      Swal.fire({
        text: `User Signed Up !`,
        icon: 'success',
        confirmButtonText: 'OK'
      })
        // if (email === "tahirahh@gmail.com" && password === "TahirahRoohi") {
        //   console.log("Redirecting to the dashboard.");
        //   location.href = '../enroll.html';
        // } else{
        //   console.log("Redirecting to the signup page.");
        //   window.location.href = '../enroll.html';
        // }
        window.location.href = '../enroll/enroll.html'
       
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      if (errorMessage === "Firebase: Error (auth/invalid-email).") {
        Swal.fire({
          text: `Invalid Email Address`,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
      else if (errorMessage === "Firebase: Error (auth/user-not-found).") {
        Swal.fire({
          text: `This email Is Not Signed Up`,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
      else if (errorMessage === "Firebase: Error (auth/missing-password).") {
        Swal.fire({
          text: `Enter Password First`,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
      else if (errorMessage === "Firebase: Error (auth/wrong-password).") {
        Swal.fire({
          text: `Wrong Password Entered`,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    });
})

onAuthStateChanged(auth, async (user) => {
  if (user) {
      location.replace("../enroll.html")
  }
})