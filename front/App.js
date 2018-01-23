import React, { Component } from 'react';

import gql from 'graphql-tag'
import { graphql } from 'react-apollo';

class App extends Component {
    render() {
        return (
            <div className="App">
                <header>
                    <h1>Skillz Finder</h1>
                </header>
                <p>
                    A table of people and skills will go here.
                </p>
                <MyComponentWithData />
            </div>
        );
    }
}

const queryPeople = gql`
  query {
    allUsers {
      edges {
        node {
          id
          firstName
          lastName
          userSkillsByUserId {
            edges {
              node {
                id
                level
                aspiration
                note
                instructor
                skillId
              }
            }
          }
        }
      }
    }
  }
`;

const MyComponentWithData = graphql(queryPeople)(({ data }) => {
    if (!data.allUsers) return null;
    let people = data.allUsers.edges;
    console.info(people)
    return <div>...</div>
});

export default App;
