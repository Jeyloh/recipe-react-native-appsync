import graphql from 'graphql-tag'

export default graphql`
    subscription onCreateRecipe {
        onCreateRecipe {
            name
            id
            ingredients
            directions
        }
    }
`