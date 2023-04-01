import React from 'react'
import Filter from '../Filter/FIlter'
import uniqid from 'uniqid';
import { useDispatch } from 'react-redux';
import {
    Table,
    Thead,
    Tbody,
    Card,
    CardBody,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Badge,
    Button,
    Stack
} from '@chakra-ui/react'
import './manageExpense.css'
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import {
    EditIcon, AddIcon, DeleteIcon
} from '@chakra-ui/icons'
import { DELETE_EXPENSE, UPDATE_EXPENSE } from '../../Store/Actions';
import { useState } from 'react';
import { useEffect } from 'react';


const ManageExpense = () => {
    useEffect(()=>{

    },[])
    let idx = 0;
    const data = useSelector(state => state)
    const [expenseData, setExpenseData] = useState(data);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const editHandler = (item) => {
        navigate(`/update-expense/${item}`)
    }

    const deleteHandler = (id) => {
        dispatch({
            type:DELETE_EXPENSE,
            id:id
        })
    }

    return (
        <div className='main'>
            <Filter expenseData={expenseData} setExpenseData={setExpenseData}/>
            <Card mt={30} ml={10} mr={10} className='card'>
                <CardBody>
                    <TableContainer mt={10}>
                        <Table variant='striped' colorScheme='blue'>
                            <TableCaption>Manage Expenses</TableCaption>
                            <Thead>
                                <Tr>
                                    <Th>Numberss</Th>
                                    <Th>Title</Th>
                                    <Th>Amount</Th>
                                    <Th>Type</Th>
                                    <Th>date</Th>
                                    <Th>Actions</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {expenseData.map((item) => {
                                    return <Tr key={uniqid()}>
                                        <Td>{++idx}</Td>
                                        <Td>{item.title}</Td>
                                        <Td>{item.amount}</Td>
                                        <Td>
                                            <Badge variant='outline' colorScheme={item.option === "Expense" ? 'red' : 'green'}>
                                                {item.option}
                                            </Badge></Td>
                                        <Td>{item.date}</Td>
                                        <Td >
                                            <Stack spacing={4} direction='row' align='center'>

                                                <Button onClick={()=> editHandler(item.id)} colorScheme='teal' size='sm'>
                                                    Edit
                                                </Button>
                                                <Button onClick ={()=> deleteHandler(item.id)}colorScheme='red' size='sm'>
                                                    Delete
                                                </Button>
                                            </Stack>
                                        </Td>
                                    </Tr>
                                })}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </CardBody>
            </Card>
        </div>
    )
}

export default ManageExpense
