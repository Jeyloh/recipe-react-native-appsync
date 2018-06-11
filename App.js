import React from 'react';
import Amplify, { Auth } from 'aws-amplify'
import { ApolloProvider } from "react-apollo"
import { withAuthenticator } from 'aws-amplify-react-native';
import AWSAppSyncClient from 'aws-appsync'
import { Rehydrated } from 'aws-appsync-react'
import AppSync from './AppSync'
import aws_exports from './aws-exports';

import Root from "./src/components/Root"

Amplify.configure(aws_exports);

const awsClient = new AWSAppSyncClient ({
  url: AppSync.graphqlEndpoint,
  region: AppSync.region,
  auth: {
    type: AppSync.authenticationType,
    jwtToken: async () => (await Auth.currentSession()).getIdToken().getJwtToken()
  }
})

const RootWithAuth = withAuthenticator(Root)

class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={awsClient}>
        <Rehydrated>
          <RootWithAuth />
        </Rehydrated>
      </ApolloProvider>
    );
  }
}

export default App


