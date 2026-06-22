const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));

app.get('/', (req, res) => {
  try {
    let html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8');

    // Inject interactive phone mockup with carousel
    const mockupScript = `<script>
      (function() {
        const screenshots = [
          {
            title: 'Memberships',
            content: '<div style="width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;background:linear-gradient(135deg,#8B1538 0%,#5a0f2a 100%);padding:20px;text-align:center"><div style="font-size:32px;margin-bottom:15px">👥</div><div style="font-size:18px;font-weight:700;margin-bottom:10px;color:#fff">Join The Movement</div><div style="font-size:14px;margin-bottom:20px;color:#ddd">Train Smarter</div><button style="background:#E60012;color:#fff;border:none;padding:10px 20px;border-radius:6px;font-weight:600;cursor:pointer">Explore Plans ▼</button></div>'
          },
          {
            title: 'Discovery - Experts',
            content: '<div style="width:100%;height:100%;background:#0a0a0d;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:12px"><div style="font-size:12px;color:#E60012;font-weight:700;margin-bottom:8px">🧭 EXPERTS</div><div style="background:rgba(255,255,255,0.08);border-radius:10px;padding:12px;text-align:center"><div style="font-weight:600;color:#fff;font-size:12px;margin-bottom:6px">Alif Sri Wahono</div><div style="background:#A8FF00;color:#000;padding:4px 8px;border-radius:4px;display:inline-block;font-weight:600;font-size:10px">Rehabilitation</div></div><div style="background:rgba(255,255,255,0.08);border-radius:10px;padding:12px;text-align:center"><div style="font-weight:600;color:#fff;font-size:12px;margin-bottom:6px">Benaia Oktasya</div><div style="background:#A8FF00;color:#000;padding:4px 8px;border-radius:4px;display:inline-block;font-weight:600;font-size:10px">Mobility</div></div></div>'
          },
          {
            title: 'Events',
            content: '<div style="width:100%;height:100%;background:#0a0a0d;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:12px"><div style="font-size:12px;color:#E60012;font-weight:700;margin-bottom:8px">📅 EVENTS</div><div style="background:rgba(255,150,0,0.1);border-left:4px solid #FF9500;border-radius:8px;padding:14px;text-align:center"><div style="font-weight:700;color:#fff;margin-bottom:6px;font-size:13px">Justisia Half Marathon 2026</div><div style="color:#FF9500;font-size:11px;margin-bottom:4px">30 August 2026 • 05:00-09:00</div><div style="color:#888;font-size:10px">The location will be announced soon</div></div></div>'
          }
        ];

        let currentSlide = 0;

        function createPhoneMockup() {
          const mockupHtml = '<div id="phone-mockup" style="position:fixed;right:60px;top:50%;transform:translateY(-50%);width:340px;height:680px;background:#000;border-radius:40px;border:12px solid #1a1a1a;box-shadow:0 20px 60px rgba(0,0,0,0.5);display:flex;flex-direction:column;z-index:999;overflow:hidden"><div style="width:100%;height:100%;display:flex;flex-direction:column;background:#0a0a0d"><div style="display:flex;justify-content:space-between;align-items:center;padding:8px 20px;font-size:12px;background:#000;border-bottom:1px solid rgba(230,0,18,0.1);color:#fff"><span>9:41</span><span style="letter-spacing:2px;font-size:10px">●●●●●</span></div><div id="phone-content" style="flex:1;overflow:hidden;background:#0a0a0d;position:relative">' + screenshots.map((s, i) => '<div class="mockup-slide" style="position:absolute;width:100%;height:100%;opacity:' + (i === 0 ? '1' : '0') + ';transition:opacity 0.4s ease">' + s.content + '</div>').join('') + '</div><div style="display:flex;justify-content:center;gap:6px;padding:8px;background:rgba(0,0,0,0.7);border-top:1px solid rgba(230,0,18,0.1)"><div id="mockup-indicators">' + screenshots.map((s, i) => '<button class="mockup-dot" data-slide="' + i + '" style="width:8px;height:8px;border-radius:50%;border:none;background:' + (i === 0 ? '#E60012' : '#555') + ';cursor:pointer;transition:all 0.2s"></button>').join('') + '</div></div><div style="display:flex;justify-content:space-around;align-items:center;padding:10px 0;background:#1a1a1e;border-top:1px solid rgba(230,0,18,0.1);font-size:20px"><div style="cursor:pointer">🏠</div><div style="cursor:pointer">🧭</div><div style="width:40px;height:40px;background:#E60012;border-radius:50%;display:flex;align-items:center;justify-content:center;margin-top:-20px;box-shadow:0 4px 12px rgba(230,0,18,0.4);cursor:pointer">❤️</div><div style="cursor:pointer">🎟️</div><div style="cursor:pointer">👤</div></div></div></div>';

          const container = document.createElement('div');
          container.innerHTML = mockupHtml;
          document.body.appendChild(container);

          setupMockupCarousel();
        }

        function setupMockupCarousel() {
          const indicators = document.querySelectorAll('.mockup-dot');
          const slides = document.querySelectorAll('.mockup-slide');

          indicators.forEach((dot) => {
            dot.addEventListener('click', (e) => {
              currentSlide = parseInt(e.target.dataset.slide);
              updateMockupSlides();
            });
          });

          setInterval(() => {
            currentSlide = (currentSlide + 1) % screenshots.length;
            updateMockupSlides();
          }, 5000);

          let touchStart = 0;
          const content = document.getElementById('phone-content');
          if (content) {
            content.addEventListener('touchstart', (e) => {
              touchStart = e.touches[0].clientX;
            });
            content.addEventListener('touchend', (e) => {
              const touchEnd = e.changedTouches[0].clientX;
              if (touchStart - touchEnd > 50) {
                currentSlide = (currentSlide + 1) % screenshots.length;
              } else if (touchEnd - touchStart > 50) {
                currentSlide = (currentSlide - 1 + screenshots.length) % screenshots.length;
              }
              updateMockupSlides();
            });
          }
        }

        function updateMockupSlides() {
          document.querySelectorAll('.mockup-slide').forEach((slide, i) => {
            slide.style.opacity = i === currentSlide ? '1' : '0';
          });

          document.querySelectorAll('.mockup-dot').forEach((dot, i) => {
            dot.style.background = i === currentSlide ? '#E60012' : '#555';
          });
        }

        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', createPhoneMockup);
        } else {
          createPhoneMockup();
        }
      })();
    </script>`;

    html = html.replace('</body>', mockupScript + '</body>');
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
