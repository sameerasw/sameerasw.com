import Link from "next/link";
import { Metadata } from "next";
import "@/styles/airsync/privacy.css";

export const metadata: Metadata = {
  title: "MeDrop Privacy Policy - sameerasw.com",
  description: "Privacy policy for MeDrop: a 100% offline, local-first NFC & QR contact sharing app with zero tracking and zero cloud data transfer.",
};

export default function MeDropPrivacy() {
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
                <strong>MeDrop</strong> Privacy Policy
              </h1>
              <p className="article-text">
                At <strong>MeDrop</strong>, your privacy is absolute. MeDrop is a
                100% offline, local-first utility for contactless contact card
                sharing via NFC and QR codes with zero data collection or tracking.
                <br />
                <strong>Effective date</strong>: August 28, 2026
              </p>
            </div>
          </div>
        </section>

        <div className="article-text">
          <hr />

          <h2>100% Offline & Local-First</h2>
          <div className="note">
            <p>
              <strong>Important:</strong> MeDrop operates completely offline. No
              personal data, contact details, photos, or device information are ever
              uploaded to external servers or transmitted across the internet.
            </p>
          </div>

          <p>MeDrop guarantees that:</p>
          <ul>
            <li>
              <strong>Zero cloud data transfer</strong>: No information is
              uploaded to any cloud service, remote server, or backend.
            </li>
            <li>
              <strong>Zero tracking or telemetry</strong>: No analytics, tracking
              SDKs, crash reporters, or advertising networks are included in the app.
            </li>
            <li>
              <strong>No account required</strong>: No login, signup, or user
              registration.
            </li>
            <li>
              <strong>Local encrypted storage</strong>: All profile configurations,
              custom field visibility preferences, and contact images stay securely on
              your device's internal storage.
            </li>
          </ul>

          <hr />

          <h2>How Contact Sharing Works</h2>
          <p>
            When you initiate contact sharing in MeDrop:
          </p>

          <ul>
            <li>
              <strong>NFC Host Card Emulation (HCE)</strong>: Your device acts as a
              contactless smart card. When another NFC-compatible smartphone is tapped
              nearby, your contact card is transmitted strictly peer-to-peer over
              short-range radio waves.
            </li>
            <li>
              <strong>Offline QR Code Sharing</strong>: The contact payload (vCard)
              is generated entirely on-device and displayed as a QR code on your
              screen. No third-party QR API or web service is contacted.
            </li>
            <li>
              <strong>Granular Privacy Controls</strong>: You retain granular
              control over which individual fields (numbers, emails, addresses,
              pronouns, notes, etc.) are visible or hidden for each profile mode.
            </li>
          </ul>

          <hr />

          <h2>Permissions Explanation</h2>
          <p>
            MeDrop uses a minimal set of Android permissions strictly required for
            contact card sharing:
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
                  <code>NFC</code>
                </td>
                <td>
                  Required to broadcast your chosen contact card to nearby NFC readers
                  and phones using Android Host Card Emulation.
                </td>
              </tr>
              <tr>
                <td>
                  <code>READ_CONTACTS</code>
                </td>
                <td>
                  Optional. Allows you to easily select and import your own contact
                  information and profile picture from your phone's address book into
                  MeDrop.
                </td>
              </tr>
              <tr>
                <td>
                  <code>VIBRATE</code>
                </td>
                <td>
                  Provides tactile haptic feedback when a scanning device is detected
                  and during UI interactions.
                </td>
              </tr>
            </tbody>
          </table>

          <hr />

          <h2>Data Retention & Security</h2>
          <p>
            All custom profile configurations, field overrides, and photo references
            remain strictly in the app's sandboxed internal storage (
            <code>SharedPreferences</code> and private files directory). Uninstalling
            the application removes all saved configuration data permanently.
          </p>

          <hr />

          <h2>Your Rights</h2>
          <p>
            Since MeDrop does not collect or store any personal data on external
            servers, there is no remote user data to request, delete, or export. You
            have total ownership and control over your data directly on your device.
          </p>

          <hr />

          <h2>Contact</h2>
          <p>
            If you have any questions about this Privacy Policy or MeDrop, feel free
            to reach out:
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
