/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  TagLabel,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import Cards from "../Components/Cards";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [data, setData] = useState([]);

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  let token = localStorage.getItem("token");
  console.log("token:", token);

  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const [location, setLocation] = useState("");

  const [price, setPrice] = useState();

  const [bedrooms, setBedrooms] = useState();


const [occupancy,setOccupancy] = useState()



  const getData = async (search) => {
    if (search === "") {
     await fetch(`http://localhost:8000/prop`, {
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
    } else {
      
        await  fetch(`http://localhost:8000/prop/search?q=${search}`, {
        headers: {
          "Authorization": token,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setData(res);
        }).catch(err=> console.log(err.message));
    }
  };

  useEffect(() => {
    getData(search);
  }, [search]);

  const submitHandle = async() =>{
        let newObj = {
            title,
            description,
            location,
            price,
            size:{
                bedrooms,
                occupancy
            },
        }
        
        console.log('newObj:', newObj)

        await fetch("http://localhost:8000/prop/addprop",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":token
            },
             body: JSON.stringify(newObj)
         })
         .then(res=> res.json())
         .then(res=> {
            console.log(res)
            onClose();
            window.location.reload()
        })
         .catch(err=> console.log(err))
  }


  return (
    <Box>
      <Navbar />
      <Box>
        <br />
        <Center>
          <Heading color={"#4285f4"}>Property</Heading>
        </Center>
        <br />
        <Box 
         display={"flex"}
         justifyContent={"space-around"}
         alignItems={"center"}
         gap={10}
        >
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            gap={10}
          >
            <Text fontSize={"15px"} color={"#4285f4"} fontWeight={"bold"}>
              Property Search :
            </Text>
            <Input
              type="text"
              placeholder="Search Property"
              htmlSize={{ base: "50", sm: "30", md: "40", lg: "50" }}
              width="auto"
              bg={"white"}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Box>
          <Button fontSize={"md"} bg={"whatsapp.200"} fontWeight={"bold"} onClick={onOpen}>
            Add Property
          </Button>
        </Box>
        <br />
        <Box
          w="95%"
          margin={"auto"}
          display={"grid"}
          gridTemplateColumns={{
            sm: "repeat(1,1fr)",
            md: "repeat(2,1fr)",
            lg: "repeat(3,1fr)",
          }}
          gap="30px"
        >
          {data && data.map((el, i) => <Cards key={i} el={el} />)}
        </Box>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Property</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <FormControl isRequired>
            <FormLabel>Title</FormLabel>
            <Input type='text' placeholder='Property Title...' onChange={(e)=>setTitle(e.target.value)} />
            
            </FormControl>
            <br/>
            <FormControl isRequired>
            <FormLabel>Description Of Property</FormLabel>
            <Textarea placeholder="Property Description" onChange={(e)=>setDescription(e.target.value)} />
            </FormControl>

            <br/>
            <FormControl isRequired>
            <FormLabel>Location</FormLabel>
            <Input type='text' placeholder='Property Location' onChange={(e)=>setLocation(e.target.value)} />
            
            </FormControl>

            <br/>
            <FormControl isRequired>
            <FormLabel>Price</FormLabel>
            <Input type='number' placeholder='Property Price per night' onChange={(e)=>setPrice(e.target.value)} />
            
            </FormControl>

            <br/>
            <FormControl isRequired>
            <FormLabel>Bedroom</FormLabel>
            <Input type='number' placeholder='Property Bedrooms' onChange={(e)=>setBedrooms(e.target.value)} />
            
            </FormControl>

            <br/>
            <FormControl isRequired>
            <FormLabel>Occupancy</FormLabel>
            <Input type='number' placeholder='Property occupancy' onChange={(e)=>setOccupancy(e.target.value)} />
            
            </FormControl>

            
          </ModalBody>


          <ModalFooter>

          <Button colorScheme='whatsapp' mr={3} onClick={submitHandle}>
              Submit
            </Button>

            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Dashboard;
