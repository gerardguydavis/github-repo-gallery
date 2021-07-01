const overview = document.querySelector(".overview");
const username = "gerardguydavis";
const repoList = document.querySelector(".repo-list");

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