# -*- coding: utf-8 -*-
"""
Unifies generatePageContent, getDomainTunerConfig, initPage1Interactions,
initSimulationEngine (10 engines), initPage3Interactions, initPage4Interactions,
initPage5Interactions into a complete, bulletproof block.
"""

from interactives_module import get_interactives_js
from apply_comprehensive_interactives import get_enhanced_interactives

# Extract generatePageContent, initPage3, initPage4, initPage5 from interactives_module
inter_raw = get_interactives_js()
enh_raw = get_enhanced_interactives()

# In inter_raw:
# generatePageContent is from start to "function initPage1Interactions"
p_gen_start = inter_raw.find('function generatePageContent(meta, pageNum) {')
p_gen_end = inter_raw.find('function initPage1Interactions(meta) {')
generate_page_content_code = inter_raw[p_gen_start:p_gen_end].strip()

# initPage3, initPage4, initPage5 from inter_raw
p_p3_start = inter_raw.find('function initPage3Interactions(meta) {')
page3_to_5_code = inter_raw[p_p3_start:].strip()

# From enh_raw, get getDomainTunerConfig, initPage1Interactions, initSimulationEngine
enhanced_p1_and_sim = enh_raw.strip()

combined_code = f"""
  // =========================================================
  // PAGE CONTENT GENERATION (DISTINCT DIAGRAMS & INTERACTIVES ON ALL PAGES)
  // =========================================================
  {generate_page_content_code}

  window.generatePageContent = generatePageContent;

  {enhanced_p1_and_sim}

  {page3_to_5_code}
"""

with open('script.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Remove accidental duplicate export if present
js = js.replace('  window.generatePageContent = generatePageContent;\n', '')

# Find insertion boundaries
# After initDiagramsModalEvents
p_start = js.find('// =========================================================\n  // DOMAIN-AWARE PARAMETER CONFIGURATOR FOR PAGE 1 TUNER')
if p_start == -1:
    p_start = js.find('// DOMAIN-AWARE PARAMETER CONFIGURATOR FOR PAGE 1 TUNER')
if p_start == -1:
    p_start = js.find('function getDomainTunerConfig')

p_end = js.find('function initPage6Quiz(meta) {')

if p_start == -1 or p_end == -1:
    print(f"ERROR: markers not found (p_start={p_start}, p_end={p_end})")
    import sys
    sys.exit(1)

patched_js = js[:p_start] + combined_code.strip() + '\n\n  ' + js[p_end:]

with open('script.js', 'w', encoding='utf-8') as f:
    f.write(patched_js)

print("Unified interactives successfully patched into script.js!")
