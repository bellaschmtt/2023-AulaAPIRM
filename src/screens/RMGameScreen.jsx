import { useEffect, useState } from "react";
import { View, Image } from "react-native";
import { Button, Text } from "react-native-paper";
import { styles } from "../utils/styles";

export default function RMGameScreen() {
  const [personagem, setPersonagem] = useState(null);
  const [personagens, setPersonagens] = useState(0);
  const [totalPersonagens, setTotalPersonagens] = useState(0);
  const [resposta, setResposta] = useState(null);

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
    fetch("https://rickandmortyapi.com/api/character/")
      .then((response) => response.json())
      .then((json) => {
        setTotalPersonagens(json.info.count);
      });
  }
  function retonaIndiceAleatorio() {
    return Math.floor(Math.random() * totalPersonagens) + 1;
  }

function checkIfPersonagemEstaVivo() {
  if (personagem.status === "Alive") {
    setResposta(true);
  } else {
    setResposta(false);
  }
}

  return (
    <View style={styles.container}>
      <Text>Este personagem está vivo?</Text>
      <Image
        source={{ uri: personagem?.image }}
        style={{ width: 200, height: 200, alignItems: "center" }}
      ></Image>
      <Text
        style={{
          fontSize: 20,
          textAlign: "center",
          marginVertical: 20,
        }}
      >
        Personagem: {personagem?.name}
      </Text>
      <Text>O personagem está vivo?</Text>
      {resposta !== null && <Text>{resposta ? "Sim" : "Não"}</Text>}
      <Button onPress={() => checkIfPersonagemEstaVivo()} mode="conteined">
        Checar
      </Button>
      <Button onPress={buscaPersonagemAleatorio} mode="contained">
        Buscar Personagem
      </Button>
    </View>
  );
}
