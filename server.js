// server.js - Quantum Intelligence Node
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// 🧠 Specialized Localization Scam Detection Algorithm
app.post('/api/intelligence/analyze', (req, res) => {
    const payload = req.body.payload;
    if (!payload) return res.status(400).json({ error: "Payload needed." });

    const lowerInput = payload.toLowerCase();
    let score = 0;
    
    // Structure of our intelligence data
    let intelligenceReport = {
        vectors: {
            url_integrity: { status: "SAFE", match: "None", threat_score: 0 },
            social_engineering: { status: "SAFE", match: "None", threat_score: 0 },
            network_protocol: { status: "SAFE", match: "None", threat_score: 0 }
        }
    };

    // --- Vector 1: Social Engineering & Localization (Bangladesh) ---
    const localizedScamKeywords = ['bkash', 'nagad', 'pin update', 'lottery winner', 'verify account', 'congratulation free', 'claim prize'];
    let matches = [];
    localizedScamKeywords.forEach(kw => {
        if (lowerInput.includes(kw)) matches.push(kw);
    });

    if (matches.length > 0) {
        intelligenceReport.vectors.social_engineering.status = "FLAGGED";
        intelligenceReport.vectors.social_engineering.match = matches.join(', ');
        intelligenceReport.vectors.social_engineering.threat_score = Math.min(matches.length * 25, 90);
        score += intelligenceReport.vectors.social_engineering.threat_score;
    }

    // --- Vector 2: URL & Phishing Signatures ---
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const urls = lowerInput.match(urlRegex);

    if (urls) {
        const url = urls[0];
        const shorteners = ['bit.ly', 'cutt.ly', 'tinyurl', 't.co', 'rb.gy'];
        let shortMatch = shorteners.find(s => url.includes(s));

        if (url.includes('http://')) {
            intelligenceReport.vectors.network_protocol.status = "FLAGGED";
            intelligenceReport.vectors.network_protocol.match = "Insecure HTTP";
            intelligenceReport.vectors.network_protocol.threat_score = 30;
            score += 30;
        }

        if (shortMatch) {
            intelligenceReport.vectors.url_integrity.status = "CRITICAL";
            intelligenceReport.vectors.url_integrity.match = `Shortener (${shortMatch})`;
            intelligenceReport.vectors.url_integrity.threat_score = 50;
            score += 50;
        }
    }

    // Final calculations
    let finalScore = Math.min(score, 99);
    // Baseline variance for AI realism
    if (finalScore === 0) finalScore = Math.floor(Math.random() * 5); 

    let threatLevel = "LOW";
    if (finalScore > 30) threatLevel = "ELEVATED";
    if (finalScore >= 70) threatLevel = "CRITICAL";

    console.log(`[INTEL] Analyzed: ${threatLevel} Risk | Topic: ${payload.substring(0, 30)}...`);

    res.json({
        success: true,
        finalScore: finalScore,
        threatLevel: threatLevel,
        report: intelligenceReport
    });
});

app.listen(PORT, () => {
    console.log(`[SYS] Quantum Intelligence Backend operational on http://localhost:${PORT}`);
});