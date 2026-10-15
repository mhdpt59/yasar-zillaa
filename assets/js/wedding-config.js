/**
 * ==============================================================================
 * WEDDING INVITATION CONFIGURATION - YASAR & ZILLAA
 * ==============================================================================
 * All wedding details are editable here. Any changes update the website instantly.
 * ==============================================================================
 */

const WEDDING_CONFIG = {
  // Couple Information
  groom: {
    name: "Yasar",
    parents: "Arshul Ahmed SV & Rasheeda KV",
    relation: "S/o Arshul Ahmed SV & Rasheeda KV"
  },
  
  bride: {
    name: "Zillaa",
    parents: "Fasal Rahman & Mareena",
    relation: "D/o Fasal Rahman & Mareena"
  },

  coupleNames: "Yasar & Zillaa",
  monogram: "Y & Z",

  // Parents / Hosts Header
  hostsLine: "Arshul Ahmed SV & Rasheeda KV",
  invitationText: "Cordially invite your esteemed presence with family on the auspicious occasion of the marriage of our son",

  // Wedding Date & Timings
  date: {
    dayOfWeek: "Saturday",
    day: "14",
    monthYear: "Nov 2026",
    fullDate: "Saturday, 14 November 2026",
    iso: "2026-11-14T13:00:00+05:30" // 1:00 PM IST
  },

  timings: {
    title: "Reception",
    gents: "Gents 1:00 PM",
    ladies: "Ladies 2:00 PM",
    display: "Gents: 1:00 PM · Ladies: 2:00 PM"
  },

  // Venue & Maps
  venue: {
    name: "New Castle Auditorrium",
    mapUrl: "https://maps.app.goo.gl/fHWVf5iQmfUE1r3EA"
  },

  // Audio / Music
  music: {
    src: "assets/music/wedding-song.mp4",
    fallbackSrc: "assets/music/wedding-song.mp3"
  },

  // Sign-off
  signOff: {
    note: "with love",
    author: "Kith & Kin"
  },

  // Footer Tagline
  footerDate: "Yasar & Zillaa · 14.11.2026",

  // WhatsApp Share Message
  shareMessage: "✨ You are cordially invited to celebrate the wedding of *Yasar & Zillaa*!\n\n📅 Date: Saturday, 14 November 2026\n⏰ Timings: Gents 1:00 PM | Ladies 2:00 PM\n📍 Venue: New Castle Auditorium\n\nClick the link below to open our digital wedding invitation:\n"
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = WEDDING_CONFIG;
}
