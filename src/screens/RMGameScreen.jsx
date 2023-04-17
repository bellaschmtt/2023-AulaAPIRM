import { useEffect, useState } from "react";
import { View, Image } from "react-native";
import { Button, Text } from "react-native-paper";
import { styles } from "../utils/styles";

export default function RMGameScreen() {
  const [personagem, setPersonagem] = useState(null);
  const [personagens, setPersonagens] = useState([]);
  const [totalPersonagens, setTotalPersonagens] = useState(1);
 

  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/character')
        .then((response) => response.json())
        .then((json) => {
            setTotalPersonagens(json.info.count);
        })
  }, []);

  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/character/' + returnRandomNumber())
        .then((response) => response.json())
        .then((json) => {
            setPersonagem(json);
     })
  }, [totalPersonagens]);

  

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

  async function handlePersonagemVivoOuMorto(resposta) {
    const isAlive = personagem.status === 'Alive';
    if (resposta === isAlive) {
        alert('Você acertou!');
    } else {
        alert('Você errou!');
    }
    //alert(isAlive ? 'Você acertou!' : 'Você errou!');
    // fetch('https://rickandmortyapi.com/api/character/' + returnRandomNumber())
    //     .then((response) => response.json())
    //     .then((json) => {
    //         setPersonagem(json);
    //     })
}

const returnRandomNumber = () => {
    let randomNumber = Math.floor(Math.random() * totalPersonagens) + 1;

    // canoot return 0
    if (randomNumber === 0) {
        return 1;
    }
    return randomNumber;
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
      <Button 
        onPress={buscaPersonagemAleatorio} mode="contained"
        style={{marginBottom: 20}}
      >
        Buscar Personagem
      </Button>
      <Text
        style={{marginBottom: 20}}
      >O personagem está vivo?</Text>
      <View style={{ flexDirection: "row", gap: 20 }}>
        <Button
          mode="contained"
          onPress={() => handlePersonagemVivoOuMorto(true)}
        >SIM</Button>
        <Button
          mode="contained"
          onPress={() => handlePersonagemVivoOuMorto(false)}
          >NÃO</Button>
        </View>
      
    </View>
  );
}
// 