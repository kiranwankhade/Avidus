import {
    Box,
    Flex,
    Avatar,
    Text,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack,
    useColorMode,
    Center,
  } from "@chakra-ui/react";
  
  import { MoonIcon, SunIcon } from "@chakra-ui/icons";
  
  import React from "react";
  import { useNavigate } from 'react-router-dom';
  
  export default function Navbar() {
  
    const navigate = useNavigate()
  
    const { colorMode, toggleColorMode } = useColorMode();

    const logout = () => {
        navigate("/")
    }

    return (
      <>
        <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
          <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
            <Text fontSize={'lg'} fontWeight={'bold'} color={'#3182ce'} onClick={()=>{
                navigate("/dashboard")
            }}>BOOK YOUR HOME(WHILE TRAVELING)</Text>
  
            <Flex alignItems={"center"}>
              <Stack direction={"row"} spacing={7}>
                <Button onClick={toggleColorMode}>
                  {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                </Button>
  
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                  >
                    <Avatar size={"sm"} src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQCX5_wYEa6hyWoqSBOaPbaHw5Ff8Ljp0WcA&usqp=CAU"} />
                  </MenuButton>
                  <MenuList alignItems={"center"}>
                    <br />
                    <Center>
                      <Avatar
                        size={"2xl"}
                        src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQCX5_wYEa6hyWoqSBOaPbaHw5Ff8Ljp0WcA&usqp=CAU"}
                      />
                    </Center>
                    <br />
                    <Center>
                      <p>Username</p>
                    </Center>
                    <br />
                    <MenuDivider />
                    <MenuItem onClick={()=>{
                        navigate("/user")
                    }}>Profile</MenuItem>
                    <MenuItem>Account Settings</MenuItem>
                    <MenuItem onClick={()=>{
                      logout()
                    }}>Logout</MenuItem>
                  </MenuList>
                </Menu>
              </Stack>
            </Flex>
          </Flex>
        </Box>
      </>
    );
  }
  