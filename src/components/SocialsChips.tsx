import "@/styles/index/socials-chips.css";

const SOCIALS = [
  {
    label: "GitHub",
    url: "https://github.com/sameerasw",
    icon: <i className="fa-brands fa-github" />,
    social: "github",
  },
  {
    label: "Mail",
    url: "mailto:mail@sameerasw.com",
    icon: <i className="fa-regular fa-envelope" />,
    social: "email",
  },
  {
    label: "Twi... 𝕏",
    url: "https://twitter.com/sameeraswdotcom",
    icon: <i className="fa-brands fa-x-twitter" />,
    social: "twitter",
  },
  {
    label: "LinkedIn",
    url: "https://linkedin.com/in/sameerasw",
    icon: <i className="fa-brands fa-linkedin" />,
    social: "linkedin",
  },
  {
    label: "Instagram",
    url: "https://instagram.com/sameeraswdotcom",
    icon: <i className="fa-brands fa-instagram" />,
    social: "instagram",
  },
  {
    label: "Telegram",
    url: "https://t.me/sameerasw",
    icon: <i className="fa-brands fa-telegram" />,
    social: "telegram",
  },
  {
    label: "Facebook",
    url: "https://fb.com/sameeraswdotcom",
    icon: <i className="fa-brands fa-facebook" />,
    social: "facebook",
  },
  {
    label: "r/MadebySameerasw",
    url: "https://www.reddit.com/r/MadebySameerasw",
    icon: <i className="fa-brands fa-reddit" />,
    social: "reddit",
  },
  {
    label: "Discord",
    url: "https://discord.com/users/590335847019184130",
    icon: <i className="fa-brands fa-discord" />,
    social: "discord",
  },
  {
    label: "YouTube",
    url: "https://www.youtube.com/@sameerasw",
    icon: <i className="fa-brands fa-youtube" />,
    social: "youtube",
  },
];

export default function SocialsChips() {
  return (
    <div className="socials-chips item">
      {SOCIALS.map((s) => (
        <a
          key={s.label}
          href={s.url}
          target={s.url.startsWith("mailto") ? undefined : "_blank"}
          rel="noopener noreferrer"
          className="socials-chip"
          data-social={s.social}
        >
          {s.icon}
          <span>{s.label}</span>
        </a>
      ))}
    </div>
  );
}
