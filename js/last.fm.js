// Ensure jQuery is loaded
if (typeof jQuery === "undefined") {
  throw new Error("jQuery is not loaded");
}

// Replace with your Last.fm username.
username = "s4m33r4";

$("#last a").attr("href", "http://www.last.fm/user/" + username);

$.get(
  "http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=" +
    username +
    "&api_key=1f633977acf0e2d0630ec11dbc350d3e&format=json",
  function (data) {
    let trackInfo = data.recenttracks.track[0];
    if (
      typeof trackInfo["@attr"] === "undefined" ||
      !trackInfo["@attr"].nowplaying
    ) {
      trackInfo = data.recenttracks.track[0];
    }
    if (trackInfo) {
      artist = trackInfo.artist["#text"];
      track = trackInfo.name;
      album = trackInfo.album["#text"];
      artwork = trackInfo.image[1]["#text"];
      $("#artwork").attr("src", artwork);
      $("#track").html(
        "<p><strong>" +
          track +
          "</strong></p><p>" +
          artist +
          "</p><p>" +
          album +
          "</p>"
      );
      $("#last").addClass("show");
    }
  }
);
