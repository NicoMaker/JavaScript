document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registrationForm');
    const submitBtn = document.getElementById('submitBtn');
    const modal = document.getElementById('successModal');
    const closeBtn = document.querySelector('.close');

    // Form fields
    const fields = {
        nome: { element: document.getElementById('nome'), errorElement: document.getElementById('nomeError') },
        cognome: { element: document.getElementById('cognome'), errorElement: document.getElementById('cognomeError') },
        indirizzo: { element: document.getElementById('indirizzo'), errorElement: document.getElementById('indirizzoError') },
        codiceFiscale: { element: document.getElementById('codiceFiscale'), errorElement: document.getElementById('codiceFiscaleError') },
        dataNascita: { element: document.getElementById('dataNascita'), errorElement: document.getElementById('dataNascitaError') },
        comune: { element: document.getElementById('comune'), errorElement: document.getElementById('comuneError') },
        provincia: { element: document.getElementById('provincia'), errorElement: document.getElementById('provinciaError') },
        telefono: { element: document.getElementById('telefono'), errorElement: document.getElementById('telefonoError') },
        email: { element: document.getElementById('email'), errorElement: document.getElementById('emailError') }
    };

    // Validation functions (add these at the top for clarity)
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
        const provinceAbbreviations = ['AG', 'AL', 'AN', 'AO', 'AP', 'AQ', 'AR', 'AT', 'AV', 'BA', 'BG', 'BI', 'BL', 'BN', 'BO', 'BR', 'BS', 'BT', 'BZ', 'CA', 'CB', 'CE', 'CH', 'CI', 'CL', 'CN', 'CO', 'CR', 'CS', 'CT', 'CV', 'CZ', 'EN', 'FC', 'FE', 'FG', 'FI', 'FM', 'FR', 'GE', 'GO', 'GR', 'GT', 'IM', 'IS', 'KR', 'LC', 'LE', 'LI', 'LO', 'LT', 'LU', 'MB', 'MC', 'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 'NA', 'NO', 'NU', 'OG', 'OR', 'OT', 'PA', 'PC', 'PD', 'PE', 'PG', 'PI', 'PL', 'PN', 'PO', 'PR', 'PT', 'PU', 'PV', 'PZ', 'RA', 'RC', 'RE', 'RG', 'RI', 'RM', 'RN', 'RO', 'SA', 'SI', 'SO', 'SP', 'SR', 'SS', 'SV', 'TA', 'TE', 'TN', 'TO', 'TP', 'TR', 'TS', 'TV', 'UD', 'VA', 'VB', 'VC', 'VE', 'VI', 'VR', 'VS', 'VT', 'VV'];
        if (!provinceAbbreviations.includes(value.toUpperCase())) {
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

    // Add input event listeners to all fields
    Object.keys(fields).forEach(fieldName => {
        const field = fields[fieldName];
        field.element.addEventListener('input', function () {
            validateField(fieldName, field.element.value);
            checkFormValidity();
        });
    });

    // Validate a specific field
    function validateField(fieldName, value) {
        const field = fields[fieldName];
        let error = validateRequired(value, fieldName);

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

        field.errorElement.textContent = error;
        return !error;
    }

    // Check if all fields are valid
    function checkFormValidity() {
        let isValid = true;

        Object.keys(fields).forEach(fieldName => {
            const field = fields[fieldName];
            if (!validateField(fieldName, field.element.value)) {
                isValid = false;
            }
        });

        submitBtn.disabled = !isValid;
    }

    // Form submission
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Disabilita il pulsante durante l'invio
        submitBtn.disabled = true;
        submitBtn.textContent = 'Invio in corso...';

        // Create form data object
        const formData = {
            nome: fields.nome.element.value,
            cognome: fields.cognome.element.value,
            indirizzo: fields.indirizzo.element.value,
            codiceFiscale: fields.codiceFiscale.element.value,
            dataNascita: fields.dataNascita.element.value,
            comune: fields.comune.element.value,
            provincia: fields.provincia.element.value,
            telefono: fields.telefono.element.value,
            email: fields.email.element.value,
            timestamp: new Date().toISOString()
        };

        // In a real application, you would send this data to a backend API
        // For this example, we'll store it in localStorage
        saveFormData(formData);

        // Invia email usando EmailJS
        sendEmail(formData)
            .then(() => {
                // Show success modal
                modal.style.display = 'block';

                // Reset form
                form.reset();
                submitBtn.disabled = true;
                submitBtn.textContent = 'Invia';
            })
            .catch(error => {
                alert('Errore nell\'invio dell\'email: ' + error.message);
                submitBtn.disabled = false;
                submitBtn.textContent = 'Invia';
            });
    });

    // Close modal when clicking the X
    closeBtn.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside of it
    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Save form data to localStorage
    function saveFormData(data) {
        let savedData = JSON.parse(localStorage.getItem('formSubmissions')) || [];
        savedData.push(data);
        localStorage.setItem('formSubmissions', JSON.stringify(savedData));
    }

    // Invia email usando EmailJS
    async function sendEmail(data) {
        // Formatta la data di nascita per la visualizzazione
        const formattedDate = new Date(data.dataNascita).toLocaleDateString('it-IT');

        // Prepara i parametri per l'email di sistema
        const systemEmailParams = {
            to_email: 'sistema@tuodominio.it', // Sostituisci con l'email di sistema
            subject: 'Nuova registrazione',
            from_name: 'Sistema di Registrazione',
            message: `
                Nuova registrazione ricevuta:
                
                Nome: ${data.nome}
                Cognome: ${data.cognome}
                Indirizzo: ${data.indirizzo}
                Codice Fiscale: ${data.codiceFiscale}
                Data di Nascita: ${formattedDate}
                Comune: ${data.comune}
                Provincia: ${data.provincia}
                Telefono: ${data.telefono}
                Email: ${data.email}
                Data di registrazione: ${new Date().toLocaleString('it-IT')}
            `
        };

        // Prepara i parametri per l'email di conferma all'utente
        const userEmailParams = {
            to_email: data.email,
            subject: 'Conferma registrazione',
            from_name: 'Sistema di Registrazione',
            message: `
                Gentile ${data.nome} ${data.cognome},
                
                grazie per esserti registrato/a. Abbiamo ricevuto i seguenti dati:
                
                Nome: ${data.nome}
                Cognome: ${data.cognome}
                Indirizzo: ${data.indirizzo}
                Codice Fiscale: ${data.codiceFiscale}
                Data di Nascita: ${formattedDate}
                Comune: ${data.comune}
                Provincia: ${data.provincia}
                Telefono: ${data.telefono}
                Email: ${data.email}
                
                Cordiali saluti,
                Il team di supporto
            `
        };

        try {
            // IMPORTANTE: Sostituisci "your_service_id" e "your_template_id" con i tuoi ID di EmailJS
            // Invia email di sistema
            await emailjs.send('your_service_id', 'your_template_id', systemEmailParams);

            // Invia email di conferma all'utente
            await emailjs.send('your_service_id', 'your_template_id', userEmailParams);

            console.log('Email inviate con successo!');
            return true;
        } catch (error) {
            console.error('Errore nell\'invio delle email:', error);
            throw error;
        }
    }
});