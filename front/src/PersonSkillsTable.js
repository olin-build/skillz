import React, { Component } from 'react';
import { graphql, withApollo } from 'react-apollo';

import { Rating } from './Rating.js'
import { getPersonSkillRecords } from './EditPerson.js'
import gql from 'graphql-tag'

export const PersonSkillsTable = ({ data, onRowClick }) => {
  if (data.error) {
    return (<div className="ui warning icon message">
      <i class="warning icon"></i>
      <div class="content">
        <div className="header"> Server Error </div>
        <p>{String(data.error)}</p>
      </div>
    </div>)
  }
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
          onClick={() => onRowClick(person)}
        />)}
    </tbody>
  </table>
}
export const PersonSkillRow = ({ person, skills, onClick }) => {
  const personSkillRecords = getPersonSkillRecords(person, skills);
  return (<tr onClick={onClick}>
    <th>
      <div>{person.firstName}</div>
      <div className="right aligned">{person.lastName}</div></th>
    {personSkillRecords.map(({ skill, personSkill }) =>
      <td key={skill.id}>
        <Rating rating={personSkill.experience} icon="star" />
        <Rating rating={personSkill.desire} icon="student" />
      </td>)}
  </tr>)
};

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


export const PersonSkillTableContainer = graphql(personSkillsQuery, {
  options: {
    errorPolicy: 'all'
  }
})(PersonSkillsTable);
