import {useNavigate} from "react-router";
import {useState} from "react";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../firebase-config";
import SocialsButton from "./SocialsButton";
import httpRequest from "../Functions/requestHttp";
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

export default function SignIn() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const navigate = useNavigate();

  const toCreate = async () => {
    navigate("/create");
  };

  const toLog = async () => {
    const toastId = toast.loading("Connection...", {draggable: true});
    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      .then((user) => {
        localStorage.setItem("tokenID", user._tokenResponse.idToken);
        httpRequest(
          process.env.REACT_APP_SIGN_USER,
          {},
          {
            tokenid: `Bearer ${user._tokenResponse.idToken}`,
          },
          "post"
        )
          .then((value) => {
            toast.update(toastId, {
              render: "Connected",
              type: "success",
              isLoading: false,
              autoClose: 3000,
            });
            navigate("/home", {state: {email: user.user.email}});
          })
          .catch((error) => {
            console.log("error 1", error);
            toast.update(toastId, {
              render: error.data.msg,
              type: "error",
              isLoading: false,
              autoClose: 3000,
            });
          });
      })
      .catch((error) => {
        console.log(error);
        let msg = error.code;

        switch (msg) {
          case "auth/wrong-password": {
            msg = "Wrong password";
            break;
          }
          case "auth/user-not-found": {
            msg = "Unknown user";
            break;
          }
          default: {
            break;
          }
        }
        toast.update(toastId, {
          render: msg,
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
              h={[400, 500, 600, 800]}
              colSpan={3}
              borderLeftRadius="30"
              bg="white"
            >
              <Center h={[400, 500, 600, 800]}>
                <VStack spacing="20px">
                  <Center h={[50, 100, 200]}>
                    <Text fontSize={{base: "24px", md: "40px", lg: "56px"}}>
                      Sign in to AREA
                    </Text>
                  </Center>
                  <Input
                    w={[100, 200, 300, 400]}
                    placeholder="Email..."
                    onChange={(event) => {
                      setLoginEmail(event.target.value);
                    }}
                    bg="#F2F2F2"
                    p={6}
                    mt={10}
                  />
                  <Input
                    w={[100, 200, 300, 400]}
                    type="password"
                    placeholder="Password..."
                    onChange={(event) => {
                      setLoginPassword(event.target.value);
                    }}
                    bg="#F2F2F2"
                    p={6}
                  />
                  <Box>
                    <Button
                      onClick={toLog}
                      bg="#469fc9"
                      color="#fff"
                      width="200px"
                      fontSize={{base: "15px", md: "15px", lg: "20px"}}
                      height={55}
                      _hover={{bg: "#7cbbda"}}
                      border="1px"
                      p={6}
                    >
                      Log In
                    </Button>
                  </Box>

                  <Center h={[25]}></Center>
                  <SocialsButton/>
                </VStack>
              </Center>
            </GridItem>
            <GridItem
              colStart={4}
              colEnd={6}
              h={[400, 500, 600, 800]}
              bg="#7cbbda"
              borderRightRadius="30"
              p={10}
            >
              <Center h={[400, 500, 600, 800]}>
                <VStack spacing="40px">
                  <Box>
                    <Text
                      color="white"
                      textAlign="center"
                      fontWeight={"bold"}
                      fontSize={{base: "24px", md: "40px", lg: "56px"}}
                    >
                      Hello !
                    </Text>
                  </Box>
                  <Box>
                    <Text
                      textAlign="center"
                      color="white"
                      fontWeight={"bold"}
                      fontSize={{base: "15px", md: "20px", lg: "26px"}}
                    >
                      Enter your personnal details to start.
                    </Text>
                  </Box>
                  <Button
                    onClick={toCreate}
                    bg="#469fc9"
                    color="#fff"
                    width="100%"
                    fontSize={{base: "15px", md: "15px", lg: "20px"}}
                    height={55}
                    _hover={{bg: "#7cbbda"}}
                    border="1px"
                  >
                    Sign Up
                  </Button>
                </VStack>
              </Center>
            </GridItem>
          </Grid>
        </Box>
      </VStack>
    </Center>
  );
}
