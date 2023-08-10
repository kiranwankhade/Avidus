import { Box, Button, Card, CardBody, Center, Heading, Image, Input, Stack, Text, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const SinglePage = () => {
    const {id} = useParams();
    console.log('id:', id)
    let token = localStorage.getItem("token");

    const [data,setData] = useState({});
    const toast = useToast()
    const getData = async(id)=>{
    
        await fetch(`http://localhost:8000/prop/${id}`, {
            method:'GET',
            headers: {
              Authorization: token,
            },
          })
            .then((res) => res.json())
            .then((res) => {
              console.log(res);
              setData(res);
            }).catch(err=> console.log(err.message));
    }
    const handleAlert = ()=>{
        toast({
            title: "Booked",
            status: 'success',
            isClosable: true,
            position:'top-right'
          })
    }
    useEffect(()=>{
        getData(id);
    },[id]);
    console.log("data",data);
  return (
    <>
    <Box maxH={'md'}>
        <Center><Heading color={'#4285f4'}>Property Details</Heading></Center>
        <br/>
        <Box maxH={'100vh'} display={'flex'} w={'90%'} m={'auto'} flexDirection={{lg:'row' , sm:'column',md:'row'}} justifyContent={'space-around'} alignItems={'center'} gap={10}>
          <Box flex={1}>
            <Image
                src={`https://a0.muscache.com/im/pictures/miso/Hosting-26117817/original/9da40e3c-5846-4359-bb41-05c27b09a8f5.jpeg?im_w=1200`}
                alt=''
                borderRadius='lg'
                w={'100%'}
                />
          </Box>
          <Box  flex={1} display={'flex'} flexDirection='column' justifyContent={'space-around'} alignItems={{lg:'baseline',sm:'center',md:'baseline'}} textAlign={'justify'} gap={5}>
          <Heading size='lg'>{data.title}</Heading>
          <Text>
              <Heading size={'md'}>Overview :</Heading> 
              <br/>
              {data.description}
          </Text>
          <Text>
              <Heading size={'md'}>Location</Heading>
              <br/>
              {data.location}
          </Text>
          <Text >
              <Heading size={'md'}>Price :</Heading>
              <br/>
              {`₹ ${data.price} per Night`}
          </Text>

          <Text>
            <Heading>Start Date</Heading>
            <Input type='date' placeholder='Add starting Date' />
          </Text>

          <Text>
            <Heading>End Date</Heading>
            <Input type='date' placeholder='Add End Date' />
          </Text>
        
              <Button onClick={handleAlert} colorScheme='blue'>Book Now </Button>
          </Box>
        </Box>
    </Box>
    </>
  )
}

export default SinglePage