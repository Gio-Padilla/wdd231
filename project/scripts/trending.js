async function fetchTopPythonRepos() {
    const endpoint = "https://api.github.com/search/repositories?q=language:python&sort=stars&order=desc";
    const projectDiv = document.querySelector(".github-projects");

    try {
        const response = await fetch(endpoint);
        const data = await response.json();
        projectDiv.innerHTML = "";
        // Get top 5 repositories
        const topRepos = data.items.slice(0, 5);
        topRepos.forEach(repo => {
            const repoCard = document.createElement("div");
            repoCard.classList.add("repo");
            repoCard.innerHTML = `
                <h3><a href="${repo.html_url}" target="_blank">${formatRepoName(repo.name)}</a></h3>
                <p>${repo.description || "No description provided."}</p>
                <p>⭐ ${repo.stargazers_count} stars — by ${repo.owner.login}</p>
            `;
            projectDiv.appendChild(repoCard);
        });
    } catch (error) {
        projectDiv.innerHTML = "<p>Unable to load top Python projects. Please give it some time before trying again.</p>";
        console.error("GitHub API error:", error);
    }
}

function formatRepoName(name) {
    return name.replace(/[-_]/g, " ")
               .replace(/\b\w/g, char => char.toUpperCase());
}

fetchTopPythonRepos();
