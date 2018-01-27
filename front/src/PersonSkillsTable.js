import React, { Component } from 'react';
import { graphql, withApollo } from 'react-apollo';

import { Rating } from './Rating.js'
import gql from 'graphql-tag'
import { personSkillsBySkill } from './Person.js'

export const PersonSkillsTable = ({ data }) => {
  if (!data || !data.allUsers) return null;
  let people = data.allUsers.edges.map(({ node }) => node);
  let skills = data.allSkills.edges.map(({ node }) => node);
  people.sort(({ firstName: a }, { firstName: b }) => a < b ? -1 : a > b ? 1 : 0)
  return <table className="ui striped selectable definition table">
    <tbody>
      <tr><th />{skills.map(({ name, id }) => <th key={id}>{name}</th>)}</tr>
      {people.map(person =>
        <PersonSkillRow key={person.id}
          person={person}
          skills={skills}
          onClick={() => this.props.onRowClick(person)}
        />)}
    </tbody>
  </table>
}
export const PersonSkillRow = ({ person, skills, onClick }) =>
  <tr onClick={onClick}>
    <th>
      <div>{person.firstName}</div>
      <div className="right aligned">{person.lastName}</div></th>
    {personSkillsBySkill(person, skills).map((node) =>
      <td key={node.id}>
        <Rating rating={node.experience} icon="star" />
        <Rating rating={node.desire} icon="student" />
      </td>)}
  </tr>;

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


export const PersonSkillTableContainer = graphql(personSkillsQuery)(PersonSkillsTable);
