const firebaseConfig = {
    apiKey: "AIzaSyD0wzAzIeL6MA8oPV_2IxItPWD-a9zRGuM",
    authDomain: "devathon-98b72.firebaseapp.com",
    projectId: "devathon-98b72",
    storageBucket: "devathon-98b72.appspot.com",
    messagingSenderId: "343245133334",
    appId: "1:343245133334:web:b434e69ce2a369d9110737"
  };

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// DOM elements
const discussionForm = document.getElementById("discussion-form");
const messageInput = document.getElementById("message");
const discussionList = document.getElementById("discussion-list");

// Add a listener for the form submit event
discussionForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent the form from refreshing the page

    const message = messageInput.value.trim();
    if (message !== "") {
        // Add the message to Firestore
        db.collection("discussion").add({
            message: message,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
            messageInput.value = ""; // Clear the input field after sending
        })
        .catch((error) => {
            console.error("Error adding message: ", error);
        });
    }
});

// Listen for changes in the Firestore database and update the discussion list
db.collection("discussion")
    .orderBy("timestamp")
    .onSnapshot((snapshot) => {
        discussionList.innerHTML = ""; // Clear the previous messages

        snapshot.forEach((doc) => {
            const messageData = doc.data();
            const messageItem = document.createElement("li");
            messageItem.textContent = messageData.message;
            discussionList.appendChild(messageItem);
        });
    });
