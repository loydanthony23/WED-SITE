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
        // Monogram logo shown in the navbar + hero (file lives in /public).
        logo: "/monogram.png",
    },

    // ---- The big day ------------------------------------------------
    // `dateISO` powers the live countdown — keep it in ISO 8601 with a
    // timezone offset (+08:00 = Philippine time). The *Label fields are
    // what guests actually read, so write them however you like.
    event: {
        dateISO: "2026-12-12T15:00:00+08:00",
        dateLabel: "December 12, 2026",
        dayLabel: "Saturday",
        timeLabel: "3:00 in the afternoon",
        cityLabel: "Tagaytay, Philippines",
    },

    // ---- Hero -------------------------------------------------------
    hero: {
        kicker: "Together with their families",
        subline: "request the pleasure of your company as they say “I do”",
        // Optional hero photo URL. Leave "" for a clean, type-only hero.
        image: "/hero-2.avif",
    },

    // ---- Our Story --------------------------------------------------
    story: {
        intro: "Every love story is beautiful, but ours is our favorite. Here's a little of how we got here.",
        paragraphs: [
            "We met on an ordinary afternoon that turned out to be anything but. One conversation became a thousand, and somewhere along the way, the two of us became us.",
            "Years, adventures, and countless cups of coffee later, we're ready for our greatest adventure yet — and we'd love for you to be there when we begin it.",
        ],
        timeline: [
            { year: "2019", title: "How we met", text: "A chance meeting that we still can't stop talking about." },
            { year: "2022", title: "The first trip", text: "We packed two bags and came back as a team." },
            { year: "2025", title: "The proposal", text: "A quiet question, an easy yes, happy tears all around." },
            { year: "2026", title: "The wedding", text: "And now — the part with you in it." },
        ],
    },

    // ---- Gallery (swap these for your own photos) -------------------
    gallery: {
        intro: "A few of our favorite moments.",
        images: [
            { src: "https://picsum.photos/seed/wed1/900/1100", alt: "The couple" },
            { src: "https://picsum.photos/seed/wed2/900/1100", alt: "Laughing together" },
            { src: "https://picsum.photos/seed/wed3/900/1100", alt: "A quiet moment" },
            { src: "https://picsum.photos/seed/wed4/900/1100", alt: "On an adventure" },
            { src: "https://picsum.photos/seed/wed5/900/1100", alt: "The proposal" },
            { src: "https://picsum.photos/seed/wed6/900/1100", alt: "Just us" },
        ],
    },

    // ---- Event details ---------------------------------------------
    details: {
        ceremony: {
            title: "The Ceremony",
            time: "3:00 PM",
            venue: "Our Lady of Lourdes Church",
            address: "123 Aguinaldo Hwy, Tagaytay City, Cavite",
            mapUrl: "https://maps.google.com/?q=Tagaytay+City",
        },
        reception: {
            title: "The Reception",
            time: "5:00 PM",
            venue: "The Garden Pavilion",
            address: "456 Ridge Rd, Tagaytay City, Cavite",
            mapUrl: "https://maps.google.com/?q=Tagaytay+City",
        },
        dressCode: {
            title: "Dress Code",
            text: "Formal / Semi-formal. We'd love to see you in shades of blue and soft neutrals.",
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

    // ---- Registry ---------------------------------------------------
    registry: {
        note: "Your presence is the only present we need. But if you wish to give a gift, a contribution toward our new home and honeymoon would mean the world.",
        links: [
            { label: "Honeymoon Fund", url: "#" },
            { label: "Our Registry", url: "#" },
        ],
    },

    // ---- FAQ --------------------------------------------------------
    faq: [
        { q: "Can I bring a plus-one?", a: "Your invitation will indicate how many seats are reserved for you. Please RSVP for exactly that many guests." },
        { q: "Are kids welcome?", a: "We love your little ones! Please let us know in your RSVP so we can plan accordingly." },
        { q: "What time should I arrive?", a: "Please arrive by 2:30 PM so we can begin the ceremony promptly at 3:00 PM." },
        { q: "Is there parking?", a: "Yes, free parking is available at both the church and the reception venue." },
    ],

    // ---- Travel & stay ---------------------------------------------
    travel: {
        note: "Coming from out of town? Here are a few places to stay nearby.",
        hotels: [
            { name: "Taal Vista Hotel", info: "≈ 10 min from the venue", url: "#" },
            { name: "Escala Tagaytay", info: "≈ 15 min from the venue", url: "#" },
        ],
    },

    // ---- RSVP -------------------------------------------------------
    rsvp: {
        deadline: "November 1, 2026",
        mealOptions: ["Chicken", "Beef", "Fish", "Vegetarian"],
        maxPartySize: 6,
    },

    // ---- Contact / footer ------------------------------------------
    contact: {
        email: "hello@example.com",
        phone: "+63 900 000 0000",
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