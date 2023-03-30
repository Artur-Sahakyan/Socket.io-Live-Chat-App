import { GET_MESSAGES_API } from 'constants';
import { GET_ONLINE_USERS_API } from 'constants/services';
import { useState, useContext, useEffect } from 'react';
import { OnlineUsersContext } from 'store';
import { SocketProvider } from 'store';
import { UserContext } from 'store';
import { socketContext } from 'store';
import { updateUsersAction } from 'store/onlineUsers/actions';
import Messages from '..//Messages';

import './home.css';

function HomeComponent () {
  const [ value, setValue ] = useState('');
  const [ allMessages, setAllMessages ] = useState([]);
  const { socket } = useContext(socketContext);
  const { user } = useContext(UserContext);
  const { dispatch, users } = useContext(OnlineUsersContext);

  console.log('online users --> ', users);

  useEffect(() => {
    if(socket) {
      fetch(GET_MESSAGES_API)
        .then(res => res.json())
        .then(data => setAllMessages(data));

      fetch(GET_ONLINE_USERS_API)
        .then(res => res.json())
        .then(usersss => dispatch(updateUsersAction(usersss)));

      socket.emit('createUser', user);

      socket.on("getMessages", (messages) => {
        setAllMessages(messages);
      });

      socket.on("createUser", (usersss) => {
        dispatch(updateUsersAction(usersss));
      });
    };

  }, []);

  function submit(e) {
    e.preventDefault();
    socket.emit('message', value);
    setAllMessages([...allMessages, value]);
    setValue('');
  };

  return (
    <div className='home-container'>
      <div className='images'>
          <img src={user.img}/>
      </div>
      <Messages allMessages={allMessages}/>
      <form className='form'>
        <input
          type='text'
          placeholder='Enter Room Name'
          value={value}
          onChange={e => setValue(e.target.value)}
          className='text-input-field'
        />
        <button
          className="text-button-field"
          onClick={submit}
        >
          send
        </button>
      </form>
    </div>
  );
}


const Home = () => (
  <SocketProvider>
    <HomeComponent />
  </SocketProvider>
)
export { Home };
