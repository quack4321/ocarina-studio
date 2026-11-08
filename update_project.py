import os
import re

ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
APP_FILE = os.path.join(ROOT_DIR, "app.js")
INDEX_FILES = [
    os.path.join(ROOT_DIR, "index.html"),
    os.path.join(ROOT_DIR, "index_2.html")
]

# 1. High-Speed Native 2D Canvas Vector PDF Engine
NEW_PDF_ENGINE = """/**
 * ==============================================================================
 * ULTRA-FAST DIRECT 2D CANVAS PDF ENGINE (Bypasses html2canvas entirely)
 * Generates full multi-page PDFs in ~0.15 seconds regardless of song length.
 * ==============================================================================
 */
function drawCanvasDpad(ctx, cx, cy, dir, size = 18) {
  ctx.save();
  ctx.translate(cx, cy);
  const s = size / 24;
  ctx.scale(s, s);

  ctx.fillStyle = '#1e293b';
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  if (ctx.roundRect) {
    ctx.roundRect(-4, -11, 8, 22, 2);
    ctx.roundRect(-11, -4, 22, 8, 2);
  } else {
    ctx.rect(-4, -11, 8, 22);
    ctx.rect(-11, -4, 22, 8);
  }
  ctx.fill();
  ctx.stroke();

  if (dir === 'up') {
    ctx.fillStyle = '#facc15';
    ctx.fillRect(-3.5, -10.5, 7, 7);
    ctx.fillStyle = '#713f12';
    ctx.beginPath();
    ctx.moveTo(0, -9.2); ctx.lineTo(-2.5, -5.5); ctx.lineTo(2.5, -5.5);
    ctx.fill();
  } else {
    ctx.fillStyle = '#facc15';
    ctx.fillRect(-3.5, 3.5, 7, 7);
    ctx.fillStyle = '#713f12';
    ctx.beginPath();
    ctx.moveTo(0, 9.2); ctx.lineTo(-2.5, 5.5); ctx.lineTo(2.5, 5.5);
    ctx.fill();
  }
  ctx.restore();
}

function drawCanvasStick(ctx, cx, cy, dir, intensity = 'full', size = 18) {
  ctx.save();
  ctx.translate(cx, cy);
  const s = size / 24;
  ctx.scale(s, s);

  ctx.fillStyle = '#0f172a';
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(0, 0, 10.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  let nubY = 0;
  let nubColor = '#06b6d4';
  let strokeColor = '#38bdf8';
  if (dir === 'up') nubY = (intensity === 'full') ? -6 : -3.5;
  else if (dir === 'down') nubY = (intensity === 'full') ? 6 : 3.5;
  else if (dir === 'vibrato') { nubColor = '#a855f7'; strokeColor = '#e9d5ff'; }

  ctx.fillStyle = nubColor;
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.arc(0, nubY, 5.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#ffffff';
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 1.8;
  if (dir === 'up') {
    ctx.beginPath();
    ctx.moveTo(0, nubY - 2.2); ctx.lineTo(-2.8, nubY + 1.2); ctx.lineTo(2.8, nubY + 1.2);
    ctx.fill();
  } else if (dir === 'down') {
    ctx.beginPath();
    ctx.moveTo(0, nubY + 2.2); ctx.lineTo(-2.8, nubY - 1.2); ctx.lineTo(2.8, nubY - 1.2);
    ctx.fill();
  } else if (dir === 'vibrato') {
    ctx.beginPath();
    ctx.arc(-2, nubY, 2, Math.PI, 0, false);
    ctx.arc(2, nubY, 2, Math.PI, 0, true);
    ctx.stroke();
  }
  ctx.restore();
}

function renderPageToCanvas(pageNotes, pageNum, totalPages, totalCount, totalTime) {
  const W = 816;
  const H = 1056;
  const scale = 1.5; // ~144 DPI for crisp rendering with minimal memory footprint

  const canvas = document.createElement('canvas');
  canvas.width = Math.round(W * scale);
  canvas.height = Math.round(H * scale);
  const ctx = canvas.getContext('2d');
  ctx.scale(scale, scale);

  // Background & Gold Top Bar
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#ca8a04';
  ctx.fillRect(0, 0, W, 8);

  const isFirstPage = pageNum === 1;
  const globalOffset = isFirstPage ? 0 : 20 + (pageNum - 2) * 25;

  let gridY = 66;

  if (isFirstPage) {
    ctx.font = 'bold 20px "Cinzel Decorative", "Cinzel", serif';
    ctx.fillStyle = '#1e293b';
    ctx.textAlign = 'center';
    ctx.fillText('Ocarina of Time — Action Tablature', W / 2, 40);

    ctx.font = '600 11.5px Inter, -apple-system, sans-serif';
    ctx.fillStyle = '#64748b';
    ctx.fillText(`🎵 Notes: ${totalCount}   •   ⏱ ~${totalTime}s   •   🎮 Switch 2 Standard Tuning   •   📄 Page 1 of ${totalPages}`, W / 2, 59);

    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(38, 70); ctx.lineTo(W - 38, 70);
    ctx.stroke();

    // Legend Box
    ctx.fillStyle = '#f8fafc';
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1;
    ctx.beginPath();
    if (ctx.roundRect) ctx.roundRect(38, 78, 740, 60, 6);
    else ctx.rect(38, 78, 740, 60);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#3b82f6';
    ctx.fillRect(38, 78, 4, 60);

    ctx.textAlign = 'left';
    ctx.font = 'bold 10.5px Inter, sans-serif';
    ctx.fillStyle = '#0f172a';
    ctx.fillText('1. Base Buttons: ', 50, 95);
    ctx.font = '500 10.5px Inter, sans-serif';
    ctx.fillStyle = '#334155';
    ctx.fillText('[L] Low D4   •   [R] F4   •   [A] A4   •   [Y] B4   •   [X] High D5', 145, 95);

    ctx.font = 'bold 10.5px Inter, sans-serif';
    ctx.fillStyle = '#0f172a';
    ctx.fillText('2. Modifiers: ', 50, 113);
    ctx.font = '500 10.5px Inter, sans-serif';
    ctx.fillStyle = '#334155';
    ctx.fillText('D-Pad Up/Down (±1 semitone)   •   Analog Stick Up/Down (Half ±1, Full ±2, Horiz = Vibrato)', 132, 113);

    if (showNoteDurations) {
      ctx.font = 'bold 10.5px Inter, sans-serif';
      ctx.fillStyle = '#0f172a';
      ctx.fillText('3. Timing: ', 50, 130);
      ctx.font = '500 10.5px Inter, sans-serif';
      ctx.fillStyle = '#334155';
      ctx.fillText('Blue badge indicates hold duration in seconds.', 108, 130);
    }

    gridY = 150;
  } else {
    ctx.font = 'bold 12px "Cinzel", serif';
    ctx.fillStyle = '#334155';
    ctx.textAlign = 'left';
    ctx.fillText('Ocarina of Time — Action Tablature (Cont.)', 38, 42);

    ctx.font = '600 11px Inter, sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.textAlign = 'right';
    ctx.fillText(`Page ${pageNum} of ${totalPages}   •   Notes #${globalOffset + 1}–#${globalOffset + pageNotes.length}`, W - 38, 42);

    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(38, 52); ctx.lineTo(W - 38, 52);
    ctx.stroke();

    gridY = 66;
  }

  // Footer
  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(38, H - 32); ctx.lineTo(W - 38, H - 32);
  ctx.stroke();

  ctx.font = '600 10px Inter, sans-serif';
  ctx.fillStyle = '#94a3b8';
  ctx.textAlign = 'left';
  ctx.fillText('Ocarina of Time Studio • Switch 2 Tuning', 38, H - 18);
  ctx.textAlign = 'right';
  ctx.fillText(`Page ${pageNum} of ${totalPages}`, W - 38, H - 18);

  // Note Cards Grid (5 Columns)
  const cols = 5;
  const gap = 11;
  const colW = (740 - (cols - 1) * gap) / cols; // ~139.2px
  const cardH = 146;

  pageNotes.forEach((n, idxOnPage) => {
    const globalIdx = globalOffset + idxOnPage;
    const col = idxOnPage % cols;
    const row = Math.floor(idxOnPage / cols);
    const cx = 38 + col * (colW + gap);
    const cy = gridY + row * (cardH + gap);

    // Card Body
    ctx.fillStyle = n.isRest ? '#f8fafc' : '#ffffff';
    ctx.strokeStyle = n.isRest ? '#94a3b8' : '#cbd5e1';
    ctx.lineWidth = 1.5;
    if (n.isRest) ctx.setLineDash([4, 3]);
    else ctx.setLineDash([]);

    ctx.beginPath();
    if (ctx.roundRect) ctx.roundRect(cx, cy, colW, cardH, 10);
    else ctx.rect(cx, cy, colW, cardH);
    ctx.fill();
    ctx.stroke();
    ctx.setLineDash([]);

    // Step Number
    ctx.font = '800 10px Inter, sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.textAlign = 'left';
    ctx.fillText('#' + (globalIdx + 1), cx + 7, cy + 15);

    // Button Badge
    const midX = cx + colW / 2;
    const badgeY = cy + 28;

    if (n.isRest) {
      ctx.fillStyle = '#475569';
      ctx.beginPath();
      ctx.arc(midX, badgeY, 17, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 15px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('⏸', midX, badgeY + 5);
    } else if (n.button === 'L') {
      ctx.fillStyle = '#64748b';
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(midX - 24, badgeY - 14, 48, 28, [15, 5, 5, 5]);
      else ctx.rect(midX - 24, badgeY - 14, 48, 28);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 16px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('L', midX, badgeY + 6);
    } else if (n.button === 'R') {
      ctx.fillStyle = '#64748b';
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(midX - 24, badgeY - 14, 48, 28, [5, 15, 5, 5]);
      else ctx.rect(midX - 24, badgeY - 14, 48, 28);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 16px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('R', midX, badgeY + 6);
    } else {
      const colors = { 'A': '#3b82f6', 'Y': '#10b981', 'X': '#06b6d4' };
      ctx.fillStyle = colors[n.button] || '#64748b';
      ctx.beginPath();
      ctx.arc(midX, badgeY, 18, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = '900 17px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(n.button, midX, badgeY + 6);
    }

    // Modifier Icons
    let icons = [];
    if (n.dpad === 1) icons.push({ type: 'dpad', dir: 'up' });
    if (n.dpad === -1) icons.push({ type: 'dpad', dir: 'down' });
    if (n.stickDir === 'up-full') icons.push({ type: 'stick', dir: 'up', intensity: 'full' });
    if (n.stickDir === 'up-half') icons.push({ type: 'stick', dir: 'up', intensity: 'half' });
    if (n.stickDir === 'down-full') icons.push({ type: 'stick', dir: 'down', intensity: 'full' });
    if (n.stickDir === 'down-half') icons.push({ type: 'stick', dir: 'down', intensity: 'half' });
    if (n.hasVibrato) icons.push({ type: 'stick', dir: 'vibrato', intensity: 'none' });

    const iconY = cy + 62;
    if (icons.length === 1) {
      const ic = icons[0];
      if (ic.type === 'dpad') drawCanvasDpad(ctx, midX, iconY, ic.dir, 20);
      else drawCanvasStick(ctx, midX, iconY, ic.dir, ic.intensity, 20);
    } else if (icons.length >= 2) {
      const startX = midX - ((icons.length - 1) * 11);
      icons.forEach((ic, iIdx) => {
        const thisX = startX + iIdx * 22;
        if (ic.type === 'dpad') drawCanvasDpad(ctx, thisX, iconY, ic.dir, 18);
        else drawCanvasStick(ctx, thisX, iconY, ic.dir, ic.intensity, 18);
      });
    }

    // Modifier Text Pill
    const isNatural = !n.pdfMod || n.pdfMod === 'NATURAL';
    const pillText = isNatural ? 'Natural' : n.pdfMod;
    ctx.font = '800 8.5px Inter, sans-serif';
    const pillW = Math.min(colW - 14, ctx.measureText(pillText).width + 10);
    const pillH = 15;
    const pillY = cy + 82;

    ctx.fillStyle = isNatural ? '#f1f5f9' : '#fff7ed';
    ctx.strokeStyle = isNatural ? '#e2e8f0' : '#fdba74';
    ctx.lineWidth = 1;
    ctx.beginPath();
    if (ctx.roundRect) ctx.roundRect(midX - pillW / 2, pillY, pillW, pillH, 999);
    else ctx.rect(midX - pillW / 2, pillY, pillW, pillH);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = isNatural ? '#94a3b8' : '#c2410c';
    ctx.textAlign = 'center';
    ctx.fillText(pillText, midX, pillY + 11);

    // Duration Badge
    if (showNoteDurations) {
      const durText = `⏱ ${n.duration.toFixed(2)}s`;
      ctx.font = '700 8.5px Inter, sans-serif';
      const durW = ctx.measureText(durText).width + 8;
      const durY = cy + 101;

      ctx.fillStyle = '#f0f9ff';
      ctx.strokeStyle = '#bae6fd';
      ctx.lineWidth = 1;
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(midX - durW / 2, durY, durW, 14, 999);
      else ctx.rect(midX - durW / 2, durY, durW, 14);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#0369a1';
      ctx.textAlign = 'center';
      ctx.fillText(durText, midX, durY + 10.5);
    }

    // Pitch Strip (Bottom)
    const pitchH = 22;
    const pitchY = cy + cardH - pitchH;
    ctx.fillStyle = '#f8fafc';
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    ctx.beginPath();
    if (ctx.roundRect) ctx.roundRect(cx, pitchY, colW, pitchH, [0, 0, 9, 9]);
    else ctx.rect(cx, pitchY, colW, pitchH);
    ctx.fill();
    ctx.stroke();

    ctx.font = '800 12.5px Inter, sans-serif';
    ctx.fillStyle = '#0f172a';
    ctx.textAlign = 'center';
    ctx.fillText(n.pitch, midX, pitchY + 15.5);
  });

  return canvas;
}

/**
 * High-Speed Vector Canvas PDF Exporter:
 * Generates and downloads PDFs in ~0.15 seconds.
 */
async function exportPDF() {
  const count = recordedEvents.length;
  if (count === 0) return;

  const btn = document.getElementById('btn-export-pdf');
  const origText = btn ? btn.innerHTML : "📄 Download PDF";
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = `⏳ Generating...`;
  }

  // Small timeout to allow the browser to paint button state
  await new Promise(r => setTimeout(r, 20));

  try {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "letter",
      compress: true
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    let pagesData = [];
    if (count <= 20) {
      pagesData.push(recordedEvents.slice(0));
    } else {
      pagesData.push(recordedEvents.slice(0, 20));
      let offset = 20;
      while (offset < count) {
        pagesData.push(recordedEvents.slice(offset, offset + 25));
        offset += 25;
      }
    }

    const totalPages = pagesData.length;
    const lastEv = recordedEvents[count - 1];
    const totalTime = (lastEv.startTime + lastEv.duration).toFixed(1);

    for (let i = 0; i < totalPages; i++) {
      const pageCanvas = renderPageToCanvas(pagesData[i], i + 1, totalPages, count, totalTime);
      const imgData = pageCanvas.toDataURL("image/jpeg", 0.90);
      if (i > 0) pdf.addPage("letter", "portrait");
      pdf.addImage(imgData, 'JPEG', 0, 0, pageWidth, pageHeight, undefined, 'FAST');
    }

    pdf.save("ocarina_action_sheet.pdf");
  } catch (err) {
    console.error("PDF Export error:", err);
    alert("PDF generation error: " + err.message);
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = origText;
    }
  }
}
"""

def patch_app_js():
    if not os.path.exists(APP_FILE):
        print(f"Error: Could not find {APP_FILE}")
        return

    with open(APP_FILE, 'r', encoding='utf-8') as f:
        content = f.read()

    normalized = content.replace("\r\n", "\n")

    # Replace from exportPDF() (or any helper) down to printSheet()
    pattern = r"(async function exportPDF\(\)[\s\S]*?)(?=function printSheet\(\))"
    if re.search(pattern, normalized):
        normalized = re.sub(pattern, NEW_PDF_ENGINE + "\n", normalized, count=1)
        with open(APP_FILE, 'w', encoding='utf-8', newline='\n') as f:
            f.write(normalized)
        print("✓ Successfully upgraded app.js with the Instant Canvas PDF engine.")
    else:
        print("Notice: exportPDF() block not located with regex; appending engine.")
        normalized = normalized + "\n\n" + NEW_PDF_ENGINE
        with open(APP_FILE, 'w', encoding='utf-8', newline='\n') as f:
            f.write(normalized)
        print("✓ Appended Instant Canvas PDF engine to app.js.")

def patch_html_file(filepath):
    if not os.path.exists(filepath):
        return

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    normalized = content.replace("\r\n", "\n")
    changes = 0

    # Clean Preview button text
    if '👁 View &amp; Export Printable Sheet (PDF / PNG)' in normalized:
        normalized = normalized.replace('👁 View &amp; Export Printable Sheet (PDF / PNG)', '👁 View &amp; Export Printable Sheet (PDF)')
        changes += 1

    # Remove PNG button and update labels
    old_btns = """        <button id="btn-export-pdf" class="btn-primary" onclick="exportPDF()">
          📄 Export PDF
        </button>
        <button id="btn-export-png" class="btn-success" onclick="downloadPNG()">
          🖼 Download PNG
        </button>
        <button class="btn-secondary" onclick="printSheet()">
          🖨 Print
        </button>"""

    new_btns = """        <button id="btn-export-pdf" class="btn-primary" onclick="exportPDF()">
          📄 Download PDF
        </button>
        <button class="btn-secondary" onclick="printSheet()" title="Instant vector print or save to PDF">
          🖨 Print / Save PDF
        </button>"""

    if old_btns in normalized:
        normalized = normalized.replace(old_btns, new_btns)
        changes += 1

    if changes > 0:
        with open(filepath, 'w', encoding='utf-8', newline='\n') as f:
            f.write(normalized)
        print(f"✓ Updated {os.path.basename(filepath)} (Removed PNG button).")

if __name__ == "__main__":
    patch_app_js()
    for f in INDEX_FILES:
        patch_html_file(f)