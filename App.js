import React, { Component } from 'react'
import { AppRegistry, View, Text, TextInput, ActivityIndicator, FlatList, StyleSheet } from 'react-native'
import { StackNavigator } from 'react-navigation';

const extractKey = ({id}) => id
class App extends Component {

  static navigationOptions = {
    title: 'Github Repos',
  };

  state = {
    loading: true,
    error: false,
    repos: [],
    username: "aksswami"
  }

  componentWillMount = () => {
    this.searchSubmit()
  }

  searchSubmit = async () => {
    try {
      const response = await fetch('https://api.github.com/users/'+ this.state.username +'/repos')
      const repos = await response.json()

      this.setState({loading: false, repos})
    } catch (e) {
      this.setState({loading: false, error: true})
    }
  }

  renderItem = ({item, index}) => {
    return (

      <View style={styles.repo}>
      <View style={styles.repoNumber}>
          <Text>
            {index + 1}
          </Text>
        </View>
        <View style={styles.repoContent}>
          <Text>
            {item.name}
          </Text>
          <Text style={styles.repoBody}>
            {item.name}
          </Text>
        </View>
      </View>
    )
  }

  render() {
    const {repos, loading, error} = this.state
    return (
          <View style={styles.center}>
          <TextInput
            style={{height: 40, padding: 5, margin: 5}}
            onChangeText={(username) => this.setState({username})}
            returnKeyType='search'
            placeholder='github username'
            onSubmitEditing={this.searchSubmit}
            clearButtonMode="while-editing"
          />
          <View style={{height: 1, backgroundColor: 'gray'}}/>
          <FlatList
            style={styles.listContainer}
            data={repos}
            renderItem={this.renderItem}
            keyExtractor={extractKey}
            />
</View>
      // if (loading) {
      //     <View style={styles.center}>
      //       <ActivityIndicator animating={true} />
      //     </View>
      // } else if (error) {
      //     <View style={styles.center}>
      //       <Text>
      //         Failed to load repos!
      //       </Text>
      //     </View>
      // } else {



      // </View>

    )
  }
}

export default StackNavigator({
  Home: {
    screen: App
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    flex: 1
  },
  repo: {
    flexDirection: 'row',
  },
  repoNumber: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  repoContent: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    paddingVertical: 25,
    paddingRight: 15,
  },
  repoBody: {
    marginTop: 10,
    fontSize: 12,
    color: 'lightgray',
  },
  center: {
    flex: 1
  },
  text: {
    padding: 15,
    backgroundColor: 'skyblue',
  },
})

AppRegistry.registerComponent('App', () => App)
