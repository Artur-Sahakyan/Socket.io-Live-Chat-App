import { useContext, useRef, useState } from "react";
import { UserContext } from "store";
import { socketContext } from "store";
import { AllMessagesContext } from "store/allMessages";

const TypeMessageForm = () => {
    const [ value, setValue ] = useState('');
    const { socket } = useContext(socketContext);
    const { setAllMessages, allMessages } = useContext(AllMessagesContext);
    const { user } = useContext(UserContext);

    const timeoutId = useRef(null);

    function submit(e) {
      e.preventDefault();
      const message = {text: value, userId: user.id};

      console.log('user --> ', user)
      socket.emit('message', message);
      setAllMessages([...allMessages, message]);
      socket.emit('isTyping', { socketId: socket.id, isTyping:false });
      setValue('');
    };

    function changeValue (event) {
      const { target: { value }} = event;
      setValue(value);

      if(timeoutId.current) {
        clearInterval(timeoutId.current);
      };

      socket.emit('isTyping', { socketId: socket.id, isTyping: true });

      timeoutId.current = setTimeout(() => {
        socket.emit('isTyping', { socketId: socket.id, isTyping: false });
      }, 4000);
    };

    return (
        <form className='form'>
          <input
            type='text'
            placeholder='Enter Room Name'
            value={value}
            onChange={changeValue}
            className='text-input-field'
          />
          <button
            className="text-button-field"
            onClick={submit}
          >
            send
          </button>
        </form>
    );
};

export { TypeMessageForm };