import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View ,TextInput , TouchableOpacity,KeyboardAvoidingView , Platform } from 'react-native';

export default class App extends React.Component {
  constructor(){
    super();
    this.state={
      text:'',
      isSearchPressed:'',
      Word:'',
      lexicalCategory:'',
      examples:[],
      definition:''
    }
  }
 render(){
   const getWord = (word)=>{
      var searchKeyword = word.toLowerCase();
      var url = 'https://rupinwhitehatjr.github.io/dictionary/' + searchKeyword + '.json';
      return fetch(url)
      .then((data)=>{
         if(data.status === 200){
           return data.json()
         }
         else{
           return null;
         }
      })
      .then((response)=>{
         var responseObject = response;
         if(responseObject){
           var wordData = responseObject.definitions[0];
           var defination = wordData.description
           var lexicalCategory = wordData.wordType
           console.log(defination);
           console.log(lexicalCategory)
           this.setState({
              'Word':this.state.text,
              'definition':defination,
              'lexicalCategory':lexicalCategory
           })
         }else{
           this.setState({
             'Word':this.state.text,
             'definition':'notFound'
           })
         }
      })
   }
  return (
   <KeyboardAvoidingView
     behavior={Platform.OS === "ios" ? 'padding' : 'height'}
   >
     <Text style={{textAlign:'center',fontWeight:'center',fontWeight:'bold',fontSize:28,marginTop:25}}>Dictionary App</Text>
    <View style={{flexDirection:'row',alignSelf:'center',alignItems:'baseline'}}>
     <TextInput placeholder="Enter the word"  onChangeText={text=>{
         this.setState({
           text:text,
           isSearchPressed:false,
           Word:'Loading...',
           lexicalCategory:'',
           examples:[],
           defination:''
         })
        
     }} 
       style={{width:250,height:35,alignSelf:'center',borderWidth:1,borderColor:'black',justifyContent:'center',marginTop:50,borderRadius:10}}></TextInput>
      <TouchableOpacity onPress={()=>{
        this.setState({isSearchPressed:true})
         getWord(this.state.text);
      }}
      style={{width:100,height:35,backgroundColor:'blue',alignSelf:'center',marginLeft:50,alignItems:'center',borderRadius:10,marginTop:50}}>
      <Text style={{textAlign:'center',fontWeight:'bold'}}>Search</Text>
      </TouchableOpacity>
      </View>
      <Text  style={{textAlign:'center',fontWeight:'bold'}}>{this.state.Word}</Text>
      <Text style={{textAlign:'center',fontWeight:'bold'}}>{this.state.definition}</Text>
      <Text  style={{textAlign:'center',fontWeight:'bold'}}>{this.state.lexicalCategory}</Text>
   </KeyboardAvoidingView>
  );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
