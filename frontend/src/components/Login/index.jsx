import { Modal } from 'components/ui/Modal';
import { PATHS } from 'constants';
import { SUPER_PHRASE } from 'constants/words';
import { useContext, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from 'store';
import { crateUserAction } from 'store/users/actions';
import { BgCanvas } from './BgCanvas';

import classes from './index.module.css';
import { socketContext } from 'store';

const Login = () => {
    const { dispatch } = useContext(UserContext);
    const [ isShowLinkToHome, setIsShowLinkToHome ] = useState(false);
    const valuesRef = useRef({
        code: '',
        name: '',
        img: ''
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        if(SUPER_PHRASE === valuesRef.current.code.toLowerCase()) {
            const { name, img } = valuesRef.current;
            dispatch(crateUserAction(name, img));
            setIsShowLinkToHome(true);
        };
    };

    const changeValues = (e) => {
        const { target: { value, name, files } } = e;
        if(name === 'img') {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = () => {
                valuesRef.current.img = reader.result;
            };
            reader.readAsDataURL(file);

        }
        valuesRef.current[name] = value;
    };

    return (
        <>
            {/* <BgCanvas /> */}
            <Modal>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <div className={classes.wrapperInput}>
                        <label htmlFor="name">your Name:</label>
                        <input id="name" name='name' type="text" onChange={changeValues}/>
                    </div>
                    <div className={classes.wrapperInput}>
                        <label htmlFor="code">Code of groop:</label>
                        <input id="code" name='code' type="text" onChange={changeValues}/>
                    </div>
                    <div className={classes.wrapperInput}>
                        <label htmlFor="img">select your Img:</label>
                        <input id="img" name='img' type="file" onChange={changeValues} />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </Modal>
            { isShowLinkToHome ? (
                <Modal>
                    <Link className={classes.linkToHome} to={PATHS.HOME}>are you sure you want to meet which people in this room</Link>
                </Modal>
              ) : null
            }
        </>
    );
};

export { Login };