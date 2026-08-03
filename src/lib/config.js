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
        dateISO: "2026-09-19T10:30:00+08:00",
        dateLabel: "September 19, 2026",
        dayLabel: "Saturday",
        timeLabel: "10:30 in the morning",
        cityLabel: "Cabanglasan, Bukidnon",
    },

    // ---- Hero -------------------------------------------------------
    hero: {
        kicker: "Together with their families",
        subline: "invite you to witness and celebrate the beginning of their forever",
        // Hero photos. `image` is the wide desktop shot. `imageMobile` is a
        // portrait (9:16) version shown on phones — a landscape photo gets
        // badly cropped on a tall screen, so give phones their own framing.
        // Recommended mobile export: 1080 × 1920 JPG/WebP, subjects kept in
        // the centre band. Leave `imageMobile` as "" to fall back to `image`
        // on mobile too. Leave `image` "" for a clean, type-only hero.
        image: "/hero-raw-1.webp",
        imageMobile: "/hero-mobile.webp",
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
        src: "/musicbg.mp3",
        autoPlay: false,
        volume: 0.4,
    },

    // ---- Our Story --------------------------------------------------
    story: {
        intro: "Every love story is beautiful, but ours is our favorite. Here's a little of how we got here.",
        paragraphs: [
            "We first met in 2014 as college classmates. What started as casual introductions slowly turned into friendship—comfortable, effortless, and unexpectedly meaningful. Even then, there was something familiar about each other, like we were meant to stay in each other’s orbit.",
            "After graduating, life took us in different directions, but it never truly pulled us apart. Somehow, we found our way back to each other again. This second chance meant everything. We didn’t let it pass—we chose each other, fully and intentionally.",
            "Now, after all the years, distance, and rediscovery, we’re stepping into our next chapter—one we’ve been building toward all along—and we’re so happy to share it with you.",
            "Years, adventures, and countless cups of coffee later, we're ready for our greatest adventure yet — and we'd love for you to be there when we begin it.",
        ],
        timeline: [
            { year: "2014", title: "How we met", text: "College classmates who slowly became close friends, without even realizing where it would lead." },
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
            { src: "/900x1100/1.png", alt: "The couple" }, // 900 × 1100 px
            { src: "/900x1100/2.png", alt: "Laughing together" }, // 900 × 1100 px
            { src: "/900x1100/3.png", alt: "A quiet moment" }, // 900 × 1100 px
            { src: "/900x1100/4.png", alt: "On an adventure" }, // 900 × 1100 px
            { src: "/900x1100/5.png", alt: "The proposal" }, // 900 × 1100 px
            { src: "/900x1100/6.png", alt: "be" }, // 900 × 1100 px

        ],
    },

    // ---- Shared Moments (guest photo wall) -------------------------
    // Guests scan a QR code at their table, snap or pick photos, and they
    // appear in the live gallery below — no login, no app. Uploads are saved
    // straight to your Google Drive by the Apps Script in
    // `google-apps-script/uploads/` (see that folder's README to set it up,
    // then put its /exec URL in `.env` as VITE_UPLOAD_ENDPOINT).
    sharedMoments: {
        kicker: "From Everyone",
        title: "Shared Moments",
        intro: "Caught a candid, a happy tear, or the dance floor going off? Share it here and watch our day come to life through your eyes.",
        // Guardrails (also enforced on the server).
        maxFiles: 10, // photos per upload batch
        maxFileSizeMB: 15, // per photo
        // The QR code on the tables should point to: <your-site-url>/#shared-moments
        // Opening that link skips the welcome gate and lands guests straight
        // on the uploader (see WelcomeGate.jsx). #share / #upload also work.
    },

    // ---- Event details ---------------------------------------------
    details: {
        ceremony: {
            title: "The Ceremony",
            time: "09:00 AM",
            venue: "Santo Niño Parish Church",
            address: "Poblacion, Cabanglasan, Bukidnon",
            mapUrl: "https://maps.app.goo.gl/V4n26SL3f2NYFMSUA",
        },
        reception: {
            title: "The Reception",
            time: "11:00 AM",
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
        { time: "08:30 AM", title: "Guests Arrive", text: "Find your seats and settle in.", icon: "sparkles" },
        { time: "09:00 AM", title: "Ceremony", text: "The moment we've been waiting for.", icon: "church" },
        { time: "11:30 AM", title: "Cocktails & Photos", text: "Drinks, mingling, and snapshots.", icon: "camera" },
        { time: "12:00 PM", title: "Reception & Lunch", text: "Eat, drink, and be married.", icon: "utensils" },
        { time: "2:00 PM", title: "Dancing", text: "The dance floor opens — bring your moves.", icon: "music" },
    ],

    // ---- Entourage / Wedding Party ---------------------------------
    // Everything here is data — edit names freely, add or remove groups.
    // Each group renders with one of three layouts:
    //   "columns" (default) — two mirrored columns, his side | her side.
    //                         `pairs: [["left name", "right name"], …]`
    //                         Use "" for a blank cell on one side.
    //   "roles"             — a "task → name" list, e.g. ring/coin/bible.
    //                         `roles: [{ label: "…", name: "…" }, …]`
    //   "list"              — plain centered names. `names: ["…", …]`
    // Optional per group: `title` (the small gold heading above it),
    // `leftLabel` / `rightLabel` (column captions), and `emphasis: true`
    // to print the names larger (used for the couple, parents, principal
    // sponsors' best man/maid, and the little groom & bride).
    entourage: {
        kicker: "With Us on Our Day",
        title: "The Wedding Party",
        intro: "The people who have loved, guided, and walked with us — standing beside us as we say our vows.",
        groups: [{
                leftLabel: "Groom",
                rightLabel: "Bride",
                emphasis: true,
                pairs: [
                    ["Loyd Anthony Toriano Gonzales", "Sharah Mae Calugas Dagupan"]
                ],
            },
            {
                leftLabel: "Parents of the Groom",
                rightLabel: "Parents of the Bride",
                emphasis: true,
                pairs: [
                    ["Lucia Anaba Toriano", "Dionesio G. Dagupan"],
                    ["", "Criselda T. Calugas"],
                ],
            },
            {
                title: "Life God Parents",
                pairs: [
                    ["Dr. Joy M. Mirasol", "Dr. Felix S. Mirasol"],
                    ["Dr. Carina Joane V. Barroso", "Mr. Ian Barroso"],
                    ["Dr. Jiemalyn B. Paulican", "Mr. Orlando John Paulican"],
                    ["Dr. Joan M. Recente", "Mr. Charlemagne Recente"],
                    ["Ms. Lourie Jane Tantoy", "Dr. Omar A. Tantoy"],
                    ["Dr. Helen P. Garcia", "Mr. Jamer Lazaro P. Garcia"],
                    ["Ms. Marlyn D. Asapon", "Mr. Cesar T. Asapon"],
                    ["Ms. Gemma D. Chanpokin", "Dr. Albert A. Villanca"],
                    ["Ms. Gemma Fernandez", "Dr. Rodello D. Pepito"],
                    ["Ms. Erma Gocotano", "Dr. Zenas Paloma"],
                    ["Ms. Elizabeth V. Cutamora", "Mr. Cresencio P. Cutamora"],
                    ["Dr. Jovelin M. Lapates", "Dr. Lesley C. Lubos"],
                ],
            },
            {
                title: "To Guide Us on Our Way Ahead",
                leftLabel: "Groom's Best",
                rightLabel: "Bride's Best",
                emphasis: true,
                pairs: [
                    ["Leo June T. Gonzales", "Angel Hope Calugas"]
                ],
            },
            {
                leftLabel: "His Best Circle",
                rightLabel: "Her Best Circle",
                pairs: [
                    ["Gerald John Hiponia", "Abbegail Calugas"],
                    ["Carl Cedrick Acaso", "Johara Divine Pelayo"],
                    ["Wystan Neil Leswe", "Angelie Arcillas"],
                    ["Earnie Actub", "Leah Joy Gonzales"],
                    ["Argie Ucab", "Rayanne Cruz"],
                    ["Jhoeshrex Dagupan", "Jusimie Caser"],
                ],
            },
            {
                title: "To Light Our Path",
                pairs: [
                    ["Johnten Magdale", "Melgen L. Magdale"]
                ],
            },
            {
                title: "To Clothe Us as One",
                pairs: [
                    ["Joe-Ed C. Dagupan", "Sheena S. Dagupan"]
                ],
            },
            {
                title: "To Bind Us Together",
                pairs: [
                    ["Dionecris C. Dagupan", "Cristy Jane C. Dagupan"]
                ],
            },
            {
                title: "Keepers of Love Symbols",
                layout: "roles",
                roles: [
                    { label: "To Carry Our Symbol of Love", name: "Jon Marc D. Acaso" },
                    { label: "To Carry Our Symbol of Faith", name: "Dione Keith Chester C. Dagupan" },
                    { label: "To Carry Our Symbol of Blessings", name: "Jhoekyle S. Dagupan" },
                ],
            },
            {
                title: "To Shower Our Path with Flowers",
                pairs: [
                    ["Johara Faith C. Pelayo", "Dionne Aiamarie Faith C. Dagupan"]
                ],
            },
            {
                title: "To Remind Us to Keep Our Love Forever Young",
                leftLabel: "Little Groom",
                rightLabel: "Little Bride",
                emphasis: true,
                pairs: [
                    ["Jhester Sheed S. Dagupan", "Amari Brielle D. Acaso"]
                ],
            },
            {
                title: "Banner Bearer",
                layout: "list",
                names: ["Renz Dexter Gonzales"],
            },
            {
                title: "Program Host",
                layout: "list",
                names: ["Dennis Gonzales"],
            },
        ],
    },

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
        email: "loydmit@gmail.com",
        phone: "+63 9658306989",
    },
};

// Navigation links (anchor ids must match section ids in App.jsx)
export const navLinks = [
    { label: "Story", href: "#story" },
    { label: "Gallery", href: "#shared-moments" },
    { label: "Details", href: "#details" },
    { label: "Schedule", href: "#schedule" },
    { label: "Entourage", href: "#entourage" },
    { label: "FAQ", href: "#faq" },
    { label: "RSVP", href: "#rsvp" },
];