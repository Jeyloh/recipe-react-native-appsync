import graphql from 'graphql-tag'

export default graphql`
    subscription onDeleteRecipe {
        onDeleteRecipe {
            name
            id
            ingredients
            directions
        }
    }
`