// scripts/poll-cards.mjs
// This script fetches each card catalogue URL listed in CARD_CATALOGUE_REGISTRY.md,
// extracts the card names from the page and compares them with the cards defined in
// src/data/cards.ts. It reports missing cards, extra cards and writes decommissioned
// cards to a markdown file.

import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

// Helper to read the registry and extract URLs (catalogue column)
function parseRegistry(filePath) {
  const lines = fs.readFileSync(filePath, 'utf-8').split(/\r?\n/);
  const urls = [];
  const urlRegex = /\[.*?\]\((https?:\/\/[^)]+)\)/g;
  for (const line of lines) {
    const matches = [...line.matchAll(urlRegex)];
    if (matches.length > 0) {
      // Assume first link is the catalogue URL
      urls.push(matches[0][1]);
    }
  }
  return urls;
}

// Load local cards list (expects an exported array named CARDS)
function loadLocalCards(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const nameRegex = /title:\s*\`([^`]+)\`/g; // matches title: `Card Name`
  const cards = new Set();
  let match;
  while ((match = nameRegex.exec(content)) !== null) {
    cards.add(match[1].trim().toLowerCase());
  }
  return cards;
}

async function fetchCardNames(url) {
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const html = await res.text();
    const $ = cheerio.load(html);
    // Very generic: look for heading elements that could contain card names
    const headings = [];
    $('h1, h2, h3, h4, h5, h6, li').each((_, el) => {
      const txt = $(el).text().trim();
      if (txt && txt.length < 80) headings.push(txt);
    });
    // Filter obvious noise – keep only items that contain "card" (case‑insensitive)
    const cardNames = headings.filter(t => /card/i.test(t)).map(t => t.toLowerCase());
    return new Set(cardNames);
  } catch (e) {
    console.error(`Failed to fetch ${url}:`, e);
    return new Set();
  }
}

async function main() {
  const repoRoot = path.resolve(); // cwd is project root
  const registryPath = path.join(repoRoot, 'CARD_CATALOGUE_REGISTRY.md');
  const cardsTsPath = path.join(repoRoot, 'src', 'data', 'cards.ts');

  const catalogueUrls = parseRegistry(registryPath);
  console.log(`Found ${catalogueUrls.length} catalogue URLs.`);

  const localCards = loadLocalCards(cardsTsPath);
  console.log(`Loaded ${localCards.size} local cards.`);

  const missingCards = new Set();
  const extraCards = new Set([...localCards]); // will subtract found cards

  for (const url of catalogueUrls) {
    console.log(`Fetching ${url} ...`);
    const remoteCards = await fetchCardNames(url);
    for (const rc of remoteCards) {
      if (!localCards.has(rc)) missingCards.add(rc);
      else extraCards.delete(rc);
    }
  }

  // Write report
  const reportLines = [];
  reportLines.push('# Card Verification Report');
  reportLines.push(`Generated on ${new Date().toISOString()}`);
  reportLines.push('');
  if (missingCards.size) {
    reportLines.push('## Missing Cards (present on site but not in repo)');
    missingCards.forEach(c => reportLines.push(`- ${c}`));
  } else {
    reportLines.push('## No missing cards detected.');
  }
  reportLines.push('');
  if (extraCards.size) {
    reportLines.push('## Potential Decommissioned / Delisted Cards (present in repo but not on site)');
    extraCards.forEach(c => reportLines.push(`- ${c}`));
  } else {
    reportLines.push('## No extra cards detected.');
  }

  const reportPath = path.join(repoRoot, 'CARD_VERIFICATION_REPORT.md');
  fs.writeFileSync(reportPath, reportLines.join('\n'));
  console.log(`Report written to ${reportPath}`);
}

main();
