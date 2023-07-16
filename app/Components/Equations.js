import React, { useState } from 'react';
import Latex from 'react-latex';


// Component styles
const styles = {
  container: {
    position: 'relative', // Added for positioning the edit button
    display: 'flex',
    flexDirection: 'column', // Changed for proper content layout
    justifyContent: 'space-between', // Added for better positioning
    width: '100%',
    margin: "20px 0px",
    background: '#525252',
    borderRadius: '16px',
    padding: '15px 20px',
  },
  title: {
    textAlign: 'left',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: '20px', // Changed font size
    lineHeight: '19px', // Changed line height
    color: '#FFFFFF',
    margin: '15px 0px'
  },
  text: {
    textAlign: 'left',
    fontStyle: 'normal',
    fontWeight: '300',
    fontSize: '16px', // Changed font size
    lineHeight: '19px', // Changed line height
    color: '#FFFFFF',
  },
  editButton: {
    position: 'absolute', // Absolute positioning for the edit button
    right: '10px',
    bottom: '10px',
    color: '#FFFFFF',
    background: '#000',
    borderRadius: '4px',
    padding: '5px 10px',
    cursor: 'pointer', // Change cursor to pointer on hover
  }
}

const MyComponent = ({ requirements, title }) => {


  return (
    <div style={styles.container} className="max-w-6xl">
      <p style={styles.title}>{title}</p>
      <div style={styles.text}>
        <Latex>{requirements}</Latex>
      </div>
    </div>
  );
}

export default MyComponent;
