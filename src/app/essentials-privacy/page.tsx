import Link from "next/link";

export default function EssentialsPrivacy() {
  return (
    <>
      <nav id="nav">
        <ul>
          <li>
            <Link href="/essentials" id="home-nav" aria-label="back to Essentials page">
              <span className="material-symbols-rounded">arrow_back</span>
            </Link>
          </li>
          <li>
            <Link href="/" aria-label="home page">
              <span className="material-symbols-rounded">home</span>
            </Link>
          </li>
        </ul>
      </nav>

      <div className="container essentials-privacy">
        <section id="intro" className="hero-section">
          <div style={{ marginBottom: '2rem' }}>
            <img src="/assets/img/project-logos/essentials-logo.svg" alt="Essentials" width="80" height="80" />
          </div>
          <h1><strong>Essentials</strong> Privacy Policy</h1>
          <p className="subtitle">
            Your privacy is our priority. Essentials is designed to be a local-first, 
            privacy-respecting utility for Android power users.
          </p>
          <p>
            <strong>Effective date</strong>: May 6, 2026
          </p>
        </section>

        <hr />

        <section id="data-handling">
          <h2>Local-First Approach</h2>
          <div className="note">
            <p>
              <strong>Important:</strong> Essentials is a local-first utility. 
              All data processing, including automation logic, device stats, and customization, occurs 
              <strong> entirely on your device</strong>. No personal data, location history, or device information 
              is ever uploaded to our servers or shared with third parties.
            </p>
          </div>
          <p>Essentials does not:</p>
          <ul>
            <li>Collect personal identifying information.</li>
            <li>Store your location history on any server.</li>
            <li>Use tracking or advertising SDKs.</li>
            <li>Mirror your data to any cloud service.</li>
          </ul>
        </section>

        <hr />

        <section id="permissions">
          <h2>Permissions & Usage</h2>
          <p>
            Due to the nature of Essentials as a system utility and automation tool, 
            it requires several Android permissions to function. Below is a detailed breakdown of how we use them.
          </p>

          <h3>Device State & Communication</h3>
          <table>
            <thead>
              <tr>
                <th>Permission</th>
                <th>Purpose</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>READ_PHONE_STATE</code></td>
                <td>
                  Used for the <strong>Smart Data</strong> feature to detect network types and for 
                  <strong>Call Vibrations</strong> to trigger haptic feedback during call state changes.
                </td>
              </tr>
              <tr>
                <td><code>READ_CALENDAR</code></td>
                <td>
                  Required for <strong>WearOS Calendar Sync</strong> to display upcoming events on your watch complications.
                </td>
              </tr>
              <tr>
                <td><code>POST_NOTIFICATIONS</code></td>
                <td>
                  Used to show status indicators, automation alerts, and active service notifications.
                </td>
              </tr>
            </tbody>
          </table>

          <h3>Location & Automation</h3>
          <table>
            <thead>
              <tr>
                <th>Permission</th>
                <th>Purpose</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>ACCESS_FINE_LOCATION</code>, <code>ACCESS_COARSE_LOCATION</code></td>
                <td>
                  Required for the <strong>Are we there yet?</strong> (Location Reached) feature to 
                  calculate distance to your destination.
                </td>
              </tr>
              <tr>
                <td><code>ACCESS_BACKGROUND_LOCATION</code></td>
                <td>
                  Allows the <strong>Location Reached</strong> service to monitor your progress 
                  while the app is in the background or the screen is off.
                </td>
              </tr>
              <tr>
                <td><code>SCHEDULE_EXACT_ALARM</code></td>
                <td>
                  Used by the <strong>Automation</strong> engine to trigger tasks at precise times.
                </td>
              </tr>
            </tbody>
          </table>

          <h3>System & Power User Tools</h3>
          <table>
            <thead>
              <tr>
                <th>Permission</th>
                <th>Purpose</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>BIND_ACCESSIBILITY_SERVICE</code></td>
                <td>
                  Used for features like <strong>Screen Off</strong> logic, <strong>Auto-locking</strong>, 
                  and <strong>Button Remapping</strong>. This service only monitors the specific actions 
                  you configure.
                </td>
              </tr>
              <tr>
                <td><code>PACKAGE_USAGE_STATS</code></td>
                <td>
                  Required for <strong>App Detection</strong> to trigger automations when specific 
                  apps are opened or closed.
                </td>
              </tr>
              <tr>
                <td><code>SYSTEM_ALERT_WINDOW</code></td>
                <td>
                  Used to display overlays like <strong>Edge Lighting</strong> or <strong>Music Glance</strong>.
                </td>
              </tr>
              <tr>
                <td><code>WRITE_SECURE_SETTINGS</code></td>
                <td>
                  Enables advanced system modifications (usually via Shizuku or Root) such as 
                  <strong>Status Bar customization</strong> and <strong>Animation scales</strong>.
                </td>
              </tr>
              <tr>
                <td><code>QUERY_ALL_PACKAGES</code></td>
                <td>
                  Allows you to select apps for features like <strong>App Freezing</strong> or <strong>App Lock</strong>.
                </td>
              </tr>
            </tbody>
          </table>

          <h3>Connectivity & Utilities</h3>
          <table>
            <thead>
              <tr>
                <th>Permission</th>
                <th>Purpose</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>BLUETOOTH_CONNECT</code>, <code>BLUETOOTH_SCAN</code></td>
                <td>
                  Used for <strong>Battery Mirroring</strong> and connectivity features between 
                  your phone and WearOS devices.
                </td>
              </tr>
              <tr>
                <td><code>INTERNET</code>, <code>ACCESS_NETWORK_STATE</code></td>
                <td>
                  Used for <strong>App Updates</strong> checking and <strong>WearOS Sync</strong> 
                  over the local network.
                </td>
              </tr>
              <tr>
                <td><code>WAKE_LOCK</code></td>
                <td>
                  Prevents the device from sleeping during active tasks like <strong>Caffeinate</strong> 
                  or location tracking.
                </td>
              </tr>
              <tr>
                <td><code>VIBRATE</code></td>
                <td>
                  Provides haptic feedback for UI interactions and call alerts.
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        <hr />

        <section id="security">
          <h2>Security</h2>
          <p>
            Any data transferred between your devices (e.g., Phone to WearOS) is sent over 
            <strong>secure local channels</strong>. We use standard Android security protocols 
            to ensure that your configuration and state remains private to your local hardware.
          </p>
        </section>

        <hr />

        <section id="contact">
          <h2>Contact</h2>
          <p>
            If you have questions about our privacy practices, please contact:
          </p>
          <p>
            <strong>Sameera Sandakelum</strong><br />
            Email: <a href="mailto:mail@sameerasw.com">mail@sameerasw.com</a><br />
            Website: <a href="https://sameerasw.com">sameerasw.com</a>
          </p>
        </section>

        <div style={{ marginTop: "4rem", textAlign: "center", paddingBottom: "4rem" }}>
          <Link href="/essentials" className="button">
            Back to Essentials
          </Link>
        </div>
      </div>
    </>
  );
}
