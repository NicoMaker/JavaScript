const API_BASE_URL = "http://localhost:8080"; // Cambia se l'API gira su un'altra porta o dominio

// Funzione per registrare un nuovo cliente
async function register(name, email, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await response.json();
    console.log("Risposta registrazione:", data);
  } catch (error) {
    console.error("Errore durante la registrazione:", error);
  }
}

// Funzione per login e ottenere token
async function login(email, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    console.log("Risposta login:", data);
    return data.token;
  } catch (error) {
    console.error("Errore durante il login:", error);
  }
}

// Funzione per ottenere la lista dei clienti
async function getCustomers(token) {
  try {
    const response = await fetch(`${API_BASE_URL}/customers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const customers = await response.json();
    console.log("Lista clienti:", customers);
  } catch (error) {
    console.error("Errore durante il recupero dei clienti:", error);
  }
}

// Funzione per ottenere i dettagli di un cliente specifico
async function getCustomerById(token, id) {
  try {
    const response = await fetch(`${API_BASE_URL}/customers/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const customer = await response.json();
    console.log(`Dettagli cliente ${id}:`, customer);
  } catch (error) {
    console.error(`Errore durante il recupero del cliente ${id}:`, error);
  }
}

// Funzione per creare un nuovo cliente
async function createCustomer(token, name, email, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/customers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await response.json();
    console.log("Cliente creato:", data);
  } catch (error) {
    console.error("Errore durante la creazione del cliente:", error);
  }
}

// Funzione per eliminare un cliente
async function deleteCustomer(token, id) {
  try {
    const response = await fetch(`${API_BASE_URL}/customers/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log("Risposta eliminazione cliente:", data);
  } catch (error) {
    console.error(`Errore durante l'eliminazione del cliente ${id}:`, error);
  }
}

// ESEMPIO D'USO
(async () => {
  const name = "Mario Rossi";
  const email = "mario.rossi@example.com";
  const password = "password123";

  await register(name, email, password);
  const token = await login(email, password);

  if (token) {
    await getCustomers(token);
    await getCustomerById(token, 1); // Sostituisci con l'ID reale
    await createCustomer(
      token,
      "Luigi Bianchi",
      "luigi.bianchi@example.com",
      "password456"
    );
    await deleteCustomer(token, 2); // Sostituisci con l'ID reale
  }
})();
