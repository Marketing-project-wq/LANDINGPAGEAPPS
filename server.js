const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname, {
  setHeaders: (res, filepath) => {
    if (filepath.endsWith('.dc.html')) {
      res.set('Content-Type', 'text/html; charset=utf-8');
      res.set('Access-Control-Allow-Origin', '*');
      res.set('Cache-Control', 'no-cache');
    }
  }
}));

app.get('/AppPreview.dc.html', (req, res) => {
  const filePath = path.join(__dirname, 'AppPreview.dc.html');
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-cache');
  res.sendFile(filePath);
});

app.get('/', (req, res) => {
  try {
    let html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8');

    // Inject script to force fill dc-import
    const fillScript = `<script>
      (function() {
        function fillAppPreview() {
          const dcImports = document.querySelectorAll('dc-import[name="AppPreview"]');
          console.log('Found dc-import elements:', dcImports.length);

          if (dcImports.length > 0) {
            dcImports.forEach(el => {
              fetch('./AppPreview.dc.html')
                .then(r => r.text())
                .then(html => {
                  console.log('Loaded AppPreview.dc.html, length:', html.length);
                  el.innerHTML = html;
                  el.style.cssText = 'display:block!important;width:100%!important;height:100%!important;';
                })
                .catch(e => console.error('Error loading AppPreview:', e));
            });
          }
        }

        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', fillAppPreview);
        } else {
          fillAppPreview();
        }

        // Retry every 500ms for 5 seconds
        let attempts = 0;
        const retry = setInterval(() => {
          attempts++;
          if (attempts > 10) clearInterval(retry);
          fillAppPreview();
        }, 500);
      })();
    </script>`;

    html = html.replace('</body>', fillScript + '</body>');
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
