// Regex patterns
const codiceFiscaleRegex = /^[A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z]$/i
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const telefonoRegex = /^(\+\d{2,3}\s)?\d{8,10}$/

// DOM Elements
const form = document.getElementById("registrationForm")
const submitButton = document.getElementById("submitButton")
const toast = document.getElementById("toast")

// Form fields configuration
const fields = {
    nome: {
        element: document.getElementById("nome"),
        errorElement: document.getElementById("nome-error"),
        validate: (value) => (!value || value.length < 2 ? "Il nome deve contenere almeno 2 caratteri" : ""),
    },
    cognome: {
        element: document.getElementById("cognome"),
        errorElement: document.getElementById("cognome-error"),
        validate: (value) => (!value || value.length < 2 ? "Il cognome deve contenere almeno 2 caratteri" : ""),
    },
    indirizzo: {
        element: document.getElementById("indirizzo"),
        errorElement: document.getElementById("indirizzo-error"),
        validate: (value) => (!value || value.length < 5 ? "L'indirizzo deve contenere almeno 5 caratteri" : ""),
    },
    codiceFiscale: {
        element: document.getElementById("codiceFiscale"),
        errorElement: document.getElementById("codiceFiscale-error"),
        validate: (value) => {
            if (!value) return "Il codice fiscale è obbligatorio"
            if (!codiceFiscaleRegex.test(value)) return "Codice fiscale non valido"
            return ""
        },
    },
    annoDiNascita: {
        element: document.getElementById("annoDiNascita"),
        errorElement: document.getElementById("annoDiNascita-error"),
        validate: (value) => {
            if (!value) return "L'anno di nascita è obbligatorio"
            if (!/^\d{4}$/.test(value)) return "Inserire un anno valido (4 cifre)"
            const year = Number.parseInt(value)
            const currentYear = new Date().getFullYear()
            if (year < 1900 || year > currentYear) return "Anno di nascita non valido"
            if (currentYear - year < 18) return "Devi essere maggiorenne per registrarti"
            return ""
        },
    },
    residenzaComune: {
        element: document.getElementById("residenzaComune"),
        errorElement: document.getElementById("residenzaComune-error"),
        validate: (value) => (!value || value.length < 2 ? "Il comune deve contenere almeno 2 caratteri" : ""),
    },
    residenzaProvincia: {
        element: document.getElementById("residenzaProvincia"),
        errorElement: document.getElementById("residenzaProvincia-error"),
        validate: (value) => {
            if (!value) return "La provincia è obbligatoria"
            if (value.length !== 2) return "Inserire la sigla della provincia (2 caratteri)"
            return ""
        },
    },
    telefono: {
        element: document.getElementById("telefono"),
        errorElement: document.getElementById("telefono-error"),
        validate: (value) => (!telefonoRegex.test(value) ? "Numero di telefono non valido" : ""),
    },
    email: {
        element: document.getElementById("email"),
        errorElement: document.getElementById("email-error"),
        validate: (value) => (!emailRegex.test(value) ? "Email non valida" : ""),
    },
}

// Show toast message
function showToast(message, type = "error") {
    toast.textContent = message
    toast.className = `toast ${type}`

    // Force reflow to ensure animation works
    void toast.offsetWidth

    toast.classList.add("show")

    setTimeout(() => {
        toast.classList.remove("show")
    }, 3000)
}

// Validate the entire form
function validateForm() {
    let isValid = true
    let firstErrorField = null

    for (const key in fields) {
        const field = fields[key]
        const errorMessage = field.validate(field.element.value.trim())

        if (errorMessage) {
            field.errorElement.textContent = errorMessage
            isValid = false

            // Store the first field with an error
            if (!firstErrorField) {
                firstErrorField = field.element
            }
        } else {
            field.errorElement.textContent = ""
        }
    }

    // Enable or disable submit button based on validation
    submitButton.disabled = !isValid

    // If there are errors, focus on the first error field
    if (firstErrorField && event && event.type === "submit") {
        firstErrorField.focus()
    }

    return isValid
}

// Form submission handler
form.addEventListener("submit", (e) => {
    e.preventDefault()

    const isFormValid = validateForm()

    if (isFormValid) {
        // Simulate form submission
        submitButton.disabled = true
        submitButton.textContent = "Invio in corso..."

        // Simulate API call with timeout
        setTimeout(() => {
            showToast("Registrazione completata con successo!", "success")
            form.reset()
            submitButton.textContent = "Invia Registrazione"
            submitButton.disabled = false

            // Clear all error messages
            for (const key in fields) {
                fields[key].errorElement.textContent = ""
            }
        }, 1000)
    } else {
        showToast("Ci sono errori nel modulo. Riprova.", "error")
    }
})

// Real-time validation
for (const key in fields) {
    const field = fields[key]

    // Validate on input
    field.element.addEventListener("input", function () {
        const errorMessage = field.validate(this.value.trim())
        field.errorElement.textContent = errorMessage
        validateForm()
    })

    // Validate on blur
    field.element.addEventListener("blur", function () {
        const errorMessage = field.validate(this.value.trim())
        field.errorElement.textContent = errorMessage
        validateForm()
    })
}

// Initialize form validation on page load
document.addEventListener("DOMContentLoaded", () => {
    // Add navigation handlers
    document.getElementById("homeLink").addEventListener("click", (e) => {
        e.preventDefault()
        showToast("Sei sulla pagina Home", "success")
    })

    document.getElementById("viewDataLink").addEventListener("click", (e) => {
        e.preventDefault()
        showToast("Visualizzazione dati non disponibile", "error")
    })

    // Initial validation
    validateForm()
})
