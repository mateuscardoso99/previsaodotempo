import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, Picker, FlatList, Image, StatusBar } from 'react-native';
//import RNPickerSelect from 'react-native-picker-select'
import axios from 'axios'

export default function App() {

  const [value, setSelectedValue] = useState('Caxias');
  const [dados, setDados] = useState([]);

  const buscar = () => {
     axios.get(`https://api.hgbrasil.com/weather?key=05530c5b&city_name=${value},RS`)
     .then(resp => {
      setDados(resp.data.results)
      console.log('resp',resp.data.results)
    })
  }
  
  const list = ({item}) => {
    const renderImage = ()=> {
      if(item.description === 'Ensolarado' || item.description === 'Tempo limpo'
      || item.description === 'Ensolarado com muitas nuvens'
      || item.description === 'Sol com poucas nuvens'){
        return <Image source={require('./img/sol.png')} style={{width:50,height:45,marginTop:2}}/>
      }

      else if(item.description === 'Tempo nublado'
      || item.description === 'Parcialmente nublado'
      || item.description === 'Trovoadas dispersas'
      || item.description === 'Neblina'){
        return <Image source={require('./img/nublado.png')} style={{width:50,height:45,marginTop:2}}/>
      }

      else if(item.description === 'Alguns chuviscos'
      || item.description === 'Chuviscos'
      || item.description === 'Chuvas esparsas'
      || item.description === 'Chuva'){
        return <Image source={require('./img/chuva.png')} style={{width:50,height:45,marginTop:2}}/>
      }

      else if(item.description === 'Tempestades isoladas'
      || item.description === 'Tempestade forte'
      || item.description === 'Tempestades severas'
      || item.description === 'Tempestades'
      || item.description === 'Granizo'
      || item.description === 'Misto chuva e granizo'){
        return <Image source={require('./img/temporal.png')} style={{width:50,height:45,marginTop:2}}/>
      }
    }

    return(
      <View style={{alignItems:'center',marginBottom:10,backgroundColor:'#e8ecf2',marginLeft:20,marginRight:20,borderRadius:20}}>
        {renderImage()}
        <Text style={{color:'#28a745'}}>{item.date} - {item.weekday}</Text>
        <Text>Mínima: {item.min}°</Text>
        <Text>Máxima: {item.max}°</Text>
        <Text>Situação: {item.description}</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0069d9"/>

      <View style={styles.options}>
        <Text style={{fontSize: 20, color:'#0069d9'}}>Selecione a sua cidade:</Text>
        <Picker
          selectedValue={value}
          style={{height: 50, width: 250}}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        >
          <Picker.Item label="Caxias" value="Caxias"/>
          <Picker.Item label="Passo Fundo" value="Passo Fundo"/>
          <Picker.Item label="Pelotas" value="Pelotas"/>
          <Picker.Item label="Porto Alegre" value="Porto Alegre"/>
          <Picker.Item label="Rio Grande" value="Rio Grande"/>
          <Picker.Item label="Santa Cruz do Sul" value="Santa Cruz do Sul"/>
          <Picker.Item label="Santana do Livramento" value="Santana do Livramento"/>
          <Picker.Item label="Santa Maria" value="Santa Maria"/>
          <Picker.Item label="Torres" value="Torres"/>
          <Picker.Item label="Uruguaiana" value="Uruguaiana"/>
        </Picker>
      </View>

      <View style={styles.button}>
        <Button title="Buscar previsão!" onPress={buscar}/>
      </View>

      <View key={dados.cid} style={styles.hoje}>
        <Text style={{color:'#007bff',fontSize:18}}>{dados.city}</Text>
        <Text style={{fontSize:15,color:'#28a745'}}>Agora:</Text>
        <Text>Temperatura: {dados.temp}°</Text>
        <Text>Situação: {dados.description}</Text>
      </View>

      <View style={{alignItems:'center'}}>
        <Text style={{color:'#28a745',marginTop:5,fontSize:20,marginBottom:5}}>Próximos dias:</Text>
      </View>

      <FlatList
        data={dados.forecast}
        renderItem={list}
        keyExtractor={(item, indice) => indice}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  options: {
    marginTop: 5,
    alignItems: 'center',
  },
  button: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 15,
  },
  hoje: {
    alignItems: 'center',
    fontSize: 20,
    backgroundColor: '#e8ecf2',
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 15,
  },
});
