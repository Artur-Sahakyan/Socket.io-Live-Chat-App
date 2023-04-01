import { GET_MESSAGES_API } from 'constants';
import { GET_ONLINE_USERS_API } from 'constants/services';
import { useState, useContext, useEffect } from 'react';
import { OnlineUsersContext } from 'store';
import { SocketProvider } from 'store';
import { UserContext } from 'store';
import { socketContext } from 'store';
import { updateUsersAction } from 'store/onlineUsers/actions';
import { OnlineUsers } from 'components/OnlineUsers';
import Messages from '..//Messages';

import './home.css';
import { getBrieflyName } from 'utils/helper';

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
        .then(users => dispatch(updateUsersAction(users, socket.id)));

      socket.emit('createUser', user);

      socket.on("getMessages", (messages) => {
        setAllMessages(messages);
      });

      socket.on("createUser", (users) => {
        dispatch(updateUsersAction(users,  socket.id));
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
      <Messages allMessages={allMessages}/>
      <OnlineUsers />
      <div className='wrapper-form'>
        <div className='images'>
          <img src={user.img}/>
          <p>{getBrieflyName(user.name)}</p>
        </div>
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
    </div>
  );
}


const Home = () => (
  <SocketProvider>
    <HomeComponent />
  </SocketProvider>
);

export { Home };
