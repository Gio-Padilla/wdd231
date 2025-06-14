const url = "./data/learn.json"; // Path to your JSON file
const topicDivOption = document.getElementById("topics-display");
const topicDivLearn = document.getElementById("topic-data");

async function setupToics() {
  try {
    const response = await fetch(url); // Fetch the data
    const data = await response.json(); // Convert to JSON
    displayTopics(data); // Send to display function
  } catch (error) {
    console.error("Failed to load company data:", error);
  }
}

function displayTopics(data) {
    topicDivOption.innerHTML = "";
    data.python_basics.forEach(section => {
        addSectionToDisplay(section);
    });
}

function addSectionToDisplay(section) {
    const theButton = document.createElement("button");
    theButton.innerHTML = section.section;
    topicDivOption.appendChild(theButton);

    theButton.addEventListener("click", function () {
        // Remove 'selected' class from all buttons
        const allButtons = topicDivOption.querySelectorAll("button");
        allButtons.forEach(btn => btn.classList.remove("selected"));

        // Add 'selected' class to the clicked button
        theButton.classList.add("selected");

        // Clear and load the section topics
        topicDivLearn.innerHTML = "";
        section.topics.forEach(topic => {
            const topicDiv = document.createElement("div");
            topicDiv.innerHTML += `
                <h3>${topic.title}</h3>
                <p>${topic.description}</p>
                <h4>Examples:</h4>
            `;
            topic.examples.forEach(example => {
                topicDiv.innerHTML += `<p>${example}</p>`;
            });
            topicDivLearn.appendChild(topicDiv);
        });
    });
}

setupToics();