import os
import re

ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
APP_FILE = os.path.join(ROOT_DIR, "app.js")
INDEX_FILES = [
    os.path.join(ROOT_DIR, "index.html"),
    os.path.join(ROOT_DIR, "index_2.html")
]

# 1. Update app.js (Parallelized high-speed exportPDF, remove downloadPNG)
APP_PDF_REPLACEMENT = """/**
 * High-Speed Parallel Multi-Page PDF Exporter
 */
async function exportPDF() {
  if (recordedEvents.length === 0) return;
  const pageEls = Array.from(document.querySelectorAll('.sheet-page'));
  if (!pageEls || pageEls.length === 0) return;

  const btn = document.getElementById('btn-export-pdf');
  const origText = btn ? btn.innerHTML : "📄 Download PDF";
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = `⏳ Generating PDF...`;
  }

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

    // Render all pages in parallel with fast 1.25x scale (~120 DPI, ~60% faster)
    const renderPromises = pageEls.map(pageEl =>
      html2canvas(pageEl, {
        scale: 1.25,
        backgroundColor: "#ffffff",
        useCORS: true,
        logging: false
      })
    );

    const canvases = await Promise.all(renderPromises);

    canvases.forEach((canvas, i) => {
      const imgData = canvas.toDataURL("image/jpeg", 0.85);
      if (i > 0) pdf.addPage("letter", "portrait");
      pdf.addImage(imgData, 'JPEG', 0, 0, pageWidth, pageHeight, undefined, 'FAST');
    });

    pdf.save("ocarina_action_sheet.pdf");
  } catch (err) {
    console.error("PDF Export error:", err);
    alert("PDF generation encountered an error: " + err.message);
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = origText;
    }
  }
}"""

def patch_app_js():
    if not os.path.exists(APP_FILE):
        print(f"Error: {APP_FILE} not found.")
        return

    with open(APP_FILE, 'r', encoding='utf-8') as f:
        content = f.read()

    normalized = content.replace("\r\n", "\n")

    # Replace from exportPDF() down to right before printSheet()
    pattern = r"async function exportPDF\(\)[\s\S]*?(?=function printSheet\(\))"
    if re.search(pattern, normalized):
        normalized = re.sub(pattern, APP_PDF_REPLACEMENT + "\n\n", normalized, count=1)
        with open(APP_FILE, 'w', encoding='utf-8', newline='\n') as f:
            f.write(normalized)
        print("✓ Successfully updated app.js (High-speed parallel PDF exporter enabled).")
    else:
        print("Notice: exportPDF() block pattern not matched in app.js.")

# 2. Update HTML files (Remove PNG button & clean export buttons)
def patch_html_file(filepath):
    if not os.path.exists(filepath):
        return

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    normalized = content.replace("\r\n", "\n")
    changes = 0

    # Clean Preview button text
    old_preview_btn = '👁 View &amp; Export Printable Sheet (PDF / PNG)'
    new_preview_btn = '👁 View &amp; Export Printable Sheet (PDF)'
    if old_preview_btn in normalized:
        normalized = normalized.replace(old_preview_btn, new_preview_btn)
        changes += 1

    # Remove PNG modal button and update Print button label
    old_actions = """        <button id="btn-export-pdf" class="btn-primary" onclick="exportPDF()">
          📄 Export PDF
        </button>
        <button id="btn-export-png" class="btn-success" onclick="downloadPNG()">
          🖼 Download PNG
        </button>
        <button class="btn-secondary" onclick="printSheet()">
          🖨 Print
        </button>"""

    new_actions = """        <button id="btn-export-pdf" class="btn-primary" onclick="exportPDF()">
          📄 Download PDF
        </button>
        <button class="btn-secondary" onclick="printSheet()" title="Instant vector print or save to PDF">
          🖨 Print / Save PDF
        </button>"""

    if old_actions in normalized:
        normalized = normalized.replace(old_actions, new_actions)
        changes += 1

    if changes > 0:
        with open(filepath, 'w', encoding='utf-8', newline='\n') as f:
            f.write(normalized)
        print(f"✓ Successfully updated {os.path.basename(filepath)} (Removed PNG button).")

if __name__ == "__main__":
    patch_app_js()
    for html_file in INDEX_FILES:
        patch_html_file(html_file)