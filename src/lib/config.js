// =============================================================
//  WEDDING CONTENT — edit everything here. One file, no markup.
//  Replace the placeholder text, dates, photos, and links below.
// =============================================================

export const config = {
    // ---- The couple -------------------------------------------------
    couple: {
        partnerA: "Loyd",
        partnerB: "Sharah",
        hashtag: "#LoydAndSharah",
        // White monogram lockup shown on the dark hero (file in /public).
        logo: "/monogram.png",
        // Compact white "LS" mark used in the navbar.
        navIcon: "/icon-nav.png",
    },

    // ---- The big day ------------------------------------------------
    // `dateISO` powers the live countdown — keep it in ISO 8601 with a
    // timezone offset (+08:00 = Philippine time). The *Label fields are
    // what guests actually read, so write them however you like.
    event: {
        dateISO: "2026-09-19T15:00:00+08:00",
        dateLabel: "September 19, 2026",
        dayLabel: "Saturday",
        timeLabel: "10:30 in the morning",
        cityLabel: "Cabanglasan, Bukidnon",
    },

    // ---- Hero -------------------------------------------------------
    hero: {
        kicker: "Together with their families",
        subline: "invite you to witness and celebrate the beginning of their forever",
        // Optional hero photo URL. Leave "" for a clean, type-only hero.
        image: "/aip.png",
    },

    // ---- Welcome gate ----------------------------------------------
    // The opening overlay guests tap to enter. Their click is what lets
    // the music start (browsers require a tap first). Set `enabled: false`
    // to skip it.
    welcome: {
        enabled: true,
        kicker: "You're invited to celebrate",
        button: "Tap to open your invitation",
        note: "Best enjoyed with the sound on",
    },

    // ---- Background music ------------------------------------------
    // Optional looping music (file lives in /public). Browsers block
    // audio with sound until the guest interacts with the page, so it
    // tries to start on load and otherwise begins on the first
    // click/scroll/keypress. Guests can mute via the floating button.
    // Set `src: ""` to turn music off entirely.
    music: {
        src: "/musicbg2.mp3",
        autoPlay: false,
        volume: 0.4,
    },

    // ---- Our Story --------------------------------------------------
    story: {
        intro: "Every love story is beautiful, but ours is our favorite. Here's a little of how we got here.",
        paragraphs: [
            "We first met in 2014 as college classmates. What started as casual introductions slowly turned into friendship—comfortable, effortless, and unexpectedly meaningful. Even then, there was something familiar about each other, like we were meant to stay in each other’s orbit.",
            "After graduating, life took us in different directions, but it never truly pulled us apart. Somehow, we found our way back to each other again. This second chance meant everything. We didn’t let it pass—we chose each other, fully and intentionally.",
            "Now, after all the years, distance, and rediscovery, we’re stepping into our next chapter—one we’ve been building toward all along—and we’re so happy to share it with you., and somewhere along the way, the two of us became us.",
            "Years, adventures, and countless cups of coffee later, we're ready for our greatest adventure yet — and we'd love for you to be there when we begin it.",
        ],
        timeline: [
            { year: "2019", title: "How we met", text: "College classmates who slowly became close friends, without even realizing where it would lead." },
            { year: "2022", title: "Finding our way back", text: "Life paused us for a while, but not for long. We met again, and this time, we didn’t let go." },

            { year: "2023", title: "Endless roads", text: "Long drives, random stops, and memories made on the road—our favorite kind of adventure." },
            { year: "2026", title: "The wedding", text: "And now, the beginning of forever—with you there to witness it." },
        ],
    },

    // ---- Gallery ("Moments" section) -------------------------------
    // Temporary photos from Unsplash (free to use) so the section isn't
    // empty. To use your own: drop files into /public and point `src` at
    // them (e.g. "/moment-1.jpg"). The layout is a masonry grid (2
    // columns on mobile, 3 on desktop): each photo fills its column width
    // and keeps its own height, so varied heights look great.
    // Recommended size: portrait, ~900 × 1100 px (≈ 9:11 ratio).
    // Keep files under ~500 KB each (JPG/WebP) so the page stays fast.
    gallery: {
        intro: "A few of our favorite moments.",
        images: [
            { src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=900&h=1100&fit=crop", alt: "The couple" },          // 900 × 1100 px
            { src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=900&h=1100&fit=crop", alt: "Laughing together" },   // 900 × 1100 px
            { src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=900&h=1100&fit=crop", alt: "A quiet moment" },      // 900 × 1100 px
            { src: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=900&h=1100&fit=crop", alt: "On an adventure" },     // 900 × 1100 px
            { src: "https://images.unsplash.com/photo-1525258946800-98cfd641d0de?w=900&h=1100&fit=crop", alt: "The proposal" },        // 900 × 1100 px
            { src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=900&h=1100&fit=crop", alt: "Just us" },             // 900 × 1100 px
        ],
    },

    // ---- Event details ---------------------------------------------
    details: {
        ceremony: {
            title: "The Ceremony",
            time: "10:30 AM",
            venue: "Santo Niño Parish Church",
            address: "Poblacion, Cabanglasan, Bukidnon",
            mapUrl: "https://maps.app.goo.gl/V4n26SL3f2NYFMSUA",
        },
        reception: {
            title: "The Reception",
            time: "12:00 PM",
            venue: "MMAD Lodging and Catering Services",
            address: "Poblacion, Cabanglasan, Bukidnon",
            mapUrl: "https://maps.app.goo.gl/fFrcDMM8V6YY9bNw7",
        },
        dressCode: {
            title: "Dress Code",
            text: "Formal / Semi-formal attire. We'd love to see our guests dressed in our wedding colors — soft powder blue and warm yellow.",
            // Clipart of a couple in formal attire (transparent PNG in /public).
            image: "/dresscode-couple.png",
            // Color palette swatches. First three are powder blue, last three
            // are yellow — edit the hex values and names to taste.
            palette: [
                { name: "Powder Mist", hex: "#E8F1FA" },
                { name: "Powder Blue", hex: "#C2DBEE" },
                { name: "Sky Blue", hex: "#93BAD9" },
                { name: "Soft Butter", hex: "#FBF1C7" },
                { name: "Honey", hex: "#F2D785" },
                { name: "Goldenrod", hex: "#E2B33C" },
            ],
        },
    },

    // ---- Order of the day ------------------------------------------
    // `icon` must be one of: heart, church, glassCheers, utensils, music, camera, sparkles
    schedule: [
        { time: "2:30 PM", title: "Guests Arrive", text: "Find your seats and settle in.", icon: "sparkles" },
        { time: "3:00 PM", title: "Ceremony", text: "The moment we've been waiting for.", icon: "church" },
        { time: "4:00 PM", title: "Cocktails & Photos", text: "Drinks, mingling, and snapshots.", icon: "camera" },
        { time: "5:00 PM", title: "Reception & Dinner", text: "Eat, drink, and be married.", icon: "utensils" },
        { time: "7:00 PM", title: "Dancing", text: "The dance floor opens — bring your moves.", icon: "music" },
    ],

    // ---- Registry / Gifts -------------------------------------------
    registry: {
        note: "Your presence is the only present we need. But if you wish to bless us with a gift, you may send it through any of the QR codes below.",
        // Gift QR codes. Each is scannable by GCash, Maya, or any bank app
        // (they all follow the QR Ph standard). To set yours up:
        //   1. In each app, open your "Receive Money" / "My QR" screen and
        //      save the QR image (leave the amount blank so guests choose).
        //   2. Drop the files into /public and point `image` at them.
        //   3. Replace the placeholder accountName / accountNumber below.
        qrCodes: [
            { name: "GCash", image: "/gcash.png", color: "#007cff", accountName: "Loyd & Sharah", accountNumber: "0917 000 0000" },
            { name: "GoTyme Bank", image: "/gtm.png", color: "#00F5FA", accountName: "Loyd & Sharah", accountNumber: "0000 0000 0000" },
            { name: "Landbank", image: "/lbp.png", color: "#078a3d", accountName: "Loyd & Sharah", accountNumber: "0000 0000 0000" },
        ],
    },

    // ---- FAQ --------------------------------------------------------
    faq: [
        { q: "Can I bring a plus-one?", a: "To help us keep our celebration intimate and accommodate all invited guests comfortably, attendance is limited to the person(s) specifically named on the invitation. We kindly ask that only those included in the invitation attend. Thank you for your understanding and support." },
        { q: "Are kids welcome?", a: "If your invitation includes your children, we would be delighted to celebrate with them. Please include all attending family members in your RSVP so we can prepare accordingly." },
        { q: "What time should I arrive?", a: "Please arrive by 10:00 AM so we can begin the ceremony promptly at 10:30 AM." },
        { q: "Is there parking?", a: "Yes, free parking is available at both the church and the reception venue." },
    ],

    // ---- Travel & stay ---------------------------------------------
    // travel: {
    //     note: "Coming from out of town? Here are a few places to stay nearby.",
    //     hotels: [
    //         { name: "Taal Vista Hotel", info: "≈ 10 min from the venue", url: "#" },
    //         { name: "Escala Tagaytay", info: "≈ 15 min from the venue", url: "#" },
    //     ],
    // },

    // ---- RSVP -------------------------------------------------------
    rsvp: {
        deadline: "September 1, 2026",
        mealOptions: ["Chicken", "Beef", "Fish", "Vegetarian"],
        maxPartySize: 6,
    },

    // ---- Contact / footer ------------------------------------------
    contact: {
        email: "loydsharah.site",
        phone: "+63 9658306989",
    },
};

// Navigation links (anchor ids must match section ids in App.jsx)
export const navLinks = [
    { label: "Story", href: "#story" },
    { label: "Details", href: "#details" },
    { label: "Schedule", href: "#schedule" },
    { label: "FAQ", href: "#faq" },
    { label: "RSVP", href: "#rsvp" },
];