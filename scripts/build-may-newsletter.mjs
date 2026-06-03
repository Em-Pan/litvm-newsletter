#!/usr/bin/env node
import { writeFileSync } from 'node:fs';

const ASSET_CDN = 'https://cdn.jsdelivr.net/gh/Em-Pan/litvm-assets@main/images';
const REPO_CDN = 'https://cdn.jsdelivr.net/gh/Em-Pan/litvm-newsletter@main';

const TESTNET = 'https://testnet.litvm.com/';
const HACKATHON = 'https://x.com/LitecoinVM/status/2052799128116298219';

const posts = {
  newsletterBanner: 'may-newsletter-banner.jpg',
  wallets: '01-wallets-3m.png',
  aztecUpdate: '02-aztec-liteforge-update.png',
  hackathon: '03-hackathon-kickoff.png',
  workshop: '04-hackathon-workshop.png',
  space: '05-ecosystem-space-lester-labs.png',
  tx: '06-transactions-30m-50m.png',
  interview: '07-litecoin-foundation-interview.png',
  ai: '08-ai-banger-zkrail.png',
  press: '09-bsc-news-press.png',
};

const highlights = [
  {
    eyebrow: 'Founder Update',
    title: 'LiteForge updates and the Litecoin meta',
    image: posts.aztecUpdate,
    alt: 'Aztec Amaya LiteForge update video',
    body: 'Aztec Amaya shared a LiteForge update and his take on the accelerating Litecoin meta. The message is getting clearer in public: LitVM is moving from thesis into visible ecosystem momentum.',
    cta: 'WATCH',
    url: 'https://x.com/circle_crypto/status/2052161038905462892',
  },
  {
    eyebrow: 'Builder Season',
    title: 'LiteForge Hackathon kicked off with DappIt',
    image: posts.hackathon,
    alt: 'LiteForge Hackathon kickoff post',
    body: 'The LiteForge Hackathon officially kicked off with DappIt, opening a builder path with no experience required and $2,000 in LTC across four tracks.',
    cta: 'JOIN',
    url: HACKATHON,
  },
  {
    eyebrow: 'Workshop',
    title: 'Hackathon kickoff recording is live',
    image: posts.workshop,
    alt: 'LiteForge Hackathon workshop recording',
    body: 'The kickoff workshop recording is live, giving builders a clean entry point if they missed the first session. Less friction, more experiments.',
    cta: 'WATCH',
    url: 'https://x.com/LitecoinVM/status/2057525784592474206',
  },
  {
    eyebrow: 'Ecosystem',
    title: 'LitVM hosted its first ecosystem space',
    image: posts.space,
    alt: 'LitVM Live ecosystem space with Lester Labs',
    body: 'LitVM hosted its inaugural ecosystem space alongside Lester Labs, creating a room for Litecoin, LitVM, partners, and community to gather around what comes next.',
    cta: 'LISTEN',
    url: 'https://x.com/LitecoinVM/status/2054296465078370605',
  },
  {
    eyebrow: 'Traction',
    title: '30M transactions became 50M+',
    image: posts.tx,
    alt: 'LiteForge 30 million transactions milestone',
    body: 'LiteForge crossed 30 million transactions on May 19 and kept moving past 50 million. The testnet is behaving like infrastructure people actually want to touch.',
    cta: 'VIEW',
    url: 'https://x.com/LitecoinVM/status/2056659473348121030',
  },
  {
    eyebrow: 'Litecoin Foundation',
    title: 'Aztec joined the Litecoin Foundation',
    image: posts.interview,
    alt: 'Aztec Amaya Litecoin Foundation interview',
    body: 'Aztec joined a Litecoin Foundation interview to discuss LitVM and the future of the Litecoin ecosystem, bringing the story directly to core Litecoin channels.',
    cta: 'WATCH',
    url: 'https://x.com/LitecoinVM/status/2059360421572702690',
  },
];

const escapeHtml = (value) => String(value)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

function imagePath(mode, file) {
  if (mode === 'cdn') return `${REPO_CDN}/images/x-posts-may-banners/${file}`;
  return `./images/x-posts-may-banners/${file}`;
}

function newsletterImagePath(mode, file) {
  if (mode === 'cdn') return `${REPO_CDN}/images/${file}`;
  return `./images/${file}`;
}

function assetPath(mode, file) {
  if (mode === 'cdn') return `${ASSET_CDN}/${file}`;
  return `./images/${file}`;
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

function statBand() {
  return `
          <tr>
            <td class="mobile-pad" style="padding: 0 40px 28px 40px; background-color: #ffffff;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="width:100%; background: #11303d; border-radius: 12px; overflow: hidden;">
                <tr>
                  ${statCell('3M+', 'active wallets')}
                  ${statCell('50M+', 'transactions')}
                  <td class="stat-col" align="center" valign="top" width="33.33%" style="width: 33.33%; padding: 16px 8px;">
                    <div style="font-family: Arial, Helvetica, sans-serif; font-size: 30px; line-height: 32px; color: #ffffff; font-weight: 800; margin: 0;">$2K</div>
                    <div style="font-family: Arial, Helvetica, sans-serif; font-size: 10px; line-height: 14px; color: #bfefff; font-weight: 700; letter-spacing: .09em; text-transform: uppercase; margin: 6px 0 0 0;">LTC hackathon</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>`;
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
    rows.push(`              <tr class="highlight-row">
                ${highlightGridCell(highlights[i], mode)}
                <td class="highlight-gap" width="4%" style="width: 4%; font-size: 0; line-height: 0;">&nbsp;</td>
                ${highlightGridCell(highlights[i + 1], mode)}
              </tr>`);
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
                <tr><td><a href="https://x.com/LitecoinVM/status/2056659473348121030" target="_blank"><img class="fluid-img" src="${imagePath(mode, posts.tx)}" alt="LiteForge 30 million transactions milestone" style="display:block;width:100%;max-width:520px;height:auto;border:0;outline:0;line-height:100%;"></a></td></tr>
                <tr><td style="padding: 20px 22px 22px 22px;">
                  <div style="font-family:Arial,Helvetica,sans-serif;color:#418aca;font-size:11px;line-height:15px;font-weight:800;text-transform:uppercase;letter-spacing:.08em;margin:0 0 7px 0;">Featured Story</div>
                  <h3 style="font-family:Arial,Helvetica,sans-serif;font-size:25px;line-height:30px;color:#11303d;font-weight:800;margin:0 0 12px 0;">LiteForge activity keeps accelerating</h3>
                  <p style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:21px;color:#636b70;margin:0 0 14px 0;">LiteForge surpassed <strong style="color:#11303d;">30 million transactions</strong> on May 19 and has already climbed beyond <strong style="color:#11303d;">50 million transactions</strong>.</p>
                  <p style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:21px;color:#636b70;margin:0;">That matters because testnets usually live or die by usage. LiteForge is showing the opposite of idle infrastructure: wallets are active, transactions are growing, builders are experimenting, and the Litecoin ecosystem is beginning to behave like a programmable network.</p>
                  ${button('View transaction milestone', 'https://x.com/LitecoinVM/status/2056659473348121030')}
                </td></tr>
              </table>
            </td>
          </tr>`;
}

function html(mode) {
  const title = 'LitVM May 2026 Newsletter';
  const preheader = 'May brought 3M+ wallets, 50M+ transactions, the DappIt hackathon, ecosystem spaces, and growing Litecoin visibility.';
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
  <title>${title}</title>
  <style>
    body { margin: 0; padding: 0; width: 100% !important; background-color: #f4f4f4; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table { border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; }
    a { text-decoration: none; }
    img.fluid-img { width: 100% !important; max-width: 100% !important; height: auto !important; }
    @media only screen and (max-width: 620px) {
      table[class="email-container"], .email-container { display: block !important; width: 100% !important; max-width: 100% !important; min-width: 0 !important; }
      table[class="email-container"] > tbody, .email-container > tbody { display: block !important; width: 100% !important; }
      .email-container > tbody > tr { display: block !important; width: 100% !important; }
      .email-container > tbody > tr > td { display: block !important; width: auto !important; box-sizing: border-box !important; }
      .mobile-pad { padding-left: 24px !important; padding-right: 24px !important; }
      .mobile-title { font-size: 30px !important; line-height: 34px !important; }
      img.fluid-img { width: 100% !important; max-width: 100% !important; height: auto !important; }
      .highlight-row { display: block !important; width: 100% !important; }
      .highlight-col { display: block !important; width: 100% !important; max-width: 100% !important; padding-bottom: 30px !important; }
      .highlight-gap { display: none !important; width: 0 !important; height: 0 !important; }
      .stat-col { display: block !important; width: 100% !important; border-right: 0 !important; border-bottom: 1px solid rgba(255,255,255,.18) !important; box-sizing: border-box !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4; width: 100%;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${escapeHtml(preheader)}</div>
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f4f4f4;">
    <tr>
      <td align="center" style="padding: 20px 0 30px 0;">
        <table class="email-container" role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" style="width: 600px; max-width: 600px; background-color: #ffffff;">
          <tr>
            <td align="center" style="padding: 15px 30px; background-color: #40758d;">
              <a href="https://www.litvm.com/" target="_blank" style="display: inline-block; text-decoration: none;">
                <img src="${assetPath(mode, 'litvm-logo.png')}" style="display: block; outline: 0; line-height: 100%; width: 115px; height: auto; border: 0; margin: 0 auto;" width="115" alt="LitVM">
              </a>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding: 0; background-color: #40758d;">
              <a href="https://www.litvm.com/" target="_blank" style="display: block; text-decoration: none;">
                <img class="fluid-img" src="${newsletterImagePath(mode, posts.newsletterBanner)}" alt="LitVM Monthly Newsletter - May 2026" style="display: block; width: 100%; max-width: 600px; height: auto; border: 0; outline: 0; line-height: 100%;">
              </a>
            </td>
          </tr>
          <tr>
            <td class="mobile-pad" style="padding: 34px 40px 22px 40px; background-color: #ffffff;">
              <h1 class="mobile-title" style="font-family: Arial, Helvetica, sans-serif; font-size: 38px; line-height: 41px; color: #11303d; font-weight: 800; text-align: center; margin: 0 0 14px 0;">LiteForge momentum<br>keeps building 🔥</h1>
              <p style="font-family: Arial, Helvetica, sans-serif; font-size: 15px; line-height: 22px; color: #636b70; text-align: center; margin: 0 0 18px 0;">LiteForge crossed <strong style="color:#11303d;">3 million active wallets</strong>, surged beyond <strong style="color:#11303d;">50 million transactions</strong>, and brought more builders into programmable Litecoin.</p>
              <a href="https://x.com/LitecoinVM/status/2059712888789475731" target="_blank" style="text-decoration: none; display: block; margin: 0 auto 0 auto;">
                <img class="fluid-img" src="${imagePath(mode, posts.wallets)}" alt="LiteForge crossed 3 million active wallets" style="display: block; width: 100%; max-width: 520px; height: auto; border: 0; outline: 0; line-height: 100%; border-radius: 8px;">
              </a>
              ${button('View 3M wallet milestone', 'https://x.com/LitecoinVM/status/2059712888789475731', 'center')}
            </td>
          </tr>
          ${statBand()}
          <tr>
            <td class="mobile-pad" style="padding: 0 40px 24px 40px; background-color: #ffffff;">
              <p style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; line-height: 21px; color: #636b70; margin: 0 0 14px 0;"><strong style="color: #11303d;">Hey LitVM fam,</strong></p>
              <p style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; line-height: 21px; color: #636b70; margin: 0 0 14px 0;">May was a momentum month. LiteForge crossed 3 million active wallets, surged past 30 million transactions on May 19, and has already moved beyond 50 million transactions.</p>
              <p style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; line-height: 21px; color: #636b70; margin: 0 0 18px 0;">Builders entered the LiteForge Hackathon, the Litecoin ecosystem gathered around new spaces and interviews, and LitVM's story kept spreading through media, community, and foundation channels.</p>
              ${button('Explore the LiteForge Testnet', TESTNET, 'center')}
            </td>
          </tr>
          ${divider()}
          ${featureCard(mode)}
          ${divider()}
          ${sectionTitle('Highlights 🌟')}
          ${highlightGrid(mode)}
          ${divider()}
          ${sectionTitle('AI Banger of the Month 🤖')}
          <tr>
            <td class="mobile-pad" style="padding: 0 40px 30px 40px; background-color: #ffffff;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="width: 100%; table-layout: fixed; background-color: #f8f9fa; border-radius: 8px; overflow: hidden;">
                <tr><td><a href="https://x.com/LitecoinVM/status/2052099546789167600" target="_blank"><img class="fluid-img" src="${imagePath(mode, posts.ai)}" alt="LitVM zkRail AI banger" style="display:block;width:100%;max-width:520px;height:auto;border:0;outline:0;line-height:100%;"></a></td></tr>
                <tr><td style="padding: 18px 20px 20px 20px;"><h3 style="font-family:Arial,Helvetica,sans-serif;font-size:22px;line-height:26px;color:#11303d;font-weight:800;margin:0 0 10px 0;">Ride the zkRail through Litecoin City</h3><p style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:21px;color:#636b70;margin:0;">This month's AI banger takes the LitVM zkRail through Litecoin City — a clean visual metaphor for the issue: Litecoin infrastructure becoming navigable, alive, and future-facing.</p>${button('Watch the AI banger', 'https://x.com/LitecoinVM/status/2052099546789167600')}</td></tr>
              </table>
            </td>
          </tr>
          ${divider()}
          ${sectionTitle('Press Highlight 📰')}
          <tr>
            <td class="mobile-pad" style="padding: 0 40px 30px 40px; background-color: #ffffff;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="width: 100%; table-layout: fixed; background-color: #f8f9fa; border-radius: 8px; overflow: hidden;">
                <tr><td><a href="https://x.com/BSCNews/status/2050367162716721558" target="_blank"><img class="fluid-img" src="${imagePath(mode, posts.press)}" alt="BSC News LiteForge coverage" style="display:block;width:100%;max-width:520px;height:auto;border:0;outline:0;line-height:100%;"></a></td></tr>
                <tr><td style="padding: 18px 20px 20px 20px;"><h3 style="font-family:Arial,Helvetica,sans-serif;font-size:22px;line-height:26px;color:#11303d;font-weight:800;margin:0 0 10px 0;">BSC News covered LiteForge's early traction</h3><p style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:21px;color:#636b70;margin:0;">BSC News covered the LiteForge testnet launch and its early traction, giving the broader crypto market another signal that LitVM's momentum is not staying inside the Litecoin bubble.</p>${button('Read the coverage', 'https://x.com/BSCNews/status/2050367162716721558')}</td></tr>
              </table>
            </td>
          </tr>
          ${divider()}
          <tr>
            <td class="mobile-pad" style="padding: 28px 40px 36px 40px; background-color: #ffffff; text-align: center;">
              <h2 style="font-family: Arial, Helvetica, sans-serif; font-size: 30px; line-height: 34px; color: #11303d; font-weight: 800; margin: 0 0 12px 0;">May made the signal harder to ignore</h2>
              <p style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; line-height: 21px; color: #636b70; margin: 0 0 22px 0;">LiteForge crossed 3 million wallets, pushed beyond 50 million transactions, opened the door for hackathon builders, and brought LitVM deeper into the Litecoin ecosystem conversation. If April was the launch, May was the acceleration.</p>
              <a href="${TESTNET}" target="_blank" style="display: inline-block; background-color: #418aca; color: #ffffff; font-family: Arial, Helvetica, sans-serif; font-size: 16px; font-weight: 700; line-height: 24px; padding: 14px 30px; border-radius: 8px; text-decoration: none;">Explore Testnet</a>
            </td>
          </tr>
          <tr>
            <td style="background-color: #40758d; padding: 20px 40px; text-align: center;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 10px;"><tr><td align="center"><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td style="padding: 0 10px 0 0;"><a href="https://x.com/LitecoinVM" target="_blank"><img src="${assetPath(mode, 'icon-x.png')}" width="20" height="20" alt="X" style="display:block;border:0;outline:0;line-height:100%;width:20px;height:20px;"></a></td><td style="padding: 0 0 0 10px;"><a href="https://t.me/litecoinvm" target="_blank"><img src="${assetPath(mode, 'icon-telegram.png')}" width="20" height="20" alt="Telegram" style="display:block;border:0;outline:0;line-height:100%;width:20px;height:20px;"></a></td></tr></table></td></tr></table>
              <div style="font-size:14px;line-height:20px;text-align:center;color:#ffffff;font-family: Arial, Helvetica, sans-serif;letter-spacing:-0.2px;margin-bottom:10px;"><span style="font-weight:700;">Let's build Litecoin's ZK Omnichain Together</span></div>
              <div style="font-size:10px;line-height:20px;text-align:center;color:#c4c4c4;font-family: Arial, Helvetica, sans-serif;letter-spacing:-0.2px;margin-bottom:15px;">
                <div>Copyright © 2026 LitVM, All rights reserved</div>
                <div>You are receiving this email because you opted in via our website.</div>
                <div>Want to <a href="{{ subscriber_preferences_link }}" target="_blank" rel="noreferrer" style="text-decoration:underline;color:#c4c4c4;">change how you receive these emails?</a></div>
                <div>You can <a href="{{{unsubscribe}}}" target="_blank" rel="noreferrer" style="text-decoration:underline;color:#1595e7;">unsubscribe from this list.</a></div>
              </div>
              <a href="https://www.litvm.com" target="_blank" style="text-decoration: none; display: inline-block;"><img src="${assetPath(mode, 'litvm-logo.png')}" style="display: block; outline: 0; line-height: 100%; width: 100px; height: auto; border: 0;" width="100" alt="LitVM"></a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
}

writeFileSync('LitVM_May_2026_TEST.html', html('local'));
writeFileSync('LitVM_May_2026_SENDGRID_READY.html', html('cdn'));
console.log('Wrote LitVM_May_2026_TEST.html');
console.log('Wrote LitVM_May_2026_SENDGRID_READY.html');
