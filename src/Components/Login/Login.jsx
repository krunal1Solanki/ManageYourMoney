import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Card, CardHeader, CardBody, Heading } from '@chakra-ui/react'
import { Input, HStack, Stack, Text, InputRightElement, Button, InputGroup } from '@chakra-ui/react'
import { useState } from 'react'
import './login.css'
import { client } from '../../Client'


const Login = () => {
    const navigate = useNavigate();
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState(false);

    const changeHandler = (event) => {
        const { value, name } = event.target;
        name === "password" ? setPassword(value) : setEmail(value);
    }

    const submitHandeler = () => {
        const body = {
            email,
            password
        }

        client.post("/login",body)
        .then((resp) => {
            window.localStorage.setItem("token", resp.data.token);
            navigate('/');
        })
        .catch((error) => setErrorMsg(true))
    } 
    return (
        <div>
            {window.localStorage.getItem("token") ? (
                <Navigate to="/" replace />
            ) : (
                <div className='form'>
                    <Card variant="filled" maxW="md" width="100%">
                        <CardHeader>
                            <Heading size='md'>Login</Heading>
                        </CardHeader>

                        <CardBody>
                            <Stack spacing={3}>
                                <Input placeholder='Enter Email' size='md' name="email" value={email} onChange={changeHandler} />
                            </Stack><InputGroup size='md'>
                                <Input
                                    pr='4.5rem'
                                    type={show ? 'text' : 'password'}
                                    placeholder='Enter password'
                                    name="password"
                                    value={password}
                                    onChange={changeHandler}
                                />
                                <InputRightElement width='4.5rem'>
                                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                                        {show ? 'Hide' : 'Show'}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                            <HStack>
                                <Button mt={2}  backgroundColor={"black"}  onClick={()=>submitHandeler()} colorScheme='twitter' >
                                    Submit
                                </Button>
                                {errorMsg && <Text>Invalid Credentials</Text>}
                            </HStack>
                        </CardBody>
                    </Card>
                </div>


            )}
        </div>
    )
}

export default Login
