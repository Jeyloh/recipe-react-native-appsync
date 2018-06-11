import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';


const RecipeOverview = (props) => {
  if (!props.recipes) return null

  return props.recipes.map((recipe, index) => {
    return (
      <View style={styles.recipeContainer} key={index}>
        <View style={styles.singleLine}>
          <TouchableOpacity>
            <Text onPress={() => props.deleteRecipeById(recipe.id)} role="img" aria-label="Logo" alt="cooking-pot">❌</Text>
          </TouchableOpacity>
          <Text style={styles.headerText}>{recipe.name}</Text>
        </View>
        <Text style={styles.subHeaderText}>Ingredients:</Text>
        { recipe.ingredients.map((ing, index) => (
          <Text style={styles.itemText} key={index}>{ing}</Text>
        ))
        }
        <Text style={styles.subHeaderText}>Directions:</Text>
        { recipe.directions.map((dir, index) => (
          <Text style={styles.itemText} key={index}>{dir}</Text>
        )) }
      </View>
    )
  })

}

const styles = StyleSheet.create({
  recipeContainer: {
    padding: 10,
    width: '100%',
    marginTop: 50,
    flex: 1,
    flexDirection: 'column',
  },
  headerText: {
    fontSize: 22,
    marginLeft: 5
  },
  subHeaderText: {
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  itemText: {
    fontSize: 14,
    marginLeft: 20
  },
  singleLine: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  }
});

export default RecipeOverview
