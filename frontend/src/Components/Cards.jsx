import {
  Box,
  Button,
  Card,
  CardBody,
  CircularProgress,
  CircularProgressLabel,
  Heading,
  Image,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Cards = ({ el }) => {
// console.log('el:', el)

  const navigate = useNavigate();
  const toast = useToast()
  const handleAlert = ()=>{
      toast({
          title: "Booked",
          status: 'success',
          isClosable: true,
          position:'top-right'
        })
  }


  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      transition={"transform .2s"}
      _hover={{ transform: "scale(1.05)" }}
    >
      <Card maxW="sm">
        <CardBody onClick={() => navigate(`/singlepage/${el._id}`)}>
                <Stack mt='6' spacing='3'>
                <Heading size='sm' textAlign={"center"}>{el.title}</Heading>
                <Box display={"flex"} flexDirection={'column'} justifyContent={"space-around"}>
                    <Box>
                        <label htmlFor="">Details</label>
                        <Text>{el.description}</Text>
                    </Box>
                    <Box>
                        <label>bedrooms</label>
                        <Text>{el.size.bedrooms}</Text>
                    </Box>
                    <Box>
                        <label>Guest</label>
                        <Text>{el.size.occupancy}</Text>
                    </Box>
                </Box>
                {/* <Button onClick={handleAlert}>Book Now</Button> */}
                </Stack>
        </CardBody>
      </Card>
    </Box>
  );
};

export default Cards;
