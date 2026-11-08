import os

ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
STYLE_FILE = os.path.join(ROOT_DIR, "style.css")
APP_FILE = os.path.join(ROOT_DIR, "app.js")

# 1. Update style.css
STYLE_OLD = """.print-badge {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 18px;
  color: #ffffff;
  box-shadow: 0 2px 6px rgba(0,0,0,0.22);
  margin-top: 4px;
}
.print-mod-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  width: 100%;
  min-height: 42px;
}"""

STYLE_NEW = """.print-badge {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 18px;
  color: #ffffff;
  box-shadow: 0 2px 6px rgba(0,0,0,0.22);
  margin-top: 4px;
}
/* Shoulder Bumper Styling for L & R Buttons */
.print-badge.shoulder-l,
.badge-icon.shoulder-l {
  width: 48px !important;
  height: 30px !important;
  border-radius: 16px 5px 6px 6px !important;
  border-top: 2px solid rgba(255, 255, 255, 0.45);
  box-shadow: 0 2px 6px rgba(0,0,0,0.3), inset 0 -2px 4px rgba(0,0,0,0.2) !important;
}
.print-badge.shoulder-r,
.badge-icon.shoulder-r {
  width: 48px !important;
  height: 30px !important;
  border-radius: 5px 16px 6px 6px !important;
  border-top: 2px solid rgba(255, 255, 255, 0.45);
  box-shadow: 0 2px 6px rgba(0,0,0,0.3), inset 0 -2px 4px rgba(0,0,0,0.2) !important;
}
.print-mod-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  width: 100%;
  min-height: 52px;
}"""

# 2. Update app.js
APP_SHEET_OLD = """let iconPx = count <= 6 ? 26 : count <= 12 ? 22 : 18;
  let cardMinW = count <= 6 ? 112 : count <= 12 ? 98 : 84;
  let badgePx = count <= 6 ? 40 : count <= 12 ? 34 : 30;
  let badgeFont = count <= 6 ? 17 : count <= 12 ? 15 : 14;
  let pitchFont = count <= 6 ? 13 : 11.5;

  container.innerHTML = "";
  recordedEvents.forEach((n, idx) => {
    const card = document.createElement('div');
    card.className = `note-card ${n.isRest ? 'rest-card' : ''}`;
    card.style.minWidth = `${cardMinW}px`;
    card.style.padding = count <= 6 ? "12px 10px" : "8px 6px";
    card.onclick = () => auditionCard(idx);

    const bg = n.isRest ? "#334155" : (BASE_PITCHES[n.button]?.color || "#334155");
    const icons = buildModifierIconsHtml(n, iconPx);
    const iconRow = icons.length > 0
      ? `<div class="combo-icon-row" style="min-height:${iconPx}px;">${icons.join('')}</div>`
      : `<div style="min-height:${iconPx}px;"></div>`;

    const badgeSymbol = n.isRest ? "⏸" : n.button;

    card.innerHTML = `
      <div class="card-delete-btn" title="Remove note" onclick="event.stopPropagation(); deleteCard(${idx});">✕</div>
      <div class="badge-icon" style="background:${bg}; width:${badgePx}px; height:${badgePx}px; font-size:${badgeFont}px;">${badgeSymbol}</div>"""

APP_SHEET_NEW = """let iconPx = count <= 6 ? 32 : count <= 12 ? 28 : 24;
  let cardMinW = count <= 6 ? 112 : count <= 12 ? 98 : 84;
  let badgePx = count <= 6 ? 40 : count <= 12 ? 34 : 30;
  let badgeFont = count <= 6 ? 17 : count <= 12 ? 15 : 14;
  let pitchFont = count <= 6 ? 13 : 11.5;

  container.innerHTML = "";
  recordedEvents.forEach((n, idx) => {
    const card = document.createElement('div');
    card.className = `note-card ${n.isRest ? 'rest-card' : ''}`;
    card.style.minWidth = `${cardMinW}px`;
    card.style.padding = count <= 6 ? "12px 10px" : "8px 6px";
    card.onclick = () => auditionCard(idx);

    const bg = n.isRest ? "#334155" : (BASE_PITCHES[n.button]?.color || "#334155");
    const icons = buildModifierIconsHtml(n, iconPx);
    const iconRow = icons.length > 0
      ? `<div class="combo-icon-row" style="min-height:${iconPx}px;">${icons.join('')}</div>`
      : `<div style="min-height:${iconPx}px;"></div>`;

    const badgeSymbol = n.isRest ? "⏸" : n.button;
    const shoulderClass = (n.button === 'L' || n.button === 'R') ? `shoulder-${n.button.toLowerCase()}` : '';

    card.innerHTML = `
      <div class="card-delete-btn" title="Remove note" onclick="event.stopPropagation(); deleteCard(${idx});">✕</div>
      <div class="badge-icon ${shoulderClass}" style="background:${bg}; width:${badgePx}px; height:${badgePx}px; font-size:${badgeFont}px;">${badgeSymbol}</div>"""

APP_PRINT_OLD = """let tierClass = '';
  let iconPx = 20;
  if (count <= 6) { tierClass = 'tier-xl'; iconPx = 30; }
  else if (count <= 12) { tierClass = 'tier-lg'; iconPx = 24; }

  container.innerHTML = "";

  pagesData.forEach((pageNotes, pageIdx) => {
    const pageNum = pageIdx + 1;
    const isFirstPage = pageNum === 1;
    const globalOffset = isFirstPage ? 0 : 20 + (pageIdx - 1) * 25;

    const cardsHtml = pageNotes.map((n, idxOnPage) => {
      const globalIdx = globalOffset + idxOnPage;
      const rgb = n.isRest ? [71, 85, 105] : (BASE_PITCHES[n.button]?.hex || [100, 116, 139]);
      const badgeColor = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
      const icons = buildModifierIconsHtml(n, iconPx);
      const isNatural = !n.pdfMod || n.pdfMod === "NATURAL";
      const badgeSymbol = n.isRest ? "⏸" : n.button;

      return `
        <div class="print-card ${n.isRest ? 'rest-card' : ''}">
          <span class="print-card-step">#${globalIdx + 1}</span>
          <div class="print-badge" style="background:${badgeColor};">${badgeSymbol}</div>"""

APP_PRINT_NEW = """let tierClass = '';
  let iconPx = 32;
  if (count <= 6) { tierClass = 'tier-xl'; iconPx = 42; }
  else if (count <= 12) { tierClass = 'tier-lg'; iconPx = 36; }

  container.innerHTML = "";

  pagesData.forEach((pageNotes, pageIdx) => {
    const pageNum = pageIdx + 1;
    const isFirstPage = pageNum === 1;
    const globalOffset = isFirstPage ? 0 : 20 + (pageIdx - 1) * 25;

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
          <div class="print-badge ${shoulderClass}" style="background:${badgeColor};">${badgeSymbol}</div>"""

def patch_file(filepath, replacements):
    if not os.path.exists(filepath):
        print(f"Error: Could not find {filepath}")
        return
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Normalize CRLF/LF line endings for reliable matching
    normalized = content.replace("\r\n", "\n")
    changes = 0

    for old, new in replacements:
        norm_old = old.replace("\r\n", "\n")
        norm_new = new.replace("\r\n", "\n")
        if norm_old in normalized:
            normalized = normalized.replace(norm_old, norm_new, 1)
            changes += 1

    if changes > 0:
        with open(filepath, 'w', encoding='utf-8', newline='\n') as f:
            f.write(normalized)
        print(f"Successfully applied {changes} patch(es) to {os.path.basename(filepath)}")
    else:
        print(f"No match found for {os.path.basename(filepath)} (it may already be patched).")

if __name__ == "__main__":
    patch_file(STYLE_FILE, [(STYLE_OLD, STYLE_NEW)])
    patch_file(APP_FILE, [(APP_SHEET_OLD, APP_SHEET_NEW), (APP_PRINT_OLD, APP_PRINT_NEW)])