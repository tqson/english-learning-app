// Check authentication
const currentUser = JSON.parse(localStorage.getItem('currentUser'));
if (!currentUser) {
    window.location.href = 'login.html';
}

// Display user name
document.getElementById('userName').textContent = currentUser.name;

// Load vocabulary data
let vocabularyData = JSON.parse(localStorage.getItem('vocabularyData'));
if (!vocabularyData) {
    // Initialize with default data if none exists
    fetch('../data/vocabulary.json')
        .then(response => response.json())
        .then(data => {
            vocabularyData = data;
            localStorage.setItem('vocabularyData', JSON.stringify(data));
            renderDashboard();
        });
} else {
    renderDashboard();
}

function renderDashboard() {
    renderTopicsList();
    renderVocabularyTables();
}

function renderTopicsList() {
    const topicsListElement = document.getElementById('topicsList');
    topicsListElement.innerHTML = vocabularyData.topics.map(topic => `
        <div class="topic-card" onclick="scrollToTopic('topic-${topic.id}')">
            <h5>${topic.topic}</h5>
            <small>${topic.words.length} words</small>
        </div>
    `).join('');
}

// function functionName() {
//     console.log('Xu ly logic')
// }

// functionName();

function renderVocabularyTables() {
    const tablesContainer = document.getElementById('vocabularyTables');
    tablesContainer.innerHTML = vocabularyData.topics.map(topic => `
        <div id="topic-${topic.id}" class="vocabulary-table">
            <h3>${topic.topic}</h3>
            <table class="table table-bordered table-fixed">
                <colgroup>
                    <col style="width: 10%">
                    <col style="width: 20%">
                    <col style="width: 25%">
                    <col style="width: 30%">
                    <col>
                </colgroup>
                <thead>
                    <tr>
                        <th>Word</th>
                        <th>Pronunciation</th>
                        <th>Meaning</th>
                        <th>Example</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${renderWordsRows(topic.words)}
                </tbody>
            </table>
        </div>
    `).join('');
}

function renderWordsRows(words) {
    return words.map(word => `
        <tr>
            <td >${word.word}</td>
            <td>${word.pronunciation}</td>
            <td>${word.meaning}</td>
            <td>${word.example}</td>
            <td class="action-buttons">
                <button class="btn btn-sm btn-primary" onclick="editWord(${word.id})">Edit</button>
                <button class="btn btn-sm btn-danger" onclick="deleteWord(${word.id})">Delete</button>
            </td>
        </tr>
    `).join('');
}

function scrollToTopic(topicId) {
    document.getElementById(topicId).scrollIntoView({ behavior: 'smooth' });
}

function editWord(wordId) {
    // Implement edit functionality
}

function deleteWord(wordId) {
    if (confirm('Are you sure you want to delete this word?')) {
        // Find and delete the word
        vocabularyData.topics.forEach(topic => {
            topic.words = topic.words.filter(word => word.id !== wordId);
        });

        // Save to localStorage
        localStorage.setItem('vocabularyData', JSON.stringify(vocabularyData));

        // Refresh the display
        renderDashboard();
    }
}

function logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('vocabularyData');
    window.location.href = 'login.html';
}

const arrayNumber = [1, 2, 3, 4, 5];

let sum = 0;

for (let i = 0; i < arrayNumber.length; i++) {
    sum = sum + arrayNumber[i];
}

arrayNumber.forEach((item, index) => {
    sum = sum + item;
    console.log('index', index)
    console.log('item', item)
})

const mapResult = arrayNumber.map((item, index) => {
    return "gia tri moi khong lien quan den gia tri cu";
})

const filterResult = arrayNumber.filter((item, index) => {
    return item > 2; // điều kiện để phần tử trong mảng cũ xuất hiện trong mảng mới
})

console.log('filterResult', filterResult);
console.log('mapResult', mapResult);

console.log(arrayNumber)
console.log(sum)