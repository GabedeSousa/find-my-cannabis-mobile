import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import ListCannabisStores from './ListCannabisStores'


const Separator = () => (
<View style={styles.separator} />
);

const NearstCannabisStores = (props) => {
const [showDropdownButton, setShowDropdownButton] = useState(false);

return (
    <View style={styles.container}>
    <TouchableOpacity style={styles.button}
        onPress={() => (setShowDropdownButton(!showDropdownButton))}>

        <Text style={styles.text}>Buscar Cannabis</Text>
        <FontAwesomeIcon icon={faHeart} color='white' style={{ marginRight: 5 }} />
        <FontAwesomeIcon icon={faAngleDown} color='white' />
    </TouchableOpacity>
    {
        showDropdownButton == true &&
        <View style={styles.nearstCannabis}>
        <Text style={styles.title}>Lojas de cannabis próximas a você 👀</Text>

        <Separator />
        <ListCannabisStores latitude={props.latitude} longitude={props.longitude} />

        </View>
    }
    
    </View>
)
}

const styles = StyleSheet.create({
container: {
    position: 'absolute',
    top: 50,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    flex: 1,
    width: 370,
},
button: {
    height: 40,
    backgroundColor: '#9040a4',
    borderRadius: 20,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
},
text: {
    color: 'white',
    fontWeight: 'bold',
    marginRight: 20,
},
nearstCannabis: {
    backgroundColor: '#9040a4',
    width: 190,
    marginTop: 5,
    borderRadius: 5,
    padding: 10,
    },
    title: {
    color: 'white',
    fontWeight: 'bold',
},
separator: {
    marginVertical: 8,
    borderBottomColor: 'white',
    borderBottomWidth: StyleSheet.hairlineWidth,
}
});

export default NearstCannabisStores;

