const overview = document.querySelector(".overview");
const username = "gerardguydavis";
const repoList = document.querySelector(".repo-list");
const repoSect = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");

//To pull profile info
const githubFetch = async function () {
    const res = await fetch (`https://api.github.com/users/${username}`);
    const userProfile = await res.json();
    displayUser(userProfile);
};

githubFetch();

//To update page with profile info
const displayUser = function (userProfile) {
    const userInfo = document.createElement("div");
    userInfo.classList.add("user-info");
    userInfo.innerHTML = `
    <figure>
    <img alt="user avatar" src=${userProfile.avatar_url} />
  </figure>
  <div>
    <p><strong>Name:</strong> ${userProfile.name}</p>
    <p><strong>Bio:</strong> ${userProfile.bio}</p>
    <p><strong>Location:</strong> ${userProfile.location}</p>
    <p><strong>Number of public repos:</strong> ${userProfile.public_repos}</p>
  </div>
  `;

  overview.append(userInfo);
  repoFetch();
};

const repoFetch = async function () {
    const res = await fetch (`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`)
    const myRepos = await res.json();
    displayRepos(myRepos);
};

const displayRepos = function (repos) {
    for (let repo of repos) {
    const li = document.createElement("li");
    li.classList.add("repo");
    li.innerHTML = `<h3>${repo.name}</h3>`;
    repoList.append(li);
}
}

repoList.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        specRepo(repoName);
    }
});

const specRepo = async function (repoName) {
    const res = await fetch (`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await res.json();
    //console.log(repoInfo);
    const fetchLanguages = await fetch (repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    //console.log(languageData);

    const languages = [];
    for (let language in languageData) {
        languages.push(language);
    }
    //console.log(languages);
    displayInfo(repoInfo, languages)
}

const displayInfo = function (repoInfo, languages) {
    repoData.innerHTML = "";
    const showInfo = document.createElement("div");
    showInfo.innerHTML = `<h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href=${repoInfo.html_url} target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`
    repoData.append(showInfo);
    repoData.classList.remove("hide");
    repoSect.classList.add("hide");
}
    