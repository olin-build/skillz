import { EditRating, Rating } from './Rating.js'
import React, { Component } from 'react';
import { graphql, withApollo } from 'react-apollo';

import gql from 'graphql-tag'

const API_SERVER_URL = process.env.API_SERVER_URL !== true ? process.env.API_SERVER_URL : 'http://127.0.0.1:5000/';

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
    let personSkills = personSkillsBySkillObjects(person, skills);
    function setRating(skill, key, level) {
        const url = `${API_SERVER_URL}person/${person.id}/skill/${skill.id}`;
        fetch(url, {
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
                {personSkills.map(({ skill, personSkill }) =>
                    <tr key={`${person.id}-${skill.id}`}>
                        <th>{skill.name}</th>
                        <td>
                            <EditRating
                                rating={personSkill.experience}
                                onRating={r => setRating(skill, 'experience', r)} />
                        </td>
                        <td>
                            <EditRating
                                rating={personSkill.desire}
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

export function personSkillsBySkillObjects(person, skills) {
    let personSkillsById = Object();
    person.userSkillsByUserId.edges.forEach(({ node }) =>
        personSkillsById[node.skillId] = node
    );
    return skills.map(skill => ({
        skill, personSkill: personSkillsById[skill.id] || {}
    }));
}

export function personSkillsBySkill(person, skills) {
    let personSkills = Object();
    person.userSkillsByUserId.edges.forEach(({ node }) => personSkills[node.skillId] = node);
    return skills.map(({ id, name }) => personSkills[id] || { id, name });
}
