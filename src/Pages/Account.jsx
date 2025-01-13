import React, { useState } from 'react';

const AccountPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '123-456-7890',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSave = () => {
    // Save the details (e.g., API call)
    setIsEditing(false);
    console.log('User details saved:', userDetails);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>My Profile</h1>
      <div style={styles.section}>
        <img
          src="https://castingfrontier.com/wp-content/uploads/2021/03/shutterstock_1495410191-scaled.jpg"
          alt="Profile"
          style={styles.profilePic}
        />
        <div>
          <label style={styles.label}>Name:</label>
          {isEditing ? (
            <input
              style={styles.input}
              type="text"
              name="name"
              value={userDetails.name}
              onChange={handleChange}
            />
          ) : (
            <p style={styles.info}>{userDetails.name}</p>
          )}
        </div>
        <div>
          <label style={styles.label}>Email:</label>
          {isEditing ? (
            <input
              style={styles.input}
              type="email"
              name="email"
              value={userDetails.email}
              onChange={handleChange}
            />
          ) : (
            <p style={styles.info}>{userDetails.email}</p>
          )}
        </div>
        <div>
          <label style={styles.label}>Phone:</label>
          {isEditing ? (
            <input
              style={styles.input}
              type="tel"
              name="phone"
              value={userDetails.phone}
              onChange={handleChange}
            />
          ) : (
            <p style={styles.info}>{userDetails.phone}</p>
          )}
        </div>
      </div>
      <div style={styles.actions}>
        {isEditing ? (
          <>
            <button style={styles.button} onClick={handleSave}>
              Save
            </button>
            <button style={styles.button} onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </>
        ) : (
          <button style={styles.button} onClick={() => setIsEditing(true)}>
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '2rem auto',
    padding: '2rem',
    border: '1px solid #ccc',
    borderRadius: '10px',
    backgroundColor: '#fff',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '1rem',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
  },
  profilePic: {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  label: {
    fontWeight: 'bold',
  },
  info: {
    marginBottom: '0.5rem',
  },
  input: {
    padding: '0.5rem',
    width: '100%',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '1rem',
  },
  button: {
    padding: '0.5rem 1rem',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default AccountPage;
