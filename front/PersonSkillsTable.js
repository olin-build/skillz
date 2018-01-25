import { PersonSkillRow, personSkillsBySkill } from './Person.js'
import React, { Component } from 'react';
import { graphql, withApollo } from 'react-apollo';

import gql from 'graphql-tag'

class PersonSkillTable extends Component {
    render() {
        let { data } = this.props;
        if (!data.allUsers) return null;
        let people = data.allUsers.edges.map(({ node }) => node);
        let skills = data.allSkills.edges.map(({ node }) => node);
        people.sort(({ firstName: a }, { firstName: b }) => a < b ? -1 : a > b ? 1 : 0)
        return <table className="ui striped selectable definition table">
            <tbody>
                <tr><th />{skills.map(({ name, id }) => <th key={'skill-' + id}>{name}</th>)}</tr>
                {people.map(person =>
                    <PersonSkillRow key={'person-' + person.id}
                        person={person}
                        skills={personSkillsBySkill(person, skills)}
                        onClick={_ => this.props.onRowClick(person)}
                    />)}
            </tbody>
        </table>
    }
}

export const personSkillsQuery = gql`
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
                skillId
                experience
                desire
                note
                instructor
                skillBySkillId {name}
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


export const PersonSkillTableContainer = graphql(personSkillsQuery)(PersonSkillTable);
