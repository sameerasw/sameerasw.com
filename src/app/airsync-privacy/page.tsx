import Link from "next/link";
import "@/styles/airsync/privacy.css";

export default function AirSyncPrivacy() {
  return (
    <>
      <nav id="nav">
        <ul>
          <li>
            <Link
              href="/airsync"
              id="home-nav"
              aria-label="back to AirSync page"
            >
              <span className="material-symbols-rounded"> arrow_back </span>
            </Link>
          </li>
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
                <strong>AirSync</strong> Privacy Policy
              </h1>
              <p className="article-text">
                At <strong>AirSync</strong>, we respect your privacy and are
                committed to protecting your personal data. This Privacy Policy
                explains what data we collect, how it is used, and your rights.
                <strong>Effective date</strong>: December 23, 2025
              </p>
            </div>
          </div>
        </section>

        <div className="article-text">
          <hr />

          <h2>Information We Collect</h2>
          <p>
            AirSync collects and processes the following data{" "}
            <strong>locally on your device</strong>:
          </p>

          <ul>
            <li>
              <strong>Connectivity & Background Sync</strong>: Uses internet and
              network state permissions to maintain a secure local network
              connection. It runs as a foreground service to ensure persistent
              connectivity and reliable feature performance like notification
              mirroring.
            </li>
            <li>
              <strong>Communication & Call Sync</strong>: Detects real-time call
              status and identifies caller numbers from call logs and contacts
              registry to display names and statuses on your Mac.
            </li>
            <li>
              <strong>Notification Mirroring</strong>: Reads device
              notifications and securely forwards them to your Mac.
            </li>
            <li>
              <strong>Media & Personalization</strong>: Syncs media playback
              controls and "Now Playing" information. Optionally reads wallpaper
              for synchronization with your Mac's desktop background.
            </li>
            <li>
              <strong>Setup & Utilities</strong>: Uses the camera exclusively
              for scanning pairing QR codes and handles audio-related sync
              features.
            </li>
            <li>
              <strong>Battery Level</strong>: Shares your phone's current
              battery level with the Mac app for remote monitoring.
            </li>
          </ul>

          <div className="note">
            <p>
              <strong>Important:</strong> All data transfer occurs exclusively
              over your <strong>secure local Wi-Fi/Network</strong>. No call
              logs, contact details, or notification contents are ever stored on
              our servers.
            </p>
          </div>

          <hr />

          <h2>How We Use Your Data</h2>
          <p>All data processed by AirSync is:</p>
          <ul>
            <li>
              <strong>Stored locally</strong> on your devices.
            </li>
            <li>
              <strong>Never uploaded</strong> to any server or cloud service.
            </li>
            <li>
              <strong>Only transmitted</strong> via an encrypted local WebSocket
              connection (WSS) between your Android and macOS devices.
            </li>
          </ul>

          <p>AirSync does not:</p>
          <ul>
            <li>Collect analytics or crash data</li>
            <li>Serve ads or use tracking technologies</li>
            <li>Share data with any third-party services</li>
          </ul>

          <hr />

          <h2>Permissions Explanation</h2>

          <h3>Connectivity & Background Sync</h3>
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
                  <code>INTERNET</code>, <code>ACCESS_NETWORK_STATE</code>,{" "}
                  <code>ACCESS_WIFI_STATE</code>
                </td>
                <td>
                  Used for established and maintaining a secure local network
                  connection between your Android device and your Mac.
                </td>
              </tr>
              <tr>
                <td>
                  <code>FOREGROUND_SERVICE</code>,{" "}
                  <code>FOREGROUND_SERVICE_CONNECTED_DEVICE</code>
                </td>
                <td>
                  Required to maintain a persistent, high-priority connection to
                  your Mac so that features like notification and call mirroring
                  work reliably in the background.
                </td>
              </tr>
              <tr>
                <td>
                  <code>REQUEST_IGNORE_BATTERY_OPTIMIZATIONS</code>
                </td>
                <td>
                  Used to ensure that the Android system does not kill the
                  AirSync background service, guaranteeing constant
                  connectivity.
                </td>
              </tr>
              <tr>
                <td>
                  <code>WAKE_LOCK</code>
                </td>
                <td>
                  Prevents the phone from entering deep sleep while an active
                  sync session is in progress.
                </td>
              </tr>
            </tbody>
          </table>

          <h3>Communication & Call Sync</h3>
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
                  <code>READ_PHONE_STATE</code>
                </td>
                <td>
                  Used to detect real-time call status (ringing, answered, or
                  ended) so the status can be mirrored on your Mac.
                </td>
              </tr>
              <tr>
                <td>
                  <code>READ_CALL_LOG</code>
                </td>
                <td>
                  Strictly used to identify the phone number of an incoming
                  caller for display on your Mac's notification.
                </td>
              </tr>
              <tr>
                <td>
                  <code>READ_CONTACTS</code>
                </td>
                <td>
                  Used to match phone numbers with names from your contact
                  registry so you can see who is calling or messaging you by
                  name on your Mac.
                </td>
              </tr>
            </tbody>
          </table>

          <h3>Notification Mirroring</h3>
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
                  <code>BIND_NOTIFICATION_LISTENER_SERVICE</code>
                </td>
                <td>
                  The core permission that allows AirSync to read your device
                  notifications and securely forward them to your Mac.
                </td>
              </tr>
              <tr>
                <td>
                  <code>POST_NOTIFICATIONS</code>
                </td>
                <td>
                  Used to show local app alerts and the persistent status
                  notification that allows you to disconnect from your Mac.
                </td>
              </tr>
            </tbody>
          </table>

          <h3>Media & Personalization</h3>
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
                  <code>FOREGROUND_SERVICE_MEDIA_PLAYBACK</code>
                </td>
                <td>
                  Used to sync media playback controls (Play, Pause, Skip) and
                  "Now Playing" information between your phone and your Mac.
                </td>
              </tr>
              <tr>
                <td>
                  <code>MANAGE_EXTERNAL_STORAGE</code>
                </td>
                <td>
                  An optional permission used solely to read your phone's
                  wallpaper for synchronization with your Mac's desktop
                  background.
                </td>
              </tr>
              <tr>
                <td>
                  <code>BATTERY_STATS</code>
                </td>
                <td>
                  Used to share your phone's current battery level with the Mac
                  app for remote monitoring.
                </td>
              </tr>
            </tbody>
          </table>

          <h3>Setup & Utilities</h3>
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
                  <code>CAMERA</code>
                </td>
                <td>
                  Used exclusively for scanning the QR code on your Mac to
                  facilitate quick and secure pairing.
                </td>
              </tr>
              <tr>
                <td>
                  <code>MODIFY_AUDIO_SETTINGS</code>
                </td>
                <td>Used to handle audio-related sync features.</td>
              </tr>
            </tbody>
          </table>

          <hr />

          <h2>Security</h2>
          <p>
            AirSync uses <strong>TLS (WSS) AES 256-bit</strong> encryption to
            secure all communication between devices. A shared encryption key is
            exchanged locally during the pairing process and is never
            transmitted over the internet.
          </p>

          <hr />

          <h2>Data Retention</h2>
          <p>
            No personal data is stored permanently. All mirrored notifications
            and clipboard data are stored only in RAM or app sandbox storage and
            are cleared automatically after use.
          </p>

          <hr />

          <h2>Your Rights</h2>
          <p>
            Since AirSync does not collect or store any personal data on
            external servers, there's no user data to delete or export. All
            usage is local and under your full control.
          </p>

          <hr />

          <h2>Contact</h2>
          <p>
            If you have any questions about this Privacy Policy or how AirSync
            works, contact me at:
          </p>
          <p>
            <strong>
              <a href="mailto:mail@sameerasw.com">mail@sameerasw.com</a>
            </strong>
            <br />
            <a
              href="https://github.com/sameerasw"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
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

          <hr />

          <h2>Changes to This Policy</h2>
          <p>
            This policy may be updated occasionally to reflect changes in
            features or permissions. You will be notified of major changes
            in-app or via our website.
          </p>

          <div style={{ marginTop: "3rem", textAlign: "center" }}>
            <Link href="/airsync" className="button">
              Back to AirSync
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
