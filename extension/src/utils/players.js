import { getByXpath } from "./xpath";

const squadPicturesXpath = `//div[contains(@class, 'Pitch-')]//picture`;

export function getPlayers() {
  const pictures = getByXpath(squadPicturesXpath, true);
  const players = [];
  try {
    let picture = pictures.iterateNext();
    while (picture) {
      const player = {
        name: getPlayerName(picture),
        team: getPlayerTeam(picture),
      };
      players.push(player);
      picture = pictures.iterateNext();
    }
    console.log(players);
  } catch (e) {
    console.log(e);
  }
}

function getPlayerName(picture) {
  return picture.nextSibling.firstChild.textContent;
}

function getPlayerTeam(picture) {
  const jersey = picture
    .getElementsByTagName("img")[0]
    .src.split("/")
    .slice(-1)[0];
  return jersey.split("_")[1].split("-")[0];
}
