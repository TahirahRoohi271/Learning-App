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
const subjectSelect = document.getElementById("subject");
const levelSelect = document.getElementById("level");
const instructorSelect = document.getElementById("instructor");
const searchButton = document.getElementById("search");
const coursesList = document.getElementById("courses-list");
const courseDetailsModal = document.getElementById("course-details-modal");

// Event listeners
searchButton.addEventListener("click", searchCourses);
coursesList.addEventListener("click", openCourseDetails);

// Function to fetch courses from Firebase based on filters
function searchCourses() {
    const selectedSubject = subjectSelect.value;
    const selectedLevel = levelSelect.value;
    const selectedInstructor = instructorSelect.value;

    // Query the Firestore database to fetch courses based on filters
    let query = db.collection("courses");

    if (selectedSubject) {
        query = query.where("subject", "==", selectedSubject);
    }

    if (selectedLevel) {
        query = query.where("level", "==", selectedLevel);
    }

    if (selectedInstructor) {
        query = query.where("instructor", "==", selectedInstructor);
    }

    query.get().then((querySnapshot) => {
        coursesList.innerHTML = ""; // Clear the previous results

        querySnapshot.forEach((doc) => {
            const courseData = doc.data();
            const courseItem = document.createElement("div");
            courseItem.className = "course-item";
            courseItem.innerHTML = `
                <h2>${courseData.title}</h2>
                <p>Instructor: ${courseData.instructor}</p>
                <p>Level: ${courseData.level}</p>
                <p>Description: ${courseData.description}</p>
            `;
            courseItem.dataset.courseId = doc.id;
            coursesList.appendChild(courseItem);
        });
    });
}

// Function to open a modal with course details
function openCourseDetails(event) {
    if (event.target && event.target.className === "course-item") {
        const courseId = event.target.dataset.courseId;
        const courseRef = db.collection("courses").doc(courseId);

        courseRef.get().then((doc) => {
            if (doc.exists) {
                const courseData = doc.data();
                courseDetailsModal.innerHTML = `
                    <h2>${courseData.title}</h2>
                    <p>Instructor: ${courseData.instructor}</p>
                    <p>Level: ${courseData.level}</p>
                    <p>Description: ${courseData.description}</p>
                `;
                courseDetailsModal.style.display = "block";
            }
        });
    }
}
// ...

// Function to fetch courses from Firebase based on filters
function searchCourses() {
    const selectedSubject = subjectSelect.value;
    const selectedLevel = levelSelect.value;
    const selectedInstructor = instructorSelect.value;

    // Query the Firestore database to fetch courses based on filters
    let query = db.collection("courses");

    if (selectedSubject) {
        query = query.where("subject", "==", selectedSubject);
    }

    if (selectedLevel) {
        query = query.where("level", "==", selectedLevel);
    }

    if (selectedInstructor) {
        query = query.where("instructor", "==", selectedInstructor);
    }

    query.get().then((querySnapshot) => {
        coursesList.innerHTML = ""; // Clear the previous results

        if (querySnapshot.size > 0) {
            querySnapshot.forEach((doc) => {
                const courseData = doc.data();
                const courseItem = document.createElement("div");
                courseItem.className = "course-item";
                courseItem.innerHTML = `
                    <h2>${courseData.title}</h2>
                    <p>Instructor: ${courseData.instructor}</p>
                    <p>Level: ${courseData.level}</p>
                    <p>Description: ${courseData.description}</p>
                `;
                courseItem.dataset.courseId = doc.id;
                coursesList.appendChild(courseItem);
            });
        } else {
            // No results found, display dummy search results
            dummyResults.forEach((result) => {
                const courseItem = document.createElement('div');
                courseItem.className = "course-item";
                courseItem.innerHTML = `
                    <h2>${result.title}</h2>
                    <p>Instructor: ${result.instructor}</p>
                    <p>Level: ${result.level}</p>
                `;
                coursesList.appendChild(courseItem);
            });
        }
    });
}

const dummyResults = [
    {
        title: "Dummy Subject",
        instructor: "Miss Hina ",
        level: "Beginner",
    },
    {
        title: "Dummy Subject",
        instructor: "Miss Iqra ",
        level: "Intermediate",
    },
    {
        title: "Dummy Subject",
        instructor: "Miss Faiza",
        level: "Advanced",
    },
];
