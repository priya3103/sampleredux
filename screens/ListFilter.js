// Imports: Dependencies
import React, { PureComponent } from 'react';
import { TextInput,Image, FlatList, SafeAreaView, StyleSheet,Dimensions, Text, TouchableOpacity, View,ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Spinner from 'react-native-loading-spinner-overlay';
class ListScreen extends React.PureComponent {
  constructor(props)
  {
      super(props);
      this.state={data:[],searchtxt:"",offset:0,limit:50}
      this.props.loadData(0,50);

  }
  OnTextChange(e)
  {
      this.setState({searchtxt:e});
      if(e =="")
      {
        this.props.resetDate();
      }
  }
  fetchResult()
  {
    if(this.state.searchtxt =="")
    {
        this.props.loadData(this.state.offset,50);
        this.setState({offset:this.state.offset+50})
    }
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Spinner
          visible={this.props.loadingstatus}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
        <View style={styles.searchcontainer}>
            <View style={styles.searchtxtcontainer}><TextInput value={this.state.searchtxt} onChangeText={(e)=>{this.OnTextChange(e)}}/></View>
            <TouchableOpacity style={styles.searchbtncontainer} onPress={()=>{this.props.searchFilter(this.state.searchtxt)}}>
              <TouchableOpacity ><Text style={{color:'white',fontsize:14}}>SEARCH</Text></TouchableOpacity></TouchableOpacity>
        </View>
        
      <View style={styles.ListStyle}>
            {this.props.data.length >0 ?<FlatList
            style={{ flex: 1,width:"100%"}}
            extraData={this.state}
            onEndReached={()=>this.fetchResult()}
            onEndReachedThreshold={0.7}
            data={this.props.data}
            renderItem={rowData => {return (
               <View  style={{ flexDirection:"row",padding:5,borderBottomWidth:0.3,borderBottomColor:'grey'}}>
               <View style={{marginHorizontal:5}}>
                <Image style={{width:60,height:60,borderRadius:5}} source={{uri:rowData.item.thumbnailUrl,
    cache: 'only-if-cached',}} />
               </View>
               < View style={{marginHorizontal:5,width:windowWidth-95}}>
                  <Text style={{fontSize:16}}>{rowData.item.title}</Text>
                </View>
              </View>

            )}}
            keyExtractor={item => item.id.toString()}
        />:<View style={{alignItems:"center",flex:1,justifyContent:"center"}}><Text>No Data Found.</Text></View> }
        </View>
        
       
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF'
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  searchcontainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding:20
  },  
  ListStyle:{
   flex:1,
   justifyContent:'center',
   alignItems:'center'
  },
  searchtxtcontainer: {
    borderWidth: 1,
    borderColor: '#d6d7da',
    width:"70%",
    height:40,
    borderRadius:10,
    marginRight:7

  },
  searchbtncontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width:"30%",
    height:40,
    padding:10,
    backgroundColor:"grey",
    color:"#FFF",
    borderRadius:5
  },
  listcontainer: {
    
  }
});

const mapStateToProps = (state) => {  
  return {
    data: state.list.data,
    loadingstatus:state.list.loadingstatus
  };
};
const mapDispatchToProps = (dispatch) => { 
  return {   
    searchFilter: (title) => dispatch({
      type: 'SEARCH_FILTER',
      value: title,
    }),
    
    loadData: (offset,limit) => dispatch({
      type: 'LOAD_DATA',
      data: {offset:offset,
      limit:limit}
    }),
    resetDate:() => dispatch({
      type:'SEARCH_FILTER_RESET'
    })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListScreen);