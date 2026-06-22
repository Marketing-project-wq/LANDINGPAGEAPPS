const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));

app.get('/', (req, res) => {
  try {
    let html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8');

    // Inject app preview mockup content
    const appPreview = `<div style="position:absolute;inset:0;background:#0a0a0d;display:flex;flex-direction:column;color:#fff;overflow:hidden;font-family:system-ui;padding:0"><div style="background:#000;padding:6px 16px;font-size:12px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(230,0,18,0.1)"><span>9:41</span><span style="letter-spacing:2px;font-size:10px">●●●●●</span></div><div style="flex:1;overflow-y:auto;padding:16px 12px;display:flex;flex-direction:column;gap:14px"><div style="display:flex;align-items:center;gap:12px;background:rgba(255,255,255,0.05);border-radius:12px;padding:14px;border:1px solid rgba(230,0,18,0.1)"><div style="width:40px;height:40px;background:linear-gradient(135deg,#A8FF00 0%,#7FFF00 100%);border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;color:#000;font-size:14px;flex-shrink:0">SS</div><div><div style="font-size:10px;color:#999;margin-bottom:2px">Good Afternoon!</div><div style="font-size:13px;font-weight:700">2OFIT Warrior</div></div></div><div style="background:linear-gradient(135deg,#FF9500 0%,#FF6B00 100%);border-radius:12px;padding:16px;box-shadow:0 8px 24px rgba(255,107,0,0.3)"><div style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;opacity:0.9">Get Points</div><div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:10px"><div style="font-size:32px;font-weight:700">0</div><div style="font-size:9px;opacity:0.85;margin-bottom:10px;line-height:1.3">Redeem perks for discounts on every purchase</div></div><div style="display:flex;gap:8px"><button style="flex:1;padding:6px;border:none;border-radius:6px;font-size:9px;font-weight:600;background:rgba(255,255,255,0.2);color:#fff;cursor:pointer">⏰ History</button><button style="flex:1;padding:6px;border:none;border-radius:6px;font-size:9px;font-weight:600;background:rgba(0,0,0,0.2);color:#fff;cursor:pointer">➕ Top Up</button></div></div><div style="background:#2a1620;border-radius:12px;padding:14px;border-left:3px solid #E60012"><div style="font-size:12px;font-weight:700;margin-bottom:6px">Book Your Gym</div><div style="font-size:10px;color:#ccc;line-height:1.4">Reserve your spot & secure your training time with ease.</div></div><div style="margin-bottom:16px"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;padding:0 4px;font-size:12px"><strong style="font-weight:700">Upcoming Events</strong><a style="color:#E60012;text-decoration:none;font-size:9px;cursor:pointer">View All</a></div><div style="background:linear-gradient(135deg,#8B1538 0%,#5a0f2a 100%);border-radius:12px;overflow:hidden;height:80px;display:flex;align-items:center;justify-content:center;padding:12px;text-align:center"><div><h4 style="font-size:13px;font-weight:700;margin-bottom:2px;color:#fff">JUSTISIA</h4><p style="font-size:9px;color:#FF9500;margin:0">HALF MARATHON 2026</p></div></div></div></div><div style="background:#1a1a1e;border-top:1px solid rgba(230,0,18,0.1);padding:8px 0;display:flex;justify-content:space-around;align-items:center;font-size:18px;margin-top:auto"><div style="cursor:pointer">🏠</div><div style="cursor:pointer">🧭</div><div style="width:48px;height:48px;background:#E60012;border-radius:50%;display:flex;align-items:center;justify-content:center;transform:translateY(-8px);box-shadow:0 4px 16px rgba(230,0,18,0.4);cursor:pointer">❤️</div><div style="cursor:pointer">🎟️</div><div style="cursor:pointer">👤</div></div></div>`;

    // Try multiple patterns to replace dc-import
    html = html.replace(/<dc-import[^>]*><\/dc-import>/gi, appPreview);

    // Also try to replace in encoded form if needed
    if (!html.includes(appPreview)) {
      // Fallback: search for common patterns
      html = html.replace(/dc-import[^}]*}/g, appPreview);
    }

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(html);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Server error');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
