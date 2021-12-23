import {Platform, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',

  },
  centerAlign:{
    justifyContent:'center',
    alignItems:'center'
  },
  textInput:{
    width:'80%',
    height:40,
    alignSelf:'center',
    borderRadius:5,
    borderWidth:1,
    borderColor:'#aaa',
    paddingLeft:6,
    marginTop:10
  },
  card:{
    borderRadius:5,
    borderWidth:1,
    borderColor:'#aaa',
    alignSelf:'center',
    width:'90%',
    height: 150,
    marginTop:4,
    padding:10
  },
  title:{
    fontWeight:'bold'
  },
  thumbnail:{
    width:40,
    height:40,
    margin:10
  },
  thumbnailsView:{
    width:'90%',
    alignSelf:'center',
    padding:20
  },
  fullImage:{
    width:300,
    alignSelf:'center',
    height:300
  }
})

export default styles;
