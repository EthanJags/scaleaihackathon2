import React from 'react';

// Component styles
const styles = {
  container: {
    display: 'flex',

    width: '100%',
    height: '173px',
    margin: "20px 0px",
    background: '#525252',
    borderRadius: '16px',
    padding: '15px 20px',  // Added for proper inner text positioning
  },
  text: {
    margin: "",
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: '24px',
    lineHeight: '29px',
    color: '#FFFFFF',
  }
}

const MyComponent = ({requirements}) => {
  return (
    <div style={styles.container}>
      <p style={styles.text}>Requirements</p>
      <p>{requirements}</p>
    </div>
  );
}

export default MyComponent;
