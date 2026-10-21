# -*- coding: utf-8 -*-
import sys
from apply_comprehensive_interactives import get_enhanced_interactives

with open('script.js', 'r', encoding='utf-8') as f:
    text = f.read()

p1 = text.find('function generatePageContent(meta, pageNum) {')
p2 = text.find('function initPage3Interactions(meta) {')

if p1 == -1 or p2 == -1:
    print("ERROR: markers not found")
    sys.exit(1)

new_code = get_enhanced_interactives().strip() + '\n\n  '
patched = text[:p1] + new_code + text[p2:]

with open('script.js', 'w', encoding='utf-8') as f:
    f.write(patched)

print("Enhanced interactives merged successfully into script.js!")
