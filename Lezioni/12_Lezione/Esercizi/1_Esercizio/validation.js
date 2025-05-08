// Validation functions
function validateRequired(value, fieldName) {
    if (!value.trim()) {
        return `Il campo ${fieldName} è obbligatorio`;
    }
    return '';
}

function validateLength(value, min, max, fieldName) {
    if (value.length < min) {
        return `Il campo ${fieldName} deve contenere almeno ${min} caratteri`;
    }
    if (max && value.length > max) {
        return `Il campo ${fieldName} non può superare ${max} caratteri`;
    }
    return '';
}

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
        return 'Inserisci un indirizzo email valido';
    }
    return '';
}

function validatePhone(phone) {
    // Italian phone number format
    const regex = /^(\+39)?[ ]?[0-9]{3}[-\s]?[0-9]{3}[-\s]?[0-9]{4}$/;
    if (!regex.test(phone)) {
        return 'Inserisci un numero di telefono valido (es. +39 123 456 7890)';
    }
    return '';
}

function validateFiscalCode(cf) {
    // Italian fiscal code regex
    const regex = /^[A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z]$/i;
    if (!regex.test(cf)) {
        return 'Il codice fiscale non è valido';
    }
    return '';
}

function validateProvince(province) {
    // Italian province code is 2 uppercase letters
    const regex = /^[A-Z]{2}$/i;
    if (!regex.test(province)) {
        return 'Inserisci una sigla provincia valida (2 lettere)';
    }
    return '';
}

function validateAge(dateString) {
    const today = new Date();
    const birthDate = new Date(dateString);

    if (isNaN(birthDate.getTime())) {
        return 'Data di nascita non valida';
    }

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    if (age < 18) {
        return 'Devi avere almeno 18 anni per registrarti';
    }

    return '';
}