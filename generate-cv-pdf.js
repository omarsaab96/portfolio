const fs = require("fs");

const out = "omarsaab_cv_updated.pdf";
const width = 595.28;
const height = 841.89;
const margin = 36;
const bottom = 34;
const contentWidth = width - margin * 2;

const green = "0.043 0.310 0.290";
const ink = "0.071 0.078 0.090";
const muted = "0.376 0.408 0.459";
const soft = "0.984 0.980 0.969";
const line = "0.871 0.847 0.800";

const sections = [
  {
    title: "Experience Profile",
    body: [
      {
        heading: "Product-focused full-stack delivery",
        text: "Built responsive interfaces, dashboards, ecommerce flows, CMS-driven pages, operational tools, APIs, authentication flows, data models, and third-party integrations for production products."
      },
      {
        heading: "Enterprise and regulated-sector execution",
        text: "Delivered work across banks, hospitals, insurers, airports, public administrations, retailers, logistics providers, education institutions, fintech platforms, and ecommerce operators."
      },
      {
        heading: "Technical leadership and architecture",
        text: "Shape systems around business workflows, integration boundaries, data ownership, access control, maintainability, release planning, monitoring, and production support."
      }
    ]
  },
  {
    title: "Selected Projects",
    body: [
      { heading: "Masarak Platform - Logistics and port operations", text: "Full-stack delivery and platform architecture for service access, operational workflows, and reliable business-critical port activity." },
      { heading: "Fruugle App - AI commerce", text: "Product engineering and data workflow design supporting 50k+ product ingestion, structured discovery, and commerce-oriented catalog handling." },
      { heading: "ZER01NE - Software agency platform", text: "Digital presence and delivery strategy for a service-focused agency experience communicating credibility, capabilities, and technical execution." },
      { heading: "Riyadah App - Sports technology", text: "Product concept and platform planning for clubs, athletes, participation workflows, and community discovery." },
      { heading: "Memora Aligners - Healthcare product website", text: "Healthcare product website focused on patient education, brand trust, and conversion paths for dental aligner customers and dentist audiences." },
      { heading: "Shopico Admin Panel - Ecommerce operations", text: "Admin workflows for products, categories, orders, users, wallet top-ups, coupons, branches, currencies, and store operations." }
    ]
  },
  {
    title: "Broader Portfolio Coverage",
    bullets: [
      "Bank Audi", "Banque Libano-Francaise", "Libano Suisse Insurance", "KIC Insurance",
      "LAU Medical Center", "Dallah Hospital and Health", "Erbil International Airport",
      "Middle East Airlines", "IQOS Lebanon", "Fintech Galaxy", "Finhub Bahrain",
      "Lebanese Petroleum Administration"
    ]
  },
  {
    title: "Core Skills",
    tags: [
      "React", "Next.js", "Angular", "Vue", "TypeScript", "JavaScript", "React Native", "Expo",
      "Node.js", "Express", "NestJS", "PHP", "Laravel", "REST APIs", "GraphQL", "OAuth/JWT",
      "MySQL", "PostgreSQL", "MongoDB", "Redis", "Docker", "Nginx", "AWS", "Azure",
      "Google Cloud", "CI/CD", "AI integrations", "Data ingestion", "Prompt engineering", "Workflow automation"
    ]
  },
  {
    title: "Leadership Practices",
    bullets: [
      "Architecture reviews, API boundaries, database boundaries, and scalability tradeoffs.",
      "Technical roadmaps, scope definition, sprint planning, QA/UAT planning, and release planning.",
      "Code review systems, implementation standards, documentation, and maintainability practices.",
      "Cloud/server decisions, CI/CD environments, monitoring, incident response, and production ownership.",
      "Stakeholder alignment, vendor evaluation, requirement mapping, and risk communication."
    ]
  },
  {
    title: "Domain Experience",
    tags: [
      "Logistics", "Port operations", "AI commerce", "Ecommerce", "Admin dashboards", "Fintech",
      "Banking", "Insurance", "Healthcare", "Airports", "Travel", "Education", "Government",
      "Retail", "Restaurants"
    ]
  },
  {
    title: "Certifications",
    bullets: [
      "AI for Data Analysis", "AI for Writing and Communicating", "Google AI", "AI Fundamentals",
      "AI for Research and Insights", "AI for App Building", "AI for Content Creation",
      "AI for Brainstorming and Planning"
    ]
  },
  {
    title: "How I Work",
    bullets: [
      "Translate business requirements into maintainable systems.",
      "Make technical decisions clear enough for teams to execute.",
      "Design around data flows, integration boundaries, ownership, and operational reliability.",
      "Stay involved from implementation through launch support and production outcomes."
    ]
  }
];

const pages = [];
let ops = [];
let y = height - margin;

function esc(value) {
  return String(value)
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)");
}

function op(value) {
  ops.push(value);
}

function text(value, x, yy, size = 10, font = "F1", color = ink) {
  op(`BT /${font} ${size} Tf ${color} rg ${x.toFixed(2)} ${yy.toFixed(2)} Td (${esc(value)}) Tj ET`);
}

function rect(x, yy, w, h, fillColor = null, strokeColor = null) {
  if (fillColor) {
    op(`${fillColor} rg ${x.toFixed(2)} ${yy.toFixed(2)} ${w.toFixed(2)} ${h.toFixed(2)} re f`);
  }
  if (strokeColor) {
    op(`${strokeColor} RG ${x.toFixed(2)} ${yy.toFixed(2)} ${w.toFixed(2)} ${h.toFixed(2)} re S`);
  }
}

function lineTo(x1, y1, x2, y2, color = line, lw = 0.6) {
  op(`${color} RG ${lw} w ${x1.toFixed(2)} ${y1.toFixed(2)} m ${x2.toFixed(2)} ${y2.toFixed(2)} l S`);
}

function wrap(value, maxChars) {
  const words = String(value).split(/\s+/);
  const lines = [];
  let current = "";
  for (const word of words) {
    if ((current + " " + word).trim().length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = (current + " " + word).trim();
    }
  }
  if (current) lines.push(current);
  return lines;
}

function need(space) {
  if (y - space < bottom) {
    finishPage();
  }
}

function finishPage() {
  pages.push(ops.join("\n"));
  ops = [];
  y = height - margin;
}

function paragraph(value, x, maxChars, size = 9.2, leading = 12, color = muted) {
  for (const line of wrap(value, maxChars)) {
    text(line, x, y, size, "F1", color);
    y -= leading;
  }
}

function bulletList(items, x, maxChars) {
  for (const item of items) {
    const lines = wrap(item, maxChars);
    text("•", x, y, 9, "F1", green);
    text(lines[0], x + 10, y, 9, "F1", muted);
    y -= 11;
    for (const extra of lines.slice(1)) {
      text(extra, x + 10, y, 9, "F1", muted);
      y -= 11;
    }
  }
}

function sectionTitle(title) {
  need(28);
  text(title.toUpperCase(), margin, y, 10.5, "F2", green);
  y -= 6;
  lineTo(margin, y, width - margin, y);
  y -= 13;
}

function tagRows(tags, x, maxWidth) {
  let tx = x;
  let ty = y;
  for (const tag of tags) {
    const w = Math.min(maxWidth, tag.length * 5.2 + 14);
    if (tx + w > x + maxWidth) {
      tx = x;
      ty -= 18;
    }
    rect(tx, ty - 4, w, 13, soft, line);
    text(tag, tx + 6, ty, 7.8, "F2", ink);
    tx += w + 5;
  }
  y = ty - 20;
}

function header() {
  text("Omar N. Saab", margin, y, 25, "F2", green);
  text("omar.saab.96@gmail.com", width - margin - 145, y + 2, 8.8, "F1", ink);
  y -= 14;
  text("Technical Leader and Full-Stack Engineer", margin, y, 11.5, "F2", ink);
  text("+961 70 433863", width - margin - 145, y + 1, 8.8, "F1", ink);
  y -= 13;
  text("linkedin.com/in/omarsaab96", width - margin - 145, y + 1, 8.8, "F1", ink);
  paragraph("Beirut-based technical leader focused on robust business-critical systems. I translate business requirements into maintainable platforms, make technical tradeoffs explicit, and lead delivery across frontend, backend, mobile, AI workflows, integrations, and production support.", margin, 88, 9.4, 12, muted);
  y -= 5;
  lineTo(margin, y, width - margin, y, green, 1.2);
  y -= 13;
}

function metrics() {
  const boxW = (contentWidth - 16) / 3;
  const labels = [
    ["120+", "delivered projects across MENA industries"],
    ["50k+", "products handled in AI grocery ingestion"],
    ["10+", "sectors including finance, medical, logistics, retail"]
  ];
  for (let i = 0; i < labels.length; i++) {
    const x = margin + i * (boxW + 8);
    rect(x, y - 35, boxW, 35, soft, line);
    text(labels[i][0], x + 8, y - 14, 16, "F2", green);
    text(labels[i][1], x + 8, y - 27, 7.8, "F2", muted);
  }
  y -= 48;
}

header();
metrics();

for (const section of sections) {
  sectionTitle(section.title);
  if (section.body) {
    for (const item of section.body) {
      need(45);
      text(item.heading, margin, y, 10.4, "F2", ink);
      y -= 12;
      paragraph(item.text, margin, 102, 9, 11, muted);
      y -= 5;
    }
  }
  if (section.bullets) {
    bulletList(section.bullets, margin, 95);
    y -= 5;
  }
  if (section.tags) {
    tagRows(section.tags, margin, contentWidth);
  }
}

text("Updated from portfolio experience - 2026", width - margin - 150, bottom - 12, 8, "F1", muted);
finishPage();

const objects = [];
function addObject(source) {
  objects.push(source);
  return objects.length;
}

const font1 = addObject("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
const font2 = addObject("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>");
const pageIds = [];
const contentIds = [];

for (const page of pages) {
  const stream = `<< /Length ${Buffer.byteLength(page, "utf8")} >>\nstream\n${page}\nendstream`;
  contentIds.push(addObject(stream));
  pageIds.push(null);
}

const pagesId = objects.length + contentIds.length + 1;
for (let i = 0; i < pages.length; i++) {
  pageIds[i] = addObject(`<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 ${width} ${height}] /Resources << /Font << /F1 ${font1} 0 R /F2 ${font2} 0 R >> >> /Contents ${contentIds[i]} 0 R >>`);
}
const kids = pageIds.map((id) => `${id} 0 R`).join(" ");
const realPagesId = addObject(`<< /Type /Pages /Kids [${kids}] /Count ${pageIds.length} >>`);
const catalogId = addObject(`<< /Type /Catalog /Pages ${realPagesId} 0 R >>`);

let pdf = "%PDF-1.4\n";
const offsets = [0];
for (let i = 0; i < objects.length; i++) {
  offsets.push(Buffer.byteLength(pdf, "utf8"));
  pdf += `${i + 1} 0 obj\n${objects[i]}\nendobj\n`;
}
const xref = Buffer.byteLength(pdf, "utf8");
pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
for (let i = 1; i < offsets.length; i++) {
  pdf += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
}
pdf += `trailer\n<< /Size ${objects.length + 1} /Root ${catalogId} 0 R >>\nstartxref\n${xref}\n%%EOF\n`;

fs.writeFileSync(out, pdf);
console.log(`Wrote ${out}`);
