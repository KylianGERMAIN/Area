import React, {useState} from "react";
import {Select} from "chakra-react-select";
import {
  Button,
  VStack,
  Box,
  Input,
  FormControl,
  Text,
} from "@chakra-ui/react";
import {toast} from "react-toastify";

function TodoForm(props) {
  const [actualactionservices, setActualActionService] = useState({
    value: "None",
    label: "None",
    name: "actionService",
  });
  const [actualactionelement, setActualActionElement] = useState({
    value: "None",
    label: "None",
    name: "actionElement",
  });
  const [actualreactionservices, setActualReactionService] = useState({
    value: "None",
    label: "None",
    name: "reactionService",
  });
  const [actualreactionelement, setActualReactionElement] = useState({
    value: "None",
    label: "None",
    name: "reactionElement",
  });

  const [actualActioninput, setActualActionInput] = useState([
    {
      value: "",
      name: "0",
    },
    {
      value: "",
      name: "1",
    },
    {
      value: "",
      name: "2",
    },
    {
      value: "",
      name: "3",
    },
  ]);

  const [actualReactioninput, setActualReactionInput] = useState([
    {
      value: "",
      name: "0",
    },
    {
      value: "",
      name: "1",
    },
    {
      value: "",
      name: "2",
    },
    {
      value: "",
      name: "3",
    },
  ]);

  const [loading, setLoading] = useState(true);

  const [actionservicesList, setActionServicesList] = useState([
    {
      value: "None",
      label: "None",
      name: "actionService",
      dropdown: [
        {
          value: "None",
          label: "None",
          name: "actionElement",
          input: [],
        },
      ],
    },
  ]);
  const [reactionservicesList, setReactionServicesList] = useState([
    {
      value: "None",
      label: "None",
      name: "reactionService",
      dropdown: [
        {
          value: "None",
          label: "None",
          name: "reactionElement",
          input: [],
        },
      ],
    },
  ]);
  const [ActionServices, setActionServices] = useState([
    {
      options: actionservicesList,
    },
  ]);
  const [ReactionServices, setReactionServices] = useState([
    {
      options: reactionservicesList,
    },
  ]);
  const [Action, setAction] = useState([
    {
      options: actionservicesList[0].dropdown,
    },
  ]);
  const [Reaction, setReaction] = useState([
    {
      options: reactionservicesList[0].dropdown,
    },
  ]);

  function reset_actual() {
    setActualActionService({
      value: "None",
      label: "None",
      name: "actionService",
    });
    setActualActionElement({
      value: "None",
      label: "None",
      name: "actionElement",
    });
    setActualReactionService({
      value: "None",
      label: "None",
      name: "reactionService",
    });
    setActualReactionElement({
      value: "None",
      label: "None",
      name: "reactionElement",
    });
    setActualActionInput([
      {
        value: "",
        name: "0",
      },
      {
        value: "",
        name: "1",
      },
      {
        value: "",
        name: "2",
      },
      {
        value: "",
        name: "3",
      },
    ]);
    setActualReactionInput([
      {
        value: "",
        name: "0",
      },
      {
        value: "",
        name: "1",
      },
      {
        value: "",
        name: "2",
      },
      {
        value: "",
        name: "3",
      },
    ]);
    setdata({
      title: "",
      actionService: "",
      actionElement: "",
      inputAction: "",
      reactionService: "",
      reactionElement: "",
      inputReaction: "",
      activate: true,
    });
  }

  function Parsing(status, tmp, json, Name_Service, Name_Element, AR) {
    var l = 1;

    var statustbl = [];
    if (status.battleNet.connected === false) {
      statustbl.push("BattleNet");
    }
    if (status.github.connected === false) {
      statustbl.push("GitHub");
    }
    if (status.spotify.connected === false) {
      statustbl.push("Spotify");
    }

    for (var i = 0; i < json.length; i++, l++) {
      for (var j = 0; j !== statustbl.length; j++) {
        if (json[i]["service"] === statustbl[j]) {
          i++;
        }
      }

      tmp.push({
        value: json[i]["service"],
        label: json[i]["service"],
        name: Name_Service,
        dropdown: [],
      });
      tmp[l]["dropdown"].push({
        value: "None",
        label: "None",
        name: Name_Element,
        input: [],
      });
      // eslint-disable-next-line no-loop-func
      json[i][AR].forEach((val) => {
        var tbl = [];
        for (var j = 0; j !== val.inputs.length; j++) {
          var input = {
            value: val.inputs[j].name,
            placeholder: val.inputs[j].name,
            name: val.inputs[j].name,
          };
          tbl.push(input);
        }
        tmp[l]["dropdown"].input = tbl;
        tmp[l]["dropdown"].push({
          value: val.name,
          label: val.name,
          name: Name_Element,
          input: tbl,
        });
      });
    }
    return tmp;
  }

  const refresh = React.useCallback(() => {
    if (props.data !== []) {
      var json = props.data;
      var ActionList = [
        {
          value: "None",
          label: "None",
          name: "actionService",
          dropdown: [
            {
              value: "None",
              label: "None",
              name: "actionElement",
              input: [],
            },
          ],
        },
      ];
      var ReactionList = [
        {
          value: "None",
          label: "None",
          name: "reactionService",
          dropdown: [
            {
              value: "None",
              label: "None",
              name: "reactionElement",
              input: [],
            },
          ],
        },
      ];
      ActionList = Parsing(
        props.StatusService,
        ActionList,
        json,
        "actionService",
        "actionElement",
        "actions"
      );
      ReactionList = Parsing(
        props.StatusService,
        ReactionList,
        json,
        "reactionService",
        "reactionElement",
        "reactions"
      );
      setActionServicesList(ActionList);
      setReactionServicesList(ReactionList);
    }
  }, [props]);

  React.useEffect(() => {
    let tempAction = [];
    let tempReaction = [];

    actionservicesList.forEach((action) => {
      tempAction.push(action);
    });
    reactionservicesList.forEach((reaction) => {
      tempReaction.push(reaction);
    });
    setActionServices([
      {
        options: tempAction,
      },
    ]);
    setReactionServices([
      {
        options: tempReaction,
      },
    ]);
  }, [actionservicesList, reactionservicesList]);

  React.useEffect(
    function effectFunction() {
      if (loading === true) {
        refresh();
        setLoading(false);
      }
    },
    [loading, refresh, actionservicesList, reactionservicesList]
  );

  function _Select(_name, _options, _placeholder, _value) {
    return (
      <Box w="80%">
        <Select
          onChange={(event) => {
            handleChangeSelect(event);
          }}
          tagVariant="solid"
          selectedOptionColor="blue"
          name={_name}
          options={_options}
          value={_value}
          placeholder={_placeholder}
          size="lg"
        />
      </Box>
    );
  }

  function _SelectEdit(
    _name,
    _name1,
    _optionService,
    list,
    dataActionServiceValue,
    _valueFirst,
    _valueSecond,
    _placeholder,
    _placeholder1
  ) {
    for (var i = 0; i < list.length; i++) {
      if (list[i].value === dataActionServiceValue) {
        var _option = list[i].dropdown;
      }
    }

    return (
      <Box w="80%">
        <Box w="100%">
          <Select
            onChange={(event) => {
              handleChangeSelectEdit(event);
            }}
            name={_name}
            options={_optionService}
            value={_valueFirst}
            placeholder={_placeholder}
            size="lg"
          />
        </Box>
        <Box w="100%">
          <Select
            onChange={(event) => {
              handleChangeSelectEdit(event);
            }}
            name={_name1}
            options={_option}
            value={_valueSecond}
            placeholder={_placeholder1}
            size="lg"
          />
        </Box>
      </Box>
    );
  }

  const [data, setdata] = useState(
    props.edit
      ? {
        title: props.edit.title,
        actionService: {
          value: props.edit.actionService,
          label: props.edit.actionService,
          name: "actionService",
        },
        actionElement: {
          value: props.edit.actionElement,
          label: props.edit.actionElement,
          name: "actionElement",
        },
        inputAction: props.edit.inputAction,
        reactionService: {
          value: props.edit.reactionService,
          label: props.edit.reactionService,
          name: "reactionService",
        },
        reactionElement: {
          value: props.edit.reactionElement,
          label: props.edit.reactionElement,
          name: "reactionElement",
        },
        inputReaction: props.edit.inputReaction,
      }
      : {
        title: "",
        actionService: "None",
        actionElement: "None",
        inputAction: "None",
        reactionService: "None",
        reactionElement: "None",
        inputReaction: "None",
      }
  );

  const handleChange = (e) => {
    setdata({...data, [e.target.name]: e.target.value});
  };

  const handleChangeSelectEdit = (e) => {
    if (e.name === "actionService") {
      for (var i = 0; i !== actionservicesList.length; i++) {
        if (e.value === actionservicesList[i].value) {
          setdata({
            ...data,
            [e.name]: {
              value: e.value,
              label: e.value,
              name: e.name,
            },
            actionElement: {
              value: "None",
              label: "None",
              name: "actionElement",
            },
          });
        }
      }
    } else if (e.name === "reactionService") {
      for (var y = 0; y !== reactionservicesList.length; y++) {
        if (e.value === reactionservicesList[y].value) {
          setdata({
            ...data,
            [e.name]: {
              value: e.value,
              label: e.value,
              name: e.name,
            },
            reactionElement: {
              value: "None",
              label: "None",
              name: "reactionElement",
            },
          });
        }
      }
    } else {
      setdata({
        ...data,
        [e.name]: {
          value: e.value,
          label: e.value,
          name: e.name,
        },
      });
    }
  };

  const handleChangeSelect = (e) => {
    switch (e.name) {
      case "actionService":
        setActualActionService({
          value: e.value,
          label: e.value,
          name: e.name,
        });
        for (var i = 0; i !== actionservicesList.length; i++) {
          if (e.value === actionservicesList[i].value) {
            setAction(actionservicesList[i].dropdown);
            setActualActionElement({
              value: "None",
              label: "None",
              name: "actionElement",
            });
          }
        }
        break;
      case "actionElement":
        setActualActionElement({
          value: e.value,
          label: e.value,
          name: e.name,
        });
        break;

      case "reactionService":
        setActualReactionService({
          value: e.value,
          label: e.value,
          name: e.name,
        });
        for (var y = 0; y !== reactionservicesList.length; y++) {
          if (e.value === reactionservicesList[y].value) {
            setReaction(reactionservicesList[y].dropdown);
            setActualReactionElement({
              value: "None",
              label: "None",
              name: "actionElement",
            });
          }
        }
        break;
      case "reactionElement":
        setActualReactionElement({
          value: e.value,
          label: e.value,
          name: e.name,
        });
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data.title) {
      toast.error("Please enter a title")
      return
    }

    props.onSubmit(
      {
        id: Math.floor(Math.random() * 10000),
        title: data.title,
        actionService: actualactionservices.value,
        actionElement: actualactionelement.value,
        inputAction: actualActioninput,
        reactionService: actualreactionservices.value,
        reactionElement: actualreactionelement.value,
        inputReaction: actualReactioninput,
        activate: true,
      },
      actionservicesList,
      reactionservicesList
    );
    if (data.title) reset_actual();
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      title: data.title,
      actionService: data.actionService.value,
      actionElement: data.actionElement.value,
      inputAction: data.inputAction,
      reactionService: data.reactionService.value,
      reactionElement: data.reactionElement.value,
      inputReaction: data.inputReaction,
      activate: true,
    });
    setdata({
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

  const handleChangeinputEdit = (e, _data) => {
    var clone = _data;
    clone[parseInt(e.target.name)].value = e.target.value;
    setdata({...data, clone});
  };

  const handleChangeactioninput = (e, _input, bool) => {
    const old = _input[e.target.name];
    const updated = {...old, value: e.target.value};
    const clone = [..._input];
    clone[parseInt(e.target.name)] = updated;

    if (bool === true) {
      setActualActionInput(clone);
    } else {
      setActualReactionInput(clone);
    }
  };

  const InputAddReactionEdit = (data, list, comp, _input) => {
    var tbl = [];
    var _placeholder = [];
    var o = 0;

    for (var i = 0; i !== list.length; i++)
      for (var j = 0; j !== list[i].dropdown.length; j++) {
        if (list[i].dropdown[j].value === comp) {
          o = list[i].dropdown[j].input.length;
          _placeholder = list[i].dropdown[j].input;
        }
      }
    for (var x = 0; x < o; x++) {
      tbl.push(
        <Input
          value={_input[x].value}
          name={_input[x].name}
          placeholder={_placeholder[x].placeholder}
          w="80%"
          onChange={(event) => {
            handleChangeinputEdit(event, _input);
          }}
        />
      );
    }
    return tbl;
  };

  const InputAddAction = (list, actual, _input, bool) => {
    var tbl = [];
    var uu = 0;

    for (var i = 0; i !== list.length; i++) {
      for (var y = 0; y !== list[i].dropdown.length; y++) {
        if (
          actual.value !== "None" &&
          actual.value === list[i].dropdown[y].value
        ) {
          for (var j = 0; j !== list[i].dropdown[y].input.length; j++) {
            if (list[i].dropdown[y].input[j].value !== undefined) {
              tbl.push(
                <Input
                  placeholder={list[i].dropdown[y].input[j].placeholder}
                  value={_input[uu].value}
                  name={_input[uu].name}
                  w="80%"
                  onChange={(event) => {
                    handleChangeactioninput(event, _input, bool);
                  }}
                />
              );
              uu++;
            }
          }
        }
      }
    }
    return tbl;
  };

  return (
    <Box w="100%">
      {loading === false ? (
        <FormControl onSubmit={handleSubmit}>
          {props.edit ? (
            <>
              <Box w="100%" pt={5}>
                <VStack>
                  <Text
                    fontSize={{base: "15px", md: "20px", lg: "26px"}}
                    fontWeight="bold"
                  >
                    Edit your area
                  </Text>
                  <Input
                    placeholder="Update your item"
                    value={data.title}
                    name="title"
                    w="80%"
                    onChange={(event) => {
                      handleChange(event);
                    }}
                  />
                  {_SelectEdit(
                    "actionService",
                    "actionElement",
                    ActionServices,
                    actionservicesList,
                    data.actionService.value,
                    data.actionService,
                    data.actionElement,
                    "Select action...",
                    "Select action service..."
                  )}
                  {InputAddReactionEdit(
                    data,
                    actionservicesList,
                    data.actionElement.value,
                    data.inputAction
                  )}
                  {_SelectEdit(
                    "reactionService",
                    "reactionElement",
                    ReactionServices,
                    reactionservicesList,
                    data.reactionService.value,
                    data.reactionService,
                    data.reactionElement,
                    "Select reaction ...",
                    "Select reaction service..."
                  )}
                  {InputAddReactionEdit(
                    data,
                    reactionservicesList,
                    data.reactionElement.value,
                    data.inputReaction
                  )}
                  <Button onClick={handleSubmitEdit}>Update</Button>
                </VStack>
              </Box>
            </>
          ) : (
            <Box w="100%" pb={5} borderRadius="xl">
              <VStack>
                <Input
                  placeholder="Add item"
                  value={data.title}
                  name="title"
                  w="80%"
                  onChange={(event) => {
                    handleChange(event);
                  }}
                />
                {_Select(
                  "actionService",
                  ActionServices,
                  "Select action service...",
                  actualactionservices,
                  data
                )}
                {_Select(
                  "actionElement",
                  Action,
                  "Select action...",
                  actualactionelement,
                  data
                )}
                {InputAddAction(
                  actionservicesList,
                  actualactionelement,
                  actualActioninput,
                  true
                )}
                {_Select(
                  "reactionService",
                  ReactionServices,
                  "Select reaction service...",
                  actualreactionservices,
                  data
                )}
                {_Select(
                  "reactionElement",
                  Reaction,
                  "Select reaction ...",
                  actualreactionelement,
                  data
                )}
                {InputAddAction(
                  reactionservicesList,
                  actualreactionelement,
                  actualReactioninput,
                  false
                )}
                <Button onClick={handleSubmit}>Add Area</Button>
              </VStack>
            </Box>
          )}
        </FormControl>
      ) : (
        <div>Loading...</div>
      )}
    </Box>
  );
}

export default TodoForm;
