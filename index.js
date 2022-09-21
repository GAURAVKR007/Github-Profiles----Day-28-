const APIURL = 'https://api.github.com/users/'

const form = document.getElementById('form')
const main = document.getElementById('main')
const search = document.getElementById('search')

// getUser('GAURAVKR007')

// function getUser(username) {
//     axios(APIURL + username).then(res=>console.log(res))
//     .catch(err=> console.log(err))
// }


async function getUser(username) {
    try{
        const {data} = await axios(APIURL + username)

    createUserCard(data)
    getRepos(username)
    }catch(err){
        console.log(err);
        if(err.response.status == 404) {
            createErrorCard('No User Found [Error 404]')
        }
    }
    
}

function createErrorCard(msg){
    const cardHTML = `
    <div class = "card">
            <h1>${msg}</h1>
            </div>
    `

    main.innerHTML = cardHTML
}

function createUserCard(user){
    const cardHTML = `
    <div class="card">
        <div class= "Problem">
          <img src="${user.avatar_url}" alt="${user.name}" class="avatar"> 

          <a href="${user.html_url}" class="btn btn-outline-secondary" id="button" target="blank">Visit Github Profile</a>

          <a href=# class="location">${user.location}</a>
          <a href="https://twitter.com/${user.twitter_username}"  target="blank" class="twitter">${user.twitter_username}</a>
        </div>
        <div class="user-info">
          <h2>${user.name}</h2>
          <p>${user.bio}</p>

          <ul>
            <li>${user.followers}<strong>Followers</strong></li>
            <li>${user.following}<strong>Following</strong></li>
            <li>${user.public_repos}<strong>Repos</strong></li>
          </ul>

          <div id="repos"></div>
        </div>
      </div>
    `
    main.innerHTML = cardHTML

}

async function getRepos(username){
    try{
        const {data} = await axios(APIURL + username + '/repos?sort=created')

        addReposToCard(data)
    }catch (err) {
        console.log(err);
        createErrorCard('Problem Fetching Repos')
    }
}

function addReposToCard(repos){
    const reposEl = document.getElementById('repos')

    repos.slice(0,5).forEach(repo => {
        const repoEl = document.createElement('a')
        repoEl.classList.add('repo')
        repoEl.href = repo.html_url
        repoEl.target = '_black'
        repoEl.innerText = repo.name

        reposEl.appendChild(repoEl)
    })
}

form.addEventListener('submit',(e)=>{
    e.preventDefault()

    const user = search.value

    if(user){
        getUser(user)

        search.value = ''
    }
})