import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, AudioLines, ChevronRight, CirclePause, Crosshair, Orbit, Radio, RotateCcw, Satellite, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import spaceImage from "@/assets/odyssey-deep-space.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Odyssey — NASA Mission Control" },
      { name: "description", content: "Explore NASA missions, discover distant worlds, and relive the Apollo 13 mission in Odyssey." },
      { property: "og:title", content: "Odyssey — NASA Mission Control" },
      { property: "og:description", content: "A new perspective on the missions that took us beyond Earth." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Odyssey,
});

const stations = [
  { n: "01", title: "Mission Control", subtitle: "Apollo 13", description: "The mission is yours. Relive the critical hours, hear the crew, and guide Odyssey home.", color: "mint" as const, icon: Radio, status: "FLIGHT READY", href: "mission" },
  { n: "02", title: "Mars", subtitle: "NASA Image Archive", description: "Explore the red planet through the images and stories of every rover.", color: "ember" as const, icon: Crosshair, status: "IMAGE ARCHIVE", href: "archive" },
  { n: "03", title: "Starship", subtitle: "Exoplanet Explorer", description: "Find another Earth among thousands of distant worlds.", color: "sky" as const, icon: Orbit, status: "DEEP SPACE", href: "explorer" },
  { n: "04", title: "Planet Lab", subtitle: "World Builder", description: "Build a world, balance its atmosphere, and ask: could life find a way?", color: "violet" as const, icon: Sparkles, status: "EXPERIMENTAL", href: "lab" },
  { n: "05", title: "Knowledge Map", subtitle: "Mission Intelligence", description: "Connect discoveries and follow the science across the cosmos.", color: "gold" as const, icon: Satellite, status: "CONNECTED", href: "knowledge" },
  { n: "06", title: "Evaluation", subtitle: "Systems Check", description: "Put the mission intelligence to the test, one question at a time.", color: "mint" as const, icon: ShieldCheck, status: "SYSTEMS CHECK", href: "evaluation" },
];

const transcript = [
  { time: "02:07:48", speaker: "CAPCOM", text: "Apollo 13, Houston. The next thing we’d like you to do is to—", tone: "amber" },
  { time: "02:07:49", speaker: "SWIGERT", text: "Go ahead.", tone: "mint" },
  { time: "02:07:50", speaker: "CAPCOM", text: "We’d like you to roll right to 060 and null your rates for photography of the Comet Bennett. To do that, enable quads C and D. For the maneuver, use all your quads. And in precisely one minute, we’d like you to terminate the battery charge on battery B.", tone: "amber" },
  { time: "02:07:52", speaker: "LOVELL", text: "Okay. We’ll verify the configuration and proceed.", tone: "mint" },
  { time: "02:07:55", speaker: "CAPCOM", text: "We'd like you to verify the high gain configuration. We’d like to know what track mode, what SERVO, and what beam width.", tone: "amber" },
  { time: "02:07:58", speaker: "SWIGERT", text: "Okay, Jack. During the TV, we were AUTO TRACK, NARROW BEAM WIDTH, and the PRIMARY ELECTRONICS. And we had a good lockup.", tone: "mint" },
];

function Odyssey() {
  const [screen, setScreen] = useState<"home" | "mission">("home");
  const [running, setRunning] = useState(true);
  const [speed, setSpeed] = useState("1×");
  const [activeCrew, setActiveCrew] = useState("Jim Lovell");
  const [sound, setSound] = useState(true);
  const [decisions, setDecisions] = useState(true);
  const [elapsed, setElapsed] = useState(4781);
  const [question, setQuestion] = useState("");
  const [sent, setSent] = useState(0);

  useEffect(() => {
    if (!running || screen !== "mission") return;
    const rate = speed === "1×" ? 1 : speed === "10×" ? 10 : speed === "60×" ? 60 : 600;
    const timer = window.setInterval(() => setElapsed((value) => value + rate), 1000);
    return () => window.clearInterval(timer);
  }, [running, speed, screen]);

  const clock = `${String(Math.floor(elapsed / 3600)).padStart(2, "0")}:${String(Math.floor((elapsed % 3600) / 60)).padStart(2, "0")}:${String(elapsed % 60).padStart(2, "0")}`;

  if (screen === "mission") return (
    <main className="mission-screen" style={{ "--space-image": `url(${spaceImage})` } as React.CSSProperties}>
      <header className="mission-header">
        <div className="mission-brand"><button className="back-orbit" onClick={() => setScreen("home")} aria-label="Back to stations"><Orbit size={20} /></button><div><button className="brand-word" onClick={() => setScreen("home")}>ODYSSEY</button><nav className="mission-nav"><button className="selected" onClick={() => setScreen("mission")}>01 Mission Control</button><span>02 Mars</span><span>03 Starship</span><span>04 Planet Lab</span><span>05 Knowledge Map</span></nav></div></div>
        <div className="clock-console"><span className="clock-label">MISSION ELAPSED</span><strong>{clock}</strong><span className="clock-sub">MET · GET 55:50</span></div>
        <div className="mission-controls"><Button size="icon" onClick={() => setRunning((value) => !value)} className="pause-button" aria-label={running ? "Pause mission" : "Resume mission"}>{running ? <CirclePause /> : <ArrowRight />}</Button><div className="speed-group" aria-label="Playback speed">{["1×", "10×", "60×", "600×"].map((value) => <Button key={value} size="sm" variant="outline" className={speed === value ? "speed-active" : "speed-option"} onClick={() => setSpeed(value)}>{value}</Button>)}</div><Button variant="outline" size="sm" className={sound ? "toggle-active" : "speed-option"} onClick={() => setSound((value) => !value)}><AudioLines size={13} /> Sound {sound ? "on" : "off"}</Button><Button variant="outline" size="sm" className={decisions ? "toggle-active" : "speed-option"} onClick={() => setDecisions((value) => !value)}><Zap size={13} /> Decisions {decisions ? "on" : "off"}</Button><span className="debrief-badge">DEBRIEF 0/7</span></div>
      </header>
      <nav className="mission-timeline"><span className="timeline-place earth-mark">EARTH</span><span className="timeline-marker"></span><span className="timeline-leg active">TO THE MOON <i></i></span><span className="timeline-marker hot"></span><span className="timeline-leg">TOWARDS EARTH<i></i></span><span className="timeline-marker"></span><span className="timeline-place reentry-mark">REENTRY</span></nav>
      <div className="mission-columns">
        <section className="console-panel transcript-panel"><div className="panel-heading"><span><Radio size={14} /> Air-to-ground loop</span><small>To the Moon</small></div><div className="transcript-feed">{transcript.map((line, index) => <article className={`transcript-line line-${line.tone}`} key={index}><div className="transcript-meta"><time>{line.time}</time><strong>{line.speaker}</strong></div><p>{line.text}</p></article>)}<div className="feed-indicator"><span /> LIVE TRANSCRIPT · SOURCE VERIFIED</div></div></section>
        <section className="console-panel flight-panel"><div className="panel-heading"><span><Orbit size={14} /> Flight dynamics</span><small>Next: “Houston, we’ve had a problem.”</small></div><div className="orbit-map"><div className="orbit-stars"/><div className="orbit-track orbit-track-one"/><div className="orbit-track orbit-track-two"/><div className="earth-planet"><span>EARTH</span></div><div className="moon-planet"><span>MOON</span></div><div className="odyssey-craft"><div className="craft-light"/><span>ODYSSEY</span></div><div className="orbital-label">TRANSLUNAR COAST · NOMINAL</div></div><div className="telemetry-grid">{[{ title: "MASTER ALARM", value: "Clear", state: "quiet" }, { title: "O₂ TANK 2", value: "Nominal", state: "good" }, { title: "MAIN BUS B", value: "Nominal", state: "good" }, { title: "FUEL CELLS", value: "3 online", state: "good" }, { title: "ODYSSEY · CM", value: "Powered", state: "good" }, { title: "AQUARIUS · LM", value: "Dormant", state: "quiet" }, { title: "CABIN CO₂", value: "Nominal", state: "good" }].map((s) => <article key={s.title} className={`telemetry-card telemetry-${s.state}`}><strong>{s.title}</strong><span>{s.value}</span></article>)}</div></section>
        <section className="console-panel comms-panel"><div className="panel-heading"><span><AudioLines size={14} /> Crew communications</span><small>WHAT WOULD YOU LIKE TO ASK?</small></div><div className="crew-roster">{[{ name: "FLIGHT", role: "Mission historian" }, { name: "Jim Lovell", role: "Commander" }, { name: "Fred Haise", role: "Lunar module pilot" }, { name: "Jack Swigert", role: "Command module pilot" }, { name: "CAPCOM", role: "Mission control" }].map((person) => <button key={person.name} onClick={() => setActiveCrew(person.name)} className={`crew-member ${activeCrew === person.name ? "crew-selected" : ""}`}><strong>{person.name}</strong><span>{person.role}</span></button>)}</div><div className="comms-content"><div className="comms-hint"><span className="live-dot"/>Listening to the mission <span className="hint-divider">·</span> {activeCrew}<p>Ask what happened, check the systems, or hear the story from the crew.</p><div className="suggestion-row">{["What just happened?", "How’s the crew?", "Check the systems"].map((q) => <button key={q} onClick={() => setQuestion(q)}>{q} <ArrowUp size={10}/></button>)}</div>{sent > 0 && <article className="sent-message"><span>YOU → {activeCrew.toUpperCase()}</span><p>{question || "Question sent."}</p><small>Mission source lookup requested · {sent} {sent === 1 ? "message" : "messages"} transmitted</small></article>}</div></div><form className="comms-compose" onSubmit={(event) => { event.preventDefault(); if (question.trim()) { setSent((value) => value + 1); setQuestion(""); } }}><input value={question} onChange={(event) => setQuestion(event.target.value)} placeholder={`Ask ${activeCrew === "FLIGHT" ? "mission control" : activeCrew}…`} aria-label="Ask a mission question"/><Button type="submit" size="sm" className="transmit-button"><ArrowUp size={14}/> Transmit</Button></form></section>
      </div>
    </main>
  );

  return (
    <main className="odyssey-home" style={{ "--space-image": `url(${spaceImage})` } as React.CSSProperties}>
      <div className="home-sky" aria-hidden="true"><div className="sky-glow"/><div className="sky-scanline"/></div>
      <header className="top-bar"><a className="top-logo" href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}><span className="brand-orbit"><i/></span><span>ODYSSEY</span></a><div className="top-center"><span className="live-dot"/> MISSION NETWORK <span className="top-divider">/</span> 6 STATIONS ONLINE</div><Button variant="outline" size="sm" className="top-enter" onClick={() => setScreen("mission")}>ENTER MISSION <ArrowRight size={14}/></Button></header>
      <section className="home-hero" id="top"><div className="hero-coordinates"><span>MISSION DIVISION</span><span>34° 08′ 03.5″ N</span><span>DEEP SPACE NETWORK · 2026</span></div><div className="hero-content"><span className="hero-kicker"><i/> A NEW PERSPECTIVE ON THE UNIVERSE</span><h1>THE UNIVERSE<br/><span>ISN’T</span> OUT OF REACH<span className="hero-period">.</span></h1><p>A new way to explore the missions, discoveries, and questions<br className="desktop-break"/> that take us beyond Earth.</p><Button className="hero-cta" onClick={() => setScreen("mission")}>BEGIN YOUR MISSION <ArrowRight size={15}/></Button><div className="hero-note"><span>01</span><span>YOUR MISSION STARTS HERE</span><span className="note-line"/></div></div><div className="hero-side-index"><span>OBSERVATORY</span><span>ORBIT 01</span><span>INFINITY / 001</span></div><div className="hero-bottom"><div className="telemetry-label"><span className="live-dot"/> NETWORK STATUS <strong>ALL SYSTEMS GO</strong></div><div className="scroll-cue"><span>SCROLL TO EXPLORE</span><ChevronRight size={13} className="scroll-down"/></div><div className="hero-mission-time"><span>MISSION ELAPSED TIME</span><strong>00 : 00 : 00</strong></div></div></section>
      <section className="stations-section"><div className="section-heading"><div><span className="eyebrow"><span>01</span> THE EXPEDITION</span><h2>Choose your <em>destination.</em></h2></div><p>One universe. Six ways to see it.<br/>Where will your curiosity take you?</p></div><div className="station-grid">{stations.map((station, index) => { const Icon = station.icon; return <button key={station.n} className={`station-card station-${station.color}`} style={{ "--card-index": index } as React.CSSProperties} onClick={() => setScreen(station.href === "mission" ? "mission" : "mission")}><div className="station-card-top"><span className="station-number">{station.n} <span>/ 06</span></span><span className="station-status"><i/>{station.status}</span></div><div className="station-icon"><Icon size={20} strokeWidth={1.35}/></div><div className="station-card-bottom"><span className="station-subtitle">{station.subtitle}</span><h3>{station.title}<ArrowRight className="station-arrow" size={19}/></h3><p>{station.description}</p><div className="station-footer"><span><span className="available-dot"/> AVAILABLE FOR EXPLORATION</span><span>ACCESS <ChevronRight size={12}/></span></div></div></button>; })}</div></section><footer className="home-footer"><a className="footer-logo" href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}><span className="brand-orbit"><i/></span> ODYSSEY</a><span>MADE FOR THE CURIOUS. BUILT FOR THE COSMOS.</span><span>EARTH · SOL SYSTEM <ArrowUp size={12}/></span></footer>
    </main>
  );
}