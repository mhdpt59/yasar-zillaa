/**
 * ==============================================================================
 * WEDDING INVITATION - CORE LOGIC
 * Dynamic Hydration, Lottie Envelope Opening, Sound Toggle & Countdown
 * ==============================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. DOM Elements
  const envelopeScene = document.getElementById("envelopeScene");
  const invitationWrap = document.getElementById("invitationWrap");
  const lottieContainer = document.getElementById("envelope-lottie");
  const envelopePrompt = document.getElementById("envelopePrompt");
  const bgMusic = document.getElementById("bg-music");
  const muteBtn = document.getElementById("mute-btn");
  const iconUnmuted = document.getElementById("icon-unmuted");
  const iconMuted = document.getElementById("icon-muted");
  const addToCalBtn = document.getElementById("addToCalBtn");
  const shareWaBtn = document.getElementById("shareWaBtn");

  // 2. Hydrate content from WEDDING_CONFIG
  hydrateContent(WEDDING_CONFIG);

  // 3. Initialize Lottie Envelope Animation
  let isOpened = false;
  let anim = null;

  try {
    anim = lottie.loadAnimation({
      container: lottieContainer,
      renderer: "svg",
      loop: false,
      autoplay: false,
      path: "assets/envelope.json"
    });
  } catch (e) {
    console.warn("Lottie loading fallback:", e);
  }

  function handleOpenEnvelope() {
    if (isOpened) return;
    isOpened = true;

    // Start background romantic music on user gesture
    if (bgMusic) {
      bgMusic.volume = 0.7;
      bgMusic.play().catch((err) => {
        console.log("Audio autoplay prevented:", err);
      });
    }

    // Show floating audio toggle button
    if (muteBtn) {
      muteBtn.classList.remove("hidden");
    }

    // Play Lottie envelope unfolding animation
    if (anim) {
      anim.play();

      let durationMs = anim.getDuration(false) * 1000;
      if (!durationMs || isNaN(durationMs)) {
        durationMs = 3200;
      }
      const delay = Math.max(800, durationMs - 1600);

      setTimeout(() => {
        envelopeScene.classList.add("hidden");
        invitationWrap.classList.add("show");
        document.body.classList.remove("scroll-locked");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, delay);
    } else {
      // Fallback if Lottie is not available
      envelopeScene.classList.add("hidden");
      invitationWrap.classList.add("show");
      document.body.classList.remove("scroll-locked");
    }
  }

  if (lottieContainer) lottieContainer.addEventListener("click", handleOpenEnvelope);
  if (envelopePrompt) envelopePrompt.addEventListener("click", handleOpenEnvelope);

  // 4. Mute / Unmute Toggle
  if (muteBtn && bgMusic) {
    muteBtn.addEventListener("click", () => {
      if (bgMusic.muted) {
        bgMusic.muted = false;
        iconUnmuted.style.display = "block";
        iconMuted.style.display = "none";
      } else {
        bgMusic.muted = true;
        iconUnmuted.style.display = "none";
        iconMuted.style.display = "block";
      }
    });
  }

  // 5. Countdown Timer (Target: 14 Nov 2026, 1:00 PM)
  initCountdown(WEDDING_CONFIG.date.iso);

  // 6. Add to Calendar (Google Calendar & Apple iCal)
  if (addToCalBtn) {
    addToCalBtn.addEventListener("click", () => {
      openCalendar();
    });
  }

  // 7. Share on WhatsApp
  if (shareWaBtn) {
    shareWaBtn.addEventListener("click", () => {
      const currentUrl = window.location.href;
      const shareMsg = encodeURIComponent(`${WEDDING_CONFIG.shareMessage}${currentUrl}`);
      window.open(`https://api.whatsapp.com/send?text=${shareMsg}`, "_blank");
    });
  }
});

/**
 * Hydrates the DOM elements with details from WEDDING_CONFIG
 */
function hydrateContent(config) {
  safeText("hostParents", config.hostsLine);
  safeText("groomName", config.groom.name);
  safeText("groomRel", config.groom.relation);
  safeText("brideName", config.bride.name);
  safeText("brideRel", config.bride.relation);

  safeText("eventDayOfWeek", config.date.dayOfWeek);
  safeText("eventDay", config.date.day);
  safeText("eventMonthYear", config.date.monthYear);

  safeText("venueName", config.venue.name);
  safeAttr("venueMapLink", "href", config.venue.mapUrl);
  safeText("footerNote", config.footerDate);
  safeAttr("bg-music", "src", config.music.src);
}

function safeText(id, val) {
  const el = document.getElementById(id);
  if (!el || !val) return;
  if (val.includes("<") && val.includes(">")) {
    el.innerHTML = val;
  } else {
    el.textContent = val;
  }
}

function safeAttr(id, attr, val) {
  const el = document.getElementById(id);
  if (el && val) el.setAttribute(attr, val);
}

/**
 * Countdown Timer
 */
function initCountdown(targetIso) {
  const target = new Date(targetIso).getTime();
  const daysEl = document.getElementById("cd-days");
  const hoursEl = document.getElementById("cd-hours");
  const minsEl = document.getElementById("cd-mins");
  const secsEl = document.getElementById("cd-secs");

  function tick() {
    const now = new Date().getTime();
    let diff = target - now;
    if (diff < 0) diff = 0;

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    if (daysEl) daysEl.textContent = d;
    if (hoursEl) hoursEl.textContent = String(h).padStart(2, "0");
    if (minsEl) minsEl.textContent = String(m).padStart(2, "0");
    if (secsEl) secsEl.textContent = String(s).padStart(2, "0");
  }

  tick();
  setInterval(tick, 1000);
}

/**
 * Calendar Link & iCal Export
 */
function openCalendar() {
  const title = encodeURIComponent(`Wedding: ${WEDDING_CONFIG.coupleNames}`);
  const details = encodeURIComponent(`Wedding Ceremony of ${WEDDING_CONFIG.coupleNames} at ${WEDDING_CONFIG.venue.name}.\nGents: 1:00 PM | Ladies: 2:00 PM`);
  const location = encodeURIComponent(`${WEDDING_CONFIG.venue.name}`);

  // 14 November 2026, 1:00 PM IST (07:30 UTC) to 5:00 PM IST (11:30 UTC)
  const startTime = "20261114T073000Z";
  const endTime = "20261114T113000Z";

  const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startTime}/${endTime}&details=${details}&location=${location}`;

  // Direct Apple Calendar / Outlook .ics generation
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Yasar and Zillaa Wedding//EN",
    "BEGIN:VEVENT",
    `SUMMARY:Wedding: ${WEDDING_CONFIG.coupleNames}`,
    `DESCRIPTION:${WEDDING_CONFIG.coupleNames} Wedding at ${WEDDING_CONFIG.venue.name} (Gents: 1:00 PM, Ladies: 2:00 PM)`,
    `LOCATION:${WEDDING_CONFIG.venue.name}`,
    `DTSTART:${startTime}`,
    `DTEND:${endTime}`,
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\r\n");

  const isApple = /iPhone|iPad|Macintosh/i.test(navigator.userAgent);
  if (isApple) {
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Yasar-Zillaa-Wedding.ics";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    window.open(googleUrl, "_blank");
  }
}
