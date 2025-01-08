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