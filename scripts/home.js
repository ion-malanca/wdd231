const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
});

const classes = [
    {
        name: "WDD 130",
        credits: 2,
        type: "WDD"
    },
    {
        name: "WDD 131",
        credits: 2,
        type: "WDD"
    },
    {
        name: "WDD 231",
        credits: 2,
        type: "WDD"
    },
    {
        name: "CSE 110",
        credits: 2,
        type: "CSE"
    },
    {
        name: "CSE 111",
        credits: 2,
        type: "CSE"
    },
    {
        name: "CSE 210",
        credits: 2,
        type: "CSE"
    }
]

const container = document.getElementById("course-container");
const creditsDisplay = document.getElementById("credits");

function displayCourses(courseList) {
    container.innerHTML = "";
    let totalCredits = 0;
    courseList.forEach(course => {
        totalCredits += course.credits;
        const card = document.createElement("div");
        card.classList.add("course");
        card.innerHTML = `
            <h3>${course.name}</h3>
        `;
        container.appendChild(card);
    });
    creditsDisplay.textContent = totalCredits;
}

displayCourses(classes);

document.getElementById("all-btn").addEventListener("click", () => {
    displayCourses(classes);
});

document.getElementById("cse-btn").addEventListener("click", () => {
    const filtered = classes.filter(course => course.type === "CSE");
    displayCourses(filtered);
});

document.getElementById("wdd-btn").addEventListener("click", () => {
    const filtered = classes.filter(course => course.type === "WDD");
    displayCourses(filtered);
});

document.getElementById('currentYear').textContent = new Date().getFullYear();

const lastModified = document.lastModified;
document.getElementById('lastModified').textContent = lastModified;