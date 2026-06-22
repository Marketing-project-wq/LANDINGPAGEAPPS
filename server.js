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

    // Inject script with visible status
    const debugScript = `<script>
      (function() {
        // Create debug panel
        const debugPanel = document.createElement('div');
        debugPanel.id = '__app_debug';
        debugPanel.style.cssText = 'position:fixed;bottom:20px;right:20px;background:#000;color:#0f0;padding:10px;font-size:12px;max-width:300px;border:1px solid #0f0;z-index:99999;font-family:monospace;';
        debugPanel.innerHTML = '<div>Loading...</div>';
        document.body.appendChild(debugPanel);

        function log(msg) {
          console.log('[DEBUG]', msg);
          debugPanel.innerHTML += '<div>' + msg + '</div>';
        }

        function fillAppPreview() {
          log('Searching for dc-import...');
          const dcImports = document.querySelectorAll('dc-import[name="AppPreview"]');
          log('Found: ' + dcImports.length + ' dc-import elements');

          if (dcImports.length > 0) {
            dcImports.forEach((el, idx) => {
              log('Processing element ' + idx);
              fetch('./AppPreview.dc.html')
                .then(r => {
                  log('Response status: ' + r.status);
                  return r.text();
                })
                .then(html => {
                  log('Got ' + html.length + ' bytes');
                  el.innerHTML = html;
                  el.style.cssText = 'display:block!important;width:100%!important;height:100%!important;overflow:hidden!important;';
                  log('✓ Content injected');
                })
                .catch(e => {
                  log('✗ Error: ' + e.message);
                });
            });
          } else {
            log('No dc-import found yet');
          }
        }

        log('Page ready');
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', () => {
            log('DOMContentLoaded fired');
            fillAppPreview();
          });
        } else {
          log('DOM already loaded');
          fillAppPreview();
        }

        // Aggressive retry
        let count = 0;
        const retry = setInterval(() => {
          count++;
          if (count <= 20) {
            fillAppPreview();
          } else {
            clearInterval(retry);
            log('Stopped retrying');
          }
        }, 300);
      })();
    </script>`;

    html = html.replace('</body>', debugScript + '</body>');
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(html);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Server error: ' + err.message);
  }
});

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});
