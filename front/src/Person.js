import React, { Component } from 'react';
import { graphql, withApollo } from 'react-apollo';

import { EditRating } from './Rating.js'
import gql from 'graphql-tag'

const API_SERVER_URL = process.env.API_SERVER_URL !== true ? process.env.API_SERVER_URL : 'http://127.0.0.1:5000/';

const EditPerson = ({ person, skills, client, mutate }) => {
    let personSkills = getPersonSkillRecords(person, skills);
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
                    <th>Want to Learn</th>
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

export const EditPersonContainer = EditPerson;

export function getPersonSkillRecords(person, skills) {
    let personSkillsById = Object();
    person.userSkillsByUserId.edges.forEach(({ node }) =>
        personSkillsById[node.skillId] = node
    );
    return skills.map(skill => ({
        skill, personSkill: personSkillsById[skill.id] || {}
    }));
}
