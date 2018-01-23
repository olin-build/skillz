import React, { Component } from 'react';

import gql from 'graphql-tag'
import { graphql } from 'react-apollo';

class App extends Component {
    render() {
        return (
            <div className="ui container">
                <h1 className="ui dividing header">People Skillz Finder</h1>
                <p>Use this to find people who etc.</p>
                <div className="ui two column grid" >
                    <SkillTable className="column" />
                </div>
            </div>
        );
    }
}

const userSkillsQuery = gql`
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

const SkillTable = graphql(userSkillsQuery)(({ data }) => {
    if (!data.allUsers) return null;
    let people = data.allUsers.edges.map(({ node }) => node);
    let skills = data.allSkills.edges.map(({ node }) => node);
    people.sort(({ firstName: a }, { firstName: b }) => a < b ? -1 : a > b ? 1 : 0)
    return <table className="ui striped definition table">
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
            <td key={'p' + personId + 's' + node.id}>
                {
                    node.level > 1
                        ? <Rating level={node.level} />
                        : <span>{node.level}</span>
                }
            </td>)}
    </tr>;

const Rating = ({ rating }) =>
    <div>
        {Array.apply(null, Array(5)).map((_, i) =>
            <i key={i} className="small star icon" />)}
    </div>

export default App;
