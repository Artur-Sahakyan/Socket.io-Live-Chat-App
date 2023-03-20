import *as React from 'react';
import { socketContext } from '../../socket';

function Home () {
  const [value, setValue] = React.useState('');
  const [allMessages, setAllMessages] = React.useState([]);
  const { socket } = React.useContext(socketContext);

  React.useEffect(() => {
    if(socket) {
      socket.on("connect", () => {
        socket.on("getMessage", (message) => {
          setAllMessages([...allMessages, message])
        });
      });
    };
  }, []);

  
  function submit (e) {
    e.preventDefault();
    socket.emit('message', value);
    setAllMessages([...allMessages, value])
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
       <button onClick={submit}>send</button>
       { allMessages.map((msg, i) => <p key={i}>{msg}</p>) }
     </div>
  )
}

export default Home;