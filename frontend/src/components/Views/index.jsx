import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home, Login, Signup} from 'components';
import { PATHS } from 'constants';
import { Fallback } from 'components/ui/'
import { PrivateRoute } from './PrivateRoute';

const ChatRoom = lazy(() => import('components/ChatRoom'));

const ROUTES = [
    { path: PATHS.HOME, component: Home, isPrivate: true },
    { path: PATHS.LOG_IN, component: Login, isPrivate: false },
    { path: PATHS.SIGN_UP, component: Signup, isPrivate: false },
    { path: PATHS.CHAT_ROOM, component: ChatRoom, isPrivate: false },
];

const Views = () => {
    return (
        <Routes>
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