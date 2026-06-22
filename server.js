const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));

app.get('/', (req, res) => {
  try {
    let html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8');

    // Replace dc-import with app preview content matching Claude Design
    const appPreviewHtml = `<div style="position:absolute;inset:0;background:#0a0a0d;display:flex;flex-direction:column;color:#fff;overflow:hidden;font-family:system-ui;padding:0">
  <!-- Status Bar -->
  <div style="background:#000;padding:6px 16px;font-size:11px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(230,0,18,0.1)">
    <span>9:41</span>
    <span style="letter-spacing:2px;font-size:10px">●●●●●</span>
  </div>

  <!-- Content Scroll Area -->
  <div style="flex:1;overflow-y:auto;padding:16px 12px;display:flex;flex-direction:column;gap:14px">
    <!-- Greeting Card -->
    <div style="display:flex;align-items:center;gap:12px;background:rgba(255,255,255,0.05);border-radius:12px;padding:14px">
      <div style="width:36px;height:36px;background:#A8FF00;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;color:#000;flex-shrink:0">SS</div>
      <div>
        <div style="font-size:11px;color:#999">Good Afternoon!</div>
        <div style="font-size:13px;font-weight:700">2OFIT Warrior</div>
      </div>
    </div>

    <!-- Points Card (Orange) -->
    <div style="background:linear-gradient(135deg,#FF9500 0%,#FF6B00 100%);border-radius:12px;padding:16px;box-shadow:0 8px 16px rgba(255,107,0,0.3)">
      <div style="font-size:10px;font-weight:700;letter-spacing:1px;margin-bottom:8px;text-transform:uppercase;opacity:0.9">Get Points</div>
      <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:10px">
        <div style="font-size:28px;font-weight:700">0</div>
        <div style="font-size:10px;opacity:0.8">Redeem perks for discounts on every purchase</div>
      </div>
      <div style="display:flex;gap:8px">
        <div style="flex:1;background:rgba(255,255,255,0.2);border-radius:6px;padding:6px;font-size:10px;text-align:center;font-weight:600;cursor:pointer">⏰ History</div>
        <div style="flex:1;background:rgba(0,0,0,0.2);border-radius:6px;padding:6px;font-size:10px;text-align:center;font-weight:600;cursor:pointer">➕ Top Up</div>
      </div>
    </div>

    <!-- Book Your Gym -->
    <div style="background:#2a1620;border-radius:12px;padding:14px;border-left:3px solid #E60012">
      <div style="font-size:12px;font-weight:700;margin-bottom:6px">Book Your Gym</div>
      <div style="font-size:10px;color:#ccc;line-height:1.4">Reserve your spot & secure your training time with ease.</div>
    </div>

    <!-- Upcoming Events -->
    <div>
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;padding:0 4px">
        <div style="font-size:12px;font-weight:700">Upcoming Events</div>
        <div style="font-size:10px;color:#E60012;cursor:pointer">View All</div>
      </div>
      <div style="background:linear-gradient(135deg,#8B1538 0%,#5a0f2a 100%);border-radius:12px;overflow:hidden;height:80px;display:flex;align-items:center;justify-content:center;padding:12px;text-align:center">
        <div>
          <div style="font-size:13px;font-weight:700;margin-bottom:2px">JUSTISIA</div>
          <div style="font-size:10px;color:#FF9500">HALF MARATHON 2026</div>
        </div>
      </div>
    </div>
  </div>

  <!-- Bottom Navigation -->
  <div style="background:#1a1a1e;border-top:1px solid rgba(230,0,18,0.1);padding:8px 0;display:flex;justify-content:space-around;align-items:center;font-size:18px">
    <div style="cursor:pointer">🏠</div>
    <div style="cursor:pointer">🧭</div>
    <div style="width:44px;height:44px;background:#E60012;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;transform:translateY(-8px);box-shadow:0 4px 12px rgba(230,0,18,0.4)">❤️</div>
    <div style="cursor:pointer">🎟️</div>
    <div style="cursor:pointer">👤</div>
  </div>
</div>`;

    html = html.replace(/<dc-import[^>]*><\/dc-import>/g, appPreviewHtml);

    // Remove loading indicators
    html = html.replace(/<div id="__bundler_loading"[^>]*>[\s\S]*?<\/div>/g, '');
    html = html.replace(/<div id="__bundler_thumbnail"[^>]*>[\s\S]*?<\/div>/g, '');

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(html);
  } catch (err) {
    console.error('Error serving index:', err);
    res.status(500).send('Server error');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
