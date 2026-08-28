import Link from "next/link";
import { Metadata } from "next";

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
              <span className="material-symbols-rounded">home</span>
            </Link>
          </li>
        </ul>
      </nav>

      <div className="container essentials-privacy article-body">
        <section id="intro" className="hero-section">
          <h1><strong>MeDrop</strong> Privacy Policy</h1>
          <p className="subtitle">
            Your privacy is absolute. MeDrop is a 100% offline, local-first utility for contactless contact card sharing via NFC and QR code.
          </p>
          <p>
            <strong>Effective date</strong>: August 28, 2026
          </p>
        </section>

        <hr />

        <section id="local-first">
          <h2>100% Offline & Local-First</h2>
          <div className="note">
            <p>
              <strong>Zero Data Sent Outside:</strong> MeDrop operates completely offline. No personal data, contact information, photos, or usage logs are ever collected, stored on external servers, or transmitted across the internet.
            </p>
          </div>
          <p>MeDrop guarantees that:</p>
          <ul>
            <li>No data is uploaded to any cloud service, external server, or backend.</li>
            <li>No analytics, tracking tools, telemetry, or advertising SDKs are included in the app.</li>
            <li>No account creation or login is required.</li>
            <li>All contact profile information is stored strictly on your device's local encrypted storage.</li>
          </ul>
        </section>

        <hr />

        <section id="how-sharing-works">
          <h2>How Contact Sharing Works</h2>
          <p>
            When you choose to share your contact information with MeDrop:
          </p>
          <ul>
            <li>
              <strong>NFC Host Card Emulation (HCE)</strong>: Your phone acts as a contactless smart card. When brought close to another NFC-enabled device, your selected contact profile is transmitted directly peer-to-peer via NFC hardware signals.
            </li>
            <li>
              <strong>QR Code Sharing</strong>: The contact card (vCard) is rendered directly on your screen as an offline QR code. No external web link or remote generator is used.
            </li>
            <li>
              <strong>Granular Field Visibility</strong>: You have complete control over which individual fields (name, phone numbers, emails, addresses, pronouns, company, etc.) are visible or hidden for each profile mode.
            </li>
          </ul>
        </section>

        <hr />

        <section id="permissions">
          <h2>Permissions & Usage</h2>
          <table>
            <thead>
              <tr>
                <th>Permission</th>
                <th>Purpose</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>NFC</code></td>
                <td>
                  Required to broadcast your chosen contact card to nearby NFC readers and phones using Android Host Card Emulation.
                </td>
              </tr>
              <tr>
                <td><code>READ_CONTACTS</code> (Optional)</td>
                <td>
                  Allows you to conveniently pick and import your contact information and photo from your device's local address book into MeDrop.
                </td>
              </tr>
              <tr>
                <td><code>VIBRATE</code></td>
                <td>
                  Provides haptic feedback during NFC device scanning detection and UI touch interactions.
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        <hr />

        <section id="security">
          <h2>Data Retention & Security</h2>
          <p>
            All custom profile configurations, field overrides, and selected photos remain strictly in your app's private internal storage (`SharedPreferences` and app-private directory). Uninstalling the app removes all saved configuration data permanently.
          </p>
        </section>

        <hr />

        <section id="contact">
          <h2>Contact & Developer Information</h2>
          <p>
            If you have any questions or feedback regarding MeDrop or this Privacy Policy, feel free to reach out:
          </p>
          <p>
            <strong>Sameera Sandakelum</strong><br />
            Email: <a href="mailto:mail@sameerasw.com">mail@sameerasw.com</a><br />
            Website: <a href="https://sameerasw.com">sameerasw.com</a><br />
            GitHub: <a href="https://github.com/sameerasw" target="_blank" rel="noopener noreferrer">github.com/sameerasw</a>
          </p>
        </section>

        <div style={{ marginTop: "4rem", textAlign: "center", paddingBottom: "4rem" }}>
          <Link href="/" className="button">
            Back to Home
          </Link>
        </div>
      </div>
    </>
  );
}
