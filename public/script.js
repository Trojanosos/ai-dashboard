// Fetch and process the CSV file
fetch('/data/data.csv')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(data => processCSVData(data))
    .catch(error => {
        console.error('Error loading CSV:', error);
        document.getElementById('companies-container').innerHTML = 
            `<div class="error">Error loading data: ${error.message}</div>`;
    });

function createCard(company, category, data, icon) {
    const card = document.createElement('div');
    card.className = `division-card ${company.toLowerCase()}`;

    const title = document.createElement('div');
    title.className = 'division-title';
    title.innerHTML = `<span class="icon">${icon}</span>${category}`;

    const list = document.createElement('ul');
    list.className = 'projects-list';

    data.forEach(item => {
        const li = document.createElement('li');
        li.className = 'project-item';
        li.innerHTML = `
            <div class="project-name">${item.name}</div>
            <div class="project-desc">${item.description}</div>
        `;
        list.appendChild(li);
    });

    card.appendChild(title);
    card.appendChild(list);
    return card;
}

function processCSVData(csvData) {
    try {
        const rows = csvData.split('\n').map(row => row.trim());
        const headers = rows[0].split(',');
        const companies = {};

        for(let i = 1; i < rows.length; i++) {
            if(!rows[i]) continue; // Skip empty rows
            
            // Split by comma, but preserve commas within quotes
            const row = rows[i].match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g) || rows[i].split(',');
            const company = row[0].replace(/^"|"$/g, '').trim();
            const category = row[1].replace(/^"|"$/g, '').trim();
            const itemName = row[2].replace(/^"|"$/g, '').trim();
            const description = row[3].replace(/^"|"$/g, '').trim();

            if(!companies[company]) {
                companies[company] = {};
            }
            if(!companies[company][category]) {
                companies[company][category] = [];
            }

            companies[company][category].push({
                name: itemName,
                description: description
            });
        }

        const container = document.getElementById('companies-container');
        container.innerHTML = '';

        for(const company in companies) {
            const section = document.createElement('section');
            section.innerHTML = `<h2>${company}</h2>`;
            const grid = document.createElement('div');
            grid.className = 'ai-grid';

            // Company Overview first
            if(companies[company]['Company Overview']) {
                grid.appendChild(createCard(company, 'Company Overview', companies[company]['Company Overview'], 'ℹ️'));
            }

            // Other categories
            for(const category in companies[company]) {
                if(category !== 'Company Overview') {
                    let icon = '💡';
                    if(category.includes('Scientific')) icon = '🧬';
                    if(category.includes('Technology')) icon = '🚀';
                    if(category.includes('Strategic')) icon = '💪';
                    if(category.includes('Portfolio')) icon = '🤖';
                    if(category.includes('Vision')) icon = '🎮';
                    if(category.includes('natural')) icon = '💬';
                    if(category.includes('conversational')) icon = '💭';
                    if(category.includes('reasoning')) icon = '🧠';
                    if(category.includes('analysis')) icon = '📊';
                    if(category.includes('processing')) icon = '⚙️';
                    if(category.includes('generation')) icon = '⚡';
                    if(category.includes('integration')) icon = '🔌';
                    if(category.includes('automated')) icon = '🤖';
                    if(category.includes('real-time')) icon = '⏱️';
                    if(category.includes('multimodal')) icon = '🎯';
                    if(category.includes('customizable')) icon = '⚙️';

                    // Quality & Performance
                    if(category.includes('high-quality')) icon = '✨';
                    if(category.includes('quality')) icon = '✨';
                    if(category.includes('advanced')) icon = '🚀';
                    if(category.includes('professional')) icon = '💼';
                    if(category.includes('exceptional')) icon = '🌟';
                    if(category.includes('excellent')) icon = '🌟';
                    if(category.includes('great')) icon = '🌟';
                    if(category.includes('strong')) icon = '💪';
                    if(category.includes('powerful')) icon = '💪';
                    if(category.includes('robust')) icon = '💪';
                    if(category.includes('extensive')) icon = '📚';
                    if(category.includes('complex')) icon = '🔧';
                    if(category.includes('deep')) icon = '🔍';
                    if(category.includes('smart')) icon = '🧠';
                    if(category.includes('efficient')) icon = '⚡';
                    if(category.includes('fast')) icon = '⚡';
                    if(category.includes('quick')) icon = '⚡';
                    if(category.includes('speed')) icon = '⚡';
                    if(category.includes('responsive')) icon = '⚡';
                    if(category.includes('instant')) icon = '⚡';
                    if(category.includes('performance')) icon = '📈';

                    // Features & Functions
                    if(category.includes('template')) icon = '📋';
                    if(category.includes('interface')) icon = '🖥️';
                    if(category.includes('collaboration')) icon = '👥';
                    if(category.includes('export')) icon = '📤';
                    if(category.includes('import')) icon = '📥';
                    if(category.includes('storage')) icon = '💾';
                    if(category.includes('memory')) icon = '💾';
                    if(category.includes('cloud')) icon = '☁️';
                    if(category.includes('local')) icon = '💻';
                    if(category.includes('deployment')) icon = '🚀';

                    // Content & Media
                    if(category.includes('visual')) icon = '👁️';
                    if(category.includes('image')) icon = '🖼️';
                    if(category.includes('video')) icon = '🎥';
                    if(category.includes('audio')) icon = '🔊';
                    if(category.includes('text')) icon = '📝';
                    if(category.includes('document')) icon = '📄';
                    if(category.includes('content')) icon = '📄';
                    if(category.includes('style')) icon = '🎨';
                    if(category.includes('artistic')) icon = '🎨';
                    if(category.includes('creative')) icon = '🎨';
                    if(category.includes('design')) icon = '🎨';
                    if(category.includes('photorealistic')) icon = '📸';
                    // User Experience
                    if(category.includes('user')) icon = '👤';
                    if(category.includes('friendly')) icon = '😊';
                    if(category.includes('intuitive')) icon = '👌';
                    if(category.includes('convenient')) icon = '👌';
                    if(category.includes('interactive')) icon = '🤝';
                    if(category.includes('easy')) icon = '✨';
                    if(category.includes('simple')) icon = '✨';

                    // Technical Aspects
                    if(category.includes('hardware')) icon = '🖥️';
                    if(category.includes('technical')) icon = '⚙️';
                    if(category.includes('setup')) icon = '🔧';
                    if(category.includes('platform')) icon = '⚡';
                    if(category.includes('model')) icon = '🤖';
                    if(category.includes('code')) icon = '💻';
                    if(category.includes('coding')) icon = '💻';
                    if(category.includes('programming')) icon = '💻';
                    if(category.includes('source')) icon = '📚';

                    // Language & Communication
                    if(category.includes('translation')) icon = '🔤';
                    if(category.includes('language')) icon = '🗣️';
                    if(category.includes('multilingual')) icon = '🌐';
                    if(category.includes('context')) icon = '🔍';
                    if(category.includes('summarization')) icon = '📝';

                    // Business & Access
                    if(category.includes('commercial')) icon = '💼';
                    if(category.includes('enterprise')) icon = '🏢';
                    if(category.includes('subscription')) icon = '💳';
                    if(category.includes('premium')) icon = '👑';
                    if(category.includes('free')) icon = '🆓';
                    if(category.includes('cost')) icon = '💰';
                    if(category.includes('price')) icon = '💰';
                    if(category.includes('expensive')) icon = '💰';
                    if(category.includes('paid')) icon = '💰';

                    // Limitations & Issues
                    if(category.includes('limited')) icon = '⚠️';
                    if(category.includes('restriction')) icon = '🚫';
                    if(category.includes('restricted')) icon = '🚫';
                    if(category.includes('requirement')) icon = '📋';
                    if(category.includes('dependency')) icon = '🔗';
                    if(category.includes('lock-in')) icon = '🔒';
                    if(category.includes('secure')) icon = '🔒';
                    if(category.includes('security')) icon = '🔒';
                    if(category.includes('issue')) icon = '❗';
                    if(category.includes('problem')) icon = '⚠️';
                    if(category.includes('inconsistent')) icon = '〽️';
                    if(category.includes('unstable')) icon = '〽️';
                    if(category.includes('error')) icon = '❌';
                    if(category.includes('fail')) icon = '❌';
                    if(category.includes('concern')) icon = '⚠️';
                    if(category.includes('risk')) icon = '⚠️';
                    if(category.includes('warning')) icon = '⚠️';
                    if(category.includes('caution')) icon = '⚠️';
                    if(category.includes('privacy')) icon = '🛡️';
                    if(category.includes('protection')) icon = '🛡️';
                    if(category.includes('misuse')) icon = '⛔';
                    if(category.includes('abuse')) icon = '⛔';
                    if(category.includes('lack')) icon = '⛔';
                    if(category.includes('missing')) icon = '⛔';
                    if(category.includes('unavailable')) icon = '⛔';
                    // Learning & Support
                    if(category.includes('learning')) icon = '📚';
                    if(category.includes('learn')) icon = '📚';
                    if(category.includes('training')) icon = '📚';
                    if(category.includes('curve')) icon = '📈';
                    if(category.includes('support')) icon = '🤝';
                    if(category.includes('help')) icon = '💁';
                    if(category.includes('guide')) icon = '📖';
                    if(category.includes('documentation')) icon = '📖';
                    if(category.includes('tutorial')) icon = '📖';
                    if(category.includes('feedback')) icon = '💬';

                    // Specific Features
                    if(category.includes('temporal')) icon = '⏱️';
                    if(category.includes('scene')) icon = '🎬';
                    if(category.includes('browser')) icon = '🌐';
                    if(category.includes('discord')) icon = '💬';
                    if(category.includes('google')) icon = '🔍';
                    if(category.includes('office')) icon = '💼';
                    if(category.includes('workspace')) icon = '💼';
                    if(category.includes('beta')) icon = '🔬';

                    // Additional Features
                    if(category.includes('accurate')) icon = '🎯';
                    if(category.includes('precise')) icon = '🎯';
                    if(category.includes('customize')) icon = '⚙️';
                    if(category.includes('configure')) icon = '⚙️';
                    if(category.includes('analyze')) icon = '📊';
                    if(category.includes('improve')) icon = '📈';
                    if(category.includes('optimize')) icon = '📈';
                    if(category.includes('enhance')) icon = '✨';
                    if(category.includes('innovative')) icon = '💡';
                    if(category.includes('feature')) icon = '💫';
                    if(category.includes('capability')) icon = '💪';
                    if(category.includes('function')) icon = '⚙️';
                    if(category.includes('tool')) icon = '🛠️';
                    if(category.includes('service')) icon = '🛠️';
                    if(category.includes('option')) icon = '🔘';
                    if(category.includes('setting')) icon = '⚙️';
                    if(category.includes('control')) icon = '🎮';
                    if(category.includes('manage')) icon = '🔧';
                    if(category.includes('modify')) icon = '🔧';
                    if(category.includes('new')) icon = '🆕';
                    if(category.includes('update')) icon = '🔄';
                    if(category.includes('upgrade')) icon = '⬆️';
                    if(category.includes('download')) icon = '⬇️';
                    if(category.includes('upload')) icon = '⬆️';
                    if(category.includes('access')) icon = '🔑';
                    if(category.includes('available')) icon = '✅';
                    if(category.includes('reliable')) icon = '✅';
                    if(category.includes('consistent')) icon = '✅';
                    if(category.includes('stable')) icon = '🔒';
                    if(category.includes('safe')) icon = '🛡️';
                    if(category.includes('trusted')) icon = '🤝';
                    if(category.includes('slow')) icon = '🐌';
                    if(category.includes('delay')) icon = '🐌';
                    if(category.includes('bug')) icon = '🐛';
                    if(category.includes('crash')) icon = '💥';
                    if(category.includes('difficult')) icon = '😕';
                    if(category.includes('challenging')) icon = '😕';
                    if(category.includes('cautious')) icon = '🤔';
                    if(category.includes('understand')) icon = '🧠';
                    if(category.includes('intelligent')) icon = '🧠';
                    if(category.includes('hallucinate')) icon = '🌫️';
                    if(category.includes('basic')) icon = '📝';
                    if(category.includes('style')) icon = '🎨';
                    if(category.includes('advanced')) icon = '🚀';
                    if(category.includes('control')) icon = '🎮';
                    if(category.includes('usage')) icon = '📊';
                    if(category.includes('limits')) icon = '⏳';
                    if(category.includes('multiple')) icon = '🔄';
                    if(category.includes('genre')) icon = '📑';
                    if(category.includes('resource')) icon = '🔋';
                    if(category.includes('specific')) icon = '📑';
                    if(category.includes('genre-specific')) icon = '📑';
                    if(category.includes('platform-specific')) icon = '📑';
                    if(category.includes('data types')) icon = '🗃️';
                    if(category.includes('accuracy')) icon = '🎯';
                    if(category.includes('user-friendly')) icon = '🤗';
                    if(category.includes('aggressive')) icon = '⚡';
                    if(category.includes('sometimes')) icon = '🔄';
                    if(category.includes('open-source')) icon = '📖';
                    if(category.includes('open source')) icon = '📖';
                    if(category.includes('opensource')) icon = '📖';
                    if(category.includes('no-code')) icon = '🛠️';
                    if(category.includes('no code')) icon = '🛠️';
                    if(category.includes('nocode')) icon = '🛠️';
                    grid.appendChild(createCard(company, category, companies[company][category], icon));
                }
            }

            section.appendChild(grid);
            container.appendChild(section);
        }
    } catch (error) {
        console.error('Error parsing CSV:', error);
        document.getElementById('companies-container').innerHTML = 
            `<div class="error">Error parsing data: ${error.message}</div>`;
    }
}