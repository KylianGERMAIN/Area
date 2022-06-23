import React, {useState} from "react";
import TodoForm from "./FormAR";
import {RiCloseCircleLine} from "react-icons/ri";
import {TiWeatherCloudy} from "react-icons/ti";
import {AiFillHome, AiOutlineArrowRight} from "react-icons/ai";
import {FaDiscord, FaVirus, FaBattleNet, FaBitcoin} from "react-icons/fa";
import {BsGithub, BsSpotify} from "react-icons/bs";
import {Center, VStack, Text, Box, Flex, Icon} from "@chakra-ui/react";

function DisplayLogo(Name) {
  if (Name === "Weather") {
    return <Icon as={TiWeatherCloudy} w={20} h={20} color="white"/>;
  } else if (Name === "Area") {
    return <Icon as={AiFillHome} w={20} h={20} color="white"/>;
  } else if (Name === "Discord") {
    return <Icon as={FaDiscord} w={20} h={20} color="white"/>;
  } else if (Name === "GitHub") {
    return <Icon as={BsGithub} w={20} h={20} color="white"/>;
  } else if (Name === "Covid") {
    return <Icon as={FaVirus} w={20} h={20} color="white"/>;
  } else if (Name === "Battle.net") {
    return <Icon as={FaBattleNet} w={20} h={20} color="white"/>;
  } else if (Name === "Spotify") {
    return <Icon as={BsSpotify} w={20} h={20} color="white"/>;
  } else if (Name == "CoinRanking") {
    return <Icon as={FaBitcoin} w={20} h={20} color="white"/>;
  }
}

const Todo = ({data, todos, completeTodo, removeTodo, updateTodo}) => {
  const [edit, setEdit] = useState({
    id: null,
    title: "",

    actionService: "",
    actionElement: "",
    inputAction: "",
    reactionService: "",
    reactionElement: "",
    inputReaction: "",
    activate: true,
  });

  const submitUpdate = (title) => {
    updateTodo(edit.id, title);
    setEdit({
      id: null,
      title: "",

      actionService: "",
      actionElement: "",
      inputAction: "",
      reactionService: "",
      reactionElement: "",
      inputReaction: "",
      activate: true,
    });
  };

  if (edit.id) {
    return <TodoForm data={data} edit={edit} onSubmit={submitUpdate}/>;
  }

  const containerlogo = (Name, Description) => {
    return (
      <Box
        w={"45%"}
        bg="#C3DFEA"
        border="1px"
        borderRadius="xl"
        borderColor="white"
      >
        <Box p={3}>
          <VStack pt={2} h={"100%"} spacing="0px">
            {DisplayLogo(Name)}
            <Text
              textAlign="center"
              fontSize={{base: "10px", md: "15px", lg: "18px"}}
            >
              {Name}
            </Text>
            <Text
              textAlign="center"
              fontSize={{base: "10px", md: "15px", lg: "18px"}}
            >
              {Description}
            </Text>
          </VStack>
        </Box>
      </Box>
    );
  };

  return todos.map((todo, index, key) => (
    <Box
      bg="#469FC9"
      key={index}
      w={"60%"}
      borderRadius="xl"
      border="1px"
      borderColor="white"
      mb="10px"
    >
      <Flex p={5}>
        <Box w={"90%"} key={todo.id} onClick={() => completeTodo(todo.id)}>
          <Text
            textAlign="left"
            color="#FFFFFF"
            fontWeight="bold"
            fontSize={{base: "15px", md: "20px", lg: "26px"}}
          >
            {todo.title}
          </Text>
        </Box>
        <Flex fontSize={"24px"}>
          <RiCloseCircleLine
            onClick={() => removeTodo(todo.id)}
            color="#FFFFFF"
          />
        </Flex>
      </Flex>
      <Flex p={5}>
        {containerlogo(todo.actionService, todo.actionElement)}
        <Center w={"10%"} bg="#469FC9">
          <AiOutlineArrowRight color="#FFFFFF"/>
        </Center>
        {containerlogo(todo.reactionService, todo.reactionElement)}
      </Flex>
    </Box>
  ));
};

export default Todo;
