import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Contacts from "./components/Contacts";
import { Button, Form } from "react-bootstrap";

function App() {
  const [contacts, setContacts] = useState([]);
  const [contactName, setContactName] = useState("");
  const [mobileNum, setMobileNum] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleAddContact = (e) => {
    e.preventDefault();
    const mobileNumPattern = /^\d{10}$/; // Regular expression to check for exactly 10 digits
    if (!mobileNumPattern.test(mobileNum)) {
      alert("Please enter a valid 10-digit mobile number");
      return;
    }
    // Proceed with adding the contact
    console.log("Contact added:", { contactName, mobileNum });
    const newContact = {
      name: contactName,
      phone: mobileNum,
    };
    setContacts([...contacts, newContact]);
    setShowForm(false);
    setContactName("");
    setMobileNum("");
  };

  const markAsFaviourate = (id) => {
    const updatedContacts = contacts.map((contact, index) =>
      index === id ? { ...contact, faviourate: true } : contact
    );
    setContacts(updatedContacts);
  };

  const blockNumber = (id) => {
    const updatedContacts = contacts.map((contact, index) =>
      index === id ? { ...contact, block: true } : contact
    );
    setContacts(updatedContacts);
  };

  const deleteNumber = (id) => {
    const deleteAlert = window.confirm("Are you sure you want to delete it?");
    if (deleteAlert) {
      const updatedContacts = contacts.filter((_, index) => index !== id);
      setContacts(updatedContacts);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
      className="contacts-super-container"
    >
      {contacts.length > 0 ? (
        <div className="contacts-container">
          <Contacts
            contacts={contacts}
            markAsFaviourate={markAsFaviourate}
            blockNumber={blockNumber}
            deleteNumber={deleteNumber}
          />
          <Button
            style={{ marginTop: "12px" }}
            variant="primary"
            onClick={() => setShowForm(true)}
          >
            Create Contact
          </Button>
        </div>
      ) : (
        <div className="contacts-container">
          <Button variant="primary" onClick={() => setShowForm(true)}>
            Create Contact
          </Button>
        </div>
      )}
      {showForm && (
        <div
          className="form-container"
          style={{
            backgroundColor: "#f5f5f5",
            padding: "25px",
            borderRadius: "5px",
          }}
        >
          <Form onSubmit={handleAddContact}>
            <label style={{ fontWeight: "bold" }}>Name</label>
            <input
              style={{
                backgroundColor: "#ddd",
                color: "#000",
                fontWeight: "bold",
              }}
              type="text"
              required
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              placeholder="Enter Name"
            />
            <label style={{ fontWeight: "bold" }}>Mobile</label>
            <input
              style={{
                backgroundColor: "#ddd",
                color: "#000",
                fontWeight: "bold",
              }}
              type="text"
              required
              value={mobileNum}
              onChange={(e) => setMobileNum(e.target.value)}
              placeholder="Enter Number"
            />
            <Button style={{ marginTop: "25px" }} type="submit">
              Add Contact
            </Button>
          </Form>
        </div>
      )}
    </div>
  );
}

export default App;
