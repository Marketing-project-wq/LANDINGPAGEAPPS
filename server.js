const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));

app.get('/AppPreview.dc.html', (req, res) => {
  const filePath = path.join(__dirname, 'AppPreview.dc.html');
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.sendFile(filePath);
});

app.get('/', (req, res) => {
  try {
    let html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8');

    // Aggressive injection with MutationObserver
    const aggressiveScript = `<script>
      (function() {
        const appPreviewHTML = '<div style="position:absolute;inset:0;background:#0a0a0d;display:flex;flex-direction:column;color:#fff;overflow:hidden;font-family:system-ui;padding:0"><div style="display:flex;justify-content:space-between;align-items:center;padding:6px 16px;font-size:12px;background:#000;border-bottom:1px solid rgba(230,0,18,0.1)"><span>9:41</span><span style="letter-spacing:2px;font-size:10px">●●●●●</span></div><div style="flex:1;overflow-y:auto;padding:16px 12px;display:flex;flex-direction:column;gap:14px;scrollbar-width:none"><div style="display:flex;align-items:center;gap:12px;background:rgba(255,255,255,0.05);border-radius:12px;padding:14px;border:1px solid rgba(230,0,18,0.1)"><div style="width:40px;height:40px;background:linear-gradient(135deg,#A8FF00 0%,#7FFF00 100%);border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;color:#000;font-size:14px;flex-shrink:0">SS</div><div><div style="font-size:10px;color:#999;margin-bottom:2px">Good Afternoon!</div><div style="font-size:13px;font-weight:700">2OFIT Warrior</div></div></div><div style="background:linear-gradient(135deg,#FF9500 0%,#FF6B00 100%);border-radius:12px;padding:16px;box-shadow:0 8px 24px rgba(255,107,0,0.3)"><div style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;opacity:0.9">Get Points</div><div style="font-size:32px;font-weight:700;margin-bottom:8px">0</div><div style="font-size:9px;opacity:0.85;margin-bottom:10px">Redeem perks for discounts on every purchase</div><div style="display:flex;gap:8px"><button style="flex:1;padding:6px;border:none;border-radius:6px;font-size:9px;font-weight:600;background:rgba(255,255,255,0.2);color:#fff;cursor:pointer">⏰ History</button><button style="flex:1;padding:6px;border:none;border-radius:6px;font-size:9px;font-weight:600;background:rgba(0,0,0,0.2);color:#fff;cursor:pointer">➕ Top Up</button></div></div><div style="background:#2a1620;border-radius:12px;padding:14px;border-left:3px solid #E60012"><div style="font-size:12px;font-weight:700;margin-bottom:6px">Book Your Gym</div><div style="font-size:10px;color:#ccc;line-height:1.4">Reserve your spot & secure your training time with ease.</div></div><div style="margin-bottom:80px"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;padding:0 4px;font-size:12px"><strong>Upcoming Events</strong><a style="color:#E60012;text-decoration:none;font-size:9px;cursor:pointer">View All</a></div><div style="background:linear-gradient(135deg,#8B1538 0%,#5a0f2a 100%);border-radius:12px;padding:16px;text-align:center;min-height:80px;display:flex;align-items:center;justify-content:center"><div><div style="font-size:13px;font-weight:700;margin-bottom:2px;color:#fff">JUSTISIA</div><div style="font-size:9px;color:#FF9500">HALF MARATHON 2026</div></div></div></div></div><div style="position:absolute;bottom:0;width:100%;background:#1a1a1e;border-top:1px solid rgba(230,0,18,0.1);padding:8px 0;display:flex;justify-content:space-around;align-items:center;font-size:18px;height:60px"><div>🏠</div><div>🧭</div><div style="width:48px;height:48px;background:#E60012;border-radius:50%;display:flex;align-items:center;justify-content:center;margin-top:-24px;box-shadow:0 4px 16px rgba(230,0,18,0.4)">❤️</div><div>🎟️</div><div>👤</div></div></div>';

        function fillDcImport(el) {
          if (el && el.innerHTML.trim() === '') {
            el.innerHTML = appPreviewHTML;
            el.style.cssText = 'display:block!important;width:100%!important;height:100%!important;position:relative!important;';
            console.log('✓ Filled dc-import element');
            return true;
          }
          return false;
        }

        // Immediate fill
        document.querySelectorAll('dc-import[name="AppPreview"]').forEach(fillDcImport);

        // MutationObserver untuk watch perubahan DOM
        const observer = new MutationObserver(mutations => {
          mutations.forEach(mutation => {
            if (mutation.type === 'childList') {
              mutation.addedNodes.forEach(node => {
                if (node.tagName === 'DC-IMPORT' || (node.querySelectorAll && node.querySelectorAll('dc-import[name="AppPreview"]').length > 0)) {
                  document.querySelectorAll('dc-import[name="AppPreview"]').forEach(fillDcImport);
                }
              });
            }
          });
        });

        observer.observe(document.body, {
          childList: true,
          subtree: true
        });

        // Aggressive interval backup
        setInterval(() => {
          document.querySelectorAll('dc-import[name="AppPreview"]').forEach(fillDcImport);
        }, 200);
      })();
    </script>`;

    html = html.replace('</body>', aggressiveScript + '</body>');
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(html);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Server error: ' + err.message);
  }
});

app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});
