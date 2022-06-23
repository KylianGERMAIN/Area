import Navbar from "../components/NavBar/Navbar";
import {useState} from "react";
import {
  getAuth,
  sendPasswordResetEmail,
  updateProfile,
  updateEmail,
} from "firebase/auth";
import {Center, Text, Box, Input, Button} from "@chakra-ui/react";
import {toast} from "react-toastify";

function GetName(Name) {
  const auth = getAuth();

  const user = auth.currentUser;
  Name = user.displayName;
  return Name;
}

function GetEmail(Email) {
  const auth = getAuth();
  const user = auth.currentUser;
  Email = user.email;
  return Email;
}

function ResetPassword(Email) {
  const auth = getAuth();

  if (!Email.match(/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i)) {
    toast.error("Please enter a valid Email")
    return
  }
  sendPasswordResetEmail(auth, Email)
    .then(() => {
      toast.success("We have sent you an email to reset your password !", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    })
    .catch((error) => {
      toast.error(error.code, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
}

function UpdateEmailAdress(Email) {
  const auth = getAuth();
  if (!Email.match(/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i)) {
    toast.error("Please enter a valid Email")
    return
  }
  updateEmail(auth.currentUser, Email)
    .then(() => {
      toast.success("Email changed !", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    })
    .catch((error) => {
      toast.error(error.code, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
}

function UpdateUserProfile(Name) {
  const auth = getAuth();
  updateProfile(auth.currentUser, {
    displayName: Name,
  })
    .then(() => {
      toast.success("Name changed !", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    })
    .catch((error) => {
      toast.error(error.code, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
}

export default function Settings() {
  const [Name, setName] = useState(GetName());
  const [Email, setEmail] = useState(GetEmail());
  const [Email2, setEmail2] = useState("");

  function handleChangeName(event) {
    console.log(event.target.value);
    setName(event.target.value);
  }

  function handleChangeEmail(event) {
    console.log(event.target.value);
    setEmail(event.target.value);
  }

  return (
    <Box>
      <Navbar/>
      <Box>
        <Center pt={5}>
          <Text fontSize="4xl"> Account's Settings </Text>
          {/* <Text fontSize="4xl"> {tab[0]} </Text> */}
        </Center>
        <Box mt="10" ml="100" mr="100">
          <Box>
            <Text
              fontSize={{base: "15px", md: "20px", lg: "26px"}}
              fontWeight="bold"
              ml="2"
            >
              Name : {Name}
            </Text>
            <Input
              name="Name"
              placeholder="Change your name ..."
              value={Name}
              onChange={(event) => {
                handleChangeName(event);
              }}
            />
            <Button onClick={() => UpdateUserProfile(Name)}> Save </Button>
          </Box>
          <Box>
            <Text
              fontSize={{base: "15px", md: "20px", lg: "26px"}}
              fontWeight="bold"
              ml="2"
            >
              Email : {Email}
            </Text>
            <Input
              name="Email"
              type={"email"}
              placeholder="Change your e-mail ..."
              value={Email}
              onChange={(event) => {
                handleChangeEmail(event);
              }}
            />
            <Button onClick={() => UpdateEmailAdress(Email)}> Save </Button>
          </Box>
          <Box>
            <Text
              fontSize={{base: "15px", md: "20px", lg: "26px"}}
              fontWeight="bold"
              ml="2"
            >
              Reset your password with your email :
            </Text>
            <Input
              name="Email2"
              autoComplete="Email"
              value={Email2}
              type="email"
              onChange={(event) => setEmail2(event.target.value)}
            />
            <Button onClick={() => ResetPassword(Email2)}>
              {" "}
              Reset Password{" "}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
