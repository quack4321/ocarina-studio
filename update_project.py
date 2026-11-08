import os
import re

ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
APP_FILE = os.path.join(ROOT_DIR, "app.js")
STYLE_FILE = os.path.join(ROOT_DIR, "style.css")
HTML_FILES = [
    os.path.join(ROOT_DIR, "index.html"),
    os.path.join(ROOT_DIR, "index_2.html"),
    os.path.join(ROOT_DIR, "index_3.html")
]

# ==============================================================================
# NOTE FOR AI / DEVELOPERS:
# ALWAYS increment the version number ONLY by the most minor version place (+0.01)
# every time a change is generated (e.g. v1.01 -> v1.02 -> v1.03 -> v1.04).
# NEVER increment the major or minor tenths place automatically.
# ==============================================================================

NEW_MODULE_8 = """function renderPrintableHTMLSheet() {
  const container = document.getElementById('sheet-pages-container');
  if (!container) return;

  const count = recordedEvents.length;
  if (count === 0) {
    container.innerHTML = `<div style="color:#94a3b8; padding:40px; text-align:center;">No notes to export.</div>`;
    return;
  }

  const lastEv = recordedEvents[count - 1];
  const totalTime = (lastEv.startTime + lastEv.duration).toFixed(1);

  // 4 Cards Across: Page 1 = 5 rows x 4 = 20 notes; Page 2+ = 6 rows x 4 = 24 notes
  let pagesData = [];
  if (count <= 20) {
    pagesData.push(recordedEvents.slice(0));
  } else {
    pagesData.push(recordedEvents.slice(0, 20));
    let offset = 20;
    while (offset < count) {
      pagesData.push(recordedEvents.slice(offset, offset + 24));
      offset += 24;
    }
  }

  const totalPages = pagesData.length;
  const pageBadge = document.getElementById('modal-page-info');
  if (pageBadge) {
    pageBadge.innerText = `${totalPages} ${totalPages === 1 ? 'Page' : 'Pages'} • ${count} Notes`;
  }

  let tierClass = '';
  // Match icon size directly to the 38px button badges (tier-lg: 44px, tier-xl: 52px)
  let iconPx = 38;
  if (count <= 4) { tierClass = 'tier-xl'; iconPx = 52; }
  else if (count <= 8) { tierClass = 'tier-lg'; iconPx = 44; }

  container.innerHTML = "";

  pagesData.forEach((pageNotes, pageIdx) => {
    const pageNum = pageIdx + 1;
    const isFirstPage = pageNum === 1;
    const globalOffset = isFirstPage ? 0 : 20 + (pageIdx - 1) * 24;

    const cardsHtml = pageNotes.map((n, idxOnPage) => {
      const globalIdx = globalOffset + idxOnPage;
      const rgb = n.isRest ? [71, 85, 105] : (BASE_PITCHES[n.button]?.hex || [100, 116, 139]);
      const badgeColor = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
      const icons = buildModifierIconsHtml(n, iconPx);
      const isNatural = !n.pdfMod || n.pdfMod === "NATURAL";
      const badgeSymbol = n.isRest ? "⏸" : n.button;
      const shoulderClass = (n.button === 'L' || n.button === 'R') ? `shoulder-${n.button.toLowerCase()}` : '';

      return `
        <div class="print-card ${n.isRest ? 'rest-card' : ''}">
          <span class="print-card-step">#${globalIdx + 1}</span>
          <div class="print-badge ${shoulderClass}" style="background:${badgeColor};">${badgeSymbol}</div>
          <div class="print-mod-area">
            ${icons.length > 0 ? `<div class="combo-icon-row" style="min-height:${iconPx}px;">${icons.join('')}</div>` : `<div style="min-height:${iconPx}px;"></div>`}
            <span class="print-mod-pill ${isNatural ? 'natural' : 'active'}">${isNatural ? 'Natural' : n.pdfMod}</span>
            ${showNoteDurations ? `<span class="print-dur-badge">⏱ ${n.duration.toFixed(2)}s</span>` : ''}
          </div>
          <div class="print-pitch">${n.pitch}</div>
        </div>
      `;
    }).join('');

    const pageEl = document.createElement('div');
    pageEl.className = 'sheet-page';

    let headerHtml = "";
    if (isFirstPage) {
      headerHtml = `
        <div>
          <div class="sheet-page-header">
            <h1>Ocarina of Time — Action Tablature</h1>
            <div class="sheet-page-meta">
              <span>🎵 Notes: ${count}</span>
              ${showNoteDurations ? `<span>•</span><span>⏱ ~${totalTime}s</span>` : ''}
              <span>•</span>
              <span>🎮 Switch 2 Standard Tuning</span>
              <span>•</span>
              <span>📄 Page 1 of ${totalPages}</span>
            </div>
          </div>
          <div class="sheet-page-legend">
            <div><b>1. Base Buttons:</b> [L] Low D4 &bull; [R] F4 &bull; [A] A4 &bull; [Y] B4 &bull; [X] High D5</div>
            <div><b>2. Modifiers:</b> D-Pad Up/Down (±1 semitone) &bull; Analog Stick Up/Down (Half ±1, Full ±2, Horiz = Vibrato)</div>
            ${showNoteDurations ? `<div><b>3. Timing:</b> Blue badge indicates hold duration in seconds.</div>` : ''}
          </div>
        </div>
      `;
    } else {
      headerHtml = `
        <div class="sheet-running-header">
          <span>Ocarina of Time — Action Tablature (Cont.)</span>
          <span>Page ${pageNum} of ${totalPages} &bull; Notes #${globalOffset + 1}–#${globalOffset + pageNotes.length}</span>
        </div>
      `;
    }

    const footerHtml = `
      <div class="sheet-page-footer">
        <span>Ocarina of Time Studio &bull; Switch 2 Tuning</span>
        <span>Page ${pageNum} of ${totalPages}</span>
      </div>
    `;

    pageEl.innerHTML = `
      ${headerHtml}
      <div class="sheet-page-grid ${tierClass}">
        ${cardsHtml}
      </div>
      ${footerHtml}
    `;

    container.appendChild(pageEl);
  });
}

function openExportModal() {
  if (recordedEvents.length === 0) return;
  const tModal = document.getElementById('toggle-time-modal');
  if (tModal) tModal.checked = showNoteDurations;
  renderPrintableHTMLSheet();
  document.getElementById('export-modal').style.display = 'flex';
}

function closeExportModal() {
  document.getElementById('export-modal').style.display = 'none';
}

function drawCanvasDpad(ctx, cx, cy, dir, size = 38) {
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

function drawCanvasStick(ctx, cx, cy, dir, intensity = 'full', size = 38) {
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
  const scale = 2.0;

  const canvas = document.createElement('canvas');
  canvas.width = Math.round(W * scale);
  canvas.height = Math.round(H * scale);
  const ctx = canvas.getContext('2d');
  ctx.scale(scale, scale);

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  // Background & Gold Top Bar
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#ca8a04';
  ctx.fillRect(0, 0, W, 8);

  const isFirstPage = pageNum === 1;
  const globalOffset = isFirstPage ? 0 : 20 + (pageNum - 2) * 24;

  let gridY = 66;

  if (isFirstPage) {
    ctx.font = 'bold 20px "Cinzel Decorative", "Cinzel", serif';
    ctx.fillStyle = '#1e293b';
    ctx.textAlign = 'center';
    ctx.fillText('Ocarina of Time — Action Tablature', W / 2, 40);

    ctx.font = '600 11.5px Inter, -apple-system, BlinkMacSystemFont, sans-serif';
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

  // Running Footer
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

  // 4 Cards Across Grid Layout (174.5px wide per card)
  const cols = 4;
  const gapX = 14;
  const colW = (740 - (cols - 1) * gapX) / cols;
  const cardH = 148;
  const gapY = isFirstPage ? 12 : 10;

  pageNotes.forEach((n, idxOnPage) => {
    const globalIdx = globalOffset + idxOnPage;
    const col = idxOnPage % cols;
    const row = Math.floor(idxOnPage / cols);
    const cx = 38 + col * (colW + gapX);
    const cy = gridY + row * (cardH + gapY);

    // Card Container
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
    ctx.font = '800 10.5px Inter, sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.textAlign = 'left';
    ctx.fillText('#' + (globalIdx + 1), cx + 8, cy + 16);

    // Button Badge (centered at badgeY)
    const midX = cx + colW / 2;
    const badgeY = cy + 27;

    if (n.isRest) {
      ctx.fillStyle = '#475569';
      ctx.beginPath();
      ctx.arc(midX, badgeY, 18, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 16px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('⏸', midX, badgeY + 5.5);
    } else if (n.button === 'L') {
      ctx.fillStyle = '#64748b';
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(midX - 26, badgeY - 14, 52, 29, [16, 5, 5, 5]);
      else ctx.rect(midX - 26, badgeY - 14, 52, 29);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 16px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('L', midX, badgeY + 6);
    } else if (n.button === 'R') {
      ctx.fillStyle = '#64748b';
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(midX - 26, badgeY - 14, 52, 29, [5, 16, 5, 5]);
      else ctx.rect(midX - 26, badgeY - 14, 52, 29);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 16px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('R', midX, badgeY + 6);
    } else {
      const colors = { 'A': '#3b82f6', 'Y': '#10b981', 'X': '#06b6d4' };
      ctx.fillStyle = colors[n.button] || '#64748b';
      ctx.beginPath();
      ctx.arc(midX, badgeY, 19, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = '900 18px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(n.button, midX, badgeY + 6.5);
    }

    // Modifier Icons: Scaled up to 38px matching button badge diameter
    let icons = [];
    if (n.dpad === 1) icons.push({ type: 'dpad', dir: 'up' });
    if (n.dpad === -1) icons.push({ type: 'dpad', dir: 'down' });
    if (n.stickDir === 'up-full') icons.push({ type: 'stick', dir: 'up', intensity: 'full' });
    if (n.stickDir === 'up-half') icons.push({ type: 'stick', dir: 'up', intensity: 'half' });
    if (n.stickDir === 'down-full') icons.push({ type: 'stick', dir: 'down', intensity: 'full' });
    if (n.stickDir === 'down-half') icons.push({ type: 'stick', dir: 'down', intensity: 'half' });
    if (n.hasVibrato) icons.push({ type: 'stick', dir: 'vibrato', intensity: 'none' });

    const iconSize = 38;
    const iconY = cy + 66;

    if (icons.length === 1) {
      const ic = icons[0];
      if (ic.type === 'dpad') drawCanvasDpad(ctx, midX, iconY, ic.dir, iconSize);
      else drawCanvasStick(ctx, midX, iconY, ic.dir, ic.intensity, iconSize);
    } else if (icons.length >= 2) {
      const spacing = iconSize + 4;
      const startX = midX - ((icons.length - 1) * spacing / 2);
      icons.forEach((ic, iIdx) => {
        const thisX = startX + iIdx * spacing;
        if (ic.type === 'dpad') drawCanvasDpad(ctx, thisX, iconY, ic.dir, iconSize);
        else drawCanvasStick(ctx, thisX, iconY, ic.dir, ic.intensity, iconSize);
      });
    }

    // Modifier Text Pill
    const isNatural = !n.pdfMod || n.pdfMod === 'NATURAL';
    const pillText = isNatural ? 'Natural' : n.pdfMod;
    ctx.font = '800 9px Inter, sans-serif';
    const pillW = Math.min(colW - 16, ctx.measureText(pillText).width + 12);
    const pillH = 15;
    const pillY = cy + 88;

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
      ctx.font = '700 9px Inter, sans-serif';
      const durW = ctx.measureText(durText).width + 10;
      const durY = cy + 106;
      const durH = 14;

      ctx.fillStyle = '#f0f9ff';
      ctx.strokeStyle = '#bae6fd';
      ctx.lineWidth = 1;
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(midX - durW / 2, durY, durW, durH, 999);
      else ctx.rect(midX - durW / 2, durY, durW, durH);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#0369a1';
      ctx.textAlign = 'center';
      ctx.fillText(durText, midX, durY + 10.5);
    }

    // Pitch Strip
    const pitchH = 24;
    const pitchY = cy + cardH - pitchH;
    ctx.fillStyle = '#f8fafc';
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    ctx.beginPath();
    if (ctx.roundRect) ctx.roundRect(cx, pitchY, colW, pitchH, [0, 0, 9, 9]);
    else ctx.rect(cx, pitchY, colW, pitchH);
    ctx.fill();
    ctx.stroke();

    ctx.font = '800 13px Inter, sans-serif';
    ctx.fillStyle = '#0f172a';
    ctx.textAlign = 'center';
    ctx.fillText(n.pitch, midX, pitchY + 16.5);
  });

  return canvas;
}

async function exportPDF() {
  const count = recordedEvents.length;
  if (count === 0) return;

  const btn = document.getElementById('btn-export-pdf');
  const origText = btn ? btn.innerHTML : "📄 Download PDF";
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = `⏳ Preparing...`;
  }

  if (document.fonts && document.fonts.ready) {
    await document.fonts.ready;
  }
  await new Promise(r => setTimeout(r, 20));

  try {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "letter",
      compress: false
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
        pagesData.push(recordedEvents.slice(offset, offset + 24));
        offset += 24;
      }
    }

    const totalPages = pagesData.length;
    const lastEv = recordedEvents[count - 1];
    const totalTime = (lastEv.startTime + lastEv.duration).toFixed(1);

    for (let i = 0; i < totalPages; i++) {
      if (btn) btn.innerHTML = `⏳ Page ${i + 1}/${totalPages}...`;
      await new Promise(r => setTimeout(r, 12));

      const pageCanvas = renderPageToCanvas(pagesData[i], i + 1, totalPages, count, totalTime);
      const imgData = pageCanvas.toDataURL("image/jpeg", 0.94);

      pageCanvas.width = 0;
      pageCanvas.height = 0;

      if (i > 0) pdf.addPage("letter", "portrait");
      pdf.addImage(imgData, 'JPEG', 0, 0, pageWidth, pageHeight, undefined, 'FAST');
    }

    if (btn) btn.innerHTML = `⏳ Saving...`;
    await new Promise(r => setTimeout(r, 20));
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

def update_style_css():
    if not os.path.exists(STYLE_FILE):
        return

    with open(STYLE_FILE, 'r', encoding='utf-8') as f:
        content = f.read()

    normalized = content.replace("\r\n", "\n")
    normalized = normalized.replace("min-height: 52px;", "min-height: 66px;")

    with open(STYLE_FILE, 'w', encoding='utf-8', newline='\n') as f:
        f.write(normalized)

    print("✓ style.css: Adjusted .print-mod-area min-height to 66px for 38px modifier icons.")

def update_app_js():
    if not os.path.exists(APP_FILE):
        return

    with open(APP_FILE, 'r', encoding='utf-8') as f:
        content = f.read()

    normalized = content.replace("\r\n", "\n")

    # Sync interactive sheet music card icons to match badge size
    normalized = normalized.replace(
        "let iconPx = count <= 6 ? 32 : count <= 12 ? 28 : 24;",
        "let iconPx = count <= 6 ? 40 : count <= 12 ? 34 : 30;"
    )

    # Substring replacement for Module 8
    start_tag = "function renderPrintableHTMLSheet()"
    end_tag = "function printSheet()"

    start_idx = normalized.find(start_tag)
    end_idx = normalized.find(end_tag)

    if start_idx != -1 and end_idx != -1:
        prefix = normalized[:start_idx]
        suffix = normalized[end_idx:]
        updated_content = prefix + NEW_MODULE_8 + "\n" + suffix
        with open(APP_FILE, 'w', encoding='utf-8', newline='\n') as f:
            f.write(updated_content)
        print("✓ app.js: Scaled stick and d-pad icons to 38px matching button icons in both Canvas and HTML sheets.")
    else:
        print(f"Error locating Module 8 boundaries in app.js: start_idx={start_idx}, end_idx={end_idx}")

def get_next_version(content):
    match = re.search(r'v(\d+\.\d+)', content)
    if match:
        curr = float(match.group(1))
        next_ver = curr + 0.01
        return f"v{next_ver:.2f}"
    return "v1.04"

def update_html_files():
    base_html = HTML_FILES[0]
    new_ver = "v1.04"
    if os.path.exists(base_html):
        with open(base_html, 'r', encoding='utf-8') as f:
            new_ver = get_next_version(f.read())

    for filepath in HTML_FILES:
        if not os.path.exists(filepath):
            continue

        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        normalized = content.replace("\r\n", "\n")

        # 1. Update cache-busting query strings for style.css and app.js
        normalized = re.sub(r'href="style\.css(\?v=[^"]*)?"', f'href="style.css?v={new_ver}"', normalized)
        normalized = re.sub(r'src="app\.js(\?v=[^"]*)?"', f'src="app.js?v={new_ver}"', normalized)

        # 2. Update modal title badge
        cleaned_title = re.sub(r'<span id="modal-app-version"[^>]*>[^<]*</span>', '', normalized)
        normalized = re.sub(
            r'(<div class="modal-title">[\s\S]*?<span>📜</span>\s*Tablature Preview)([\s\S]*?)(</div>)',
            f'\\1 <span id="modal-app-version" class="panel-meta-badge" style="color:#facc15; border-color:#ca8a04; margin-left:6px;">{new_ver}</span>\\3',
            cleaned_title
        )

        # 3. Update footer version tag
        if '<span id="app-version">' in normalized:
            normalized = re.sub(r'<span id="app-version">[^<]*</span>', f'<span id="app-version">{new_ver}</span>', normalized)
        else:
            footer_badge = f'\n  <footer style="text-align:center; font-size:11px; color:#64748b; padding:8px 0 16px; font-family:monospace; user-select:none;"><span id="app-version">{new_ver}</span></footer>\n'
            normalized = normalized.replace("</body>", footer_badge + "</body>")

        with open(filepath, 'w', encoding='utf-8', newline='\n') as f:
            f.write(normalized)

        print(f"✓ {os.path.basename(filepath)}: Updated to {new_ver} with cache-busting and visible badges.")

    return new_ver

if __name__ == "__main__":
    update_style_css()
    update_app_js()
    final_ver = update_html_files()
    print(f"\nSuccessfully migrated project to {final_ver}!")