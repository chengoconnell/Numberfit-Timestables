import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
} from 'react-native';

export default class Contacting extends Component {

  constructor(props) {
    super(props);
    this.state = {
      calls: [
        {id:1,  name: "Mr. Beale",   image:"https://bootdey.com/img/Content/avatar/avatar7.png"},
      ]
    };
  }

  renderItem = ({item}) => {
    return (
      <TouchableOpacity onPress={() => Alert.alert('Email to contact me')}>
        <View style={styles.row}>
          <Image source={{ uri: item.image }} style={styles.pic} />
          <View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
              <Text style={styles.mblTxt}>Email
              </Text>
              <Text style={{marginTop:15, marginHorizontal: -90, flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>testteacher@gmail.com</Text>
            </View>
            <View style={styles.msgContainer}>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return(
      <View style={{ flex: 1 }} >
        <FlatList 
          extraData={this.state}
          data={this.state.calls}
          keyExtractor = {(item) => {
            return item.id;
          }}
          renderItem={this.renderItem}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#DCDCDC',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    padding: 10,
  },
  pic: {
    borderRadius: 30,
    width: 60,
    height: 60,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 280,
  },
  nameTxt: {
    marginLeft: 15,
    fontWeight: '600',
    color: '#222',
    fontSize: 18,
    width:170,
  },
  mblTxt: {
    fontWeight: '200',
    color: '#777',
    fontSize: 13,
  },
  msgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  msgTxt: {
    fontWeight: '400',
    color: '#008B8B',
    fontSize: 12,
    marginLeft: 15,
  },
});