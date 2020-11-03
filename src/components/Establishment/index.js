import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, Button, Linking  } from 'react-native';

import EstablishmentService from '../../services/establishment_service.js';
import ListRatings from './ListRatings';

const Separator = () => (<View style={styles.separator} />
);

const Establishment = (props) => {
    
    const [establishment, setEstablishment] = useState(null);
useEffect(() => {
    getEstablishmentInformations();}, [props.place]);
async function getEstablishmentInformations() {
    try {
const response = await EstablishmentService.show(props.place.place_id);
setEstablishment(response.data.result);
    } catch (error) {
setEstablishment([]);
    }}
return (
    <View style={styles.container}>
{
        establishment != null &&
        <View style={styles.background}>
    <ScrollView style={{ height: 600 }}>
            <View style={{ marginHorizontal: 30 }}>
        <View style={{ alignSelf: 'flex-end' }}>
                <Button title="X" color="black" onPress={() => setEstablishment(null)} />
        </View>

        {
                (establishment.photos) ?
            <Image style={styles.photo}
                    source={
                { uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${establishment.photos[0].photo_reference}&sensor=false&key=<sua_key>` }} alt="Store perfil" />
            :
            <Image style={styles.photo} source={require('../../images/bart.jpeg')} />
        }

            <Text style={styles.title}>Nome: {props.place.name}</Text>
                
            {
                (establishment.opening_hours) ?
                <View>
                    <Text style={{ color: 'white', fontWeight: 'bold', marginTop: 10 }}>
                    {(establishment.opening_hours.open_now === true) ? 'Aberto 😎': 'Fechado 😴'}
                    </Text>
                    <Separator />

                    {
                    establishment.opening_hours.weekday_text.map(schedule => {
                        return (
                        <Text key={schedule} style={{ color: '#080808' }}>{schedule}</Text>
                        )
                    })
                    }
                </View>
                :
                <View>
                    <Separator />

                    <Text style={{ color: 'white' }}>Não há cadastros de horários de funcionamentos. 🤔</Text>
                </View>
            }

            <View style={styles.MainContainer}>
            </View>
            <Separator />
            <Text style={{ color: 'white', fontWeight: 'bold', marginTop: 10 }}> {establishment.rating} ⭐️'s</Text>
            <Text style={{ color: 'white', fontWeight: 'bold', marginTop: 10 }}> Total de Avaliacoes: {establishment.user_ratings_total}</Text>
            <Separator />
            <Text style={{ color: '#080808' }}>📞 {establishment.formatted_phone_number}</Text>
            <Text style={{ color: '#080808' }}>📍 {establishment.formatted_address}</Text>
            <Separator />
            <Separator />
            <ListRatings place={props.place} />
            </View>
        </ScrollView>
        <View style={styles.rodape}>
            <Text style={styles.TextStyle} onPress={ ()=> Linking.openURL(establishment.website)} >Fazer pedido online 📲</Text>
        </View>
        </View>
    }
    </View >
)
}

const styles = StyleSheet.create({
container: {
    position: 'absolute',
    top: 40,
    zIndex: 1,
    flex: 1,
    width: '80%',
    alignSelf: 'center'
},
background: {
    backgroundColor: '#7ab11b',
    paddingTop: 20,
    borderRadius: 20,
},
photo: {
    height: 200,
    width: 200,
},
title: {
    color: '#080808',
    fontSize: 17,
    marginTop: 10,
},
separator: {
    marginVertical: 8,
    borderBottomColor: 'white',
    borderBottomWidth: StyleSheet.hairlineWidth,
},
TextStyle: {
    textAlign: 'center',
    fontSize: 30,
    color: 'white'
},
rodape: {
    flexDirection: 'row',
    backgroundColor: '#9040a4',
    padding: 40,
    marginTop: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
},
});

export default Establishment;

