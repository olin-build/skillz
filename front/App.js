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
            userSkillsByUserId {
              edges {
                node {
                  skillId
                  level
                  aspiration
                  note
                  instructor
                }
              }
            }
          }
        }
      }
      allSkills(orderBy: NAME_ASC) {
        edges {
          node {
            id
            name
          }
        }
      }
}`;

function edgeMap(edges) {
    let map = Object();
    edges.forEach(({ node }) => map[node.id] = node);
    return map;
}

function personSkillsBySkill(person, skills) {
    let personSkills = Object();
    person.userSkillsByUserId.edges.forEach(({ node }) => personSkills[node.skillId] = node)
    return skills.map(({ id, name }) => personSkills[id] || { id, name });
}

const SkillTable = graphql(QUERY)(({ data }) => {
    if (!data.allUsers) return null;
    let people = data.allUsers.edges.map(({ node }) => node);
    let skills = data.allSkills.edges.map(({ node }) => node);
    people.sort(({ firstName: a }, { firstName: b }) => a < b ? -1 : a > b ? 1 : 0)
    return <table>
        <tbody>
            <tr><th />{skills.map(({ name, id }) => <th key={'skill-' + id}>{name}</th>)}</tr>
            {people.map(person =>
                <PersonSkillRow key={'person-' + person.id}
                    person={person}
                    skills={personSkillsBySkill(person, skills)}
                />)}
        </tbody>
    </table>
});

const PersonSkillRow = ({ person: { id: personId, firstName, lastName }, skills }) =>
    <tr>
        <th>{firstName} {lastName}</th>
        {skills.map((node) =>
            <td key={'p' + personId + 's' + node.id}> {node.level}</td>)}
    </tr>;


export default App;
