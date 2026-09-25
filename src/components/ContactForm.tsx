"use client";

import { useEffect, useRef, useState } from "react";

type ProjectId = "general" | "airsync" | "essentials" | "zen" | "folder-icons" | "other";
type TypeId = "hi" | "bug" | "feature" | "business";

type Option<T extends string> = { id: T; label: string; logo?: string; mask?: string; icon?: string };

const PROJECTS: Option<ProjectId>[] = [
  { id: "general", label: "General", icon: "forum" },
  { id: "airsync", label: "AirSync", mask: "/assets/img/project-logos/airsync-logo.svg" },
  { id: "essentials", label: "Essentials", mask: "/assets/img/project-logos/essentials-logo.svg" },
  { id: "zen", label: "Zen Zero", mask: "/assets/img/articles/zen/article-icon-zen.png" },
  { id: "folder-icons", label: "Folder Icons", icon: "folder" },
  { id: "other", label: "Other", icon: "more_horiz" },
];

const TYPES: { id: TypeId; label: string; icon: string }[] = [
  { id: "hi", label: "Just saying hi", icon: "waving_hand" },
  { id: "bug", label: "Bug / issue", icon: "bug_report" },
  { id: "feature", label: "Feature request", icon: "lightbulb" },
  { id: "business", label: "Business", icon: "business_center" },
];

const PROJECT_ALIASES: Record<string, ProjectId> = {
  zenzero: "zen",
  "zen-zero": "zen",
  zeninternet: "zen",
  foldericons: "folder-icons",
  folders: "folder-icons",
};

const TYPE_ALIASES: Record<string, TypeId> = {
  issue: "bug",
  feature: "feature",
  idea: "feature",
  work: "business",
  hello: "hi",
};

function describeBrowser(ua: string) {
  const browser =
    /Edg\//.test(ua) ? "Edge" :
    /Firefox\//.test(ua) ? "Firefox" :
    /Chrome\//.test(ua) ? "Chrome" :
    /Safari\//.test(ua) ? "Safari" : "Unknown browser";
  const os =
    /Android/.test(ua) ? "Android" :
    /iPhone|iPad/.test(ua) ? "iOS" :
    /Mac OS X/.test(ua) ? "macOS" :
    /Windows/.test(ua) ? "Windows" :
    /Linux/.test(ua) ? "Linux" : "Unknown OS";
  return `${browser} on ${os}`;
}

// .item starts hidden and HomeClient only reveals the ones present on first load,
// so rows added later reveal themselves, staggered like the initial page animation
function useReveal<T extends HTMLElement>(enabled = true) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!enabled || !el) return;
    let index = 0;
    for (let prev = el.previousElementSibling; prev; prev = prev.previousElementSibling) {
      if (prev.classList.contains("contact-extra")) index++;
    }
    el.getBoundingClientRect();
    el.style.transition = "opacity 0.5s ease, transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
    el.style.transitionDelay = `${index * 150}ms`;
    el.style.opacity = "1";
    el.style.transform = "translateY(0)";
    const timer = setTimeout(() => {
      el.style.transition = "";
      el.style.transitionDelay = "";
    }, index * 150 + 600);
    return () => clearTimeout(timer);
  }, [enabled]);
  return ref;
}

function ChipIcon({ option }: { option: Option<string> }) {
  if (option.logo) return <img src={option.logo} alt="" className="contact-chip-logo" />;
  if (option.mask) {
    return (
      <span
        className="contact-chip-mask"
        style={{ maskImage: `url(${option.mask})`, WebkitMaskImage: `url(${option.mask})` }}
      />
    );
  }
  if (option.icon) return <span className="material-symbols-rounded">{option.icon}</span>;
  return null;
}

function Chips<T extends string>({
  name,
  label,
  options,
  value,
  onChange,
  reveal = false,
}: {
  name: string;
  label: string;
  options: Option<T>[];
  value: T;
  onChange: (v: T) => void;
  reveal?: boolean;
}) {
  const ref = useReveal<HTMLDivElement>(reveal);
  return (
    <div ref={ref} role="radiogroup" aria-label={label} className={`highlight-item item contact-chips${reveal ? " contact-extra" : ""}`}>
      <span className="contact-chips-label">{label}</span>
      {options.map((o) => (
        <label key={o.id} className={`contact-chip${value === o.id ? " selected" : ""}`}>
          <input
            type="radio"
            name={name}
            value={o.label}
            checked={value === o.id}
            onChange={() => onChange(o.id)}
          />
          <ChipIcon option={o} />
          {o.label}
        </label>
      ))}
    </div>
  );
}

function Choice({ name, label, options }: { name: string; label: string; options: string[] }) {
  const [value, setValue] = useState(options[0]);
  return (
    <Chips
      name={name}
      label={label}
      options={options.map((o) => ({ id: o, label: o }))}
      value={value}
      onChange={setValue}
      reveal
    />
  );
}

function Field({ name, placeholder, required }: { name: string; placeholder: string; required?: boolean }) {
  const ref = useReveal<HTMLInputElement>();
  return (
    <input
      ref={ref}
      type="text"
      name={name}
      placeholder={placeholder}
      required={required}
      className="highlight-item item contact-extra"
    />
  );
}

function ProjectFields({ project, type }: { project: ProjectId; type: TypeId }) {
  const isBug = type === "bug";

  if (project === "other") {
    return <Field name="Project name" placeholder="Which project?" required />;
  }

  if (project === "zen") {
    return (
      <>
        <Choice
          name="Component"
          label="Component (optional)"
          options={["Not sure", "Transparent Zen Mod", "ZenInternet Extension", "Custom CSS"]}
        />
        {isBug && <Field name="Zen Browser version" placeholder="Zen Browser version" />}
      </>
    );
  }

  if (!isBug) return null;

  if (project === "airsync") {
    return (
      <>
        <Choice name="Platform" label="Platform" options={["Both", "Android", "Mac"]} />
        <Field name="App version" placeholder="App version (e.g. Mac 3.0.0 / Android 2.5.1)" />
        <Field name="OS version" placeholder="OS versions (e.g. macOS 26.1 / Android 16)" />
        <Field name="Devices" placeholder="Devices (e.g. MacBook Air M2, Pixel 9)" />
      </>
    );
  }

  if (project === "essentials") {
    return (
      <>
        <Choice name="Platform" label="Platform" options={["Android", "WearOS"]} />
        <Field name="App version" placeholder="App version (check Settings, is it a beta?)" />
        <Field name="Device" placeholder="Device (e.g. Pixel 9 Pro)" />
        <Field name="OS version" placeholder="OS version (e.g. Android 16)" />
      </>
    );
  }

  return null;
}

export default function ContactForm() {
  const [project, setProject] = useState<ProjectId>("general");
  const [type, setType] = useState<TypeId>("hi");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const p = params.get("project")?.toLowerCase();
    const t = params.get("type")?.toLowerCase();
    if (p) {
      const id = PROJECT_ALIASES[p] ?? p;
      if (PROJECTS.some((x) => x.id === id)) setProject(id as ProjectId);
    }
    if (t) {
      const id = TYPE_ALIASES[t] ?? t;
      if (TYPES.some((x) => x.id === id)) setType(id as TypeId);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") ?? "").trim();
    const projectLabel = project === "other"
      ? String(formData.get("Project name") ?? "Other")
      : PROJECTS.find((p) => p.id === project)!.label;
    const typeLabel = TYPES.find((t) => t.id === type)!.label;

    formData.append("access_key", "1e8103b3-2bf2-47fe-93bf-4faf9847bfb8");
    formData.append("subject", `[${projectLabel}] ${typeLabel} from ${name || "someone"}`);
    formData.append("from_name", name ? `${name} via sameerasw.com` : "sameerasw.com");
    formData.append("Page", window.location.href);
    formData.append("Browser", describeBrowser(navigator.userAgent));
    formData.append("Language", navigator.language);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <form name="contact" method="POST" onSubmit={handleSubmit}>
      <p style={{ display: "none" }}>
        <label>
          Don’t fill this out if you’re human:{" "}
          <input type="checkbox" name="botcheck" tabIndex={-1} />
        </label>
      </p>
      <div id="highlights">
        <Chips name="Project" label="About" options={PROJECTS} value={project} onChange={setProject} />
        <Chips name="Type" label="Type" options={TYPES} value={type} onChange={setType} />
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Name"
          required
          className="highlight-item item"
        />
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          required
          className="highlight-item item"
        />
        <ProjectFields key={`${project}-${type}`} project={project} type={type} />
        <textarea
          name="message"
          id="message"
          placeholder={type === "bug" ? "What happened, and how can I reproduce it?" : "Message"}
          required
          className="highlight-item item"
        ></textarea>
        <button
          type="submit"
          id="btn"
          className="highlight-item item"
          disabled={status === "submitting"}
        >
          <span className="material-symbols-rounded">
            {status === "submitting"
              ? "hourglass_empty"
              : status === "success"
                ? "check"
                : status === "error"
                  ? "error"
                  : "send"}
          </span>
          {status === "submitting"
            ? "Sending..."
            : status === "success"
              ? "Sent!"
              : status === "error"
                ? "Failed, try again?"
                : "Send"}
        </button>
      </div>
    </form>
  );
}
