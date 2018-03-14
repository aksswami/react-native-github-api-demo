import React, { Component } from 'react'
import { AppRegistry, View, Text, ActivityIndicator, FlatList, StyleSheet } from 'react-native'

const extractKey = ({id}) => id
const abc = [
  {id: 0, name: 'View'},
{id: 1, name: 'Text'},
{id: 2, name: 'Image'},
{id: 3, name: 'ScrollView'},
{id: 4, name: 'ListView'},

]
export default class App extends Component {

  state = {
    loading: true,
    error: false,
    repos: [],
  }

  componentWillMount = async () => {
    try {
      const response = await fetch('https://api.github.com/users/aksswami/repos')
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

    if (loading) {
      return (
        <View style={styles.center}>
          <ActivityIndicator animating={true} />
        </View>
      )
    }

    if (error) {
      return (
        <View style={styles.center}>
          <Text>
            Failed to load repos!
          </Text>
        </View>
      )
    }

    return (
      <FlatList
        style={styles.container}
        data={repos}
        renderItem={this.renderItem}
        keyExtractor={extractKey}
        />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    padding: 15,
    backgroundColor: 'skyblue',
  },
})

AppRegistry.registerComponent('App', () => App)
