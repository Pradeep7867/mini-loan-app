import React, {useEffect, useState} from 'react';
import axios from 'axios';


function App()
{
  const[message, setMessage] = useState('');
  useEffect(()=> {
    //Fetch the backend message Here
    axios.get('http://localhost:5000/')
    .then(response => setMessage(response.data)).catch(error => console.error('Error Connecting to backend', error));

  }, []);

  return (
    <div>
      <h1> Loan Application </h1>
      <p> Bharat ki Apni pasnad.. </p>
      <p>{message}</p>
    </div>
  );
}

export default App;