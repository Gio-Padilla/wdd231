const spotlightContainer = document.getElementById("company-spotlights");

async function loadSpotlightMembers() {
    try {
        const response = await fetch('data/members.json');
        const members = await response.json();

        // Filter members with membership_level === 3
        const level3Members = members.filter(m => m.membership_level === 3);

        // Shuffle and select 3 random members
        const selected = level3Members
            .sort(() => 0.5 - Math.random())
            .slice(0, 3);

        spotlightContainer.innerHTML = ""; // Clear any existing content

        // Create and append each member's HTML card
        selected.forEach(member => {
            const card = document.createElement('div');
            card.classList.add('member-card');
            
            card.innerHTML = `
                <h3>${member.name}</h3>
                <img src="images/companies/${member.image}" alt="${member.name}" width = "100%" height = "auto" loading="lazy">
                <p>Phone: ${member.phone}</p>
                <p>Address: ${member.address}</p>
                <p>Website: <a href="${member.website}" target="_blank">${member.website}</a></p>
                <p>Membership: GOLD</p>
            `;

            spotlightContainer.appendChild(card);
        });

    } catch (err) {
        console.error('Error loading spotlight members:', err);
    }
}

loadSpotlightMembers();