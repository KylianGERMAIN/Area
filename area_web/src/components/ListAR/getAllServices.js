import {useState, useEffect} from "react";
import httpRequest from "../../Functions/requestHttp";
import {getAuth, onAuthStateChanged} from "firebase/auth";

function SetARs(data) {
  var tlb = [];

  for (var i = 0; i < data.length; i++) {
    var voidd = {
      id: 0,
      title: "",
      actionService: "",
      actionElement: "",
      inputAction: [
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
      ],
      reactionService: "",
      reactionElement: "",
      inputReaction: [
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
      ],
      activate: true,
    };

    voidd.id = data[i].id;
    voidd.title = data[i].titre;
    voidd.actionService = data[i].actionService;
    voidd.actionElement = data[i].actionElement;

    var str = JSON.stringify(data[i].inputAction);
    const words = str.split(",");
    const list = [];
    for (var j = 0; j < words.length; j++) {
      if (words[j].includes("hook_id") || words[j].includes("token")) {
      } else {
        var output = words[j].substring(words[j].indexOf(":") + 1);
        output = output.substring(1);
        output = output.replace("}", "");
        output = output.slice(0, -1);
        list.push(output);
      }
    }
    for (var o = 0; o !== list.length; o++) {
      voidd.inputAction[o].value = list[o];
    }
    var strr = JSON.stringify(data[i].inputReaction);
    const wordss = strr.split(",");
    const list1 = [];
    for (var l = 0; l < wordss.length; l++) {
      if (wordss[l].includes("hook_id") || wordss[l].includes("token")) {
      } else {
        var outputt = wordss[l].substring(wordss[l].indexOf(":") + 1);
        outputt = outputt.substring(1);
        outputt = outputt.replace("}", "");
        outputt = outputt.slice(0, -1);
        list1.push(outputt);
      }
    }
    for (var lo = 0; lo !== list1.length; lo++) {
      voidd.inputReaction[lo].value = list1[lo];
    }
    voidd.reactionService = data[i].reactionService;
    voidd.reactionElement = data[i].reactionElement;
    tlb.push(voidd);
  }
  return tlb;
}

function useFetchh() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchUrl() {
    const auth = getAuth();
    var token = "";
    await onAuthStateChanged(auth, (user) => {
      if (user) {
        token = user.accessToken;
      }
    });
    await httpRequest(
      process.env.REACT_APP_GET_SERVICE,
      {},
      {
        tokenid: `Bearer ${token}`,
      }
    )
      .then((res) => {
        setData(SetARs(res.data));
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    fetchUrl();
  }, []);

  return [data, loading, setData];
}

export {useFetchh};
