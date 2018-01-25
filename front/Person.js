import { EditRating, Rating } from './Rating.js'
import React, { Component } from 'react';
import { graphql, withApollo } from 'react-apollo';

import gql from 'graphql-tag'

export const PersonSkillRow = ({ person: { id: personId, firstName, lastName }, skills, onClick }) =>
    <tr onClick={onClick}>
        <th>{firstName} {lastName}</th>
        {skills.map((node) =>
            <td key={node.id}>
                {node.experience && <Rating
                    rank={node.experience}
                    icon="star"
                />}
                {node.desire && <Rating
                    rank={node.desire}
                    icon="student"
                />}
            </td>)}
    </tr>;

const EditPerson = ({ person, skills, client, mutate }) => {
    let personSkills = personSkillsBySkill(person, skills);
    function setRating(skill, key, level) {
        fetch(`http://localhost:5000/person/${person.id}/skill/${skill.skillId}`, {
            method: 'POST',
            body: JSON.stringify({ [key]: level }),
            headers: new Headers({ 'Content-Type': 'application/json' })
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => client.resetStore());
    }
    return (<div>
        <h1 className="ui dividing header">{person.firstName} {person.lastName}</h1>
        <table className="ui large striped table">
            <tbody>
                <tr><th />
                    <th>Experience</th>
                    <th>Desire</th>
                </tr>
                {personSkills.map((skill, i) =>
                    <tr key={'p' + person.id + 's' + skill.id}>
                        <th>{skill.name || skill.skillBySkillId.name}</th>
                        <td>
                            <EditRating
                                rank={skill.experience}
                                onRating={r => setRating(skill, 'experience', r)} />
                        </td>
                        <td>
                            <EditRating
                                rank={skill.experience}
                                icon="student"
                                onRating={r => setRating(skill, 'desire', r)} />
                        </td>
                    </tr>)}
            </tbody>
        </table>
    </div>
    );

}

const personSkillsMutation = gql`
    mutation UpdateUserSkill ($input: UpdateUserSkillInput!) {
        updateUserSkill(input: $input) {
        clientMutationId
        }
    }
`;

export const EditPersonContainer = graphql(personSkillsMutation)(withApollo(EditPerson));

export function personSkillsBySkill(person, skills) {
    let personSkills = Object();
    person.userSkillsByUserId.edges.forEach(({ node }) => personSkills[node.skillId] = node);
    return skills.map(({ id, name }) => personSkills[id] || { id, name });
}
