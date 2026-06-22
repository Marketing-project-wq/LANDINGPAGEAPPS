const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));

app.get('/', (req, res) => {
  try {
    let html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8');

    // Inject interactive screenshots carousel
    const carouselScript = `<script>
      (function() {
        const screenshots = [
          {
            title: 'Memberships',
            content: '<div style="width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;background:linear-gradient(135deg,#8B1538 0%,#5a0f2a 100%);padding:20px;text-align:center"><div style="font-size:24px;margin-bottom:10px">👥</div><div style="font-size:16px;font-weight:700;margin-bottom:8px">Join The Movement</div><div style="font-size:12px;margin-bottom:15px">Train Smarter</div><button style="background:#E60012;color:#fff;border:none;padding:8px 16px;border-radius:6px;font-weight:600">Explore Plans ▼</button></div>'
          },
          {
            title: 'Discovery - Experts',
            content: '<div style="width:100%;height:100%;background:#0a0a0d;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:12px"><div style="font-size:12px;color:#E60012;font-weight:700;margin-bottom:8px">🧭 EXPERTS</div><div style="background:rgba(255,255,255,0.08);border-radius:10px;padding:10px;text-align:center"><div style="font-weight:600;color:#fff;font-size:11px;margin-bottom:4px">Alif Sri Wahono</div><div style="background:#A8FF00;color:#000;padding:2px 6px;border-radius:4px;display:inline-block;font-weight:600;font-size:9px">Rehabilitation</div></div><div style="background:rgba(255,255,255,0.08);border-radius:10px;padding:10px;text-align:center"><div style="font-weight:600;color:#fff;font-size:11px;margin-bottom:4px">Benaia Oktasya</div><div style="background:#A8FF00;color:#000;padding:2px 6px;border-radius:4px;display:inline-block;font-weight:600;font-size:9px">Mobility</div></div></div>'
          },
          {
            title: 'Events',
            content: '<div style="width:100%;height:100%;background:#0a0a0d;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:12px"><div style="font-size:12px;color:#E60012;font-weight:700;margin-bottom:8px">📅 EVENTS</div><div style="background:rgba(255,150,0,0.1);border-left:3px solid #FF9500;border-radius:8px;padding:12px;text-align:center"><div style="font-weight:700;color:#fff;margin-bottom:4px;font-size:12px">Justisia Half Marathon 2026</div><div style="color:#FF9500;font-size:10px">30 August 2026 • 05:00-09:00</div><div style="color:#999;font-size:9px;margin-top:4px">The location will be announced soon</div></div></div>'
          }
        ];

        let currentSlide = 0;

        function fillPhonePreview() {
          const dcImports = document.querySelectorAll('dc-import[name="AppPreview"]');

          if (dcImports.length > 0) {
            dcImports.forEach(el => {
              const carouselHtml = '<div id="screenshot-carousel" style="position:absolute;inset:0;display:flex;flex-direction:column;background:#0a0a0d"><div id="screenshot-container" style="flex:1;overflow:hidden;background:#0a0a0d;position:relative">' +
                screenshots.map((s, i) => '<div class="screenshot-slide" style="position:absolute;inset:0;opacity:' + (i === 0 ? '1' : '0') + ';transition:opacity 0.3s ease;background:#0a0a0d">' + s.content + '</div>').join('') +
                '</div><div style="display:flex;justify-content:center;gap:6px;padding:8px;background:rgba(0,0,0,0.5)"><div id="slide-indicators">' +
                screenshots.map((s, i) => '<button class="slide-dot" data-slide="' + i + '" style="width:6px;height:6px;border-radius:50%;border:none;background:' + (i === 0 ? '#E60012' : '#555') + ';cursor:pointer;transition:all 0.2s"></button>').join('') +
                '</div></div></div>';

              el.innerHTML = carouselHtml;
              el.style.cssText = 'display:block!important;width:100%!important;height:100%!important;position:relative!important;';

              setupCarousel();
            });
          }
        }

        function setupCarousel() {
          const indicators = document.querySelectorAll('.slide-dot');
          const slides = document.querySelectorAll('.screenshot-slide');

          indicators.forEach((dot, i) => {
            dot.addEventListener('click', () => {
              currentSlide = i;
              updateSlides();
            });
          });

          // Auto-rotate every 5 seconds
          setInterval(() => {
            currentSlide = (currentSlide + 1) % screenshots.length;
            updateSlides();
          }, 5000);

          // Touch/swipe support
          let touchStart = 0;
          const container = document.getElementById('screenshot-container');
          if (container) {
            container.addEventListener('touchstart', (e) => {
              touchStart = e.touches[0].clientX;
            });
            container.addEventListener('touchend', (e) => {
              const touchEnd = e.changedTouches[0].clientX;
              if (touchStart - touchEnd > 50) {
                currentSlide = (currentSlide + 1) % screenshots.length;
              } else if (touchEnd - touchStart > 50) {
                currentSlide = (currentSlide - 1 + screenshots.length) % screenshots.length;
              }
              updateSlides();
            });
          }
        }

        function updateSlides() {
          document.querySelectorAll('.screenshot-slide').forEach((slide, i) => {
            slide.style.opacity = i === currentSlide ? '1' : '0';
          });

          document.querySelectorAll('.slide-dot').forEach((dot, i) => {
            dot.style.background = i === currentSlide ? '#E60012' : '#555';
          });
        }

        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', fillPhonePreview);
        } else {
          fillPhonePreview();
        }

        // Retry periodically
        let retries = 0;
        const retry = setInterval(() => {
          if (document.querySelectorAll('dc-import[name="AppPreview"]').length > 0) {
            fillPhonePreview();
          }
          if (++retries > 30) clearInterval(retry);
        }, 200);
      })();
    </script>`;

    html = html.replace('</body>', carouselScript + '</body>');
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(html);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Server error');
  }
});

app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});
