import { useState, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home, Login, Signup} from 'components';
import { PATHS } from 'constants';
import { Fallback } from 'components/ui/'
import { PrivateRoute } from './PrivateRoute';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const ROUTES = [
    { path: PATHS.HOME, component: Home, isPrivate: true },
    { path: PATHS.LOG_IN, component: Login, isPrivate: false },
    { path: PATHS.SIGN_UP, component: Signup, isPrivate: false }
];

const Ape = () => {
    const [editorData, setEditorData] = useState('');

    const handleEditorChange = (event, editor) => {
      const data = editor.getData();
      setEditorData(data);
    }
    return (
        <div>
            <h2>CKEditor 5 Example</h2>
            <CKEditor
                editor={ClassicEditor}
                data={editorData}
                onChange={handleEditorChange}
            />
            <p>{editorData}</p>
        </div>
    );
};

const Views = () => {
    return (
        <Routes>
            <Route path='/ape' key={'/ape'} element={<Ape />}/>
            { ROUTES.map((el) => {
                const { path, component: Component, isPrivate } = el;
                return (
                    isPrivate ? (
                        <Route key={path} path={path} element={<PrivateRoute />}>
                            <Route
                                path={path}
                                element={
                                    <Suspense fallback={<Fallback />}>
                                        <Component />
                                    </Suspense>
                                }
                            />
                        </Route>
                    ) : (
                        <Route
                            key={path}
                            path={path}
                            element={
                            <Suspense fallback={<Fallback />}>
                                <Component />
                            </Suspense>
                            }
                        />
                    )
                )
            })}
        </Routes>
    );
};

export default Views;