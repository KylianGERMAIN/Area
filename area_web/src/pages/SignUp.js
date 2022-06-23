import {useNavigate} from "react-router";
import SocialsButton from "./SocialsButton";
import httpRequest from "../Functions/requestHttp";
import {useState} from "react";
import {toast} from "react-toastify";

import {
  Center,
  Button,
  VStack,
  Text,
  Box,
  Grid,
  Input,
  GridItem,
} from "@chakra-ui/react";

export default function SignUp() {
  const [username, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const toSignIn = async () => {
    navigate("/");
  };

  const createUser = async () => {
    const toastId = toast.loading("User being created", {draggable: true});
    httpRequest(
      process.env.REACT_APP_CREATE_USER,
      {
        email: email,
        password: password,
        username: username,
      },
      {},
      "post"
    )
      .then((value) => {
        toast.update(toastId, {
          render: value.data.msg,
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      })
      .catch((error) => {
        toast.update(toastId, {
          render: error.data.message,
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      });
  };

  return (
    <Center width={"100vw"} height={"100vh"}>
      <VStack align="stretch">
        <Box
          w={[400, 500, 600, 700, 800, 900, 1000]}
          h={[400, 500, 600, 800]}
          boxShadow="dark-lg"
          borderRadius="30"
        >
          <Grid templateColumns="repeat(5, 1fr)">
            <GridItem
              colSpan={1}
              h={[400, 500, 600, 800]}
              bg="#7cbbda"
              borderLeftRadius="30"
              p={10}
            >
              <Center h={[400, 500, 600, 800]}>
                <VStack spacing="40px">
                  <Box>
                    <Text
                      color="white"
                      fontWeight={"bold"}
                      textAlign="center"
                      fontSize={{base: "24px", md: "40px", lg: "56px"}}
                    >
                      Welcome Back !
                    </Text>
                  </Box>
                  <Box>
                    <Text
                      textAlign="center"
                      color="white"
                      fontWeight={"bold"}
                      fontSize={{base: "15px", md: "20px", lg: "26px"}}
                    >
                      To keep connect with us, please login.
                    </Text>
                  </Box>
                  <Button
                    onClick={toSignIn}
                    bg="#469fc9"
                    color="#fff"
                    width="100%"
                    fontSize={{base: "15px", md: "15px", lg: "20px"}}
                    height={55}
                    _hover={{bg: "#7cbbda"}}
                    border="1px"
                  >
                    Sign In
                  </Button>
                </VStack>
              </Center>
            </GridItem>
            <GridItem
              h={[400, 500, 600, 800]}
              colStart={2}
              colEnd={6}
              borderRightRadius="30"
              bg="white"
            >
              <Center h={[400, 500, 600, 800]}>
                <VStack spacing="20px">
                  <Center h={[50, 100, 200]}>
                    <Text
                      fontSize={{base: "24px", md: "40px", lg: "56px"}}
                      textAlign="center"
                    >
                      Create Account
                    </Text>
                  </Center>
                  <Input
                    w={[100, 200, 300, 400]}
                    placeholder="Username"
                    onChange={(event) => {
                      setUser(event.target.value);
                    }}
                    bg="#F2F2F2"
                  />
                  <Input
                    w={[100, 200, 300, 400]}
                    placeholder="Email..."
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                    bg="#F2F2F2"
                  />
                  <Input
                    w={[100, 200, 300, 400]}
                    type="password"
                    placeholder="Password..."
                    onChange={(event) => {
                      setPassword(event.target.value);
                    }}
                    bg="#F2F2F2"
                  />
                  <Box>
                    <Button
                      onClick={createUser}
                      bg="#469fc9"
                      color="#fff"
                      width="200px"
                      fontSize={{base: "15px", md: "15px", lg: "20px"}}
                      height={55}
                      _hover={{bg: "#7cbbda"}}
                      border="1px"
                    >
                      Log In
                    </Button>
                  </Box>

                  <Center h={[25]}></Center>
                  <SocialsButton/>
                </VStack>
              </Center>
            </GridItem>
          </Grid>
        </Box>
      </VStack>
    </Center>
  );
}
