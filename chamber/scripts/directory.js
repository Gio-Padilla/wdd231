const url = "./data/members.json"; // Path to your JSON file
const idDisplayName = "company-gallery";

async function getCompanyData() {
  try {
    const response = await fetch(url); // Fetch the data
    const data = await response.json(); // Convert to JSON
    displayCompanies(data); // Send to display function
  } catch (error) {
    console.error("Failed to load company data:", error);
  }
}

function displayCompanies(companies) {
  const gallery = document.getElementById(idDisplayName);
  gallery.innerHTML = ""; // Clear previous content

  companies.forEach(company => {
    // Create elements
    const card = document.createElement("section");
    const name = document.createElement("h2");
    const address = document.createElement("p");
    const phone = document.createElement("p");
    const website = document.createElement("a");
    const logo = document.createElement("img");

    // Set content
    name.textContent = company.name;
    address.textContent = company.address;
    phone.textContent = company.phone;
    website.textContent = company.website;
    website.setAttribute("href", company.website);
    website.setAttribute("target", "_blank");

    logo.setAttribute("src", `./images/companies/${company.image}`);
    logo.setAttribute("alt", `Logo of ${company.name}`);
    logo.setAttribute("loading", "lazy");
    logo.setAttribute("width", "200");
    logo.setAttribute("height", "auto");

    // Build card
    card.appendChild(logo);
    card.appendChild(name);
    card.appendChild(address);
    card.appendChild(phone);
    card.appendChild(website);

    // Add to the page
    gallery.appendChild(card);
  });
}

const gridViewButton = document.getElementById("grid-view-option");
const listViewButton = document.getElementById("list-view-option");
const gallery = document.getElementById(idDisplayName);

gridViewButton.addEventListener("click", function () {
    gallery.classList.remove("list");
});

listViewButton.addEventListener("click", function () {
    gallery.classList.add("list");
});

// Call the function to start
getCompanyData();