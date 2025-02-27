function ExampleStrutureObject() {
  let users = [
    { firstName: "Giuseppe", lastName: "Verdi", age: 45 },
    { firstName: "Maria", lastName: "Bianchi", age: 30 },
    { firstName: "Luisa", lastName: "Neri", age: 28 },
  ];

  function addUser(firstName, lastName, age) {
    users.push({ firstName, lastName, age });
    console.log(`Nuovo utente aggiunto: ${firstName} ${lastName}`);
  }

  function modifyUserIndex(index, changes) {
    if (index >= 0 && index < users.length) {
      const user = users[index];
      if (changes.firstName !== undefined) user.firstName = changes.firstName;
      if (changes.lastName !== undefined) user.lastName = changes.lastName;
      if (changes.age !== undefined) user.age = changes.age;
      console.log(
        `Utente all'indice ${index} modificato: ${JSON.stringify(user)}`
      );
    } else console.log(`Errore: indice ${index} non valido.`);
  }

  function modifyUserByName(firstName, lastName, age, changes) {
    const user = users.find(
      (user) =>
        user.firstName === firstName &&
        user.lastName === lastName &&
        user.age === age
    );
    if (user) {
      if (changes.firstName !== undefined) user.firstName = changes.firstName;
      if (changes.lastName !== undefined) user.lastName = changes.lastName;
      if (changes.age !== undefined) user.age = changes.age;
      console.log(`Utente modificato: ${JSON.stringify(user)}`);
    } else
      console.log(
        `Errore: utente ${firstName} ${lastName}, età ${age} non trovato.`
      );
  }

  function deleteUserIndex(index) {
    if (index >= 0 && index < users.length) {
      const removedUser = users.splice(index, 1);
      console.log(`Utente eliminato: ${JSON.stringify(removedUser[0])}`);
    } else console.log(`Errore: indice ${index} non valido.`);
  }

  function deleteUserByName(firstName, lastName, age) {
    const index = users.findIndex(
      (user) =>
        user.firstName === firstName &&
        user.lastName === lastName &&
        user.age === age
    );
    if (index !== -1) {
      const removedUser = users.splice(index, 1);
      console.log(`Utente eliminato: ${JSON.stringify(removedUser[0])}`);
    } else
      console.log(
        `Errore: utente ${firstName} ${lastName}, età ${age} non trovato.`
      );
  }

  addUser("Marco", "Rossi", 35);
  modifyUserIndex(1, { firstName: "Giovanni", lastName: "Verdi", age: 32 });
  modifyUserByName("Giovanni", "Verdi", 32, {
    firstName: "Luca",
    lastName: "Bianchi",
    age: 40,
  });
  deleteUserIndex(2);
  deleteUserByName("Marco", "Rossi", 35);
  console.log(users);
}

ExampleStrutureObject();
