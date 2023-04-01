import React from 'react'
import { NavLink } from 'react-router-dom'
import { Flex, Stack, Switch, Text } from '@chakra-ui/react'
import './header.css'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
const Header = () => {
    const navigate = useNavigate();


    const logout = () => {
        window.localStorage.clear();
        navigate('/login');
    }
    return (
        <div className='header'>
            <div className="heading"><h2>Manage Your Pocket</h2></div>
            <div className="links">
                {window.localStorage.getItem("token") &&
                <>
                <NavLink to="/">Manage</NavLink>
                <NavLink to="/add-expense">Add Expense</NavLink>
                </>
                }                      
                {window.localStorage.getItem("token") && <Stack direction='row'>
                    <Flex  className = 'switch' justifyContent='center' alignItems='center' gap='10px' onChange={()=> logout()}>
                        <Text>Logout</Text>
                        <Switch colorScheme='green' defaultChecked={true}/>
                    </Flex>
                </Stack>
                }   
            </div>
        </div>
    )
}

export default Header