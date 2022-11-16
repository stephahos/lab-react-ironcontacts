import React, { useState } from "react";
import "./App.css";
import contactsJSON from "./contacts.json";

function App() {
  //State ( état , données)
  // We define the used Array with UseState ( c'est un hook et permet de définir un state dans un composant)
  //ici on définit le state UseState, on initionalise avec contactsJson, on le récupère dans une variable "contacts",
  //que l'on ne pourra modifier qu'avec le SetContacts
  const [contacts, setContacts] = useState(contactsJSON.slice(0, 5));
  // copie d'un seul élément du state
  const [newContact, setNewContact] = useState(contactsJSON.slice(5, 6));

  // 1.Comportement-Behaviour
  // 1.1 Add random contact

  const addRandomContact = () => {
    //setContacts est un tableau des élements de Contacts + le NewContact
    setContacts([...contacts, newContact]);
    //manipuler le state
    //on veut que sur un Onclick un newContact soit choisit au hasard dans l'array original contactsJson
    setNewContact(
      contactsJSON[Math.floor(Math.random() * contactsJSON.length)]
    );
  };

  //1.2 Delete Random contact
  const handleDelete = (id) => {
    //1. copie du state
    const contactsCopy = [...contacts];
    // 2. manipuler le state
    //on ne veut garder que les éléments de l'arr contactsCopy différent de l'Id passer à chaque Onclick
    const contactCopyUpdated = contactsCopy.filter(
      (contact) => contact.id !== id
    );
    //3.modifier le state avec le setter
    setContacts(contactCopyUpdated);
  };

  // Sort By Name
  const ContactSortedByName = () => {
    const contactsCopy = [...contacts];
    const sortByName = contactsCopy.sort((a, b) => {
      let fa = a.name.toLowerCase(),
        fb = b.name.toLowerCase();
      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    });
    setContacts(sortByName);
  };

  // Affichage (render)
  return (
    <div className="App">
      <div className="addBtn">
        <button onClick={addRandomContact}>Add Random Contact</button>
      </div>

      <table>
        <thead>
          <tr>
            <th className="img">
              <h3>Picture</h3>
            </th>
            <th>
              <h3>Name</h3>
              <button onClick={ContactSortedByName}>Sort by name</button>
            </th>
            <th>
              <h3>Popularity</h3>
            </th>
            <th>
              <h3>Won Oscar</h3>
            </th>
            <th>
              <h3>Won Emmy</h3>
            </th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td>
                <img src={contact.pictureUrl} alt={contact.name} />
              </td>
              <td>{contact.name}</td>
              <td>{contact.popularity}</td>
              <td>{contact.wonOscar ? "🏆" : ""}</td>
              <td>{contact.wonEmmy ? "🏆" : ""}</td>
              <td>
                <button onClick={() => handleDelete(contact.id)}>
                  Delete Random Contact
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
