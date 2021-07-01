const overview = document.querySelector(".overview");
const username = "gerardguydavis";

const githubFetch = async function () {
    const res = await fetch (`https://api.github.com/users/${username}`);
    const userProfile = await res.json();
    displayUser(userProfile);
};

githubFetch();

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
};