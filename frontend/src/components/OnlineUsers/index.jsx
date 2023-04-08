
import { useContext, useEffect, useState } from 'react';
import { OnlineUsersContext, socketContext } from 'store';
import { ArrowDown } from 'assets/svg/ArrowDown';
import { ArrowTop } from 'assets/svg/ArrowTop';
import { isTypingAction } from 'store/onlineUsers/actions';
import anonymousImg from 'assets/home/anonymous.jpg';
import classes from './index.module.css';

const OnlineUsers = () => {
    const [ isOpen, setIsOpen ] = useState(true);
    const { users, dispatch } = useContext(OnlineUsersContext);
    const { socket } = useContext(socketContext);

    useEffect(() => {
        if(socket) {
            socket.on('isTyping', ({socketId, isTyping}) => {
                dispatch(isTypingAction(socketId, isTyping));
            });
        };
    }, [socket]);

    if(users.length === 0) return null;

    return (
        <div className={classes.onlineUsersBlock}>
            <div className={classes.btnWrapper}>
                <button
                    className={classes.btnToCheckUsers}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    see online users {isOpen ? <ArrowTop /> : <ArrowDown />}
                </button>
            </div>
            { isOpen && (
                <div className={classes.onlineUsers}>
                    { users.map(user => (
                        <div className={classes.onlineUser} key={user.id}>
                            <div className={classes.wrapperNameImage}>
                                <p>{user.name}</p>
                                <img src={user.img || anonymousImg}/>
                            </div>
                            {user.isTyping && (
                                <p className={classes.typingWrapper}>
                                    <span className={classes.typing}>Typing</span>
                                    <span className={classes.spread}>...</span>
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export { OnlineUsers };