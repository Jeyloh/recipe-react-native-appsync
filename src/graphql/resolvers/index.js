import { graphql } from 'react-apollo'
import ListRecipes from '../queries/ListRecipes'
import CreateRecipe from '../mutations/CreateRecipe'
import DeleteRecipe from '../mutations/RemoveRecipe'
import NewRecipeSubscription from '../subscriptions/NewRecipeSubscription'
import DeleteRecipeSubscription from '../subscriptions/DeleteRecipeSubscription'


export const listRecipeGQLAction = graphql(ListRecipes, {
  options: {
    fetchPolicy: 'cache-and-network'
  },
  props: props => ({
    recipes: props.data.listRecipes ? props.data.listRecipes.items : [],
    subscribeToNewRecipes: params => {
      props.data.subscribeToMore({
        document: NewRecipeSubscription,
        updateQuery: (prev, { subscriptionData: { data: { onCreateRecipe }} }) => ({
          ...prev,
          listRecipes: {
            __typename: "RecipeConnection",
            items: [onCreateRecipe, ...prev.listRecipes.items.filter(recipe => recipe.id !== onCreateRecipe.id)]
          }
        })
      })
    },
    subscribeToDeletedRecipes: params => {
      props.data.subscribeToMore({
        document: DeleteRecipeSubscription,
        updateQuery: (prev, { subscriptionData: { data: { onDeleteRecipe }} }) => ({
          ...prev,
          listRecipes: {
            __typename: "RecipeConnection",
            items: [
              ...prev.listRecipes.items.filter(recipe =>
                recipe.id !== onDeleteRecipe.id
              )
            ]
          }
        })
      })
    }
  })
})

export const createRecipeGQLAction = graphql(CreateRecipe, {
  props: props => ({
    onAdd: recipe => {
      props.mutate({
        variables: recipe,
        optimisticResponse: {
          __typename: 'Mutation',
          createRecipe: {...recipe, __typename: 'Recipe'}
        },
        update: (proxy, { data: { createRecipe }}) => {
          const data = proxy.readQuery({ query: ListRecipes })
          let alreadyAdded = false
          data.listRecipes.items.map((item) => {
            if (item.id === createRecipe.id) {
              return alreadyAdded = true;
            } else return null
          })
          if (alreadyAdded) return
          data.listRecipes.items.push(createRecipe)
          proxy.writeQuery({ query: ListRecipes, data })
        }
      })
    }
  })
})

export const deleteRecipeAction = graphql(DeleteRecipe, {
  props: props => ({
    deleteRecipeById: id => {
      props.mutate({
        variables: {id: id},
        optimisticResponse: {
          __typename: 'Mutation',
          deleteRecipe: {id, __typename: 'ID'}
        },
        update: (proxy, { data: { deleteRecipe }}) => {
          const data = proxy.readQuery({ query: ListRecipes })
          let idExists = false;

          if (!idExists) {
            data.listRecipes.items.reduce((items, recipe) => {
              if (recipe.id === deleteRecipe.id) {
                idExists = recipe.id === deleteRecipe.id
                return items
              } else {
                return [...items, recipe]
              }
            }, [])
          } else {
            proxy.writeQuery({ query: DeleteRecipe, id, __typename: deleteRecipe.__typename })
          }
        }
      })
    }
  })
})