#!/usr/bin/env node
import { writeFileSync } from 'node:fs';

const ASSET_CDN = 'https://cdn.jsdelivr.net/gh/Em-Pan/litvm-assets@main/images';
const REPO_CDN = 'https://cdn.jsdelivr.net/gh/Em-Pan/litvm-newsletter@main';

const posts = {
  newsletterBanner: 'april-newsletter-banner.jpg',
  lead: '01-lead-liteforge-live.png',
  manifesto: '02-hard-money-manifesto.png',
  goldsky: '03-goldsky-partner.png',
  cmc: '04-cmc-labs.png',
  vanguard: '05-vanguard-collective.png',
  research: '06-aztec-research.png',
  summit: '07-litecoin-summit.png',
  dia: '08-dia-oracle.png',
  stats: '09-testnet-stats.png',
  ai: '10-ai-banger.png',
  press: '11-crypto-times.png',
};

const highlights = [
  {
    eyebrow: 'Manifesto',
    title: 'The Hard Money Web3 Manifesto set the tone',
    image: posts.manifesto,
    alt: 'LitVM Hard Money Web3 Manifesto X post',
    body: 'Before LiteForge went live, LitVM published the Hard Money Web3 Manifesto: a line in the sand for what LitVM stands for and what Web3 should become. The manifesto frames LitVM as the programmable layer Litecoin has been missing: hard-money culture, proof-of-work roots, and modern Web3 applications moving together.',
    cta: 'Read the manifesto',
    url: 'https://x.com/LitecoinVM/status/2043735711686504557',
  },
  {
    eyebrow: 'Infrastructure',
    title: "Goldsky joined as LitVM's subgraph indexing partner",
    image: posts.goldsky,
    alt: 'Goldsky LitVM partnership X post',
    body: 'Goldsky, the data backbone behind Polymarket, Privy, Monad, and other major Web3 teams, was announced as LitVM\'s subgraph indexing partner. Builders on LitVM now have a path to real-time data pipelines, analytics, dashboards, and production-grade application experiences.',
    cta: 'View Goldsky announcement',
    url: 'https://x.com/LitecoinVM/status/2041933639626408242',
  },
  {
    eyebrow: 'Acceleration',
    title: "LitVM was selected for CoinMarketCap's CMC Labs accelerator",
    image: posts.cmc,
    alt: 'LitVM selected for CMC Labs X post',
    body: 'LitVM was selected to join CoinMarketCap\'s CMC Labs accelerator, giving the project stronger distribution into one of the largest audiences in crypto. The selection helps introduce Hard Money Web3 to millions of users, investors, and builders worldwide.',
    cta: 'View CMC Labs announcement',
    url: 'https://x.com/LitecoinVM/status/2049083819903570336',
  },
  {
    eyebrow: 'Community',
    title: 'The Litecoin Vanguard Collective launched',
    image: posts.vanguard,
    alt: 'Litecoin Vanguard Collective X post',
    body: 'LitVM launched the Litecoin Vanguard Collective alongside the Litecoin Foundation and Luxxfolio. The collective creates a shared hub for Litecoin community members, miners, builders, merchants, enterprises, and developers who want to help move Litecoin into its next era.',
    cta: 'View Vanguard announcement',
    url: 'https://x.com/LitecoinVM/status/2047665818356560088',
  },
  {
    eyebrow: 'Research',
    title: 'Aztec Amaya introduced new LitVM research',
    image: posts.research,
    alt: 'Aztec Amaya LitVM research X post',
    body: 'LitVM Co-Founder Aztec Amaya showcased the new research paper, A Hard Money Foundation for a Unified Web3. The paper explores blockchain abstraction, Web3 fragmentation, and the role LitVM can play in making Litecoin a foundation for modern decentralized applications.',
    cta: 'View research post',
    url: 'https://x.com/circle_crypto/status/2046841900813197377',
  },
  {
    eyebrow: 'Events',
    title: 'Aztec Amaya announced as Litecoin Summit speaker',
    image: posts.summit,
    alt: 'Aztec Amaya Litecoin Summit speaker X post',
    body: 'The Litecoin Foundation announced LitVM Co-Founder Aztec Amaya as a speaker at the upcoming Litecoin Summit in Amsterdam. The June 22-23 event will bring the LitVM story directly to Litecoin builders, miners, partners, and long-term ecosystem supporters.',
    cta: 'View Summit announcement',
    url: 'https://x.com/LTCFoundation/status/2044069356276199672',
  },
  {
    eyebrow: 'Oracle Layer',
    title: "DIA joined as LitVM's official oracle partner",
    image: posts.dia,
    alt: 'DIA LitVM oracle partnership X post',
    body: 'DIA joined as LitVM\'s official oracle infrastructure provider. Reliable price data is critical for lending markets, DEXs, RWA platforms, prediction markets, and other onchain applications. With DIA, LitVM builders get enterprise-grade oracle coverage across the broader crypto economy.',
    cta: 'View DIA announcement',
    url: 'https://x.com/LitecoinVM/status/2048764685961638102',
  },
  {
    eyebrow: 'Traction',
    title: 'April closed with major testnet momentum',
    image: posts.stats,
    alt: 'LitVM testnet stats X post',
    body: 'April ended with a strong two-week testnet update: 8.4M transactions, 630K unique addresses, and 40+ apps live. Those numbers show early demand from both users and builders, with LiteForge already behaving like a live programmable network.',
    cta: 'View stats update',
    url: 'https://x.com/LitecoinVM/status/2049928556814459172',
  },
];

const escapeHtml = (value) => String(value)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

function imagePath(mode, file) {
  if (mode === 'cdn') return `${REPO_CDN}/images/x-posts-april-banners/${file}`;
  return `./images/x-posts-april-banners/${file}`;
}

function newsletterImagePath(mode, file) {
  if (mode === 'cdn') return `${REPO_CDN}/images/${file}`;
  return `./images/${file}`;
}

function assetPath(mode, file) {
  if (mode === 'cdn') return `${ASSET_CDN}/${file}`;
  return `./images/${file}`;
}

function button(label, url) {
  return `
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 18px 0 0 0;">
      <tr>
        <td align="left">
          <a href="${escapeHtml(url)}" target="_blank" style="display: inline-block; background-color: #418aca; color: #ffffff; font-family: Arial, Helvetica, sans-serif; font-size: 14px; font-weight: 600; line-height: 20px; padding: 11px 18px; border-radius: 7px; text-decoration: none;">${escapeHtml(label)}</a>
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
            <td style="padding: 26px 40px 10px 40px; background-color: #ffffff;">
              <h2 style="font-family: Arial, Helvetica, sans-serif; font-size: 32px; line-height: 36px; color: #11303d; font-weight: 600; margin: 0;">${label}</h2>
            </td>
          </tr>`;
}

function highlightCard(item, mode) {
  return `
          <tr>
            <td style="padding: 0 40px 30px 40px; background-color: #ffffff;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="width: 100%; table-layout: fixed; background-color: #f8f9fa; border-radius: 8px; overflow: hidden;">
                <tr>
                  <td style="padding: 0;">
                    <a href="${escapeHtml(item.url)}" target="_blank" style="text-decoration: none;">
                      <img class="fluid-img" src="${imagePath(mode, item.image)}" alt="${escapeHtml(item.alt)}" style="display: block; width: 100%; max-width: 100%; height: auto; border: 0; outline: 0; line-height: 100%;">
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 18px 20px 20px 20px;">
                    <div style="font-family: Arial, Helvetica, sans-serif; color: #418aca; font-size: 11px; line-height: 15px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; margin: 0 0 6px 0;">${escapeHtml(item.eyebrow)}</div>
                    <h3 style="font-family: Arial, Helvetica, sans-serif; font-size: 21px; line-height: 25px; color: #11303d; font-weight: 700; margin: 0 0 10px 0;">${escapeHtml(item.title)}</h3>
                    <p style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; line-height: 21px; color: #636b70; margin: 0;">${escapeHtml(item.body)}</p>
                    ${button(item.cta, item.url)}
                  </td>
                </tr>
              </table>
            </td>
          </tr>`;
}

function compactHighlightText(item) {
  const copy = {
    manifesto: {
      title: 'Hard Money Web3 Manifesto',
      body: 'LitVM framed the mission: bring programmable Web3 to Litecoin without losing the hard-money culture that made it matter.',
      cta: 'READ',
    },
    goldsky: {
      title: 'Goldsky indexing partnership',
      body: 'Goldsky joined as LitVM’s subgraph indexing partner, giving builders real-time data infrastructure for apps, dashboards, and analytics.',
      cta: 'VIEW',
    },
    cmc: {
      title: 'Selected for CMC Labs',
      body: 'LitVM joined CoinMarketCap’s CMC Labs accelerator, expanding distribution to one of the largest audiences in crypto.',
      cta: 'VIEW',
    },
    vanguard: {
      title: 'Litecoin Vanguard Collective',
      body: 'LitVM launched the Litecoin Vanguard Collective with the Litecoin Foundation and Luxxfolio to organize the next wave of LTC builders.',
      cta: 'VIEW',
    },
    research: {
      title: 'New LitVM research',
      body: 'Aztec Amaya introduced new research on blockchain abstraction, Web3 fragmentation, and LitVM’s role in a unified application layer.',
      cta: 'READ',
    },
    summit: {
      title: 'Aztec at Litecoin Summit',
      body: 'The Litecoin Foundation announced Aztec Amaya as a speaker for Litecoin Summit Amsterdam, bringing LitVM directly to the ecosystem.',
      cta: 'VIEW',
    },
    dia: {
      title: 'DIA oracle partnership',
      body: 'DIA joined as LitVM’s oracle infrastructure partner, giving builders reliable price data for DeFi, RWAs, prediction markets, and more.',
      cta: 'VIEW',
    },
    stats: {
      title: 'Testnet momentum',
      body: 'April closed with 8.4M transactions, 630K unique addresses, and 40+ apps live — early traction with real builder demand.',
      cta: 'VIEW',
    },
  };

  const key = Object.entries(posts).find(([, file]) => file === item.image)?.[0];
  return copy[key] || { title: item.title, body: item.body, cta: item.cta };
}

function highlightGridCell(item, mode) {
  const compact = compactHighlightText(item);
  return `<td class="highlight-col" align="center" valign="top" width="48%" style="width: 48%; padding: 0 0 28px 0;">
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="width: 100%;">
                    <tr>
                      <td align="center" valign="top" style="padding: 0 0 12px 0;">
                        <a href="${escapeHtml(item.url)}" target="_blank" style="text-decoration: none; display: block;">
                          <img class="fluid-img" src="${imagePath(mode, item.image)}" alt="${escapeHtml(compact.title)} X post" style="display: block; width: 100%; max-width: 100%; height: auto; border: 0; outline: 0; line-height: 100%; border-radius: 4px;">
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td align="center" valign="top" style="padding: 0 0 8px 0;">
                        <div style="font-family: Arial, Helvetica, sans-serif; font-size: 16px; line-height: 21px; color: #515151; font-weight: 700; text-align: center; margin: 0;">${escapeHtml(compact.title)}</div>
                      </td>
                    </tr>
                    <tr>
                      <td align="center" valign="top">
                        <div style="font-family: Arial, Helvetica, sans-serif; font-size: 13px; line-height: 19px; color: #878787; font-weight: 400; text-align: center; margin: 0;">${escapeHtml(compact.body)} <a href="${escapeHtml(item.url)}" target="_blank" style="color: #1495e7; text-decoration: underline; white-space: nowrap;">[${escapeHtml(compact.cta)}]</a></div>
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
            <td class="mobile-pad" style="padding: 0 40px 18px 40px; background-color: #ffffff;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="width: 100%;">
${rows.join('\n')}
              </table>
            </td>
          </tr>`;
}

function html(mode) {
  const title = 'LitVM April 2026 Newsletter';
  const preheader = 'LiteForge launched, new partners joined, and the Litecoin ecosystem hit 8.4M testnet transactions in two weeks.';
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
      .email-container { width: 100% !important; max-width: 100% !important; }
      .mobile-pad { padding-left: 24px !important; padding-right: 24px !important; }
      .mobile-title { font-size: 30px !important; line-height: 34px !important; }
      img.fluid-img { width: 100% !important; max-width: 100% !important; height: auto !important; }
      .highlight-row { display: block !important; width: 100% !important; }
      .highlight-col { display: block !important; width: 100% !important; max-width: 100% !important; padding-bottom: 30px !important; }
      .highlight-gap { display: none !important; width: 0 !important; height: 0 !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4; width: 100%;">
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f4f4f4;">
    <tr>
      <td align="center" style="padding: 20px 0 30px 0;">
        <table class="email-container" role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="width: 100%; max-width: 600px; background-color: #ffffff;">
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
                <img class="fluid-img" src="${newsletterImagePath(mode, posts.newsletterBanner)}" alt="LitVM Monthly Newsletter - April 2026" style="display: block; width: 100%; max-width: 600px; height: auto; border: 0; outline: 0; line-height: 100%;">
              </a>
            </td>
          </tr>
          <tr>
            <td class="mobile-pad" style="padding: 34px 40px 24px 40px; background-color: #ffffff;">
              <h1 class="mobile-title" style="font-family: Arial, Helvetica, sans-serif; font-size: 38px; line-height: 40px; color: #11303d; font-weight: 700; text-align: center; margin: 0 0 14px 0;">LitVM's LiteForge testnet is live 🔥</h1>
              <p style="font-family: Arial, Helvetica, sans-serif; font-size: 15px; line-height: 22px; color: #636b70; text-align: center; margin: 0;">For the first time, the Litecoin ecosystem has access to smart contracts, DeFi, and Web3 applications running on LitVM, powered by zkLTC.</p>
            </td>
          </tr>
          <tr>
            <td class="mobile-pad" style="padding: 0 40px 24px 40px; background-color: #ffffff;">
              <p style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; line-height: 21px; color: #636b70; margin: 0 0 14px 0;"><strong style="color: #11303d;">Hey LitVM fam,</strong></p>
              <p style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; line-height: 21px; color: #636b70; margin: 0 0 14px 0;">April was the month LitVM moved from thesis to live network. LiteForge launched, builders entered the testnet, and the ecosystem started to show what programmable Litecoin can look like in the wild.</p>
              <p style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; line-height: 21px; color: #636b70; margin: 0 0 18px 0;">We published the Hard Money Web3 Manifesto, announced major infrastructure partners, joined CoinMarketCap's CMC Labs accelerator, helped launch the Litecoin Vanguard Collective, and watched early testnet activity accelerate faster than expected.</p>
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center" style="margin: 0 auto;">
                <tr>
                  <td align="center">
                    <a href="https://testnet.litvm.com/" target="_blank" style="display: inline-block; background-color: #418aca; color: #ffffff; font-family: Arial, Helvetica, sans-serif; font-size: 15px; font-weight: 600; line-height: 22px; padding: 12px 22px; border-radius: 8px; text-decoration: none;">Explore the LiteForge Testnet</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          ${divider()}
          ${sectionTitle('Featured Story')}
          <tr>
            <td class="mobile-pad" style="padding: 0 40px 30px 40px; background-color: #ffffff;">
              <h3 style="font-family: Arial, Helvetica, sans-serif; font-size: 26px; line-height: 30px; color: #11303d; font-weight: 700; margin: 0 0 14px 0;">LiteForge testnet is live</h3>
              <a href="https://x.com/LitecoinVM/status/2044460314645979226" target="_blank" style="text-decoration: none; display: block; margin: 0 0 18px 0;">
                <img class="fluid-img" src="${imagePath(mode, posts.lead)}" alt="LitVM LiteForge testnet launch banner" style="display: block; width: 100%; max-width: 520px; height: auto; border: 0; outline: 0; line-height: 100%; border-radius: 8px;">
              </a>
              <p style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; line-height: 21px; color: #636b70; margin: 0 0 14px 0;">LitVM's LiteForge testnet went live on April 15, bringing smart contracts, DeFi, and Web3 applications to the Litecoin ecosystem.</p>
              <p style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; line-height: 21px; color: #636b70; margin: 0;">The launch marks a major step toward Hard Money Web3: a programmable application layer built around Litecoin's uptime, liquidity, proof-of-work security, and cultural trust. With LitVM and zkLTC, builders can now begin testing the applications Litecoin has been missing.</p>
              ${button('View launch post', 'https://x.com/LitecoinVM/status/2044460314645979226')}
            </td>
          </tr>
          ${divider()}
          ${sectionTitle('Highlights 🌟')}
          ${highlightGrid(mode)}
          ${divider()}
          ${sectionTitle('AI Banger of the Month 🤖')}
          <tr>
            <td class="mobile-pad" style="padding: 0 40px 30px 40px; background-color: #ffffff;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="width: 100%; table-layout: fixed; background-color: #f8f9fa; border-radius: 8px; overflow: hidden;">
                <tr><td><a href="https://x.com/LitecoinVM/status/2048447598378516819" target="_blank"><img class="fluid-img" src="${imagePath(mode, posts.ai)}" alt="LitVM AI banger X post" style="display:block;width:100%;max-width:520px;height:auto;border:0;outline:0;line-height:100%;"></a></td></tr>
                <tr><td style="padding: 18px 20px 20px 20px;"><h3 style="font-family:Arial,Helvetica,sans-serif;font-size:22px;line-height:26px;color:#11303d;font-weight:700;margin:0 0 10px 0;">LitVM LiteForge is taking Litecoin to the moon and beyond</h3><p style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:21px;color:#636b70;margin:0;">Elon is not the only one launching things into space. This month's AI banger captured the energy around LiteForge perfectly: Litecoin entering a new orbit, powered by LitVM and the builders pushing Hard Money Web3 forward.</p>${button('Watch the AI banger', 'https://x.com/LitecoinVM/status/2048447598378516819')}</td></tr>
              </table>
            </td>
          </tr>
          ${divider()}
          ${sectionTitle('Press Highlight 📰')}
          <tr>
            <td class="mobile-pad" style="padding: 0 40px 30px 40px; background-color: #ffffff;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="width: 100%; table-layout: fixed; background-color: #f8f9fa; border-radius: 8px; overflow: hidden;">
                <tr><td><a href="https://x.com/CryptoTimes_io/status/2044715434776338825" target="_blank"><img class="fluid-img" src="${imagePath(mode, posts.press)}" alt="The Crypto Times LiteForge coverage X post" style="display:block;width:100%;max-width:520px;height:auto;border:0;outline:0;line-height:100%;"></a></td></tr>
                <tr><td style="padding: 18px 20px 20px 20px;"><h3 style="font-family:Arial,Helvetica,sans-serif;font-size:22px;line-height:26px;color:#11303d;font-weight:700;margin:0 0 10px 0;">The Crypto Times covered LiteForge's early traction</h3><p style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:21px;color:#636b70;margin:0;">The Crypto Times covered the LiteForge testnet launch and highlighted its early performance: 96,906 transactions and 10,589 unique addresses in the first 24 hours. For a fresh testnet, that is a strong start, and it helped validate demand for a programmable Litecoin ecosystem.</p>${button('Read the coverage', 'https://x.com/CryptoTimes_io/status/2044715434776338825')}</td></tr>
              </table>
            </td>
          </tr>
          ${divider()}
          <tr>
            <td class="mobile-pad" style="padding: 28px 40px 36px 40px; background-color: #ffffff; text-align: center;">
              <h2 style="font-family: Arial, Helvetica, sans-serif; font-size: 30px; line-height: 34px; color: #11303d; font-weight: 700; margin: 0 0 12px 0;">April proved the thesis</h2>
              <p style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; line-height: 21px; color: #636b70; margin: 0 0 22px 0;">LiteForge is live, the builder stack is growing, testnet activity is accelerating, and the ecosystem is organizing around Hard Money Web3. If you are a builder, partner, or Litecoin believer, now is the time to try the testnet and see what programmable Litecoin looks like in the wild.</p>
              <a href="https://testnet.litvm.com/" target="_blank" style="display: inline-block; background-color: #418aca; color: #ffffff; font-family: Arial, Helvetica, sans-serif; font-size: 16px; font-weight: 600; line-height: 24px; padding: 14px 30px; border-radius: 8px; text-decoration: none;">Explore Testnet</a>
            </td>
          </tr>
          <tr>
            <td style="background-color: #40758d; padding: 20px 40px; text-align: center;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 10px;"><tr><td align="center"><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td style="padding: 0 10px 0 0;"><a href="https://x.com/LitecoinVM" target="_blank"><img src="${assetPath(mode, 'icon-x.png')}" width="20" height="20" alt="X" style="display:block;border:0;outline:0;line-height:100%;width:20px;height:20px;"></a></td><td style="padding: 0 0 0 10px;"><a href="https://t.me/litecoinvm" target="_blank"><img src="${assetPath(mode, 'icon-telegram.png')}" width="20" height="20" alt="Telegram" style="display:block;border:0;outline:0;line-height:100%;width:20px;height:20px;"></a></td></tr></table></td></tr></table>
              <div style="font-size:14px;line-height:20px;text-align:center;color:#ffffff;font-family:'Rajdhani', Arial, Helvetica, sans-serif;letter-spacing:-0.2px;margin-bottom:10px;"><span style="font-weight:600;">Let's build Litecoin's ZK Omnichain Together</span></div>
              <div style="font-size:10px;line-height:20px;text-align:center;color:#c4c4c4;font-family:'Rajdhani', Arial, Helvetica, sans-serif;letter-spacing:-0.2px;margin-bottom:15px;">
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

writeFileSync('LitVM_April_2026_TEST.html', html('local'));
writeFileSync('LitVM_April_2026_SENDGRID_READY.html', html('cdn'));
console.log('Wrote LitVM_April_2026_TEST.html');
console.log('Wrote LitVM_April_2026_SENDGRID_READY.html');
