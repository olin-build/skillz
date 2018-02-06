import React from 'react';
import { graphql, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import { EditRating } from './Rating';

// TODO use a provider pattern to read this from init or app
const API_SERVER_URL = process.env.API_SERVER_URL || 'http://127.0.0.1:5000/';

const EditPerson = ({ person, client, data }) => {
  const skills = data.allSkills.edges.map(({ node }) => node);
  const personSkills = getPersonSkillRecords(person, skills);
  function setRating(skill, key, level) {
    const url = `${API_SERVER_URL}person/${person.id}/skill/${skill.id}`;
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({ [key]: level }),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    }).then(res => res.json())
      .catch(error => console.error('Error:', error)) /* eslint no-console: 0 */
      .then(() => client.resetStore());
  }
  return (
    <div>
      <table className="ui large striped table">
        <caption>
          <h1 className="ui header left aligned">
            {person.firstName} {person.lastName}
          </h1>
        </caption>
        <thead className="sticky">
          <tr>
            <th />
            <th>Experience</th>
            <th>Interest Level</th>
          </tr>
        </thead>
        <tbody>
          {personSkills.map(({ skill, personSkill }) => (
            <tr key={`${person.id}-${skill.id}`}>
              <th>{skill.name}</th>
              <td>
                <EditRating
                  rating={personSkill.experience}
                  onRating={r => setRating(skill, 'experience', r)}
                />
              </td>
              <td>
                <EditRating
                  rating={personSkill.interest}
                  icon="student"
                  onRating={r => setRating(skill, 'interest', r)}
                />
              </td>
            </tr>))}
        </tbody>
      </table>
    </div>
  );
};

export const skillsQuery = gql`
query {
    allSkills(orderBy: NAME_ASC) {
      edges {
        node {
          id
          name
        }
      }
    }
}`;

export function getPersonSkillRecords(person, skills) {
  const personSkillsById = Object();
  person.personSkillsByPersonId.edges.forEach(({ node }) => {
    personSkillsById[node.skillId] = node;
  });
  return skills.map(skill => ({
    skill, personSkill: personSkillsById[skill.id] || {},
  }));
}

export const EditPersonContainer = graphql(skillsQuery, {
  options: {
    errorPolicy: 'all',
  },
})(withApollo(EditPerson));
