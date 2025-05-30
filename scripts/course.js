// course information cards
const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
]

const courseDiv = document.getElementById("courses-div");
const buttonAll = document.getElementById("course-all");
const buttonCse = document.getElementById("course-cse");
const buttonWdd = document.getElementById("course-wdd");
const creditSpan = document.getElementById("credit-total");
const courseDetails = document.getElementById("course-details");

function displayCourses(coursesToDisplay) {
    if (courseDiv) {
        courseDiv.innerHTML = "";
        coursesToDisplay.forEach(course => {
            const courseButton = document.createElement("button");
            courseButton.textContent = `${course.subject} ${course.number}`;
            if (course.completed) {
                courseButton.textContent = `${courseButton.textContent} ✓`;
                courseButton.classList.add("completed-course");
            }
            courseDiv.append(courseButton);
            courseButton.addEventListener("click", function () {
                setModalDetails(course);
                courseDetails.showModal();
            });
        });

        const totalCredits = coursesToDisplay.reduce((sum, course) => sum + course.credits, 0);
        creditSpan.textContent = totalCredits;

    }
}

function setModalDetails(course) {
    const modHeading = document.createElement("h2");
    const modClassName = document.createElement("h3");
    const modCredits = document.createElement("p");
    const modCertificate = document.createElement("p");
    const modDescription = document.createElement("p");
    const modTechnology = document.createElement("p");

    modHeading.textContent = `${course.subject} ${course.number}`;
    modHeading.innerHTML += '<button popovertarget="course-details" popovertargetaction="hide">X</button>';
    modClassName.textContent = course.title;
    
    modCredits.textContent = `${course.credits} credits`;
    modCertificate.textContent = `Certificate: ${course.certificate}`;
    modDescription.textContent = course.description;

    modTechnology.textContent = "Technology: ";
    course.technology.forEach(element => {
        modTechnology.textContent += element;
        modTechnology.textContent += ", "
    });
    modTechnology.textContent = modTechnology.textContent.slice(0, -2);

    courseDetails.innerHTML = "";
    courseDetails.appendChild(modHeading);
    courseDetails.appendChild(modClassName);
    courseDetails.appendChild(modCredits);
    courseDetails.appendChild(modCertificate);
    courseDetails.appendChild(modDescription);
    courseDetails.appendChild(modTechnology);

    closeButton = document.querySelector("#course-details button");
    closeButton.addEventListener("click", function () {
        courseDetails.close();
    });
}

function filterCourses(subject) {
    if (subject === 'All') {
        return courses;
    }
    return courses.filter(course => course.subject === subject);
}

buttonAll.addEventListener("click", function() {
    buttonAll.classList.add("selected");
    buttonCse.classList.remove("selected");
    buttonWdd.classList.remove("selected");
    filteredCourses = filterCourses("All");
    displayCourses(filteredCourses);
});

buttonCse.addEventListener("click", function() {
    buttonAll.classList.remove("selected");
    buttonCse.classList.add("selected");
    buttonWdd.classList.remove("selected");
    filteredCourses = filterCourses("CSE");
    displayCourses(filteredCourses);
});

buttonWdd.addEventListener("click", function() {
    buttonAll.classList.remove("selected");
    buttonCse.classList.remove("selected");
    buttonWdd.classList.add("selected");
    filteredCourses = filterCourses("WDD");
    displayCourses(filteredCourses);
});

displayCourses(courses);
buttonAll.classList.add("selected");