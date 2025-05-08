document.addEventListener('DOMContentLoaded', function () {
    // Elementi DOM
    const form = document.getElementById('registrationForm');
    const submitBtn = document.getElementById('submitBtn');
    const successModal = document.getElementById('successModal');
    const errorModal = document.getElementById('errorModal');
    const errorMessage = document.getElementById('errorMessage');
    const dataModal = document.getElementById('dataModal');
    const loader = document.getElementById('loader');
    const viewDataBtn = document.getElementById('viewDataBtn');
    const tableBody = document.getElementById('tableBody');
    const noDataMessage = document.getElementById('noData');
    const retryButton = document.getElementById('retryButton');
    const privacyCheckbox = document.getElementById('privacy');

    // Chiusura modali
    document.getElementById('closeSuccessModal').addEventListener('click', () => successModal.style.display = 'none');
    document.getElementById('closeErrorModal').addEventListener('click', () => errorModal.style.display = 'none');
    document.getElementById('closeDataModal').addEventListener('click', () => dataModal.style.display = '', () => dataModal.style.display = 'none');

    // Chiudi modali cliccando fuori
    window.addEventListener('click', function (event) {
        if (event.target === successModal) successModal.style.display = 'none';
        if (event.target === errorModal) errorModal.style.display = 'none';
        if (event.target === dataModal) dataModal.style.display = 'none';
    });

    // Visualizza dati
    viewDataBtn.addEventListener('click', function (e) {
        e.preventDefault();
        loadData();
        dataModal.style.display = 'block';
    });

    // Riprova invio
    retryButton.addEventListener('click', function () {
        errorModal.style.display = 'none';
        submitForm();
    });

    // Campi del form
    const fields = {
        nome: { element: document.getElementById('nome'), errorElement: document.getElementById('nomeError') },
        cognome: { element: document.getElementById('cognome'), errorElement: document.getElementById('cognomeError') },
        indirizzo: { element: document.getElementById('indirizzo'), errorElement: document.getElementById('indirizzoError') },
        codiceFiscale: { element: document.getElementById('codiceFiscale'), errorElement: document.getElementById('codiceFiscaleError') },
        dataNascita: { element: document.getElementById('dataNascita'), errorElement: document.getElementById('dataNascitaError') },
        comune: { element: document.getElementById('comune'), errorElement: document.getElementById('comuneError') },
        provincia: { element: document.getElementById('provincia'), errorElement: document.getElementById('provinciaError') },
        telefono: { element: document.getElementById('telefono'), errorElement: document.getElementById('telefonoError') },
        email: { element: document.getElementById('email'), errorElement: document.getElementById('emailError') },
        privacy: { element: privacyCheckbox, errorElement: document.getElementById('privacyError') }
    };

    // Aggiungi placeholder ai campi
    fields.nome.element.placeholder = "Inserisci il tuo nome";
    fields.cognome.element.placeholder = "Inserisci il tuo cognome";
    fields.indirizzo.element.placeholder = "Inserisci il tuo indirizzo completo";
    fields.codiceFiscale.element.placeholder = "Inserisci il tuo codice fiscale";
    fields.comune.element.placeholder = "Inserisci il comune di residenza";
    fields.provincia.element.placeholder = "Es. MI, RM, TO";
    fields.telefono.element.placeholder = "Inserisci il tuo numero di telefono";
    fields.email.element.placeholder = "Inserisci la tua email";

    // Carica dati province
    let province = [];

    // Carica i dati delle province
    fetch('province.json')
        .then(response => response.json())
        .then(data => {
            province = data.province;
            setupProvinceAutocomplete(fields.provincia.element, province);
        })
        .catch(error => console.error('Errore nel caricamento delle province:', error));

    // Funzione per configurare l'autocompletamento delle province
    function setupProvinceAutocomplete(inputElement, provinceList) {
        // Crea un elemento datalist
        const datalistId = inputElement.id + 'List';
        let datalist = document.getElementById(datalistId);

        if (!datalist) {
            datalist = document.createElement('datalist');
            datalist.id = datalistId;
            document.body.appendChild(datalist);
            inputElement.setAttribute('list', datalistId);
        }

        // Popola il datalist
        provinceList.forEach(provincia => {
            const option = document.createElement('option');
            option.value = provincia.sigla;
            option.textContent = `${provincia.sigla} - ${provincia.nome}`;
            datalist.appendChild(option);
        });

        // Aggiungi tooltip per mostrare il nome completo della provincia
        inputElement.addEventListener('input', function () {
            const sigla = this.value.toUpperCase();
            const provinciaFound = provinceList.find(p => p.sigla === sigla);
            if (provinciaFound) {
                this.title = provinciaFound.nome;
            } else {
                this.title = '';
            }
        });
    }

    // Funzioni di validazione
    function validateRequired(value, fieldName) {
        if (!value) {
            return `Il campo ${fieldName} è obbligatorio.`;
        }
        return null;
    }

    function validateLength(value, min, max, fieldName) {
        if (value.length < min || value.length > max) {
            return `Il campo ${fieldName} deve essere tra ${min} e ${max} caratteri.`;
        }
        return null;
    }

    function validateFiscalCode(value) {
        const fiscalCodeRegex = /^[A-Z]{6}[0-9]{2}[A-Z][0-9]{2}[A-Z][0-9]{3}[A-Z]$/i;
        if (!fiscalCodeRegex.test(value)) {
            return 'Codice fiscale non valido.';
        }
        return null;
    }

    function validateAge(value) {
        const birthDate = new Date(value);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        if (age < 18) {
            return 'Devi essere maggiorenne per registrarti.';
        }
        return null;
    }

    function validateProvince(value) {
        if (!value) return 'Provincia obbligatoria.';

        const sigla = value.toUpperCase();
        const provinciaFound = province.find(p => p.sigla === sigla);

        if (!provinciaFound) {
            return 'Provincia non valida.';
        }
        return null;
    }

    function validatePhone(value) {
        const phoneRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\.0-9]*$/;
        if (!phoneRegex.test(value)) {
            return 'Numero di telefono non valido.';
        }
        return null;
    }

    function validateEmail(value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            return 'Indirizzo email non valido.';
        }
        return null;
    }

    function validateCheckbox(checked, fieldName) {
        if (!checked) {
            return `Devi accettare la ${fieldName}.`;
        }
        return null;
    }

    // Aggiungi event listener per tutti i campi
    Object.keys(fields).forEach(fieldName => {
        const field = fields[fieldName];
        if (field.element.type === 'checkbox') {
            field.element.addEventListener('change', function () {
                validateField(fieldName, field.element.checked);
                checkFormValidity();
            });
        } else {
            field.element.addEventListener('input', function () {
                validateField(fieldName, field.element.value);
                checkFormValidity();
            });
        }
    });

    // Valida un campo specifico
    function validateField(fieldName, value) {
        const field = fields[fieldName];
        let error = null;

        if (fieldName === 'privacy') {
            error = validateCheckbox(value, 'Privacy Policy');
        } else {
            error = validateRequired(value, fieldName);

            if (!error) {
                switch (fieldName) {
                    case 'nome':
                    case 'cognome':
                        error = validateLength(value, 2, 50, fieldName);
                        break;
                    case 'indirizzo':
                        error = validateLength(value, 5, 100, fieldName);
                        break;
                    case 'codiceFiscale':
                        error = validateFiscalCode(value);
                        break;
                    case 'dataNascita':
                        error = validateAge(value);
                        break;
                    case 'comune':
                        error = validateLength(value, 2, 50, fieldName);
                        break;
                    case 'provincia':
                        error = validateProvince(value);
                        break;
                    case 'telefono':
                        error = validatePhone(value);
                        break;
                    case 'email':
                        error = validateEmail(value);
                        break;
                }
            }
        }

        field.errorElement.textContent = error;
        return !error;
    }

    // Controlla validità di tutti i campi
    function checkFormValidity() {
        let isValid = true;

        Object.keys(fields).forEach(fieldName => {
            const field = fields[fieldName];
            const value = field.element.type === 'checkbox' ? field.element.checked : field.element.value;
            if (!validateField(fieldName, value)) {
                isValid = false;
            }
        });

        submitBtn.disabled = !isValid;
    }

    // Invio del form
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        submitForm();
    });

    function submitForm() {
        // Mostra loader
        loader.style.display = 'flex';

        // Disabilita il pulsante durante l'invio
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Invio in corso...</span> <i class="fas fa-spinner fa-spin"></i>';

        // Crea oggetto dati
        const formData = {
            nome: fields.nome.element.value,
            cognome: fields.cognome.element.value,
            indirizzo: fields.indirizzo.element.value,
            codiceFiscale: fields.codiceFiscale.element.value,
            dataNascita: fields.dataNascita.element.value,
            comune: fields.comune.element.value,
            provincia: fields.provincia.element.value.toUpperCase(),
            telefono: fields.telefono.element.value,
            email: fields.email.element.value,
            timestamp: new Date().toISOString()
        };

        // Salva dati in localStorage
        saveFormData(formData);

        // Invia dati al server per l'invio dell'email
        fetch('/api/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(data => {
                // Nascondi loader
                loader.style.display = 'none';

                if (data.success) {
                    // Mostra modal di successo
                    successModal.style.display = 'block';

                    // Reset form
                    form.reset();
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = '<span>Invia</span> <i class="fas fa-paper-plane"></i>';
                } else {
                    throw new Error(data.message || 'Errore durante l\'invio dell\'email');
                }
            })
            .catch(error => {
                // Nascondi loader
                loader.style.display = 'none';

                // Mostra modal di errore
                errorMessage.textContent = 'Errore nell\'invio dell\'email: ' + (error.message || 'Controlla la configurazione del server');
                errorModal.style.display = 'block';

                // Ripristina pulsante
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<span>Invia</span> <i class="fas fa-paper-plane"></i>';
            });
    }

    // Salva dati in localStorage
    function saveFormData(data) {
        let savedData = JSON.parse(localStorage.getItem('formSubmissions')) || [];
        savedData.push(data);
        localStorage.setItem('formSubmissions', JSON.stringify(savedData));
    }

    // Carica dati da localStorage
    function loadData() {
        const savedData = JSON.parse(localStorage.getItem('formSubmissions')) || [];

        if (savedData.length === 0) {
            noDataMessage.style.display = 'block';
            tableBody.innerHTML = '';
            return;
        }

        noDataMessage.style.display = 'none';
        tableBody.innerHTML = '';

        // Aggiungi dati alla tabella
        savedData.forEach(data => {
            const row = document.createElement('tr');
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
});