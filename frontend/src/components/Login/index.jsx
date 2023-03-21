import { VStack, ButtonGroup, Button, Heading } from '@chakra-ui/react';
import { PATHS } from 'constants';
import { Formik, Form } from 'formik';
import { useNavigate, Link } from 'react-router-dom';
import * as Yup from 'yup';
import { TextField } from './TextFaild';

const Login = () => {
    const navigate = useNavigate();

    const submit = (values, action) => {
        console.log('onSubmit params --> ', { values, action })
        action.resetForm()
    };

    const validationSchema = Yup.object({
        username: Yup.string()
            .required('Username is required')
            .min(6, 'username too short')
            .max(28, 'username too long'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'password too short')
            .max(28, 'password too long')    
    });

    return (
        <Formik
            initialValues={{ username: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={submit}
        >
            <VStack
                as={Form}
                w={{ base: '90%', md: '500px' }}
                m='auto'
                justify='center'
                h='100vh'
                spacing='1rem'
            >
                <Heading>log In</Heading>

                <TextField
                    name='username'
                    placeholder='Enter username'
                    autoComplete='off'
                    lable='Username'
                />
                <TextField
                    name='password'
                    placeholder='Enter password'
                    autoComplete='off'
                    lable='Password'
                />

                <ButtonGroup pt='10px'>
                    <Button colorScheme='teal' type='submit'>Log In</Button>
                    <Link to={PATHS.SIGN_UP}><Button>Craete Accoutn</Button></Link>
                </ButtonGroup>
            </VStack>
        </Formik>
    );
};

export { Login };