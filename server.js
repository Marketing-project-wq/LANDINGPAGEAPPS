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
    const appPreviewHtml = `<div style="position:absolute;inset:0;background:#0a0a0d;display:flex;flex-direction:column;color:#fff;overflow:hidden;font-family:system-ui">
  <div style="background:#1a1a1e;padding:16px;border-bottom:1px solid #2a2a2f;text-align:center">
    <div style="font-size:12px;color:#999">2OFIT</div>
  </div>
  <div style="flex:1;padding:16px;display:flex;flex-direction:column;gap:16px;overflow-y:auto">
    <div style="background:#1a1a1e;border-radius:12px;padding:16px;border:1px solid #2a2a2f">
      <div style="font-size:12px;color:#999;margin-bottom:8px">Today's Sessions</div>
      <div style="font-size:28px;font-weight:700;color:#E60012">3</div>
      <div style="font-size:11px;color:#666;margin-top:4px">Keep it up! 💪</div>
    </div>
    <div style="background:#1a1a1e;border-radius:12px;padding:16px;border:1px solid #2a2a2f">
      <div style="font-size:12px;color:#999;margin-bottom:8px">Weekly Progress</div>
      <div style="display:flex;gap:4px;margin:12px 0">
        <div style="flex:1;height:4px;background:#E60012;border-radius:2px"></div>
        <div style="flex:1;height:4px;background:#E60012;border-radius:2px"></div>
        <div style="flex:1;height:4px;background:#E60012;border-radius:2px"></div>
        <div style="flex:1;height:4px;background:#2a2a2f;border-radius:2px"></div>
      </div>
      <div style="font-size:11px;color:#666">3 of 7 days completed</div>
    </div>
    <div style="background:#1a1a1e;border-radius:12px;padding:16px;border:1px solid #2a2a2f">
      <div style="font-size:12px;color:#999;margin-bottom:12px">Available Features</div>
      <div style="display:flex;flex-direction:column;gap:8px">
        <div style="display:flex;align-items:center;gap:8px"><div style="width:6px;height:6px;background:#E60012;border-radius:50%"></div><div style="font-size:11px">Track Sessions</div></div>
        <div style="display:flex;align-items:center;gap:8px"><div style="width:6px;height:6px;background:#E60012;border-radius:50%"></div><div style="font-size:11px">Wellness Data</div></div>
        <div style="display:flex;align-items:center;gap:8px"><div style="width:6px;height:6px;background:#E60012;border-radius:50%"></div><div style="font-size:11px">Doctor Consult</div></div>
      </div>
    </div>
  </div>
  <div style="background:#1a1a1e;padding:12px;border-top:1px solid #2a2a2f;text-align:center">
    <div style="font-size:10px;color:#666">Download: App Store • Play Store</div>
  </div>
</div>`;

    html = html.replace(/<dc-import[^>]*><\/dc-import>/g, appPreviewHtml);

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
