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
                    if(category.includes('Scientific')) icon = '🧬';
                    if(category.includes('Technology')) icon = '🚀';
                    if(category.includes('Strategic')) icon = '💪';
                    if(category.includes('Portfolio')) icon = '🤖';
                    if(category.includes('Vision')) icon = '🎮';
                    if(category.includes('Natural')) icon = '💬';
                    if(category.includes('Conversational')) icon = '💭';
                    if(category.includes('Reasoning')) icon = '🧠';
                    if(category.includes('Analysis')) icon = '📊';
                    if(category.includes('Processing')) icon = '⚙️';
                    if(category.includes('Generation')) icon = '⚡';
                    if(category.includes('Integration')) icon = '🔌';
                    if(category.includes('Automated')) icon = '🤖';
                    if(category.includes('Real-Time')) icon = '⏱️';
                    if(category.includes('Multimodal')) icon = '🎯';
                    if(category.includes('Customizable')) icon = '⚙️';

                    // Quality & Performance
                    if(category.includes('High-Quality')) icon = '✨';
                    if(category.includes('Quality')) icon = '✨';
                    if(category.includes('Advanced')) icon = '🚀';
                    if(category.includes('Professional')) icon = '💼';
                    if(category.includes('Exceptional')) icon = '🌟';
                    if(category.includes('Excellent')) icon = '🌟';
                    if(category.includes('Great')) icon = '🌟';
                    if(category.includes('Strong')) icon = '💪';
                    if(category.includes('Powerful')) icon = '💪';
                    if(category.includes('Robust')) icon = '💪';
                    if(category.includes('Extensive')) icon = '📚';
                    if(category.includes('Complex')) icon = '🔧';
                    if(category.includes('Deep')) icon = '🔍';
                    if(category.includes('Smart')) icon = '🧠';
                    if(category.includes('Efficient')) icon = '⚡';
                    if(category.includes('Fast')) icon = '⚡';
                    if(category.includes('Quick')) icon = '⚡';
                    if(category.includes('Speed')) icon = '⚡';
                    if(category.includes('Responsive')) icon = '⚡';
                    if(category.includes('Instant')) icon = '⚡';
                    if(category.includes('Performance')) icon = '📈';
                    // Features & Functions
                    if(category.includes('Template')) icon = '📋';
                    if(category.includes('Interface')) icon = '🖥️';
                    if(category.includes('Collaboration')) icon = '👥';
                    if(category.includes('Export')) icon = '📤';
                    if(category.includes('Import')) icon = '📥';
                    if(category.includes('Storage')) icon = '💾';
                    if(category.includes('Memory')) icon = '💾';
                    if(category.includes('Cloud')) icon = '☁️';
                    if(category.includes('Local')) icon = '💻';
                    if(category.includes('Deployment')) icon = '🚀';

                    // Content & Media
                    if(category.includes('Visual')) icon = '👁️';
                    if(category.includes('Image')) icon = '🖼️';
                    if(category.includes('Video')) icon = '🎥';
                    if(category.includes('Audio')) icon = '🔊';
                    if(category.includes('Text')) icon = '📝';
                    if(category.includes('Document')) icon = '📄';
                    if(category.includes('Content')) icon = '📄';
                    if(category.includes('Style')) icon = '🎨';
                    if(category.includes('Artistic')) icon = '🎨';
                    if(category.includes('Creative')) icon = '🎨';
                    if(category.includes('Design')) icon = '🎨';
                    if(category.includes('Photorealistic')) icon = '📸';

                    // User Experience
                    if(category.includes('User')) icon = '👤';
                    if(category.includes('Friendly')) icon = '😊';
                    if(category.includes('Intuitive')) icon = '👌';
                    if(category.includes('Convenient')) icon = '👌';
                    if(category.includes('Interactive')) icon = '🤝';
                    if(category.includes('Easy')) icon = '✨';
                    if(category.includes('Simple')) icon = '✨';

                    // Technical Aspects
                    if(category.includes('Hardware')) icon = '🖥️';
                    if(category.includes('Technical')) icon = '⚙️';
                    if(category.includes('Setup')) icon = '🔧';
                    if(category.includes('Platform')) icon = '⚡';
                    if(category.includes('Model')) icon = '🤖';
                    if(category.includes('Code')) icon = '💻';
                    if(category.includes('Coding')) icon = '💻';
                    if(category.includes('Programming')) icon = '💻';
                    if(category.includes('Source')) icon = '📚';

                    // Language & Communication
                    if(category.includes('Translation')) icon = '🔤';
                    if(category.includes('Language')) icon = '🗣️';
                    if(category.includes('Multilingual')) icon = '🌐';
                    if(category.includes('Context')) icon = '🔍';
                    if(category.includes('Summarization')) icon = '📝';
                    // Business & Access
                    if(category.includes('Commercial')) icon = '💼';
                    if(category.includes('Enterprise')) icon = '🏢';
                    if(category.includes('Subscription')) icon = '💳';
                    if(category.includes('Premium')) icon = '👑';
                    if(category.includes('Free')) icon = '🆓';
                    if(category.includes('Cost')) icon = '💰';
                    if(category.includes('Price')) icon = '💰';
                    if(category.includes('Expensive')) icon = '💰';
                    if(category.includes('Paid')) icon = '💰';

                    // Limitations & Issues
                    if(category.includes('Limited')) icon = '⚠️';
                    if(category.includes('Restriction')) icon = '🚫';
                    if(category.includes('Restricted')) icon = '🚫';
                    if(category.includes('Requirement')) icon = '📋';
                    if(category.includes('Dependency')) icon = '🔗';
                    if(category.includes('Lock-In')) icon = '🔒';
                    if(category.includes('Secure')) icon = '🔒';
                    if(category.includes('Security')) icon = '🔒';
                    if(category.includes('Issue')) icon = '❗';
                    if(category.includes('Problem')) icon = '⚠️';
                    if(category.includes('Inconsistent')) icon = '〽️';
                    if(category.includes('Unstable')) icon = '〽️';
                    if(category.includes('Error')) icon = '❌';
                    if(category.includes('Fail')) icon = '❌';
                    if(category.includes('Concern')) icon = '⚠️';
                    if(category.includes('Risk')) icon = '⚠️';
                    if(category.includes('Warning')) icon = '⚠️';
                    if(category.includes('Caution')) icon = '⚠️';
                    if(category.includes('Privacy')) icon = '🛡️';
                    if(category.includes('Protection')) icon = '🛡️';
                    if(category.includes('Misuse')) icon = '⛔';
                    if(category.includes('Abuse')) icon = '⛔';
                    if(category.includes('Lack')) icon = '⛔';
                    if(category.includes('Missing')) icon = '⛔';
                    if(category.includes('Unavailable')) icon = '⛔';

                    // Learning & Support
                    if(category.includes('Learning')) icon = '📚';
                    if(category.includes('Learn')) icon = '📚';
                    if(category.includes('Training')) icon = '📚';
                    if(category.includes('Curve')) icon = '📈';
                    if(category.includes('Support')) icon = '🤝';
                    if(category.includes('Help')) icon = '💁';
                    if(category.includes('Guide')) icon = '📖';
                    if(category.includes('Documentation')) icon = '📖';
                    if(category.includes('Tutorial')) icon = '📖';
                    if(category.includes('Feedback')) icon = '💬';
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