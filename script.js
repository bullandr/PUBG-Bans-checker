function searchPlayer() {
  var playerName = document.getElementById('playerName').value;
  var apiUrl = "https://api.pubg.com/shards/steam/players?filter[playerNames]=" + playerName;

  var xhr = new XMLHttpRequest();
  xhr.open("GET", apiUrl, true);
  xhr.setRequestHeader("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIyOTcyODQ4MC02NzJjLTAxM2MtYzM4YS0xYTljOTg2NWFhMWIiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNzAwMTkzNzk3LCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6Ii1mODI5ZmQ2Ni04ZGE1LTQ3ZWMtODU0YS01MjUwZTFhZDA4NGMifQ.0iUaoOI6xc_oIc2IVbYp3JLbkrhWgBr8JbmND6J4e3o");
  xhr.setRequestHeader("Accept", "application/vnd.api+json");

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var playerData = JSON.parse(xhr.responseText);
        displayPlayerData(playerData);
      } else {
        displayError("Ошибка: " + xhr.status);
      }
    }
  };

  xhr.send();
}

function displayPlayerData(playerData) {
  var playerInfo = document.getElementById('playerData');
  playerInfo.innerHTML = ''; // Очистить предыдущий результат (если есть)

  if (playerData.data && playerData.data.length > 0) {
    var playerName = playerData.data[0].attributes.name;
    var playerID = playerData.data[0].id;
    var playerRegion = playerData.data[0].attributes.shardId;

    var playerHTML = "<h2>Информация об игроке:</h2>" +
                     "<p>Никнейм: " + playerName + "</p>" +
                     "<p>ID игрока: " + playerID + "</p>" +
                     "<p>Регион: " + playerRegion + "</p>";

    playerInfo.innerHTML = playerHTML;
  } else {
    displayError("Игрок не найден");
  }
}

function displayError(message) {
  var playerInfo = document.getElementById('playerData');
  playerInfo.innerHTML = "<p>" + message + "</p>";
}