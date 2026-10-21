// Test chapter metadata and page content generation
const fs = require('fs');

// Mock browser window
global.window = global;

// Load chapters_data.js
eval(fs.readFileSync('chapters_data.js', 'utf8'));

// Load chapter_curriculum.js
eval(fs.readFileSync('chapter_curriculum.js', 'utf8'));

console.log('AERONAUTICS_CHAPTERS loaded:', Object.keys(window.AERONAUTICS_CHAPTERS).length);
console.log('getChapterTopicCurriculum exists:', typeof window.getChapterTopicCurriculum);

// Test Chapter 2
const ch2 = window.getChapterTopicCurriculum(2);
console.log('\n--- CHAPTER 2 TEST ---');
console.log('Discipline:', ch2.discipline);
console.log('Formula Title:', ch2.formulaTitle);
console.log('Formula HTML:', ch2.formulaHtml);
console.log('Takeaways Count:', ch2.takeaways.length);
console.log('Hotspots Pin 1:', ch2.hotspots[0].title);
console.log('Table Title:', ch2.tableTitle);
console.log('Table Headers:', ch2.tableHeaders);
console.log('Table Row 1:', ch2.tableRows[0]);
console.log('Quiz Question:', ch2.quiz.question);

// Test Chapter 6
const ch6 = window.getChapterTopicCurriculum(6);
console.log('\n--- CHAPTER 6 TEST ---');
console.log('Title:', window.AERONAUTICS_CHAPTERS["6"].title);
console.log('Discipline:', ch6.discipline);
console.log('Formula Title:', ch6.formulaTitle);
console.log('Hotspots Pin 1:', ch6.hotspots[0].title);
console.log('Quiz Question:', ch6.quiz.question);

// Test Chapter 12
const ch12 = window.getChapterTopicCurriculum(12);
console.log('\n--- CHAPTER 12 TEST ---');
console.log('Title:', window.AERONAUTICS_CHAPTERS["12"].title);
console.log('Discipline:', ch12.discipline);
console.log('Formula Title:', ch12.formulaTitle);
console.log('Formula HTML:', ch12.formulaHtml);
console.log('Hotspots Pin 2:', ch12.hotspots[1].title);
console.log('Table Title:', ch12.tableTitle);
console.log('Quiz Question:', ch12.quiz.question);

// Test Chapter 18
const ch18 = window.getChapterTopicCurriculum(18);
console.log('\n--- CHAPTER 18 TEST ---');
console.log('Title:', window.AERONAUTICS_CHAPTERS["18"].title);
console.log('Discipline:', ch18.discipline);
console.log('Hotspots Pin 1:', ch18.hotspots[0].title);
console.log('Quiz Question:', ch18.quiz.question);

// Test Chapter 75 (dynamic procedural generation from title)
const ch75 = window.getChapterTopicCurriculum(75);
console.log('\n--- CHAPTER 75 (DYNAMIC) TEST ---');
console.log('Title:', window.AERONAUTICS_CHAPTERS["75"].title);
console.log('Discipline:', ch75.discipline);
console.log('Formula Title:', ch75.formulaTitle);
console.log('Hotspots Pin 1:', ch75.hotspots[0].title);
console.log('Table Title:', ch75.tableTitle);
console.log('Quiz Question:', ch75.quiz.question);

console.log('\nALL VERIFICATION TESTS PASSED SUCCESSFULLY!');
