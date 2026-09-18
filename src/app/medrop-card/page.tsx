"use client";

import { useEffect, useState } from "react";
import "@/styles/medrop-card/medrop-card.css";

type ParsedContact = {
  fn: string;
  photo: string;
  org: string;
  title: string;
  role: string;
  pronouns: string;
  phones: string[];
  emails: string[];
  addresses: string[];
  urls: string[];
  note: string;
};

function base64UrlDecode(str: string): string {
  const padded = str.replace(/-/g, "+").replace(/_/g, "/");
  const withPadding = padded + "=".repeat((4 - (padded.length % 4)) % 4);
  const binary = atob(withPadding);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new TextDecoder("utf-8").decode(bytes);
}

function unfoldLines(text: string): string[] {
  return text
    .replace(/\r\n/g, "\n")
    .split("\n")
    .reduce<string[]>((lines, line) => {
      if (/^[ \t]/.test(line) && lines.length) {
        lines[lines.length - 1] += line.replace(/^[ \t]/, "");
      } else {
        lines.push(line);
      }
      return lines;
    }, []);
}

function parseVCard(vcardText: string): ParsedContact {
  const contact: ParsedContact = {
    fn: "",
    photo: "",
    org: "",
    title: "",
    role: "",
    pronouns: "",
    phones: [],
    emails: [],
    addresses: [],
    urls: [],
    note: "",
  };

  unfoldLines(vcardText).forEach((line) => {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) return;
    const keyPart = line.substring(0, colonIdx);
    const value = line.substring(colonIdx + 1);
    const key = keyPart.split(";")[0].toUpperCase();

    switch (key) {
      case "FN":
        contact.fn = value;
        break;
      case "PHOTO": {
        if (/ENCODING=b/i.test(keyPart) || /ENCODING=BASE64/i.test(keyPart)) {
          const mime = /TYPE=([A-Za-z]+)/i.exec(keyPart);
          contact.photo = `data:image/${mime ? mime[1].toLowerCase() : "jpeg"};base64,${value}`;
        }
        break;
      }
      case "ORG":
        contact.org = value.split(";")[0] || "";
        break;
      case "TITLE":
        contact.title = value;
        break;
      case "ROLE":
        contact.role = value;
        break;
      case "PRONOUNS":
        contact.pronouns = value;
        break;
      case "TEL":
        contact.phones.push(value);
        break;
      case "EMAIL":
        contact.emails.push(value);
        break;
      case "URL":
        contact.urls.push(value);
        break;
      case "ADR": {
        const parts = value.split(";").filter(Boolean).join(", ");
        if (parts) contact.addresses.push(parts);
        break;
      }
      case "NOTE":
        contact.note = value;
        break;
    }
  });

  return contact;
}

function initials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0] || "")
    .join("")
    .toUpperCase();
}

function saveVCard(vcardText: string, name: string) {
  const blob = new Blob([vcardText], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${(name || "contact").replace(/[^\w\- ]/g, "").trim()}.vcf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

const FLOWER_PATH_D =
  "M 0.5000 0.0000 L 0.5259 0.0052 L 0.5505 0.0191 L 0.5733 0.0369 L 0.5950 0.0531 L 0.6171 0.0630 L 0.6412 0.0654 L 0.6680 0.0623 L 0.6967 0.0583 L 0.7249 0.0585 L 0.7500 0.0670 L 0.7698 0.0845 L 0.7842 0.1088 L 0.7950 0.1356 L 0.8057 0.1604 L 0.8199 0.1801 L 0.8396 0.1943 L 0.8644 0.2050 L 0.8912 0.2158 L 0.9155 0.2302 L 0.9330 0.2500 L 0.9415 0.2751 L 0.9417 0.3033 L 0.9377 0.3320 L 0.9346 0.3588 L 0.9370 0.3829 L 0.9469 0.4050 L 0.9631 0.4267 L 0.9809 0.4495 L 0.9948 0.4741 L 1.0000 0.5000 L 0.9948 0.5259 L 0.9809 0.5505 L 0.9631 0.5733 L 0.9469 0.5950 L 0.9370 0.6171 L 0.9346 0.6412 L 0.9377 0.6680 L 0.9417 0.6967 L 0.9415 0.7249 L 0.9330 0.7500 L 0.9155 0.7698 L 0.8912 0.7842 L 0.8644 0.7950 L 0.8396 0.8057 L 0.8199 0.8199 L 0.8057 0.8396 L 0.7950 0.8644 L 0.7842 0.8912 L 0.7698 0.9155 L 0.7500 0.9330 L 0.7249 0.9415 L 0.6967 0.9417 L 0.6680 0.9377 L 0.6412 0.9346 L 0.6171 0.9370 L 0.5950 0.9469 L 0.5733 0.9631 L 0.5505 0.9809 L 0.5259 0.9948 L 0.5000 1.0000 L 0.4741 0.9948 L 0.4495 0.9809 L 0.4267 0.9631 L 0.4050 0.9469 L 0.3829 0.9370 L 0.3588 0.9346 L 0.3320 0.9377 L 0.3033 0.9417 L 0.2751 0.9415 L 0.2500 0.9330 L 0.2302 0.9155 L 0.2158 0.8912 L 0.2050 0.8644 L 0.1943 0.8396 L 0.1801 0.8199 L 0.1604 0.8057 L 0.1356 0.7950 L 0.1088 0.7842 L 0.0845 0.7698 L 0.0670 0.7500 L 0.0585 0.7249 L 0.0583 0.6967 L 0.0623 0.6680 L 0.0654 0.6412 L 0.0630 0.6171 L 0.0531 0.5950 L 0.0369 0.5733 L 0.0191 0.5505 L 0.0052 0.5259 L 0.0000 0.5000 L 0.0052 0.4741 L 0.0191 0.4495 L 0.0369 0.4267 L 0.0531 0.4050 L 0.0630 0.3829 L 0.0654 0.3588 L 0.0623 0.3320 L 0.0583 0.3033 L 0.0585 0.2751 L 0.0670 0.2500 L 0.0845 0.2302 L 0.1088 0.2158 L 0.1356 0.2050 L 0.1604 0.1943 L 0.1801 0.1801 L 0.1943 0.1604 L 0.2050 0.1356 L 0.2158 0.1088 L 0.2302 0.0845 L 0.2500 0.0670 L 0.2751 0.0585 L 0.3033 0.0583 L 0.3320 0.0623 L 0.3588 0.0654 L 0.3829 0.0630 L 0.4050 0.0531 L 0.4267 0.0369 L 0.4495 0.0191 L 0.4741 0.0052 L 0.5000 0.0000 Z";

function DetailRow({
  icon,
  label,
  value,
  href,
}: {
  icon: string;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <>
      <span className="material-symbols-rounded">{icon}</span>
      <div>
        <div className="medrop-detail-label">{label}</div>
        <div className="medrop-detail-value">{value}</div>
      </div>
    </>
  );
  return href ? (
    <a className="medrop-detail-item" href={href}>
      {content}
    </a>
  ) : (
    <div className="medrop-detail-item">{content}</div>
  );
}

export default function MedropCardPage() {
  const [vcardText, setVcardText] = useState<string | null>(null);

  useEffect(() => {
    const hash = window.location.hash || "";
    const match = /[#&]v=([^&]+)/.exec(hash);
    if (!match) return;
    try {
      const decoded = base64UrlDecode(decodeURIComponent(match[1]));
      if (decoded.includes("BEGIN:VCARD")) {
        setVcardText(decoded);
      }
    } catch {
      // leave empty state
    }
  }, []);

  const contact = vcardText ? parseVCard(vcardText) : null;
  const subtitle = contact
    ? [contact.title, contact.org].filter(Boolean).join(" · ") || contact.role
    : "";

  return (
    <div className="medrop-card-page">
      <svg width="0" height="0" style={{ position: "absolute", pointerEvents: "none" }} aria-hidden="true">
        <defs>
          <clipPath id="m3-flower-12" clipPathUnits="objectBoundingBox">
            <path className="medrop-flower-path" d={FLOWER_PATH_D} />
          </clipPath>
        </defs>
      </svg>

      <div className="medrop-card-wrap">
        {!contact ? (
          <div className="medrop-empty">
            <h1>MeDrop</h1>
            <p>Tap a MeDrop contact card with your phone to see it here.</p>
          </div>
        ) : (
          <>
            <div className="medrop-avatar-wrap">
              <div
                className="medrop-avatar"
                style={contact.photo ? { backgroundImage: `url('${contact.photo}')` } : undefined}
              >
                {!contact.photo && initials(contact.fn || "?")}
              </div>
            </div>

            <p className="medrop-name">{contact.fn || "Contact"}</p>
            {subtitle && <p className="medrop-subtitle">{subtitle}</p>}
            {contact.pronouns && <p className="medrop-pronouns">{contact.pronouns}</p>}

            <button
              className="medrop-save-btn"
              onClick={() => saveVCard(vcardText as string, contact.fn)}
            >
              <span className="material-symbols-rounded">person_add</span>
              Save Contact
            </button>

            <div className="medrop-details">
              {contact.phones.map((p) => (
                <DetailRow key={p} icon="call" label="Phone" value={p} href={`tel:${p.replace(/\s+/g, "")}`} />
              ))}
              {contact.emails.map((e) => (
                <DetailRow key={e} icon="mail" label="Email" value={e} href={`mailto:${e}`} />
              ))}
              {contact.addresses.map((a) => (
                <DetailRow
                  key={a}
                  icon="location_on"
                  label="Address"
                  value={a}
                  href={`https://maps.apple.com/?q=${encodeURIComponent(a)}`}
                />
              ))}
              {contact.urls.map((u) => (
                <DetailRow
                  key={u}
                  icon="link"
                  label="Link"
                  value={u}
                  href={/^https?:\/\//i.test(u) ? u : `https://${u}`}
                />
              ))}
              {contact.note && <DetailRow icon="sticky_note_2" label="Note" value={contact.note} />}
            </div>

            <div className="medrop-footer">
              Shared via{" "}
              <a href="https://github.com/sameerasw/MeDrop">
                <i className="fa-brands fa-github" /> MeDrop
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
