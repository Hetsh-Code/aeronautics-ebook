// Test generatePageContent for Chapter 2 and Chapter 12
const fs = require('fs');

global.window = global;
global.document = {
  querySelectorAll: () => [],
  getElementById: () => null,
  addEventListener: () => {}
};

eval(fs.readFileSync('chapters_data.js', 'utf8'));
eval(fs.readFileSync('chapter_curriculum.js', 'utf8'));

// Mock reader state and functions needed by generatePageContent
const readerState = {
  currentChapter: 2,
  currentPage: 1,
  readChapters: new Set(),
  quizAnswers: {}
};

function getChapterDiagramParams(ch, diag) {
  return {
    n: ch,
    specCode: `AER-${String(ch).padStart(4, '0')}-D${diag}`,
    dinCode: `DIN EN ${2000 + ch}`,
    reynoldsNum: '6.85 × 10⁶',
    machNum: 'M 0.78',
    stressMpa: '280 MPa',
    camberOffset: 5,
    thicknessOffset: 0,
    sparOffset: 10,
    aoa: '4.2°',
    airflowCfs: '4,200 CFM',
    stationTemp: '1,450',
    pressureRatio: '28.5:1',
    wingSpan: '17.5 m',
    tolerance: '±0.05 mm'
  };
}

function getTechDefs(id, c) {
  return `<defs id="${id}"></defs>`;
}

// Extract getChapterMetadata and generatePageContent from script.js
const scriptCode = fs.readFileSync('script.js', 'utf8');

// We can run a small regex check or mock getChapterMetadata
const rawTitle = window.AERONAUTICS_CHAPTERS["2"].title;
const partTitle = window.AERONAUTICS_CHAPTERS["2"].part;
const topic = window.getChapterTopicCurriculum(2, { title: rawTitle, part: partTitle });

const meta = {
  num: 2,
  title: rawTitle,
  part: partTitle,
  partNum: 1,
  discipline: topic.discipline,
  chipColor: topic.chipColor,
  icon: topic.icon,
  assetImg: topic.assetImg,
  simType: topic.simType,
  overviewHtml: topic.overviewHtml,
  formulaTitle: topic.formulaTitle,
  formulaHtml: topic.formulaHtml,
  formulaDesc: topic.formulaDesc,
  takeaways: topic.takeaways,
  simDescription: topic.simDescription,
  flowDescription: topic.flowDescription,
  hotspotDescription: topic.hotspotDescription,
  hotspotPins: topic.hotspots,
  calcTitle: topic.calcTitle,
  calcDesc: topic.calcDesc,
  calcParam1: topic.calcParam1,
  calcParam2: topic.calcParam2,
  tableTitle: topic.tableTitle,
  tableIntro: topic.tableIntro,
  tableHeaders: topic.tableHeaders,
  tableRows: topic.tableRows,
  envelopeIntro: topic.envelopeIntro,
  integrationIntro: topic.integrationIntro,
  redundancyCards: topic.redundancyCards,
  quiz: topic.quiz
};

console.log('--- CHAPTER 2 PAGE 1 INSPECTION ---');
console.log('Contains Cayley:', meta.overviewHtml.includes('Cayley'));
console.log('Contains Lilienthal:', meta.overviewHtml.includes('Lilienthal'));
console.log('Contains Wright Flyer:', meta.overviewHtml.includes('Wright Flyer'));
console.log('Contains Kill Devil Hills:', meta.overviewHtml.includes('Kill Devil Hills'));
console.log('Formula title:', meta.formulaTitle);

console.log('\n--- CHAPTER 2 PAGE 3 HOTSPOTS INSPECTION ---');
meta.hotspotPins.forEach(pin => {
  console.log(`Pin ${pin.id}: ${pin.title} | ${pin.spec} | ${pin.stress}`);
});

console.log('\n--- CHAPTER 2 PAGE 4 TABLE INSPECTION ---');
console.log('Table title:', meta.tableTitle);
meta.tableRows.forEach(row => {
  console.log(`Row: ${row[0]} | ${row[1]} | ${row[2]} | ${row[3]} | ${row[4]}`);
});

console.log('\n--- CHAPTER 2 PAGE 5 REDUNDANCY CARDS ---');
meta.redundancyCards.forEach(c => {
  console.log(`${c.title}: ${c.desc}`);
});

console.log('\n--- CHAPTER 2 PAGE 6 QUIZ ---');
console.log('Question:', meta.quiz.question);
console.log('Correct Answer:', meta.quiz.options[meta.quiz.correctIndex]);
console.log('Rationale:', meta.quiz.rationale);
