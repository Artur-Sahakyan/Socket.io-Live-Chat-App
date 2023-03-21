import classes from './index.module.css';
import ClipLoader from 'react-spinners/ClipLoader';

export const Fallback = () => (
    <div className={classes.fallback}>
      <ClipLoader
        color="#3F51B5"
        loading={true}
        size={100}
        height={100}
        width={100}
      />
    </div>
);