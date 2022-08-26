document.addEventListener("DOMContentLoaded", () => {
    fetchData();
  });

  // declare variables
  const characterAPI = "http://localhost:3000/characters";
  const characterBar = document.getElementById("character-bar");
  const characterName = document.getElementById("name");
  const characterImage = document.getElementById("image");
  const characterVoteCount = document.getElementById("vote-count");
  const characterVoteForm = document.getElementById("votes-form");

  //Fetch data from server
  function fetchData() {
    fetch(characterAPI)
      .then((resp) => resp.json())
      .then((data) => {
        renderCharacters(data);
    });
  }

// add  renderCharacters to render characters to name span
function renderCharacters(data) {
    data.forEach((data) => {
      const nameSpan = document.createElement("span");
      nameSpan.innerText = data.name;
  
      // addEventListener to nameSpan to listen for a click event
      characterBar.appendChild(nameSpan);
      nameSpan.addEventListener("click", () => {
        characterName.textContent = data.name;
        characterImage.setAttribute("src", data.image);
        characterVoteCount.textContent = data.votes;
      });
    });
  }

   // addEventListener to character vote form to listen for a submit event
  characterVoteForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const newVotes = parseInt(event.target.votes.value);
    const characterVoteCount = document.getElementById("vote-count");
    let current = parseInt(characterVoteCount.textContent);
    let votecount = (current += newVotes);
    characterVoteCount.innerText = votecount;

  //Updating the database
    let updateVotes = {votes: votecount};

    fetch(characterAPI, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json",
      },
      body: JSON.stringify({
        votes: votecount,
      }),
    })
      .then((res) => res.json())
      .then((json) => console.log(json));
  });

  const resetButton = document.querySelector('#reset-btn')
  resetButton.addEventListener('click', (e) => {

    fetch(characterAPI)
    .then(res => res.json())
    .then(characters => {
        const charID = characters.find(character => character.name === characterName.textContent)
        fetch(`${characterAPI}/${charID.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json',
                Accept: "application/json",
            },
            body: JSON.stringify({
                votes : '0'
            })
        })
        .then(res => res.json())
        .then(data => characterVotes.textContent = data.votes)
    })
})