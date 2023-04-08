import { GET_MESSAGES_API } from 'constants';
import { GET_ONLINE_USERS_API } from 'constants/services';
import { useContext, useEffect } from 'react';
import { OnlineUsersContext } from 'store';
import { SocketProvider } from 'store';
import { UserContext } from 'store';
import { socketContext } from 'store';
import { updateUsersAction } from 'store/onlineUsers/actions';
import { OnlineUsers } from 'components/OnlineUsers';
import { getBrieflyName } from 'utils/helper';
import { AllMessagesContext } from 'store/allMessages';
import { TypeMessageForm } from 'components/TypeMessageForm';
import Messages from '..//Messages';
import anonymousImg from 'assets/home/anonymous.jpg';

import './home.css';

function HomeComponent () {
  const { socket } = useContext(socketContext);
  const { user } = useContext(UserContext);
  const { dispatch, users } = useContext(OnlineUsersContext);
  const { setAllMessages } = useContext(AllMessagesContext);

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

  return (
    <div className='home-container'>
      <Messages />
      <OnlineUsers />
      <div className='wrapper-form'>
        <div className='images'>
          <img src={user.img || anonymousImg}/>
          <p>{getBrieflyName(user.name)}</p>
        </div>
        <TypeMessageForm />
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
