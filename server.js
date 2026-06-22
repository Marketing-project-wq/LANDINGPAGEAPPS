const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));

app.get('/', (req, res) => {
  try {
    let html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8');

    // Replace dc-import with app preview content
    const appPreviewHtml = `<div style="position:absolute;inset:0;background:linear-gradient(135deg,#0a0a0d 0%,#1a1a1e 100%);display:flex;flex-direction:column;color:#fff;overflow:hidden;font-family:system-ui;padding:0">
  <!-- Status Bar -->
  <div style="background:rgba(10,10,13,0.8);padding:8px 16px;font-size:11px;display:flex;justify-content:space-between;border-bottom:1px solid rgba(230,0,18,0.1)">
    <span>9:41</span>
    <span style="color:#E60012">●●●●●</span>
  </div>

  <!-- Header -->
  <div style="background:linear-gradient(180deg,rgba(230,0,18,0.15) 0%,rgba(230,0,18,0.05) 100%);padding:20px 16px;border-bottom:2px solid #E60012;text-align:center">
    <div style="font-size:11px;color:#E60012;font-weight:700;letter-spacing:1px;margin-bottom:4px">2OFIT</div>
    <div style="font-size:14px;font-weight:700;color:#fff">Dashboard</div>
  </div>

  <!-- Content -->
  <div style="flex:1;padding:12px;display:flex;flex-direction:column;gap:12px;overflow-y:auto">
    <!-- Main Stats -->
    <div style="background:rgba(230,0,18,0.1);border:1px solid rgba(230,0,18,0.3);border-radius:8px;padding:12px">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px">
        <div>
          <div style="font-size:10px;color:#E60012;font-weight:700;text-transform:uppercase;letter-spacing:0.5px">Today</div>
          <div style="font-size:20px;font-weight:700;color:#fff;margin-top:4px">48 min</div>
        </div>
        <div style="font-size:24px">⏱️</div>
      </div>
      <div style="height:2px;background:rgba(230,0,18,0.2);border-radius:1px;overflow:hidden">
        <div style="width:65%;height:100%;background:#E60012;border-radius:1px"></div>
      </div>
    </div>

    <!-- Stats Grid -->
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
      <div style="background:rgba(255,255,255,0.05);border:1px solid rgba(230,0,18,0.2);border-radius:8px;padding:10px;text-align:center">
        <div style="font-size:18px;font-weight:700;color:#E60012">12</div>
        <div style="font-size:9px;color:#999;margin-top:4px">Sessions</div>
      </div>
      <div style="background:rgba(255,255,255,0.05);border:1px solid rgba(230,0,18,0.2);border-radius:8px;padding:10px;text-align:center">
        <div style="font-size:18px;font-weight:700;color:#E60012">92%</div>
        <div style="font-size:9px;color:#999;margin-top:4px">Complete</div>
      </div>
    </div>

    <!-- Features -->
    <div style="background:rgba(255,255,255,0.05);border:1px solid rgba(230,0,18,0.2);border-radius:8px;padding:10px">
      <div style="font-size:10px;color:#E60012;font-weight:700;margin-bottom:8px;text-transform:uppercase;letter-spacing:0.5px">Features</div>
      <div style="display:flex;flex-direction:column;gap:6px">
        <div style="display:flex;align-items:center;gap:6px;font-size:10px">
          <div style="width:4px;height:4px;background:#E60012;border-radius:50%;flex-shrink:0"></div>
          <span>Track Sessions</span>
        </div>
        <div style="display:flex;align-items:center;gap:6px;font-size:10px">
          <div style="width:4px;height:4px;background:#E60012;border-radius:50%;flex-shrink:0"></div>
          <span>Wellness Data</span>
        </div>
        <div style="display:flex;align-items:center;gap:6px;font-size:10px">
          <div style="width:4px;height:4px;background:#E60012;border-radius:50%;flex-shrink:0"></div>
          <span>Doctor Notes</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Footer -->
  <div style="background:rgba(10,10,13,0.9);padding:12px;border-top:1px solid rgba(230,0,18,0.2);text-align:center">
    <div style="display:flex;justify-content:space-around;font-size:20px">
      <span>📊</span>
      <span style="color:#E60012">🏋️</span>
      <span>⚙️</span>
    </div>
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
