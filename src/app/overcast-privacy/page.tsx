import Link from "next/link";
import { Metadata } from "next";
import "@/styles/airsync/privacy.css";

export const metadata: Metadata = {
  title: "Overcast Privacy Policy - sameerasw.com",
  description:
    "Privacy policy for Overcast: a local-first, privacy-respecting Material You weather app for Android with zero tracking and zero cloud data collection.",
};

export default function OvercastPrivacy() {
  return (
    <>
      <nav id="nav">
        <ul>
          <li>
            <Link href="/" aria-label="home page">
              <span className="material-symbols-rounded"> home </span>
            </Link>
          </li>
        </ul>
      </nav>

      <div className="container airsync-privacy article-body">
        <section id="intro">
          <div className="heading">
            <div className="container-mini content">
              <h1 id="title">
                <strong>Overcast</strong> Privacy Policy
              </h1>
              <p className="article-text">
                At <strong>Overcast</strong>, we respect your privacy. Overcast is
                designed as a clean, local-first weather forecast app for Android.
                Your location and personal details stay entirely in your control.
                <br />
                <strong>Effective date</strong>: October 8, 2026
              </p>
            </div>
          </div>
        </section>

        <div className="article-text">
          <hr />

          <h2>Local-First &amp; Privacy Focused</h2>
          <div className="note">
            <p>
              <strong>Important:</strong> Overcast does not collect, log, or share
              your personal data. Weather requests are queried directly to the
              chosen weather service provider (e.g. Open-Meteo, AccuWeather, etc.),
              and all cached forecast data and configuration stay strictly on your device.
            </p>
          </div>

          <p>Overcast guarantees that:</p>
          <ul>
            <li>
              <strong>Zero server tracking or telemetry</strong>: We do not operate
              any intermediate servers, analytics SDKs, advertising frameworks, or
              tracking libraries.
            </li>
            <li>
              <strong>No account required</strong>: No login, email signup, or user
              identity tracking.
            </li>
            <li>
              <strong>Local storage only</strong>: Saved cities, widget preferences,
              custom API keys, and cached forecast data are stored in your device&apos;s
              private local storage.
            </li>
          </ul>

          <hr />

          <h2>How Weather Data &amp; Location Are Used</h2>
          <p>
            To provide accurate real-time forecasts, temperature, precipitation, and
            widgets, Overcast processes your location as follows:
          </p>
          <ul>
            <li>
              <strong>Approximate Location</strong>: If enabled, your approximate
              coordinates are used locally solely to fetch the current weather and forecast
              for your area from the weather provider API.
            </li>
            <li>
              <strong>Background Location</strong>: If granted, background location
              allows widgets and the daydream screensaver to refresh weather conditions
              periodically when the app is in the background.
            </li>
            <li>
              <strong>Manual City Search</strong>: If you choose not to grant location
              permissions, you can search for and select cities manually.
            </li>
          </ul>

          <hr />

          <h2>Permissions Explanation</h2>
          <p>
            Overcast requests only the Android permissions necessary to fetch weather
            data and deliver widgets/screensaver functionality:
          </p>

          <table>
            <thead>
              <tr>
                <th>Permission</th>
                <th>Purpose</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>ACCESS_COARSE_LOCATION</code>
                </td>
                <td>
                  Used to determine your approximate location to fetch local weather
                  forecasts and conditions.
                </td>
              </tr>
              <tr>
                <td>
                  <code>ACCESS_BACKGROUND_LOCATION</code>
                </td>
                <td>
                  Optional. Allows home screen widgets and the screensaver to update
                  forecast data while the app is closed or running in the background.
                </td>
              </tr>
              <tr>
                <td>
                  <code>INTERNET</code>, <code>ACCESS_NETWORK_STATE</code>
                </td>
                <td>
                  Required to connect to weather data providers and download current
                  forecasts, alerts, and hourly details.
                </td>
              </tr>
              <tr>
                <td>
                  <code>VIBRATE</code>
                </td>
                <td>
                  Provides subtle tactile haptic feedback for UI controls and
                  simulation tools.
                </td>
              </tr>
            </tbody>
          </table>

          <hr />

          <h2>Third-Party Weather APIs</h2>
          <p>
            When fetching weather updates, Overcast communicates directly with the
            relevant weather data provider (such as Open-Meteo or user-configured provider keys).
            Only coordinates/locations necessary to retrieve the weather report are transmitted
            in the API request. Please refer to your chosen provider&apos;s privacy policy for
            details on their data handling.
          </p>

          <hr />

          <h2>Data Retention &amp; Security</h2>
          <p>
            All saved locations, preferences, and cached forecasts are stored inside
            Android&apos;s sandboxed app storage. Clearing the app data or uninstalling
            Overcast will immediately remove all locally stored information.
          </p>

          <hr />

          <h2>Contact</h2>
          <p>
            If you have questions or feedback regarding Overcast or this Privacy Policy:
          </p>
          <p>
            <strong>
              <a href="mailto:mail@sameerasw.com">mail@sameerasw.com</a>
            </strong>
            <br />
            <a
              href="https://github.com/sameerasw/Overcast"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub Repository
            </a>{" "}
            |{" "}
            <a
              href="https://www.sameerasw.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Website
            </a>
          </p>

          <div style={{ marginTop: "3rem", textAlign: "center" }}>
            <Link href="/" className="button">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
