import { useEffect, useState } from "react";
import { View, Image } from "react-native";
import { Button, Text } from "react-native-paper";
// import {styles} from "../utils/style";

export default function RMGameScreen() {
  const [personagem, setPersonagem] = useState(null);
  const [personagens, setPersonagens] = useState(0);
  const [totalPersonagens, setTotalPersonagens] = useState(0);

  useEffect(() => {
    retornaTotalPersonagens();
  }, []);

  function buscaPersonagemAleatorio() {
    fetch(
      "https://rickandmortyapi.com/api/character/" + retonaIndiceAleatorio()
    )
      .then((response) => response.json())
      .then((json) => {
        setPersonagem(json);
      });
  }
  function retornaTotalPersonagens() {
    fetch(
      "https://rickandmortyapi.com/api/character/"
    )
      .then((response) => response.json())
      .then((json) => {
        setTotalPersonagens(json.info.count);
      });
  }
  function retonaIndiceAleatorio() {
    return Math.floor(Math.random() * totalPersonagens) + 1;
  }

  function checkIfPersonagemIsAlive() {
    if (personagem.status === "Alive") {
      return true;
    } else {
      return false;
    }
  }

  return (
    <View style={StyleSheet.container}>
      <Text>Este personagem está vivo?</Text>
      <Image
        source={{ uri: personagem?.image }}
        style={{ width: 200, height: 200 }}
      ></Image>
      <Text>Personagem: {personagem?.name}</Text>
      <View>
        <Button>Sim</Button>
        <Button>Não</Button>
      </View>

      <Button onPress={buscaPersonagemAleatorio}> Buscar Personagem</Button>
    </View>
  );
}
