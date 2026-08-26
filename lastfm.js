// Last.fm API Configuration
const LASTFM_API_KEY = "a6b6e87cf0db994a58047c8a7a9519ba";
const LASTFM_USERNAME = "saivan4ick";
const LASTFM_URL = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&format=json&extended=true&api_key=${LASTFM_API_KEY}&limit=1&user=${LASTFM_USERNAME}`;

// Fallback placeholder SVG
const DEFAULT_COVER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 24 24' fill='none' stroke='%238ba0ff' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M9 18V5l12-2v13'%3E%3C/path%3E%3Ccircle cx='6' cy='18' r='3'%3E%3C/circle%3E%3Ccircle cx='18' cy='16' r='3'%3E%3C/circle%3E%3C/svg%3E";

async function fetchLastFmTrack() {
  try {
    const response = await fetch(LASTFM_URL);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();

    if (!data.recenttracks || !data.recenttracks.track || data.recenttracks.track.length === 0) {
      return;
    }

    const lastTrack = data.recenttracks.track[0];
    const trackName = lastTrack.name || "Неизвестный трек";
    const trackUrl = lastTrack.url || `https://www.last.fm/user/${LASTFM_USERNAME}`;

    const artistName = (typeof lastTrack.artist === "object" ? lastTrack.artist.name : lastTrack.artist) || "Неизвестный исполнитель";
    const artistUrl = (lastTrack.artist && lastTrack.artist.url) ? lastTrack.artist.url : `https://www.last.fm/user/${LASTFM_USERNAME}`;

    const isNowPlaying = Boolean(lastTrack["@attr"] && lastTrack["@attr"].nowplaying === "true");
    const isLoved = lastTrack.loved === "1";

    // Date / Time formatting
    let timeText = "";
    if (isNowPlaying) {
      timeText = "Сейчас играет";
    } else if (lastTrack.date && lastTrack.date["#text"]) {
      timeText = lastTrack.date["#text"];
    } else if (lastTrack.date && lastTrack.date.uts) {
      const date = new Date(parseInt(lastTrack.date.uts, 10) * 1000);
      timeText = date.toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    }

    // Cover Image (largest available)
    let coverUrl = DEFAULT_COVER;
    if (lastTrack.image && Array.isArray(lastTrack.image)) {
      const images = [...lastTrack.image].reverse();
      const foundImg = images.find(img => img["#text"] && img["#text"].trim() !== "");
      if (foundImg) {
        coverUrl = foundImg["#text"];
      }
    }

    // DOM Elements
    const coverEl = document.getElementById("lastfm-cover") || document.getElementById("album-cover");
    const trackEl = document.getElementById("lastfm-track") || document.getElementById("track");
    const artistEl = document.getElementById("lastfm-artist") || document.getElementById("artist");
    const dateEl = document.getElementById("lastfm-date") || document.getElementById("date");
    const heartEl = document.getElementById("lastfm-heart") || document.getElementById("heart");
    const statusEl = document.getElementById("lastfm-status") || document.getElementById("now-playing");
    const widgetEl = document.getElementById("lastfm-widget");

    if (coverEl) {
      coverEl.src = coverUrl;
      coverEl.alt = `${trackName} - ${artistName}`;
    }

    if (trackEl) {
      trackEl.textContent = trackName;
      if (trackEl.tagName.toLowerCase() === "a") {
        trackEl.href = trackUrl;
      }
    }

    if (artistEl) {
      artistEl.textContent = artistName;
      if (artistEl.tagName.toLowerCase() === "a") {
        artistEl.href = artistUrl;
      }
    }

    if (dateEl) {
      if (isNowPlaying) {
        dateEl.innerHTML = '<span class="now-playing-indicator"><span class="pulse-dot"></span>Сейчас играет</span>';
      } else {
        dateEl.textContent = timeText;
      }
    }

    if (heartEl) {
      heartEl.textContent = isLoved ? "❤️" : "";
      heartEl.style.display = isLoved ? "inline-block" : "none";
    }

    if (statusEl) {
      statusEl.textContent = isNowPlaying ? "Сейчас играет:" : "Последний трек:";
    }

    if (widgetEl) {
      widgetEl.classList.remove("loading");
      if (isNowPlaying) {
        widgetEl.classList.add("is-now-playing");
      } else {
        widgetEl.classList.remove("is-now-playing");
      }
    }

    console.log(
      `Last.fm: ${trackName} by ${artistName} [${isNowPlaying ? "Now Playing" : timeText}]`
    );
  } catch (error) {
    console.error("Last.fm widget error:", error);
    const trackEl = document.getElementById("lastfm-track") || document.getElementById("track");
    if (trackEl) trackEl.textContent = "Не удалось загрузить трек";
  }
}

// Initial fetch and auto-refresh every 30 seconds
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    fetchLastFmTrack();
    setInterval(fetchLastFmTrack, 30000);
  });
} else {
  fetchLastFmTrack();
  setInterval(fetchLastFmTrack, 30000);
}
