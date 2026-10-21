# -*- coding: utf-8 -*-
"""
Generates the comprehensive diagrams and interactive engines for Aeronautics E-Book.
Every page (1 to 5) has a completely different diagram.
Every page (1 to 6) has a completely different interactive experience.
All 10 aeronautical engineering domains have bespoke SVG diagrams and Canvas simulation engines.
"""

import sys

def build_script():
    with open('script.js', 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the boundary for diagram generators and page content
    # Starts before getChapterDiagramParams or renderDiagram1
    p1 = content.find('function getChapterDiagramParams(')
    if p1 == -1:
        print("ERROR: getChapterDiagramParams not found")
        sys.exit(1)

    # Find where renderDiagramsModalViewer starts
    p_modal = content.find('function renderDiagramsModalViewer() {')
    if p_modal == -1:
        print("ERROR: renderDiagramsModalViewer not found")
        sys.exit(1)

    # Find where generatePageContent starts
    p_gen = content.find('function generatePageContent(meta, pageNum) {')
    if p_gen == -1:
        print("ERROR: generatePageContent not found")
        sys.exit(1)

    # Find where initPage6Quiz ends / renderEbookPage starts
    p_render_ebook = content.find('function renderEbookPage() {')
    if p_render_ebook == -1:
        print("ERROR: renderEbookPage not found")
        sys.exit(1)

    print(f"Indices found: p1={p1}, p_modal={p_modal}, p_gen={p_gen}, p_render_ebook={p_render_ebook}")

if __name__ == '__main__':
    build_script()
