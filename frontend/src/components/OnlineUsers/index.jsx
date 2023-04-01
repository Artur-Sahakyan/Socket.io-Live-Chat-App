
import { useContext, useState } from 'react';
import { OnlineUsersContext } from 'store';
import { ArrowDown } from 'assets/svg/ArrowDown';
import { ArrowTop } from 'assets/svg/ArrowTop';
import classes from './index.module.css';

const OnlineUsers = () => {
    const [ isOpen, setIsOpen ] = useState(false);
    const { users } = useContext(OnlineUsersContext);

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
                    { users.map((user) => (
                        <div className={classes.onlineUser}>
                            <p>{user.name}</p>
                            <img src={user.img}/>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export { OnlineUsers };