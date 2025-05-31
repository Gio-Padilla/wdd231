const formInfo = new URLSearchParams(window.location.search);

const fName = `${formInfo.get("fn")} ${formInfo.get("ln")}`;
const fJobTitle = formInfo.get("jt");
const fEmail = formInfo.get("email");
const fPhoneNumber = formInfo.get("phone");
const fCompany = formInfo.get("company");
const fMembershipLevel = formInfo.get("level");
const fTimeStamp = formInfo.get("time");
const fDescription = formInfo.get("desc");

let textHtml = `<p><strong>Submitted by:</strong> ${fName}</p>`;
if (fJobTitle) {
    textHtml += `<p><strong>Job title:</strong> ${fJobTitle}</p>`;
}
textHtml += `<p><strong>Contact email:</strong> ${fEmail}</p>`;
if (fPhoneNumber) {
    textHtml += `<p><strong>Phone #:</strong> ${fPhoneNumber}</p>`;
}
textHtml += `<p><strong>Company:</strong> ${fCompany}</p>`;
textHtml += `<p><strong>Membership level request:</strong> ${fMembershipLevel}</p>`;
if (fDescription) {
    textHtml += `<p><strong>Description of Company:</strong> ${fDescription}</p>`;
}
textHtml += `<p><strong>Time of opened form:</strong> ${fTimeStamp}</p>`;

const infoDiv = document.getElementById("formInfo");
infoDiv.innerHTML = textHtml;