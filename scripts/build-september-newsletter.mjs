#!/usr/bin/env node
import { writeFileSync } from 'node:fs';

const ASSET_CDN = 'https://cdn.jsdelivr.net/gh/Em-Pan/litvm-assets@main/images';
const REPO_CDN = 'https://cdn.jsdelivr.net/gh/Em-Pan/litvm-newsletter@main';

const TESTNET = 'https://testnet.litvm.com/';

const posts = {
  header: '01-00-header.png',
  panel: '02-01-highlight.png',
  workshop: '03-02-highlight.png',
  demoday: '04-03-highlight.png',
  ivan: '05-04-highlight.png',
  litecoin: '06-05-highlight.png',
  jay: '07-06-highlight.png',
  quote: '08-07-quote.png',
  press: '09-08-press.png',
};

const highlights = [
  {
    eyebrow: 'Panel',
    title: 'Decentralized Innovation Meets Corporate Strategy',
    image: posts.panel,
    alt: 'RWA Week Panel',
    body: 'The LitVM team joined representatives of the Litecoin Foundation and Lite Strategy for a panel: Decentralized Innovation Meets Corporate Strategy.',
    cta: 'WATCH',
    url: 'https://x.com/rwaweek/status/2094696863286849968',
  },
  {
    eyebrow: 'Workshop',
    title: 'First ecosystem builder workshop',
    image: posts.workshop,
    alt: 'Builder workshop with Ethernity Cloud',
    body: 'Hosted our first ecosystem builder workshop with Ethernity Cloud.',
    cta: 'VIEW',
    url: 'https://x.com/LitecoinVM/status/2097040621131247689',
  },
  {
    eyebrow: 'Event',
    title: 'First ecosystem Demo Day',
    image: posts.demoday,
    alt: 'Ecosystem Demo Day',
    body: 'Hosted our first ecosystem Demo Day.',
    cta: 'WATCH',
    url: 'https://x.com/LitecoinVM/status/2102111328949420419',
  },
  {
    eyebrow: 'Media',
    title: 'Ivan on Tech discovers the Litecoin Meta',
    image: posts.ivan,
    alt: 'Ivan on Tech',
    body: 'Ivan on Tech discovered the Litecoin Meta after being asked about LitVM by a livestream viewer.',
    cta: 'WATCH',
    url: 'https://x.com/LitecoinVM/status/2100957004042739743',
  },
  {
    eyebrow: 'Ecosystem',
    title: 'LitVM and the Litecoin thesis',
    image: posts.litecoin,
    alt: 'Litecoin post on LitVM',
    body: 'The Litecoin account made a post outlining what LitVM adds to an already compelling Litecoin thesis.',
    cta: 'READ',
    url: 'https://x.com/litecoin/status/2103428045277405634',
  },
  {
    eyebrow: 'Strategy',
    title: 'Lite Strategy CEO on LitVM',
    image: posts.jay,
    alt: 'Jay CEO of Lite Strategy',
    body: 'Jay, CEO of Lite Strategy, on LitVM’s value proposition for the Litecoin ecosystem.',
    cta: 'WATCH',
    url: 'https://x.com/LitecoinVM/status/2105403212337762659',
  }
];

const escapeHtml = (value) => String(value)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

function imagePath(mode, file) {
  if (mode === 'cdn') return `${REPO_CDN}/images/x-posts-sept/${file}`;
  return `./images/x-posts-sept/${file}`;
}

function button(label, url, align = 'left') {
  return `
    <table role="presentation" border="0" cellpadding="0" cellspacing="0"${align === 'center' ? ' align="center"' : ''} style="margin: 18px ${align === 'center' ? 'auto' : '0'} 0 ${align === 'center' ? 'auto' : '0'};">
      <tr>
        <td align="${align}">
          <a href="${escapeHtml(url)}" target="_blank" style="display: inline-block; background-color: #418aca; color: #ffffff; font-family: Arial, Helvetica, sans-serif; font-size: 14px; font-weight: 700; line-height: 20px; padding: 11px 18px; border-radius: 7px; text-decoration: none; letter-spacing: .01em;">${escapeHtml(label)}</a>
        </td>
      </tr>
    </table>`;
}

function divider() {
  return `
          <tr>
            <td style="padding: 18px 40px; background-color: #ffffff;">
              <hr style="border: none; border-top: 2px solid #d9d9d9; margin: 0;">
            </td>
          </tr>`;
}

function sectionTitle(label) {
  return `
          <tr>
            <td class="mobile-pad" style="padding: 26px 40px 12px 40px; background-color: #ffffff;">
              <h2 style="font-family: Arial, Helvetica, sans-serif; font-size: 32px; line-height: 36px; color: #11303d; font-weight: 700; margin: 0;">${label}</h2>
            </td>
          </tr>`;
}

function statCell(value, label) {
  return `<td class="stat-col" align="center" valign="top" width="33.33%" style="width: 33.33%; padding: 16px 8px; border-right: 1px solid rgba(255,255,255,.18);">
              <div style="font-family: Arial, Helvetica, sans-serif; font-size: 30px; line-height: 32px; color: #ffffff; font-weight: 800; margin: 0;">${escapeHtml(value)}</div>
              <div style="font-family: Arial, Helvetica, sans-serif; font-size: 10px; line-height: 14px; color: #bfefff; font-weight: 700; letter-spacing: .09em; text-transform: uppercase; margin: 6px 0 0 0;">${escapeHtml(label)}</div>
            </td>`;
}

function highlightGridCell(item, mode) {
  return `<td class="highlight-col" align="center" valign="top" width="48%" style="width: 48%; padding: 0 0 30px 0;">
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="width: 100%;">
                    <tr>
                      <td align="center" valign="top" style="padding: 0 0 12px 0;">
                        <a href="${escapeHtml(item.url)}" target="_blank" style="text-decoration: none; display: block;">
                          <img class="fluid-img" src="${imagePath(mode, item.image)}" alt="${escapeHtml(item.alt)}" style="display: block; width: 100%; max-width: 100%; height: auto; border: 0; outline: 0; line-height: 100%; border-radius: 6px;">
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td align="center" valign="top" style="padding: 0 0 7px 0;">
                        <div style="font-family: Arial, Helvetica, sans-serif; color: #418aca; font-size: 10px; line-height: 14px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; text-align:center; margin: 0 0 5px 0;">${escapeHtml(item.eyebrow)}</div>
                        <div style="font-family: Arial, Helvetica, sans-serif; font-size: 16px; line-height: 21px; color: #333333; font-weight: 800; text-align: center; margin: 0;">${escapeHtml(item.title)}</div>
                      </td>
                    </tr>
                    <tr>
                      <td align="center" valign="top">
                        <div style="font-family: Arial, Helvetica, sans-serif; font-size: 13px; line-height: 19px; color: #777f84; font-weight: 400; text-align: center; margin: 0;">${escapeHtml(item.body)} <a href="${escapeHtml(item.url)}" target="_blank" style="color: #1495e7; text-decoration: underline; white-space: nowrap; font-weight: 700;">[${escapeHtml(item.cta)}]</a></div>
                      </td>
                    </tr>
                  </table>
                </td>`;
}

function highlightGrid(mode) {
  const rows = [];
  for (let i = 0; i < highlights.length; i += 2) {
    if (i + 1 < highlights.length) {
        rows.push(`              <tr class="highlight-row">
                ${highlightGridCell(highlights[i], mode)}
                <td class="highlight-gap" width="4%" style="width: 4%; font-size: 0; line-height: 0;">&nbsp;</td>
                ${highlightGridCell(highlights[i + 1], mode)}
              </tr>`);
    } else {
        rows.push(`              <tr class="highlight-row">
                ${highlightGridCell(highlights[i], mode)}
                <td class="highlight-gap" width="4%" style="width: 4%; font-size: 0; line-height: 0;">&nbsp;</td>
                <td class="highlight-col" align="center" valign="top" width="48%" style="width: 48%; padding: 0 0 30px 0;"></td>
              </tr>`);
    }
  }
  return `
          <tr>
            <td class="mobile-pad" style="padding: 0 40px 16px 40px; background-color: #ffffff;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="width: 100%;">
${rows.join('\n')}
              </table>
            </td>
          </tr>`;
}

function featureCard(mode) {
  return `
          <tr>
            <td class="mobile-pad" style="padding: 0 40px 30px 40px; background-color: #ffffff;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="width: 100%; table-layout: fixed; background-color: #f7fafb; border-radius: 10px; overflow: hidden;">
                <tr><td><a href="https://x.com/LitecoinVM/status/2105027808179486972" target="_blank"><img class="fluid-img" src="${imagePath(mode, posts.header)}" alt="Ecosystem Growth" style="display:block;width:100%;max-width:520px;height:auto;border:0;outline:0;line-height:100%;"></a></td></tr>
                <tr><td style="padding: 20px 22px 22px 22px;">
                  <div style="font-family:Arial,Helvetica,sans-serif;color:#418aca;font-size:11px;line-height:15px;font-weight:800;text-transform:uppercase;letter-spacing:.08em;margin:0 0 7px 0;">Featured Story</div>
                  <h3 style="font-family:Arial,Helvetica,sans-serif;font-size:25px;line-height:30px;color:#11303d;font-weight:800;margin:0 0 12px 0;">Ecosystem Growth & Momentum</h3>
                  <p style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:21px;color:#636b70;margin:0 0 14px 0;">LitVM has continued its steady march forward, delivering strong ecosystem expansions and forming key partnerships.</p>
                  ${button('View Full Update', 'https://x.com/LitecoinVM/status/2105027808179486972')}
                </td></tr>
              </table>
            </td>
          </tr>`;
}

function additionalCards(mode) {
  return `
          <tr>
            <td class="mobile-pad" style="padding: 0 40px 30px 40px; background-color: #ffffff;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="width: 100%; table-layout: fixed; background-color: #f7fafb; border-radius: 10px; overflow: hidden;">
                <tr><td><a href="https://x.com/LitecoinVM/status/2104254116272935214" target="_blank"><img class="fluid-img" src="${imagePath(mode, posts.quote)}" alt="Quote of the Month" style="display:block;width:100%;max-width:520px;height:auto;border:0;outline:0;line-height:100%;"></a></td></tr>
                <tr><td style="padding: 20px 22px 22px 22px;">
                  <div style="font-family:Arial,Helvetica,sans-serif;color:#418aca;font-size:11px;line-height:15px;font-weight:800;text-transform:uppercase;letter-spacing:.08em;margin:0 0 7px 0;">Quote of the Month</div>
                  <h3 style="font-family:Arial,Helvetica,sans-serif;font-size:25px;line-height:30px;color:#11303d;font-weight:800;margin:0 0 12px 0;">Community Voice</h3>
                  <p style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:21px;color:#636b70;margin:0 0 14px 0;">Hear from the community.</p>
                  ${button('View Quote', 'https://x.com/LitecoinVM/status/2104254116272935214')}
                </td></tr>
              </table>
            </td>
          </tr>
          <tr>
            <td class="mobile-pad" style="padding: 0 40px 30px 40px; background-color: #ffffff;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="width: 100%; table-layout: fixed; background-color: #f7fafb; border-radius: 10px; overflow: hidden;">
                <tr><td><a href="https://x.com/BSCNews/status/2097869417371877563" target="_blank"><img class="fluid-img" src="${imagePath(mode, posts.press)}" alt="Press Highlight" style="display:block;width:100%;max-width:520px;height:auto;border:0;outline:0;line-height:100%;"></a></td></tr>
                <tr><td style="padding: 20px 22px 22px 22px;">
                  <div style="font-family:Arial,Helvetica,sans-serif;color:#418aca;font-size:11px;line-height:15px;font-weight:800;text-transform:uppercase;letter-spacing:.08em;margin:0 0 7px 0;">Press Highlight</div>
                  <h3 style="font-family:Arial,Helvetica,sans-serif;font-size:25px;line-height:30px;color:#11303d;font-weight:800;margin:0 0 12px 0;">BSC News Coverage</h3>
                  <p style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:21px;color:#636b70;margin:0 0 14px 0;">LitVM featured on BSC News.</p>
                  ${button('Read Article', 'https://x.com/BSCNews/status/2097869417371877563')}
                </td></tr>
              </table>
            </td>
          </tr>`;
}

function html(mode) {
  const title = 'LitVM September 2026 Newsletter';
  const preheader = 'September brought ecosystem demo days, builder workshops, and panels with the Litecoin Foundation...';

  // Make sure the banner path uses September banner. The user said Louie is working on the banner, so we should use september-newsletter-banner.png or similar.
  // Wait, in Sept they used september-newsletter-banner.png 
  const bannerImage = (mode === 'cdn') ? `\${REPO_CDN}/images/september-newsletter-banner.png` : './images/september-newsletter-banner.png';

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
  <title>\${title}</title>
  <style>
    body { margin: 0; padding: 0; width: 100% !important; background-color: #f4f4f4; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table { border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; }
    a { text-decoration: none; }
    img.fluid-img { width: 100% !important; max-width: 100% !important; height: auto !important; }
    .highlight-row img.fluid-img { height: 150px !important; object-fit: cover !important; object-position: center center !important; }
    .text-card { min-height: 150px; }
    @media only screen and (max-width: 620px) {
      table[class="email-container"], .email-container { display: block !important; width: 100% !important; max-width: 100% !important; min-width: 0 !important; }
      table[class="email-container"] > tbody, .email-container > tbody { display: block !important; width: 100% !important; }
      .email-container > tbody > tr { display: block !important; width: 100% !important; }
      .email-container > tbody > tr > td { display: block !important; width: auto !important; box-sizing: border-box !important; }
      .mobile-pad { padding-left: 24px !important; padding-right: 24px !important; }
      .highlight-row { display: block !important; width: 100% !important; }
      .highlight-col { display: block !important; width: 100% !important; max-width: 100% !important; padding-bottom: 30px !important; }
      .highlight-row img.fluid-img { height: 180px !important; }
      .highlight-gap { display: none !important; width: 0 !important; height: 0 !important; }
      .stat-col { display: block !important; width: 100% !important; border-right: 0 !important; border-bottom: 1px solid rgba(255,255,255,.18) !important; box-sizing: border-box !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f4;width:100%;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">\${preheader}</div>
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:#f4f4f4;">
    <tr><td align="center" style="padding:20px 0 30px 0;">
      <table class="email-container" role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="width:100%;max-width:600px;background-color:#ffffff;">
        
        <!-- HEADER -->
        <tr><td align="center" style="padding:15px 30px;background-color:#40758d;">
          <a href="https://www.litvm.com/" target="_blank" style="display:inline-block;text-decoration:none;"><img src="https://cdn.jsdelivr.net/gh/Em-Pan/litvm-assets@main/images/litvm-logo.png" width="115" alt="LitVM" style="display:block;outline:0;line-height:100%;width:115px;height:auto;border:0;margin:0 auto;"></a>
        </td></tr>
        
        <!-- HERO BANNER -->
        <tr><td align="center" style="background-color:#11303d;">
          <a href="https://www.litvm.com/" target="_blank" style="display:block;text-decoration:none;"><img src="\${bannerImage}" width="600" alt="LitVM September 2026" class="fluid-img" style="display:block;width:100%;max-width:600px;height:auto;border:0;line-height:100%;margin:0;"></a>
        </td></tr>

        <!-- INTRO -->
        <tr><td class="mobile-pad" style="padding:34px 40px 24px;background-color:#ffffff;">
          <p style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:21px;color:#636b70;margin:0 0 14px 0;"><strong style="color:#11303d;">Hey LitVM fam,</strong></p>
          <p style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:21px;color:#636b70;margin:0 0 14px 0;">September continued our momentum with builder workshops, demo days, and major ecosystem conversations driving the Litecoin meta forward.</p>
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center" style="margin:18px auto 0 auto;"><tr><td align="center"><a href="\${TESTNET}" target="_blank" style="display:inline-block;background-color:#418aca;color:#ffffff;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;line-height:20px;padding:11px 18px;border-radius:7px;text-decoration:none;letter-spacing:.01em;">Explore the LiteForge Testnet</a></td></tr></table>
        </td></tr>

        \${divider()}
        
        \${sectionTitle('September Highlights')}
        \${featureCard(mode)}
        \${highlightGrid(mode)}
        
        \${divider()}
        \${sectionTitle('Community & Press')}
        \${additionalCards(mode)}

        <!-- FOOTER -->
        <tr><td style="padding:0;background-color:#ffffff;"><hr style="border:none;border-top:2px solid #d9d9d9;margin:0;"></td></tr>
        <tr><td align="center" style="padding:30px 40px 40px 40px;background-color:#f7fafb;">
          <div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;color:#8f989d;margin:0 0 12px 0;"><strong>LitVM</strong><br>Hard Money Web3</div>
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center" style="margin:0 auto 20px auto;">
            <tr>
              <td style="padding:0 8px;"><a href="https://x.com/LitecoinVM" target="_blank" style="color:#418aca;text-decoration:none;font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:700;">X (Twitter)</a></td>
              <td style="padding:0 8px;"><a href="https://discord.com/invite/p5uh2Hg5xJ" target="_blank" style="color:#418aca;text-decoration:none;font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:700;">Discord</a></td>
              <td style="padding:0 8px;"><a href="https://www.litvm.com/" target="_blank" style="color:#418aca;text-decoration:none;font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:700;">Website</a></td>
            </tr>
          </table>
          <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:16px;color:#a8b0b5;">You are receiving this email because you opted in at LitVM.com.<br><a href="{{{unsubscribe}}}" style="color:#a8b0b5;text-decoration:underline;">Unsubscribe</a></div>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

writeFileSync('LitVM_September_2026_v2_TEST.html', html('local'));
writeFileSync('LitVM_September_2026_v2_SENDGRID_READY.html', html('cdn'));

console.log('✅ Generated LitVM_September_2026_v2_TEST.html (local images)');
console.log('✅ Generated LitVM_September_2026_v2_SENDGRID_READY.html (CDN images)');
