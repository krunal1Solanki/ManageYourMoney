import React, { useState } from 'react'
import { Card, Input, CardBody, Select, Flex, Button, filter } from '@chakra-ui/react'
import './filter.css'
import { useSelector } from 'react-redux';


const Filter = ({ expenseData, setExpenseData }) => {
    const [date, setDate] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [option, setOption] = useState(null);
    const store = useSelector(state => state)

    const changeHandler = (event) => {
        const { name, value } = event.target;
        console.log(name, value);
        if (name === "date") setDate(value);
        else if (name === "month") setMonth(value);
        else if (name === "year") setYear(value);
        else if (name === "option") setOption(value);

    }

    const applyFilter = () => {
        const newData = store.filter((item) => {
          const dateString = item.date;
          const dateObj = new Date(dateString);
          const currMonth = dateObj.getMonth() + 1;
          const currDate = dateObj.getDate();
          const currYear = dateObj.getFullYear();
          console.log(item.option, option);
          console.log('item date',currDate);
          console.log('searched date', date);
          if (
            (date.length == 0 || date == currDate) &&
            (month.length == 0 || month == currMonth) &&
            (year.length == 0 || year == currYear) &&
            (option == null || option == '' || option == item.option)
          ) {
            return item;
          }
        });
      
        console.log(newData);
        setExpenseData(newData);
      };


    return (
        <div className='search-box'>
            <Card>
                <CardBody>
                    <Flex>
                        <Input htmlSize={8} width='auto' mr={3} readOnly value='Filter' color='white' background='black' />
                        <Input htmlSize={10} width='auto' placeholder="date.." name="date" value={date} onChange={changeHandler} />
                        <Input ml={3} htmlSize={10} width='auto' placeholder="month.." name="month" onChange={changeHandler} />
                        <Input ml={3} htmlSize={10} width='auto' placeholder='year..' name="year" onChange={changeHandler} />
                        <Select ml={3} name="option" onChange={changeHandler} placeholder={'Select option' || option}>
                            <option value='Income'>Income</option>
                            <option value='Expense'>Expense</option>
                        </Select>
                        <Button ml={3} onClick={()=>applyFilter()} colorScheme='teal' size='sm'>
                            Search
                        </Button>
                        
                        <Button ml={3} onClick={() => setExpenseData(store)} colorScheme='teal' size='sm'>
                            Reset
                        </Button>
                    </Flex>
                </CardBody>
            </Card>
        </div>

    )
}

export default Filter