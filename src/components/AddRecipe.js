import React from 'react'
import { StyleSheet, Text, View } from 'react-native';


const AddRecipe = (props) => {
  console.table(props.recipes);
  if (!props.recipes) return null

  return props.recipes.map((recipe, index) => {
    return (
      <View style={styles.recipeContainer} key={index}>
        <View style={styles.singleLine}>
          <Text onClick={() => props.deleteRecipeById(recipe.id)} role="img" aria-label="Logo" alt="cooking-pot">❌</Text>
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
  addRecipeContainer: {
    padding: 10,
    width: '100%',
    height: '40%',
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

export default AddRecipe
