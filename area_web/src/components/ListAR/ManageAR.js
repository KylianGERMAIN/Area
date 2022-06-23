import React, {useState, useEffect} from "react";
import TodoForm from "./FormAR";
import Todo from "./BoxAR";
import {Center, VStack, Text, Box, Flex} from "@chakra-ui/react";
import {useFetchh} from "./getAllServices";
import httpRequest from "../../Functions/requestHttp";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {toast} from "react-toastify";

function TodoList(param) {
  const [data, setData] = useState([]);
  const [StatusService, setStatusService] = useState([]);
  const [loading, setLoading] = useState(false);

  const addTodo = (todo, list, list1) => {
    var VoidElement = {
      action: {
        service: "",
        actionName: "",
        data: {},
      },
      reaction: {
        service: "",
        reactionName: "",
        data: {},
      },
      title: "",
    };
    var data = {};
    VoidElement.action.service = todo.actionService;
    VoidElement.action.actionName = todo.actionElement;
    VoidElement.reaction.service = todo.reactionService;
    VoidElement.reaction.reactionName = todo.reactionElement;
    VoidElement.title = todo.title;
    for (var i = 0; i !== list.length; i++) {
      for (var y = 0; y !== list[i].dropdown.length; y++) {
        if (
          VoidElement.action.service !== "None" &&
          VoidElement.action.actionName === list[i].dropdown[y].value
        ) {
          for (var j = 0; j !== list[i].dropdown[y].input.length; j++) {
            data[list[i].dropdown[y].input[j].placeholder] =
              todo.inputAction[j].value;
          }
        }
      }
    }
    if (VoidElement.action.service === "Discord") {
      data["token"] = localStorage.getItem("accessTokenDiscord");
    } else if (VoidElement.action.service === "GitHub") {
      data["token"] = localStorage.getItem("accessTokenGitHub");
      data["events"] = todo.actionElement;
      VoidElement.action.actionName = "push";
    }
    VoidElement.action.data = data;
    data = {};
    for (var z = 0; z !== list1.length; z++) {
      for (var x = 0; x !== list1[z].dropdown.length; x++) {
        if (
          VoidElement.reaction.service !== "None" &&
          VoidElement.reaction.reactionName === list1[z].dropdown[x].value
        ) {
          for (var k = 0; k !== list1[z].dropdown[x].input.length; k++) {
            data[list1[z].dropdown[x].input[k].placeholder] =
              todo.inputReaction[k].value;
          }
        }
      }
    }
    if (VoidElement.reaction.service === "Discord") {
      data["token"] = localStorage.getItem("accessTokenDiscord");
    } else if (VoidElement.reaction.service === "GitHub") {
      data["token"] = localStorage.getItem("accessTokenGitHub");
      VoidElement.reaction.reactionName = "push";
    }
    VoidElement.reaction.data = data;

    const auth = getAuth();
    var token = "";
    var error = false;
    console.log(VoidElement);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        token = user.accessToken;
        httpRequest(
          process.env.REACT_APP_CREATE_SERVICE,
          {
            action: VoidElement.action,
            reaction: VoidElement.reaction,
            title: VoidElement.title,
          },
          {
            tokenid: `Bearer ${token}`,
          },
          "post"
        )
          .then((res) => {
            todo.id = res.data.id;
            const newTodos = [todo, ...todos];

            setTodos(newTodos);
          })
          .catch((err) => {
            error = true;
            toast.error(err.data.errors[0].msg);
            if (error === true && !todo.title && /^\s*$/.test(todo.title)) {
              return;
            }
          });
      }
    });
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.title || /^\s*$/.test(newValue.title)) {
      return;
    }

    setTodos((prev) =>
      prev.map((item, key) => (item.id === todoId ? newValue : item))
    );
  };

  const removeTodo = (id) => {
    const auth = getAuth();
    var token = "";
    onAuthStateChanged(auth, (user) => {
      if (user) {
        token = user.accessToken;
        httpRequest(
          process.env.REACT_APP_REMOVE_SERVICE,
          {
            id: id,
          },
          {
            tokenid: `Bearer ${token}`,
          },
          "delete"
        )
          .then((res) => {
          })
          .catch((err) => console.error(err));
      }
    });

    const removedArr = [...todos].filter((todo) => todo.id !== id);

    setTodos(removedArr);
  };

  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo, key) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const fetchUrl = React.useCallback(async () => {
    await httpRequest(process.env.REACT_APP_GET_ALL_SERVICE, "get").then(
      (ress) => {
        httpRequest(
          process.env.REACT_APP_GET_STATUS_LINK,
          {},
          {
            tokenid: `Bearer ${localStorage.getItem("tokenID")}`,
          }
        )
          .then((res) => {
            setData(ress.data);
            setStatusService(res.data.services);
            setLoading(true);
          })
          .catch((errr) => console.error(errr));
      }
    );
  }, []);

  useEffect(() => {
    fetchUrl();
    if (loading === true) {
      fetchUrl();
    }
  }, []);

  const [todos, loading1, setTodos] = useFetchh(param.token);

  return (
    <Box h={"91.7948717949vh"}>
      {loading && loading1 && data.length === 0 && StatusService !== [] ? (
        <Text>Loading...</Text>
      ) : (
        <div>
          {loading && data.length !== 0 && StatusService !== [] ? (
            <Flex width="100%">
              <Box width="50%" pt="20px">
                <Center ml={5} pt={5} borderRadius="xl">
                  <VStack width="100%">
                    <Text
                      fontWeight={"bold"}
                      fontSize={{base: "15px", md: "20px", lg: "26px"}}
                    >
                      {param.Title}
                    </Text>
                    <TodoForm
                      data={data}
                      StatusService={StatusService}
                      onSubmit={addTodo}
                    />
                  </VStack>
                </Center>
              </Box>
              <Box width="50%" overflowX="auto">
                <VStack width="100%" pt="20px" pb="20px">
                  <Todo
                    data={data}
                    todos={todos}
                    completeTodo={completeTodo}
                    removeTodo={removeTodo}
                    updateTodo={updateTodo}
                  />
                </VStack>
              </Box>
            </Flex>
          ) : (
            <Box w={0}></Box>
          )}
        </div>
      )}
    </Box>
  );
}

export default TodoList;
