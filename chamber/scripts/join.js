const membershipDetailsList = {
    np: {
        title: "Non Profit",
        cost: 0,
        benefits: [
            "Basic listing in the Chamber's online directory",
            "Invitations to public community events",
            "Access to nonprofit-specific Chamber resources"
        ]
    },
    bronze: {
        title: "Bronze",
        cost: 250,
        benefits: [
            "Enhanced online directory listing with logo and contact info",
            "Access to member-exclusive events and workshops",
            "Promotion in the monthly Chamber e-newsletter",
            "Use of Chamber member badge for marketing materials",
            "Invitations to ribbon cuttings and mixers"
        ]
    },
    silver: {
        title: "Silver",
        cost: 500,
        benefits: [
            "Priority placement in the online business directory",
            "Two complimentary tickets to annual Chamber events",
            "Quarterly social media promotion by the Chamber",
            "Opportunity to host or sponsor Chamber networking events",
            "Inclusion in the printed annual member directory"
        ]
    },
    gold: {
        title: "Gold",
        cost: 1000,
        benefits: [
            "Premium online directory profile with extended business description",
            "Featured article or spotlight in the Chamber newsletter",
            "Unlimited access to all Chamber events for two representatives",
            "Eligibility for exclusive event sponsorships",
            "Personalized business consultation with Chamber leadership",
            "Recognition on signage at major Chamber events",
            "VIP invitations to leadership roundtables and civic engagement sessions"
        ]
    }
};

const membershipModal = document.getElementById("membership-details");
const detailsButton = document.querySelectorAll("#membership-levels button");

function setModalHtml(membershipDetails) {
    membershipModal.innerHTML = `<h2><span>${membershipDetails.title} Membership Level</span><button popovertarget="membership-details" popovertargetaction="hide">X</button></h2>`;
    membershipModal.innerHTML += `<p><strong>Cost:</strong> $ ${membershipDetails.cost}</p>`;
    membershipModal.innerHTML += "<b>Benefits List</b>";
    membershipModal.innerHTML += "<ul>";
    membershipDetails.benefits.forEach(benefit => {
        membershipModal.innerHTML += `<li>${benefit}</li>`;
    });
    membershipModal.innerHTML += "</ul>";

    closeButton = document.querySelector("#membership-details button");
    
    closeButton.addEventListener("click", function () {
        membershipModal.close();
    });
}

detailsButton[0].addEventListener("click", function () {
    setModalHtml(membershipDetailsList.np);
    membershipModal.showModal();
});

detailsButton[1].addEventListener("click", function () {
    setModalHtml(membershipDetailsList.bronze);
    membershipModal.showModal();
});

detailsButton[2].addEventListener("click", function () {
    setModalHtml(membershipDetailsList.silver);
    membershipModal.showModal();
});

detailsButton[3].addEventListener("click", function () {
    setModalHtml(membershipDetailsList.gold);
    membershipModal.showModal();
});

// This allows the Modal to close if you do not click on it.
membershipModal.addEventListener("click", function (event) {
    const rect = membershipModal.getBoundingClientRect();
    const clickedInDialog =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;

    if (!clickedInDialog) {
        membershipModal.close();
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const timestampField = document.getElementById("timestamp");
    const now = new Date().toISOString(); // format: "2025-05-24T18:47:00.000Z"
    timestampField.value = now;
});