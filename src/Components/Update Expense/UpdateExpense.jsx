import React from 'react'

import { Card, CardHeader, CardBody, Heading, Select, Flex } from '@chakra-ui/react'
import { Input, HStack, Stack, Text, InputRightElement, Button, InputGroup } from '@chakra-ui/react'
import { useState } from 'react'
import { ADD_EXPENSE, DELETE_EXPENSE, UPDATE_EXPENSE } from '../../Store/Actions'
import { useDispatch } from 'react-redux'
import { CheckIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import uniqid from 'uniqid';
const UpdateExpense = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const store = useSelector((state)=>state);

    
    const [addMsg, setAddMsg] = useState(false);
    const [formItem, setFormItem] = useState({
        title: "",
        date: "",
        amount: "",
        option: null,
    })

    // use params
    const { item } = useParams();

    const fetchData = () => {
        store.map((data) =>{
            if(data.id == item) {
                const newForm = {
                    title: data.title,
                    date: data.date,
                    amount: data.amount,
                    option: data.option,
                    id: uniqid()
                }
                console.log(data.option);
                setFormItem(newForm);
            }
        } )
    }
    // use selector

    useEffect(()=>{
        fetchData();
        setIt();
    }, [])
    
    const setIt = () => {
        setAddMsg(false);
    }


    const submitHandeler = () => {
        dispatch({
            type: UPDATE_EXPENSE,
            item: formItem,
            id : item,
        })
        setAddMsg(true);
        navigate('/')
    }
    const changeHandler = (event) => {
        const { name, value } = event.target;
        const newForm = { ...formItem, [name]: value };
        setFormItem(newForm);
    }


    return (
        <div className='form'>
            <Card variant="elevated" maxW="md" width="100%">
                <CardHeader>
                    <Heading size='md'>Update Expense</Heading>
                </CardHeader>
                <CardBody >
                    <InputGroup size='md'>
                        <Flex flexDir="column" alignItems="center" justifyContent="center">
                            <Input
                                w={400}
                                placeholder='Enter title'
                                name="title"
                                value={formItem.title}
                                onChange={changeHandler}
                            />
                            <Input
                                mt={3}
                                placeholder='Enter amount'
                                name="amount"
                                value={formItem.amount}
                                onChange={changeHandler}
                            />
                            <Select name="option" mt={3} onChange={changeHandler} placeholder={'Select option' || formItem.option}>
                                <option value='Income'>Income</option>
                                <option value='Expense'>Expense</option>
                            </Select>
                            <Input
                                mt={3}
                                placeholder='Enter Date'
                                name="date"
                                type="date"
                                value={formItem.date}
                                onChange={changeHandler}
                            />
                        </Flex>
                    </InputGroup>
                    <HStack>
                        <Button mt={2} backgroundColor={"black"} onClick={() => submitHandeler()} colorScheme='twitter' >
                            Update
                        </Button>                        
                    </HStack>
                    
                    {addMsg && <Flex align="center" mt={4}>
                        <CheckIcon mr={2}  />
                        <Text>Updated Successfully</Text>
                    </Flex>
                    }
                </CardBody>
            </Card>
        </div>
    )
}

export default UpdateExpense