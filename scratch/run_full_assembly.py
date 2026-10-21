# -*- coding: utf-8 -*-
"""
Full Assembly Script:
Inserts the diagrams module and interactives module into script.js,
updates renderEbookPage hooks, and appends interactive CSS to style.css.
"""

import sys
from diagrams_module import get_diagrams_js
from interactives_module import get_interactives_js

def assemble():
    print("Reading script.js...")
    with open('script.js', 'r', encoding='utf-8') as f:
        js = f.read()

    # 1. Replace Diagram functions
    # Find start of renderDiagram1
    diag_start = js.find('function renderDiagram1(meta) {')
    if diag_start == -1:
        print("ERROR: renderDiagram1 not found")
        sys.exit(1)

    # Find start of diagramsModalState
    diag_end = js.find('let diagramsModalState = {')
    if diag_end == -1:
        print("ERROR: diagramsModalState not found")
        sys.exit(1)

    new_diagrams = get_diagrams_js().strip() + '\n\n  '
    js = js[:diag_start] + new_diagrams + js[diag_end:]
    print("Replaced diagrams section successfully.")

    # 2. Replace generatePageContent & page interactives
    # Find start of generatePageContent
    gen_start = js.find('function generatePageContent(meta, pageNum) {')
    if gen_start == -1:
        print("ERROR: generatePageContent not found")
        sys.exit(1)

    # Find start of initPage6Quiz
    gen_end = js.find('function initPage6Quiz(meta) {')
    if gen_end == -1:
        print("ERROR: initPage6Quiz not found")
        sys.exit(1)

    new_interactives = get_interactives_js().strip() + '\n\n  '
    js = js[:gen_start] + new_interactives + js[gen_end:]
    print("Replaced generatePageContent and interactives successfully.")

    # 3. Update renderEbookPage interactive initialization
    old_init = r'''    // Initialize Interactive Sub-Engines
    if (pg === 2) {
      initSimulationEngine(meta);
    } else if (pg === 3) {
      initPage3Interactions(meta);
    } else if (pg === 5) {
      const btnAdvance = document.getElementById('btnGoToQuiz');
      if (btnAdvance) {
        btnAdvance.addEventListener('click', () => {
          playClickSound();
          readerState.currentPage = 6;
          renderEbookPage();
          if (ebookPageContainer) {
            try {
              if (typeof ebookPageContainer.scrollTo === 'function') {
                ebookPageContainer.scrollTo({ top: 0, behavior: 'smooth' });
              } else {
                ebookPageContainer.scrollTop = 0;
              }
            } catch (e) {
              ebookPageContainer.scrollTop = 0;
            }
          }
        });
      }
    } else if (pg === 6) {
      initPage6Quiz(meta);
    }'''

    new_init = r'''    // Initialize Interactive Sub-Engines
    if (pg === 1) {
      initPage1Interactions(meta);
    } else if (pg === 2) {
      initSimulationEngine(meta);
    } else if (pg === 3) {
      initPage3Interactions(meta);
    } else if (pg === 4) {
      initPage4Interactions(meta);
    } else if (pg === 5) {
      initPage5Interactions(meta);
    } else if (pg === 6) {
      initPage6Quiz(meta);
    }'''

    if old_init in js:
        js = js.replace(old_init, new_init, 1)
        print("Updated renderEbookPage sub-engines successfully.")
    else:
        print("WARNING: Exact match for old_init in renderEbookPage not found, performing regex/loose match...")
        import re
        pat = r'// Initialize Interactive Sub-Engines[\s\S]*?else if \(pg === 6\)\s*\{\s*initPage6Quiz\(meta\);\s*\}'
        js, count = re.subn(pat, new_init, js, count=1)
        print(f"Loose match replacements: {count}")

    # Write patched script.js
    with open('script.js', 'w', encoding='utf-8') as f:
        f.write(js)
    print("script.js written.")

    # 4. Append CSS
    css_to_append = r'''
/* =========================================================
   PAGE 1, 4, 5 DYNAMIC INTERACTIVE CONTROLS & DIAGRAM HOOKS
========================================================= */
.interactive-vector-tuner-card,
.interactive-sortie-explorer-card,
.interactive-failover-card {
  margin: 1.25rem 0;
  padding: 1.25rem;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(0, 240, 255, 0.25);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}

[data-theme="light"] .interactive-vector-tuner-card,
[data-theme="light"] .interactive-sortie-explorer-card,
[data-theme="light"] .interactive-failover-card {
  background: rgba(255, 255, 255, 0.9);
  border-color: rgba(0, 102, 214, 0.25);
  box-shadow: 0 8px 24px rgba(0, 102, 214, 0.1);
}

.tuner-header, .sortie-header, .failover-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tuner-title, .sortie-title, .failover-title {
  font-family: 'Outfit', sans-serif;
  font-size: 0.85rem;
  font-weight: 700;
  color: #00f0ff;
  letter-spacing: 0.06em;
  display: flex;
  align-items: center;
  gap: 8px;
}

[data-theme="light"] .tuner-title,
[data-theme="light"] .sortie-title,
[data-theme="light"] .failover-title {
  color: #0066d6;
}

.tuner-badge, .sortie-badge, .failover-badge {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.68rem;
  padding: 3px 8px;
  border-radius: 4px;
  background: rgba(0, 240, 255, 0.15);
  color: #00f0ff;
  border: 1px solid rgba(0, 240, 255, 0.3);
}

.sortie-selector-row {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.sortie-pill-btn {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: var(--text-primary);
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.sortie-pill-btn:hover {
  background: rgba(0, 240, 255, 0.12);
  border-color: rgba(0, 240, 255, 0.4);
}

.sortie-pill-btn.active {
  background: rgba(0, 240, 255, 0.25);
  border-color: #00f0ff;
  color: #00f0ff;
  box-shadow: 0 0 12px rgba(0, 240, 255, 0.3);
  font-weight: bold;
}

#aeroDataTable tbody tr.selected-row {
  background: rgba(0, 240, 255, 0.14) !important;
  border-left: 3px solid #00f0ff;
}

.failover-btn-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 10px;
  margin-bottom: 1rem;
}

.failover-action-btn {
  border-radius: 6px;
  cursor: pointer;
  padding: 10px 14px;
  font-family: 'Outfit', sans-serif;
  font-size: 0.78rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s ease;
}

.failover-action-btn:hover {
  transform: translateY(-1px);
  filter: brightness(1.2);
}

.failover-action-btn.btn-fail-lane {
  border: 1px solid rgba(244, 63, 94, 0.5);
  background: rgba(244, 63, 94, 0.15);
  color: #f43f5e;
}

.failover-action-btn.btn-fail-hyd {
  border: 1px solid rgba(255, 183, 0, 0.5);
  background: rgba(255, 183, 0, 0.15);
  color: #ffb700;
}

.failover-action-btn.btn-fail-bus {
  border: 1px solid rgba(168, 85, 247, 0.5);
  background: rgba(168, 85, 247, 0.15);
  color: #c084fc;
}

.failover-action-btn.btn-reset-sys {
  border: 1px solid rgba(0, 255, 157, 0.5);
  background: rgba(0, 255, 157, 0.15);
  color: #00ff9d;
}

.failover-status-console {
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 10px 14px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.fsc-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.fsc-log {
  color: #00ff9d;
  font-size: 0.72rem;
  line-height: 1.4;
  padding-top: 6px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}
'''

    with open('style.css', 'r', encoding='utf-8') as f:
        css = f.read()

    if '.interactive-vector-tuner-card' not in css:
        with open('style.css', 'a', encoding='utf-8') as f:
            f.write(css_to_append)
        print("style.css appended with interactive styling.")
    else:
        print("style.css already contains interactive styling.")

if __name__ == '__main__':
    assemble()
