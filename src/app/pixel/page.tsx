"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import "@/styles/article.css";
import "@/styles/articles/pixel.css";

export default function PixelNotes() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const items = document.querySelectorAll(".item") as NodeListOf<HTMLElement>;
    let i = 0;

    const animate = () => {
      if (i < items.length) {
        items[i].style.opacity = "1";
        items[i].style.transform = "translateY(0)";
        i++;
        setTimeout(animate, 150);
      }
    };

    // reset styles first
    items.forEach((item) => {
      item.style.opacity = "0";
      item.style.transform = "translateY(20px)";
      if (item.id !== "logo") {
        item.style.transition =
          "opacity 0.5s ease-out, transform 0.5s ease-out, scale 0.3s ease-out";
      }
    });

    setTimeout(animate, 100);

    const handleScroll = () => {
      const value = window.scrollY || document.documentElement.scrollTop;
      setIsScrolled(value > 100);

      items.forEach((item) => {
        if (item.id === "logo") return;
        const position = item.getBoundingClientRect();
        if (position.top > window.innerHeight - 10 || position.bottom < 20) {
          item.style.scale = "0.75";
        } else {
          item.style.scale = "1";
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <nav id="nav">
        <ul>
          <li>
            <Link href="/" id="home-nav" aria-label="back to home page">
              <span className="material-symbols-rounded">arrow_back</span>
              <span className="caption">Back</span>
            </Link>
          </li>
        </ul>
      </nav>

      <div className="container">
        <section id="intro">
          <div className="heading">
            <a href="#" onClick={handleScrollToTop} aria-label="Back to top">
              <div
                id="logo"
                className={`pixel-logo item ${isScrolled ? "scrolled" : ""}`}
              ></div>
            </a>
            <div className="container-mini item content">
              <h1 id="title" className="item">
                Enable <strong>Pixel</strong> voLTE
              </h1>
              <p className="item article-text" style={{ textAlign: "left" }}>
                Since Sri Lankan carriers not supporting Pixel natively, you may
                experience network difficulties. To counter that, we need to
                have a registered IMS status which include connecting Voice over
                LTE (VoLTE), Video Calling and VoWiFi.
              </p>
            </div>
          </div>
        </section>

        <section id="volte" className="article-summary">
          <div className="volte-content">
            <p className="item article-text">
              Keep in mind that some networks like Mobitel, Dialog and Airtel
              are working on adding native voLTE support now. Before you begin,
              check if you already have voLTE and if not, double check with the{" "}
              <a href="#carrier-specific">carrier specific settings</a> too and
              only continue if all that fails.
            </p>

            <div className="volte-section">
              <h3 id="carrier-specific">Enable voLTE from Carrier's End</h3>
              <p className="item article-text">
                Because we are still in the stone age, voLTE might not be
                enabled by default for your connection by the carrier. So you
                may need to request to activate from them. There is not much of
                a direct method for this.
              </p>

              <div className="carrier-grid">
                <div className="carrier-card">
                  <div className="carrier-header">
                    <h4>Dialog</h4>
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Dialog_Axiata_logo.svg/1280px-Dialog_Axiata_logo.svg.png"
                      className="carrier-logo"
                      alt="Dialog network logo"
                    />
                  </div>
                  <div className="carrier-body">
                    <p>
                      Request to activate the service by sending a SMS to{" "}
                      <strong>678</strong> with
                    </p>
                    <code className="carrier-code">ACT 4GV</code>
                    <p className="carrier-note">
                      (This will activate both VoLTE & VoWiFi)
                    </p>
                  </div>
                </div>

                <div className="carrier-card">
                  <div className="carrier-header">
                    <h4>Mobitel</h4>
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/SLTMobitel_Logo.svg/2560px-SLTMobitel_Logo.svg.png"
                      className="carrier-logo"
                      alt="SLT Mobitel network logo"
                    />
                  </div>
                  <div className="carrier-body">
                    <p>
                      Contact Mobitel customer support using any of these
                      methods:
                    </p>
                    <ul className="carrier-contact-list">
                      <li>
                        <a href="mailto:info@mobitel.lk">info@mobitel.lk</a>
                      </li>
                      <li>24 Hour Hotline: +94 (0) 712755777 or dial 1717</li>
                    </ul>
                  </div>
                </div>

                <div className="carrier-card">
                  <div className="carrier-header">
                    <h4>Hutch</h4>
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Hutch_Logo.svg/1200px-Hutch_Logo.svg.png"
                      className="carrier-logo"
                      alt="Hutch network logo"
                    />
                  </div>
                  <div className="carrier-body">
                    <p>
                      Contact Hutch customer support. Note: Hutch doesn't
                      officially let other devices opt-in to voLTE. You may need
                      to specify your device.
                    </p>
                    <ul className="carrier-contact-list">
                      <li>
                        <a href="mailto:cs@hutchison.lk">cs@hutchison.lk</a>
                      </li>
                      <li>Hotline (24Hr): 1788 (Any Network)</li>
                      <li>WhatsApp: 0788 777 111 (Chat Only)</li>
                    </ul>
                  </div>
                </div>

                <div className="carrier-card">
                  <div className="carrier-header">
                    <h4>Airtel</h4>
                    <img
                      src="https://1000logos.net/wp-content/uploads/2023/06/Airtel-logo.png"
                      className="carrier-logo"
                      alt="Airtel network logo"
                    />
                  </div>
                  <div className="carrier-body">
                    <p>Information not available at this time.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="volte-section">
              <div className="warning-box">
                <p className="warn">
                  <strong>⚠️ Disclaimer:</strong> Follow these workaround
                  methods at your own risk. No responsibilities will be taken by
                  us if you encounter any issues.
                </p>
              </div>

              <h3>Device-Specific Workarounds</h3>

              <div className="method-card">
                <div className="method-header">
                  <h4>Google Tensor Devices (Shizuku - No Root)</h4>
                  <span className="method-badge">voLTE Only</span>
                </div>
                <div className="method-body">
                  <p className="item article-text">
                    <strong>Supported:</strong> Pixel 6 and later
                  </p>

                  <h4>Important:</h4>
                  <p className="warn">
                    The guide is updated to support after December 2025
                    update.(Edited on 4th Dec 2025)
                  </p>

                  <div className="steps-section">
                    <p>
                      <strong>Working fix:</strong>
                    </p>
                    <p className="warn">
                      <strong>Prerequisites:</strong> Before starting, make sure
                      you remove any other previous IMS and Shizuku apps from
                      your device. <u>Reset mobile networks from settings</u>{" "}
                      and do a restart.
                    </p>
                    <ol className="method-steps">
                      <li>
                        Install the "IMS" latest app from GitHub releases and
                        the same for "Shizuku". Not the Pixel IMS app. and not
                        from Play Store. There is not UI in this application.
                        <div className="step-action">
                          <a
                            href="https://github.com/vvb2060/Ims/releases/latest"
                            className="button"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Download IMS APK
                          </a>
                          <a
                            href="https://github.com/RikkaApps/Shizuku/releases/latest"
                            className="button"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Download Shizuku APK
                          </a>
                        </div>
                        <p className="warn">
                          <strong>Note:</strong> Make sure you have Advanced
                          Protection and 2G Protection features are disabled on
                          the device and installing these APK files might need
                          the Play Protect to be disabled temporarily as well.
                        </p>
                      </li>
                      <li>
                        Grant permissions to that app from the Shizuku app.
                        <br />
                        <video
                          src="/assets/img/articles/pixel/shizuku.mp4"
                          className="step-video"
                          controls
                          playsInline
                          muted
                          loop
                        >
                          Your browser does not support the video tag.
                        </video>
                      </li>
                      <li>
                        <s>
                          Enable features inside the Pixel IMS app for each SIM.
                        </s>{" "}
                        There is not UI with the new IMS app. It will handle
                        everything.
                      </li>
                      <li>
                        Enable the VoLTE toggle under Settings → Network & SIM
                        cards → {"{your SIM}"} if not enabled already.
                        <img
                          src="/assets/img/articles/pixel/enable-volte.jpeg"
                          alt="enable volte"
                          className="step-image"
                        />
                      </li>
                      <li>
                        Restart your phone{" "}
                        <span className="warn">(mandatory)</span>.
                      </li>
                      <li>
                        Verify carrier speciifc settings and check if voLTE is
                        now enabled.
                      </li>
                    </ol>
                    <p className="item article-text">
                      <strong>Full guide:</strong>{" "}
                      <a
                        href="https://github.com/kyujin-cho/pixel-volte-patch/blob/main/README.en.md"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        GitHub README ()
                      </a>
                    </p>
                  </div>

                  <p className="item article-text">
                    <strong>That's it!</strong> Enjoy clear calling!{" "}
                  </p>
                  <p className="item article-text">
                    Now continue with the carrier side activation steps. <br />{" "}
                    <span className="warn">
                      You can safely turn off Developer Options after enabling
                      with this method but it may need to be repeated after OTA
                      updates.
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="volte-section">
              <h3>Verify voLTE Activation</h3>
              <p className="item article-text">
                Ensure the activation of voLTE with the following steps:
              </p>
              <ol className="method-steps">
                <li>
                  Dial <code className="inline-code">*#*#4636#*#*</code> in
                  dialer
                </li>
                <li>Select "Phone information"</li>
                <li>Select the SIM (Select phone index option)</li>
                <li>Open the 3 dot menu</li>
                <li>Open "IMS Service Status"</li>
                <li>
                  Check if your services are registered and available similar to
                  below:
                </li>
              </ol>
              <div className="verification-image">
                <img
                  src="https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Fb420cf1b-b5de-455a-bc03-3990ae2d77ba%2Ff5ca4427-e602-4d05-ba88-17760cab1109%2FUntitled.png?table=block&id=f44ff9e7-d0c2-4434-bf6a-6bbedc9857eb&cache=v2"
                  alt="IMS status verification"
                  className="article-img"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="root-methods" className="article-summary">
          <div className="method-card">
            <div className="method-header">
              <h4>VoLTE + 5G Support</h4>
              <span className="method-badge root">Root Required</span>
            </div>

            <div className="warning-box">
              <p>
                <strong>⚠️ Warning:</strong> These methods require root access.
                Rooting your device will void your warranty and may cause
                security risks. Proceed at your own risk. No responsibilities
                will be taken by us if you encounter any issues.
              </p>
            </div>

            <div className="method-body">
              <p className="item article-text">
                <strong>Supported devices:</strong>
              </p>
              <ul className="device-list">
                <li>Google Pixel 5</li>
                <li>Google Pixel 5a</li>
                <li>Google Pixel 4a 5G</li>
                <li>Other devices untested</li>
              </ul>

              <h3>Installation Steps</h3>
              <div className="step-action">
                <a
                  href="https://github.com/stanislawrogasik/Pixel5-VoLTE-VoWiFi"
                  className="button"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download Module from GitHub
                </a>
              </div>

              <p className="item article-text">
                Flash this module via your root solution (Magisk, KernelSU, or
                APatch).
              </p>

              <div className="ksu-section">
                <h4>For KSU or APatch Users:</h4>
                <p className="item article-text">
                  If you are using KernelSU or APatch as your root solution,
                  follow these additional steps:
                </p>
                <ol className="method-steps">
                  <li>
                    Flash Magisk by allowing the Magisk app root permission from
                    KSU/APatch, then reboot
                  </li>
                  <li>Flash the voLTE/5G module in Magisk, then reboot</li>
                  <li>Uninstall Magisk (will automatically reboot)</li>
                  <li>Flash the voLTE/5G module in KSU/APatch, then reboot</li>
                </ol>
              </div>
              <p className="item article-text">
                After completing these steps, continue with the{" "}
                <a href="#carrier-specific">carrier side activation</a> from the
                main Pixel notes page.
              </p>
            </div>
          </div>
        </section>
        <footer></footer>
      </div>
    </>
  );
}
