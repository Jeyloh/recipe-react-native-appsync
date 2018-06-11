import React from "react"
import { StyleSheet, Text, View, ScrollView, Button, TouchableOpacity } from 'react-native';
import { compose, graphql } from 'react-apollo'
import uuidv4 from 'uuid/v4'
import { Auth } from "aws-amplify"
import * as resolver from '../graphql/resolvers/index'

import RecipeOverview from './RecipeOverview'

class Root extends React.Component {

  state = {
    name: "",
    ingredient: "",
    direction: "",
    ingredients: [],
    directions: []
  }

  componentDidMount() {
    this.props.subscribeToNewRecipes()
    this.props.subscribeToDeletedRecipes()
  }

  onChange = (key, value) => {
    this.setState({[key]: value})
  }
  addIngredient = () => {
    if (this.state.ingredient === '') return
    const ingredients = this.state.ingredients
    ingredients.push(this.state.ingredient)
    this.setState({
      ingredient: ''
    })
  }
  addDirection = () => {
    if (this.state.direction === '') return
    const directions = this.state.directions
    directions.push(this.state.direction)
    this.setState({
      direction: ''
    })
  }
  addRecipe = () => {
    const { name, ingredients, directions } = this.state
    this.props.onAdd({
      id: uuidv4(), name, ingredients, directions
    })
    this.setState({name: '', directions: [], ingredients: []})
  }

  handleSignOut = () => {
    Auth.signOut().then( data => {
      console.log(data)
    }).catch( err => {
      console.log(err)
    })
  }

  render() {
    console.log(this.props);
    console.log(this.state);
    return (
      <View style={styles.container}>
        <Button title="Sign out" onPress={() => this.handleSignOut()}><Text>Sign out</Text></Button>
        <ScrollView>
          <RecipeOverview recipes={this.props.recipes} deleteRecipeById={this.props.deleteRecipeById}/>
        </ScrollView>
      </View>
    );
  }
}

export default compose(resolver.listRecipeGQLAction, resolver.createRecipeGQLAction, resolver.deleteRecipeAction)(Root);

const styles = StyleSheet.create({
  container: {
    margin: 50,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});