import {React} from "react";
import OauthPopup from "react-oauth-popup";
import {
  Center,
  HStack,
  Text,
  Button,
  Icon,
} from "@chakra-ui/react";
import {TiWeatherCloudy} from "react-icons/ti";
import {FaDiscord, FaBattleNet} from "react-icons/fa";
import {BsGithub, BsSpotify} from "react-icons/bs";

const LinkService = ({name, url, onCode, onClose, value, setter}) => {
  function DisplayLogo(Name) {
    if (Name === "Weather") {
      return <Icon as={TiWeatherCloudy} w={10} h={10} color="black"/>;
    } else if (Name === "Spotify") {
      return <Icon as={BsSpotify} w={10} h={10} color="black"/>;
    } else if (Name === "Discord") {
      return <Icon as={FaDiscord} w={10} h={10} color="black"/>;
    } else if (Name === "GitHub") {
      return <Icon as={BsGithub} w={10} h={10} color="black"/>;
    } else if (Name === "Battle.net") {
      return <Icon as={FaBattleNet} w={10} h={10} color="black"/>;
    }
  }

  function DesactivateService(Name, e) {
    setter(!value);
    if (Name === "Spotify") {
      localStorage.setItem("accessTokenSpotify", "");
      localStorage.setItem("tokenTypeSpotify", "");
    } else if (Name === "GitHub") {
      localStorage.setItem("accessTokenGitHub", "");
      localStorage.setItem("tokenTypeGitHub", "");
    } else if (Name === "Battle.net") {
      localStorage.setItem("accessTokenBattleNet", "");
      localStorage.setItem("tokenTypeBattleNet", "");
    }
  }

  return (
    <Center h="50px">
      <HStack spacing="10px">
        {DisplayLogo(name)}
        <Text>{name}</Text>
        {
          value === false ? (
            <OauthPopup url={url} onCode={onCode} onClose={onClose}>
              <Button>Link</Button>
            </OauthPopup>
          ) : (
            <Button onClick={(e) => DesactivateService(name)}>Unlink</Button>
          )}
      </HStack>
    </Center>
  );
};

export default LinkService;
