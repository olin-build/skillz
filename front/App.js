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
                <SkillTable />
            </div>
        );
    }
}

const QUERY = gql`
{
    allUsers {
      edges {
        node {
          id
          firstName
          lastName
        }
      }
    }
    allSkills {
      edges {
        node {
          id
          name
        }
      }
    }
    allUserSkills {
      edges {
        node {
          userId
          skillId
          level
          aspiration
          note
          instructor
        }
      }
    }
  }
  `;

function edgeMap(edges) {
    let map = Object();
    edges.forEach(({ node }) => map[node.id] = node);
    return map;
}

const SkillTable = graphql(QUERY)(({ data }) => {
    if (!data.allUsers) return null;
    let people = data.allUsers.edges.map(({ node }) => node);
    let skills = data.allSkills.edges.map(({ node }) => node);
    // let people = edgeMap(data.allUsers.edges);
    // let skills = edgeMap(data.allSkills.edges);
    let join = data.allUserSkills.edges.map(({ node }) => node);
    skills.sort(({ name: a }, { name: b }) => a < b ? -1 : a > b ? 1 : 0)
    people.sort(({ firstName: a }, { firstName: b }) => a < b ? -1 : a > b ? 1 : 0)
    return <table>
        <tbody>
            <tr><th />{skills.map(({ name, id }) => <th key={'skill-' + id}>{name}</th>)}</tr>
            {people.map(person => <PersonSkillRow key={'person-' + person.id} person={person} join={join} />)}
        </tbody>
    </table>
});

const PersonSkillRow = ({ person: { id, firstName, lastName }, join }) =>
    <tr><td>{firstName} {lastName}</td></tr>;


export default App;
