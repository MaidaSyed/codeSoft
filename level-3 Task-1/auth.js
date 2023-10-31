// ================== ACTIVE FORM ======================

const wrapper = document.querySelector(".wrapper");
const registerLink = document.querySelector(".register-link");
const loginLink = document.querySelector(".login-link");

registerLink.onclick = () => {
    wrapper.classList.add("active")
}

loginLink.onclick = () => {
    wrapper.classList.remove("active")
}

// ================ SIDNUP WORK ======================
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js"
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js"

const auth = getAuth();
const database = getDatabase();

const loader = document.querySelector(".lds-spinner");
const body = document.querySelector(".spinner-overlay");

function showLoader() {
    loader.style.display = "flex"
    body.style.display = "flex"
}
function hideLoader() {
    loader.style.display = "none"
    body.style.display = "none"
}
hideLoader()
const signup = () => {
    let username = document.getElementById("name");
    let email = document.getElementById("signup-email");
    let password = document.getElementById("signup-password");
  
    // Regular expression for checking if the email contains "@gmail.com"
    const emailPattern = /@gmail\.com$/;
  
    // Regular expression for checking if the password contains at least one alphabet, one number, and one special character
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  
    if (!username.value || !email.value || !password.value) {
      Swal.fire('Please fill out all fields');
      return;
    }
  
    if (!emailPattern.test(email.value)) {
      Swal.fire('Email should contain @gmail.com');
      return;
    }
  
    if (!passwordPattern.test(password.value)) {
      Swal.fire('Password must contain at least one alphabet, one number, and one special character (8 characters minimum)');
      return;
    }
  
    createUserWithEmailAndPassword(auth, email.value, password.value)
      .then((response) => {
        let uniqueId = auth.currentUser.uid;
        let userReference = ref(database, "users/" + uniqueId);
  
        let userObj = {
          name: username.value,
          email: email.value,
          password: password.value
        };
  
        showLoader();
  
        async function createUserAndRedirect() {
          try {
            await set(userReference, userObj); // Wait for data to be set
            hideLoader();
  
            await Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'User has been created',
              showConfirmButton: false,
              timer: 1500,
            });
  
            // Wait for 1 second before redirecting
            await new Promise(resolve => setTimeout(resolve, 500));
            location.href = 'profile.html';
          } catch (error) {
            hideLoader();
            console.error("Error adding user data:", error);
            // Handle error here if needed
          }
        }
  
        // Call the function to start the process
        createUserAndRedirect();
      })
      .catch((error) => {
        const errorMessage = error.message;
        hideLoader();
        let errorText = errorMessage;
        switch (errorMessage) {
          case 'Firebase: Error (auth/invalid-email).':
            errorText = 'Invalid Email';
            break;
          case 'Firebase: Error (auth/email-already-in-use).':
            errorText = 'This email is already in use. Try a different one.';
            break;
          default:
            errorText = 'Something went wrong';
        }
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: errorText,
        });
      });
  };
  
  let signupBtn = document.getElementById("register-btn");
  signupBtn.addEventListener("click", signup);
  

// ================ LOGIN WOKING ======================
const login = () => {
    let email = document.getElementById("login-email")
    let password = document.getElementById("login-password")
    showLoader()
    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((resolve) => {
            hideLoader()
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Successfully Login',
                showConfirmButton: false,
                timer: 1500,
            });
            setTimeout(function () {
                window.location.href = "./profile.html"
            }, 1500)

        }).catch((error) => {
            if ((!email.value ||
                !password.value)) {
                Swal.fire('Please fill out  all fields');
            } else {
                const errorMessage = error.message;
                hideLoader();
                let errorText = errorMessage;
                switch (errorMessage) {
                    case 'Firebase: Error (auth/wrong-password).':
                        errorText = 'Wrong password';
                        break;
                    case 'Firebase: Error (auth/user-not-found).':
                        errorText = 'This email has no account';
                        break;
                    default:
                        errorText = 'Something went wrong';
                }
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: errorText,
                });
            }
        })
}
let loginBtn = document.getElementById("login-btn")
loginBtn.addEventListener("click", login)