// Ensure jQuery is loaded
if (typeof jQuery === "undefined") {
  console.error("Last.fm player error: jQuery is not loaded");
  throw new Error("jQuery is not loaded");
}

// Replace with your Last.fm username.
username = "s4m33r4";

// Set up the music link regardless of fetch success
$("#last #music").attr("href", "http://www.last.fm/user/" + username);

// Delay the Last.fm API call by 3 seconds to ensure the page is fully loaded
setTimeout(function () {
  console.log("Attempting to fetch Last.fm data for user: " + username);

  $.ajax({
    url: "https://ws.audioscrobbler.com/2.0/",
    data: {
      method: "user.getrecenttracks",
      user: username,
      api_key: "1f633977acf0e2d0630ec11dbc350d3e",
      format: "json",
    },
    timeout: 3000, // 10 second timeout
    success: function (data) {
      console.log("Last.fm data fetched successfully");
      try {
        if (
          !data ||
          !data.recenttracks ||
          !data.recenttracks.track ||
          data.recenttracks.track.length === 0
        ) {
          console.error("Last.fm data is missing expected structure:", data);
          return;
        }

        let trackInfo = data.recenttracks.track[0];
        if (
          typeof trackInfo["@attr"] === "undefined" ||
          !trackInfo["@attr"].nowplaying
        ) {
          trackInfo = data.recenttracks.track[0];
          console.log("Not currently playing, showing most recent track");
        } else {
          console.log("Now playing track found");
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
          console.log(
            "Last.fm player updated with track: " + track + " by " + artist
          );
        }
      } catch (err) {
        console.error("Error processing Last.fm response:", err);
        console.error("Raw data:", data);
      }
    },
    error: function (xhr, status, error) {
      console.error("Last.fm API request failed");
      console.error("Status: " + status);
      console.error("Error: " + error);
      console.error("Response: ", xhr.responseText);

      // Try to use HTTPS if the error might be related to mixed content
      if (window.location.protocol === "https:" && xhr.status === 0) {
        console.log("Possibly a mixed content issue, trying HTTPS endpoint");
      }
    },
  });
}, 3000); // 3 second delay
