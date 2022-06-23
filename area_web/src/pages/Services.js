import Navbar from "../components/NavBar/Navbar";
import React, { useState } from "react";
import { VStack, Heading, Text } from "@chakra-ui/react";
import LinkService from "../components/Services/linkService";
import httpRequest from "../Functions/requestHttp";

export default function Services() {
  const [loading, setLoading] = useState(false);
  const [valSpotify, setSpotify] = useState(false);
  const [valBattleNet, setBattleNet] = useState(false);
  const [valGitHub, setGitHub] = useState(false);

  const getSpotifyAccesToken = (code, _) => {
    httpRequest(
      "https://area-epitech2.herokuapp.com/auth/getSpotifyAccessToken",
      {
        code: code,
      },
      {
        tokenid: `Bearer ${localStorage.getItem("tokenID")}`,
      },
      "post"
    ).then((response) => {
      localStorage.setItem("accessTokenSpotify", response.data.access_token);
      localStorage.setItem("tokenTypeSpotify", response.data.token_type);
      setSpotify(true);
    });
  };

  const getBattleNetAccessToken = (code, _) => {
    httpRequest(
      "https://area-epitech2.herokuapp.com/auth/getBattleNetAccessToken",
      {
        code: code,
      },
      {
        tokenid: `Bearer ${localStorage.getItem("tokenID")}`,
      },
      "post"
    ).then((response) => {
      console.log(response);
      localStorage.setItem("accessTokenBattleNet", response.data.access_token);
      localStorage.setItem("tokenTypeBattleNet", response.data.token_type);
      setBattleNet(true);
    });
  };

  const getGitHubAccessToken = (code, _) => {
    console.log(code);
    httpRequest(
      "https://area-epitech2.herokuapp.com/auth/getGitHubAccessToken",
      {
        code: code,
      },
      {
        tokenid: `Bearer ${localStorage.getItem("tokenID")}`,
      },
      "post"
    ).then((response) => {
      console.log(response);
      localStorage.setItem("accessTokenGitHub", response.data.access_token);
      localStorage.setItem("tokenTypeGitHub", response.data.token_type);
      setGitHub(true);
    });
  };

  const fetchUrl = React.useCallback(async () => {
    await httpRequest(
      process.env.REACT_APP_GET_STATUS_LINK,
      {},
      {
        tokenid: `Bearer ${localStorage.getItem("tokenID")}`,
      },
      "get"
    ).then((res) => {
      console.log(res);
      if (res.data.services.battleNet.connected === true) {
        setBattleNet(true);
      }
      if (res.data.services.github.connected === true) {
        setGitHub(true);
      }
      if (res.data.services.spotify.connected === true) {
        setSpotify(true);
      }
      setLoading(false);
    });
  }, []);

  React.useEffect(() => {
    fetchUrl();
    if (loading === true) {
      fetchUrl();
    }
  }, []);

  return (
    <div>
      <Navbar />
      {loading === false ? (
        <VStack>
          <Heading mt="50px" h="75px" as="h2" size="lg">
            Manage services
          </Heading>
          <VStack>
            <LinkService
              name={"GitHub"}
              url={
                "https://github.com/login/oauth/authorize?response_type=code&client_id=" +
                process.env.REACT_APP_GITHUB_CLIENT_ID +
                "&redirect_uri=http://localhost:3000/services&scope=repo"
              }
              onCode={getGitHubAccessToken}
              onClose={() => {}}
              value={valGitHub}
              setter={setGitHub}
            />
            <LinkService
              name={"Discord"}
              url={
                "https://discord.com/api/oauth2/authorize?client_id=" +
                process.env.REACT_APP_DISCORD_CLIENT_ID +
                "&scope=bot&permissions=536870912"
              }
              onCode={() => {}}
              onClose={() => {}}
              value={false}
              setter={setGitHub}
            />
            <LinkService
              name={"Spotify"}
              url={
                "https://accounts.spotify.com/authorize?response_type=code&client_id=" +
                process.env.REACT_APP_SPOTIFY_CLIENT_ID +
                "&redirect_uri=" +
                process.env.REACT_APP_REDIRECT_URI
              }
              onCode={getSpotifyAccesToken}
              onClose={() => {}}
              value={valSpotify}
              setter={setSpotify}
            />
            <LinkService
              name={"Battle.net"}
              url={
                "https://eu.battle.net/oauth/authorize?response_type=code&client_id=" +
                process.env.REACT_APP_BATTLENET_CLIENT_ID +
                "&redirect_uri=" +
                process.env.REACT_APP_REDIRECT_URI +
                "&scope=wow.profile"
              }
              onCode={getBattleNetAccessToken}
              onClose={() => {}}
              value={valBattleNet}
              setter={setBattleNet}
            />
          </VStack>
        </VStack>
      ) : (
        <Text>loading...</Text>
      )}
    </div>
  );
}
