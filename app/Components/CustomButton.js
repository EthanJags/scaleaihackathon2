import { Button } from 'react-bootstrap';

const CustomButton = ({ isQueryPresent, handleDisabledSubmit, handleSubmit }) => {
  if (isQueryPresent) {
    return (
      <Button 
        onClick={handleSubmit} 
        style={{
          background: 'linear-gradient(116.43deg, #88FF8D, #39E7FF)',
          color: 'black',
          padding: '10px 40px',
          margin: 15,
          border: 'none',
          cursor: 'pointer',
          borderRadius: '20px',
          fontWeight: "bold",
        }}
      >
        Begin
      </Button>
    );
  }

  return (
    <Button 
      onClick={handleDisabledSubmit} 
      style={{
        background: 'gray',
        color: 'black',
        padding: '10px 40px',
        margin: 15,
        border: 'none',
        cursor: 'pointer',
        borderRadius: '20px',
        fontWeight: "bold",
      }}
    >
      Begin
    </Button>
  );
};

export default CustomButton;
