document.addEventListener('DOMContentLoaded', function () {
    const tableBody = document.getElementById('tableBody');
    const noDataMessage = document.getElementById('noData');

    // Load data from localStorage
    function loadData() {
        const savedData = JSON.parse(localStorage.getItem('formSubmissions')) || [];

        if (savedData.length === 0) {
            noDataMessage.style.display = 'block';
            return;
        }

        noDataMessage.style.display = 'none';

        // Clear existing table rows
        tableBody.innerHTML = '';

        // Add data to table
        savedData.forEach(data => {
            const row = document.createElement('tr');

            // Format date for display
            const formattedDate = new Date(data.dataNascita).toLocaleDateString('it-IT');

            row.innerHTML = `
                <td>${data.nome}</td>
                <td>${data.cognome}</td>
                <td>${data.indirizzo}</td>
                <td>${data.codiceFiscale}</td>
                <td>${formattedDate}</td>
                <td>${data.comune}</td>
                <td>${data.provincia}</td>
                <td>${data.telefono}</td>
                <td>${data.email}</td>
            `;

            tableBody.appendChild(row);
        });
    }

    // Load data when page loads
    loadData();

    // In a real application, you would fetch data from an API endpoint
    // For example:
    /*
    async function fetchData() {
        try {
            const response = await fetch('https://your-api-endpoint/submissions');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            
            if (data.length === 0) {
                noDataMessage.style.display = 'block';
                return;
            }
            
            noDataMessage.style.display = 'none';
            tableBody.innerHTML = '';
            
            data.forEach(item => {
                const row = document.createElement('tr');
                const formattedDate = new Date(item.dataNascita).toLocaleDateString('it-IT');
                
                row.innerHTML = `
                    <td>${item.nome}</td>
                    <td>${item.cognome}</td>
                    <td>${item.indirizzo}</td>
                    <td>${item.codiceFiscale}</td>
                    <td>${formattedDate}</td>
                    <td>${item.comune}</td>
                    <td>${item.provincia}</td>
                    <td>${item.telefono}</td>
                    <td>${item.email}</td>
                `;
                
                tableBody.appendChild(row);
            });
        } catch (error) {
            console.error('Error fetching data:', error);
            noDataMessage.textContent = 'Errore nel caricamento dei dati';
            noDataMessage.style.display = 'block';
        }
    }
    
    fetchData();
    */
});