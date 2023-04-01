import React from 'react'

import { Card, CardHeader, CardBody, Heading, Select, Flex } from '@chakra-ui/react'
import { Input, HStack, Stack, Text, InputRightElement, Button, InputGroup } from '@chakra-ui/react'
import { useState } from 'react'
import { ADD_EXPENSE, DELETE_EXPENSE, UPDATE_EXPENSE } from '../../Store/Actions'
import { useDispatch } from 'react-redux'
import { CheckIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import './addExpense.css'
const AddExpense = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [addMsg, setAddMsg] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        date: "",
        amount: 0,
        option: null,
    })

    useEffect(()=>{
        setIt();
    }, [])
    
    const setIt = () => {
        setAddMsg(false);
    }

    const submitHandeler = () => {
        dispatch({
            type: ADD_EXPENSE,
            data: formData
        })
        setAddMsg(true);
        navigate('/')
    }
    const changeHandler = (event) => {
        const { name, value } = event.target;
        const newForm = { ...formData, [name]: value };
        setFormData(newForm);
    }


    return (
        <div className='form'>
            <Card variant="elevated" maxW="md" width="100%">
                <CardHeader>
                    <Heading size='md'>Add Expense</Heading>
                </CardHeader>
                <CardBody >
                    <InputGroup size='md'>
                        <Flex flexDir="column" alignItems="center" justifyContent="center">
                            <Input
                                w={400}
                                placeholder='Enter title'
                                name="title"
                                value={formData.title}
                                onChange={changeHandler}
                            />
                            <Input
                                mt={3}
                                placeholder='Enter amount'
                                name="amount"
                                value={formData.amount}
                                onChange={changeHandler}
                            />
                            <Select name="option" mt={3} onChange={changeHandler} placeholder={'Select option' || formData.option}>
                                <option value='Income'>Income</option>
                                <option value='Expense'>Expense</option>
                            </Select>
                            <Input
                                mt={3}
                                placeholder='Enter Date'
                                name="date"
                                type="date"
                                value={formData.date}
                                onChange={changeHandler}
                            />
                        </Flex>
                    </InputGroup>
                    <HStack>
                        <Button mt={2} backgroundColor={"black"} onClick={() => submitHandeler()} colorScheme='twitter' >
                            Submit
                        </Button>                        
                    </HStack>
                    
                    {addMsg && <Flex align="center" mt={4}>
                        <CheckIcon mr={2}  />
                        <Text>Added Successfully</Text>
                    </Flex>
                    }
                </CardBody>
            </Card>
        </div>
    )
}

export default AddExpense