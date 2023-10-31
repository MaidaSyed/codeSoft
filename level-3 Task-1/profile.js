import { getDatabase, ref, push, get, onValue, update, remove, } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js"
import { getAuth, signOut, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js"
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-storage.js"

import { db } from "./config.js";
const auth = getAuth();
const database = getDatabase()
const storage = getStorage()
let userUid;

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

auth.onAuthStateChanged(user => {
  if (user) {
    userUid = auth.currentUser.uid
    // User is signed in, you can now access the Firebase Realtime Database
    const userId = auth.currentUser.uid;
    const databaseRef = ref(database, "users/" + userId);

    // Example: Fetch data from the Firebase Realtime Database
    onValue(databaseRef, (snapshot) => {
      console.log(snapshot.val());
      let username = document.getElementById("name")
      let name = document.querySelector(".name")
      username.innerHTML = `${snapshot.val().name}`;
      name.innerHTML = snapshot.val().name + " ||";
    })
  } else {
    // User is signed out, handle accordingly
    console.log('User is signed out.');
  }
});
// NAME EDIT FROM PROFILE
const editName = () => {
  const userId = auth.currentUser.uid
  const editBox = document.querySelector(".editName");
  const editBtn = document.getElementById("editName-btn");
  const nameInp = document.getElementById("editedName");
  editBox.classList.add("active")

  const editNameinFirebase = () => {
    const userNameRef = ref(database, "users/" + userId)
    update(userNameRef, {
      name: nameInp.value
    });
  }

  editBtn.addEventListener("click", () => {
    editNameinFirebase()
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Name edited',
        showConfirmButton: false,
        timer: 1500,
      });
    nameInp.innerHTML = ""
    editBox.classList.remove("active")
    const overlay = document.querySelector(".overlay")
    overlay.style.display = "none"
  })
}
const edit = document.querySelector(".fa-pen-to-square")
edit.addEventListener("click", () => {
  editName()
  const overlay = document.querySelector(".overlay")
  overlay.style.display = "block"
})
// CANCEL BOX
const cancel = document.querySelectorAll(".cancel-name");
cancel.forEach(btn => {
  btn.addEventListener("click", () => {
    const nameInp = document.getElementById("editedName");
    let delBox = document.querySelector(".editName");
    const overlay = document.querySelector(".overlay")
    overlay.style.display = "none"
    delBox.classList.remove("active")
    nameInp.value = ""
  })
})

// ======================

// PASSWORD UPDATE WORKING
const btnPass = document.getElementById("updatePass");

const updatePass = () => {
  const user = auth.currentUser;
  const userUid = auth.currentUser.uid;
  console.log(userUid);
  const oldPassInput = document.getElementById('old-pass').value;
  const newPassInput = document.getElementById('new-pass').value;
  const repPassInput = document.getElementById('rep-pass').value;

  const databaseRef = ref(database, "users/" + userUid);

  let password;
  // Example: Fetch data from the Firebase Realtime Database
  onValue(databaseRef, (snapshot) => {
    password = snapshot.val().password
  })
  // Reauthenticate the user using their current password
  const credential = EmailAuthProvider.credential(user.email, oldPassInput);

  reauthenticateWithCredential(user, credential)
    .then(() => {
      // Reauthentication successful, now update the password
      if (newPassInput === repPassInput && oldPassInput === password) {
        updatePassword(user, newPassInput)
          .then(() => {
            update(databaseRef, {
              password: newPassInput
            })
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Password Update',
              showConfirmButton: true,
              timer: 1500,
            });
            // Clear input fields
            document.getElementById('old-pass').value = '';
            document.getElementById('new-pass').value = '';
            document.getElementById('rep-pass').value = '';
          })
          .catch((error) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: "Something Went Wrong",
            });
          });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: "Repeat passsword should same as new Password",
        });
      }
    })
    .catch((error) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Olg Password Is in Correct",
      });
    });
};
btnPass.addEventListener("click", updatePass);
// =============================================

// SIGNOUT USER WORKING
const signoutUser = () => {
  signOut(auth)
    .then(() => {
      console.log("User signout");
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Signout',
        showConfirmButton: false,
        timer: 1500,
      });
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
    showLoader()
  window.location.href = "./index.html"
};
const logout = document.getElementById("logout")
logout.addEventListener("click", signoutUser)
// ===================

// ADDBLOGS IN FIREBASE
const title = document.getElementById("title");
const text = document.getElementById("text");
const addBtn = document.getElementById("add-blog");

// SEND TIME
const currentDate = new Date();
let hours = currentDate.getHours();
let minutes = currentDate.getMinutes();
const ampm = hours >= 12 ? 'PM' : 'AM';
if (hours > 12) {
  hours -= 12;
}
minutes = minutes < 10 ? `0${minutes}` : minutes;
const formattedTime = `${hours}:${minutes} ${ampm}`;
// SEND DATE
const months = [
  "Jan", "Feb", "March", "April", "May", "June",
  "July", "Aug", "Sep", "Oct", "Nov", "Dec"
];
const date = new Date();
const day = date.getDate();
const year = date.getFullYear();
const monthIndex = date.getMonth();
const monthName = months[monthIndex];
let blogDate = `${day}-${monthName}-${year}`

// SEND TIME 
const sendBlogs = () => {
  const blogTitle = title.value;
  const blogText = text.value;
  let uniqueId = auth.currentUser.uid

  const databaseRef = ref(database, "users/" + uniqueId);
  let userName;
  // Example: Fetch data from the Firebase Realtime Database
  onValue(databaseRef, (snapshot) => {
    console.log(snapshot.val());
    userName = snapshot.val().name
  })
  if (blogText.length >= 50 && blogTitle && blogText) {
    const blogRef = ref(db, "blogs/", uniqueId);
    push(blogRef, {
      title: blogTitle,
      text: blogText,
      timestamp: formattedTime,
      date: blogDate,
      userId: uniqueId,
      name: userName,
    });
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Blog added',
        showConfirmButton: false,
        timer: 1500,
      });
    title.value = "";
    text.value = "";
      showLoader()
  window.location.reload()
  } else {
    Swal.fire('Blog should be 50 characters long');
  }
}
addBtn.addEventListener("click", sendBlogs);
// ======================================

// ADD BLOG IN PROFILE PAGE
const dbRef = ref(db, "blogs/");
const snapshot = await get(dbRef);
const blogContainer = document.querySelector(".blogs");
blogContainer.innerHTML = ""; // Clear the container to remove previously displayed blogs
// Create an array to store blog objects
let userArray = []
let userBlogArr = []
let userDate = []
let userName = []
let blogKey = []
let blogTime = []
let userBlogText;
let userBlogTitle;
let userBlogDate;
let blogUserName;
let blogKeyGet;
let blogTiming
snapshot.forEach((user) => {
  showLoader()
  const blogUid = user.val().userId; // Get the UID associated with each blog

  // Check if the blog belongs to the currently logged-in user
  if (blogUid === userUid) {
    userBlogTitle = user.val().title
    userBlogText = user.val().text
    userBlogDate = user.val().date
    blogUserName = user.val().name
    blogTiming = user.val().timestamp
    blogKeyGet = user.key

    // Push the blog object into the array
    userArray.push(userBlogTitle);
    userBlogArr.push(userBlogText);
    userName.push(blogUserName);
    userDate.push(userBlogDate);
    blogKey.push(blogKeyGet);
    blogTime.push(blogTiming)
  }
});
// BLOG ADDED FUNCTION
userArray.reverse();
userBlogArr.reverse();
userName.reverse();
userDate.reverse();
blogKey.reverse();
blogTime.reverse();

const addBlog = (title, blog, name, date, key, time) => {
  const blogDiv = document.createElement("div")
  blogDiv.className = "blogDiv"
  const blogDiv1 = document.createElement("div")
  blogDiv1.className = "userName"
  blogDiv1.innerHTML = `<h1>${name} <br><span> || ${date}</span></h1> `
  const blogDiv2 = document.createElement("div")
  blogDiv2.className = "blog"
  blogDiv2.innerHTML = `<strong>${title} :</strong> <br> 
                          <p>${blog}</p> <br>
                          <button class="edit" data-blog-key="${blog.key}">EDIT</button> 
                          <button class="delete">DELETE</button> <br>
                          <button class="blogKey">${key}</button> <br>
                          <p id="time">This blog is post at <span>${time}</span></p>`

  blogDiv.appendChild(blogDiv1)
  blogDiv.appendChild(blogDiv2)
  blogContainer.appendChild(blogDiv)
}
for (let i = 0; i < userArray.length; i++) {
  addBlog(userArray[i], userBlogArr[i], userName[i], userDate[i], blogKey[i], blogTime[i]);
}
hideLoader()
// =====================================================

// EDIT BLOG WORKING
snapshot.forEach((user) => {
  // // EDIT BLOG OPTIONS 
  const blogUid = user.val().userId; // Get the UID associated with each blog

  // Check if the blog belongs to the currently logged-in user
  if (blogUid === userUid) {
    let editBtn = document.querySelectorAll(".edit");
    // console.log(editBtn);

    const editBLogs = (key) => {
      let blogBox = document.querySelector(".updateBlogs");
      blogBox.classList.add("active");
      const overlay = document.querySelector(".overlay");
      overlay.style.display = "flex";
      const editBlogBtn = document.getElementById("edit-btn")
      const title = document.getElementById("updateTitle");
      const text = document.getElementById("updateBlog");

      const blogRef = ref(database, "blogs/" + key)

      let titleValue;
      let textValue;
      onValue(blogRef, (snapshot) => {
        titleValue = snapshot.val().title;
        textValue = snapshot.val().text;
        title.value = titleValue;
        text.textContent = textValue;
        console.log(titleValue);
        console.log(textValue);
      })

      const updateBlogsInFirebase = () => {

        const blogRef = ref(database, "blogs/" + key)

        update(blogRef, {
          title: title.value,
          text: text.value,
        })
        title.innerHTML = ""
        text.innerHTML = ""
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Blog successfully edited',
            showConfirmButton: false,
            timer: 1500,
          });
        blogBox.classList.remove("active");
        showLoader()
        window.location.reload()
      }
      editBlogBtn.addEventListener("click", updateBlogsInFirebase)
    }

    editBtn.forEach(btn => {
      btn.addEventListener("click", () => {
        // Find the closest .blogDiv parent element to the clicked button
        const blogDiv = btn.closest(".blogDiv");

        // Get the blog key from the .blogKey element within the found .blogDiv
        const blogKey = blogDiv.querySelector(".blogKey").innerHTML;

        console.log(blogKey);
        editBLogs(blogKey)
        // Further processing or editing can be done here

        const overlay = document.querySelector(".overlay");
        overlay.style.display = "flex";
      });
    });
  }
  // ==========================================
})
// CANCEL BUTTON
const cancelEdit = document.querySelectorAll(".cancel-blog");
cancelEdit.forEach(btn => {
  btn.addEventListener("click", () => {
    let blogBox = document.querySelector(".updateBlogs");
    const overlay = document.querySelector(".overlay")
    const title = document.getElementById("updateTitle")
    const text = document.getElementById("updateBlog")
    title.value = ""
    text.value = ""
    overlay.style.display = "none"
    blogBox.classList.remove("active")
  })
})
// ================================


// DELETE BLOGS WORKING
let delBtn = document.querySelectorAll(".delete");

const deleteBlogs = (blogKey) => {
  let delBox = document.querySelector(".deleteBlogs");
  const delBlogBtn = document.getElementById("del-btn");
  delBox.classList.add("active")

  const delBlogs = () => {
    // Create a reference to the blog you want to update
    const blogRef = ref(database, "blogs/" + blogKey);

    // Update the blog's title and text
    remove(blogRef)
      .then(function () {
        console.log("Data deleted successfully!");
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Blog successfully deleted',
            showConfirmButton: false,
            timer: 1500,
          });
        delBox.classList.remove("active")
        showLoader()
        window.location.reload()
      })
      .catch(function (error) {
        console.error("Error deleting data: ", error);
      });

  }
  delBlogBtn.addEventListener("click", delBlogs)
  // delBox.classList.remove("active");
}
delBtn.forEach(btn => {
  btn.addEventListener("click", () => {
    // Find the closest .blogDiv parent element to the clicked button
    const blogDiv = btn.closest(".blogDiv");

    // Get the blog key from the .blogKey element within the found .blogDiv
    const blogKey = blogDiv.querySelector(".blogKey").innerHTML;

    deleteBlogs(blogKey)
    // Further processing or editing can be done here

    const overlay = document.querySelector(".overlay");
    overlay.style.display = "flex";
  });
});

// ===========================
const cancelDel = document.querySelectorAll(".cancel-del");

cancelDel.forEach(btn => {
  btn.addEventListener("click", () => {
    let delBox = document.querySelector(".deleteBlogs");
    const overlay = document.querySelector(".overlay")
    overlay.style.display = "none"
    delBox.classList.remove("active")
  })
})
// ============================

// PROFLE IMAGE WORKING
const editProfile = () => {
  const userId = auth.currentUser.uid;
  const uploadBox = document.querySelector(".editProfile");
  uploadBox.classList.add("active");

  const uploadBtn = document.getElementById('editProfile-btn');
  const fileInput = document.getElementById('editedProfile');

  uploadBtn.addEventListener('click', () => {
    const file = fileInput.files[0];

    if (file) {
      const timestamp = Date.now();
      const filename = `${timestamp}_${file.name}`;

      const profileRef = storageRef(storage, 'Profile-images/' + filename);

      uploadBytes(profileRef, file)
        .then((snapshot) => {
          console.log('File uploaded successfully.');
          getDownloadURL(snapshot.ref)
            .then((downloadURL) => {
              const imageUrl = downloadURL;

              const userRef = ref(database, 'users/' + userId);

              update(userRef, {
                imageUrl: imageUrl,
              })
                .then(() => {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Profile picture uploaded',
                        showConfirmButton: false,
                        timer: 1500,
                      });
                  console.log('User data updated with image URL.');
                  uploadBox.classList.remove("active");
                  const overlay = document.querySelector(".overlay");
                  overlay.style.display = "none";
                })
                .catch((error) => {
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: "Something went wrong",
                  });
                });
            })
            .catch((error) => {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Something went wrong",
              })
            });
        })
        .catch((error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "Something went wrong",
          })
        });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "PLEASE SELECT PROFILE IMAGE",
      });
    }
  });
};

const upload = document.querySelector(".fa-upload");
upload.addEventListener("click", () => {
  editProfile();
  const overlay = document.querySelector(".overlay");
  overlay.style.display = "block";
});
//===================================
// CANCEL BOX
const cancelProfile = document.querySelectorAll(".cancel-profile");
cancelProfile.forEach(btn => {
  btn.addEventListener("click", () => {
    let delBox = document.querySelector(".editProfile");
    const overlay = document.querySelector(".overlay")
    overlay.style.display = "none"
    delBox.classList.remove("active")
  })
})
//=======================

//  SHOW PROFILE IMG
showLoader()
function showImg() {
  const userUid = auth.currentUser.uid
  const profileImg = document.getElementById("profile-img")
  const roundProfile = document.getElementById("round-prof")
  const databaseRef = ref(database, "users/" + userUid);
  onValue(databaseRef, (snapshot) => {
    const url = snapshot.val().imageUrl
    profileImg.src = url
    roundProfile.src = url
    // console.log(url);
  })
}
showImg()
hideLoader()
// ===========================