import { useState, useContext, useEffect } from 'react';
import { socketContext } from 'store';

import './home.css'

function Home () {
  const [value, setValue] = useState('');
  const [allMessages, setAllMessages] = useState([]);
  const { socket } = useContext(socketContext);

  useEffect(() => {
    if(socket) {
        socket.on("getMessage", (message) => {
          setAllMessages([...allMessages, message])
        });
    };
  }, []);

  function submit (e) {
    e.preventDefault();
    socket.emit('message', value);
    setAllMessages([...allMessages, value]);
  };

  return (
    <div className='home-container'>
       <input 
          type = 'text'
          placeholder='Enter Room Name'
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className='text-input-field'
       />
       <button 
          className="text-button-field"
          onClick={submit}>send
       </button>
       { allMessages.map((msg, i) => <p key={i}> {[msg] } </p> )}
     </div>
  )
}

export { Home };