console.log("client says hello");

const app = {
  initialize: () => {
    let socket = io();
    socket.on("connect", () => {
      console.log("connected to server");
    });

    const voteButtons = document.querySelectorAll(".vote_button");

    for (let i = 0; i < voteButtons.length; i++) {
      voteButtons[i].addEventListener("click", () => {
        console.log(voteButtons[i].dataset.pokemon);
        pokemonVote = {
          pokemon: voteButtons[i].dataset.pokemon,
        };
        document.querySelector(".landing_page").classList.add("none");
        document.querySelector(".result_page").classList.remove("none");
        socket.emit("voting", pokemonVote);
      });
    }

    const slowpokeData = document.getElementById("slowpoke_data_div");
    const snorlaxData = document.getElementById("snorlax_data_div");
    const psyduckData = document.getElementById("psyduck_data_div");
    const slowpokePercentage = document.getElementById("slowpoke_percentage");
    const snorlaxPercentage = document.getElementById("snorlax_percentage");
    const psyduckPercentage = document.getElementById("psyduck_percentage");
    const dataText = document.querySelector(".data_text");

    socket.on("voteResults", (data) => {
      snorlaxVote = parseInt(data.snorlax);
      psyduckVote = parseInt(data.psyduck);
      slowpokeVote = parseInt(data.slowpoke);
      console.log(data);
      console.log(data.snorlax);
      total = snorlaxVote + psyduckVote + slowpokeVote;
      console.log(total);
      slowpokeData.style.height = `${(slowpokeVote / total) * 100}%`;
      psyduckData.style.height = `${(psyduckVote / total) * 100}%`;
      snorlaxData.style.height = `${(snorlaxVote / total) * 100}%`;
      slowpokePercentage.innerHTML = `${((slowpokeVote / total) * 100).toFixed(
        2
      )}%`;
      snorlaxPercentage.innerHTML = `${((snorlaxVote / total) * 100).toFixed(
        2
      )}%`;
      psyduckPercentage.innerHTML = `${((psyduckVote / total) * 100).toFixed(
        2
      )}%`;
      dataText.innerHTML = `Total votes: ${total}`;
    });
  },
};
