import React, { Component } from 'react';
import { graphql, withApollo } from 'react-apollo';

import { Rating } from './Rating.js'
import { getPersonSkillRecords } from './EditPerson.js'
import gql from 'graphql-tag'

export const PersonSkillsTable = ({ data, editablePerson = null, onRowClick }) => {
    if (data.error) {
        console.error(data.error.message)
        return (<div className="ui warning icon message">
            <i className="warning sign icon"></i>
            <div className="content">
                <div className="header"> Server Error </div>
                <p>{String(data.error.message)}</p>
                <p>If you are outside the Olin Network, turn on your VPN and try again.</p>
            </div>
        </div>)
    }
    if (data.loading) {
        return (<div className="ui active inverted dimmer">
            <div className="ui text loader">Loading</div>
        </div>)
    }
    let people = data.allPeople.edges.map(({ node }) => node);
    let skills = data.allSkills.edges.map(({ node }) => node);
    people.sort(({ firstName: a }, { firstName: b }) => a < b ? -1 : a > b ? 1 : 0)
    return (<table className="ui striped selectable definition table">
        <thead>
            <tr className="sticky">
                <th />
                {skills.map(({ name, id }) => <th key={id}>{name}</th>)}
            </tr>
        </thead>
        <tbody>
            {people.map(person =>
                <PersonSkillRow key={person.id}
                    person={person}
                    skills={skills}
                    editable={person === editablePerson}
                    onClick={() => onRowClick(person)}
                />)}
        </tbody>
    </table>)
}
export const PersonSkillRow = ({ person, skills, onClick, editable }) => {
    const personSkillRecords = getPersonSkillRecords(person, skills);
    return (<tr onClick={onClick}>
        <th className="person-name">
            <div className="first-name">{person.firstName}</div>
            <div className="right aligned last-name">{person.lastName}</div>
            {editable && <div className="ui label">
                Edit your stars in the table below.
      </div>}
        </th>
        {personSkillRecords.map(({ skill, personSkill }) =>
            <td key={skill.id} className="center aligned">
                <Rating rating={personSkill.experience} icon="star" />
                <Rating rating={personSkill.interest} icon="student" />
            </td>
        )}
    </tr >)
};

export const personSkillsQuery = gql`
query {
    allPeople {
        edges {
          node {
        id
          firstName
          lastName
          personSkillsByPersonId {
          edges {
        node {
          id
                skillId
        experience
                interest
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


export const PersonSkillsTableContainer = graphql(personSkillsQuery, {
    options: {
        errorPolicy: 'all'
    }
})(PersonSkillsTable);
