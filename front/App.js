import React, { Component } from 'react';

import gql from 'graphql-tag'
import { graphql } from 'react-apollo';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { person: null };
    }
    selectPerson(person) {
        this.setState({ person });
    }
    render() {
        const { data } = this.props;
        if (!data.allSkills) return <div>Loading…</div>;
        let skills = data.allSkills.edges.map(({ node }) => node);
        const { person } = this.state;
        return (
            <div className="ui container">
                <h1 className="ui dividing header">People Skillz Finder</h1>
                <p>Use this tool to find people who know or want to learn X.</p>
                <Legend />
                <p>Click to edit.</p>
                <div className="ui two column grid" >
                    <SkillTableContainer className="column" onRowClick={person => this.selectPerson(person)} />
                    {person && <EditPersonContainer person={person} skills={skills} />}
                </div>
            </div>
        );
    }
}

const Legend = (_) =>
    <div>
        <Rating rank={5} className="inline" />
        <p> = I know X.</p>
        <Rating rank={5} className="inline" icon="student" />
        <p> = I want to learn X.</p>
    </div>

const userSkillsQuery = gql`
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

function edgeMap(edges) {
    let map = Object();
    edges.forEach(({ node }) => map[node.id] = node);
    return map;
}

function personSkillsBySkill(person, skills) {
    let personSkills = Object();
    person.userSkillsByUserId.edges.forEach(({ node }) => personSkills[node.skillId] = node);
    return skills.map(({ id, name }) => personSkills[id] || { id, name });
}

class SkillTable extends Component {
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

const SkillTableContainer = graphql(userSkillsQuery)(SkillTable);

const PersonSkillRow = ({ person: { id: personId, firstName, lastName }, skills, onClick }) =>
    <tr onClick={onClick}>
        <th>{firstName} {lastName}</th>
        {skills.map((node, i) =>
            <td key={'p' + personId + 's' + node.id + '-' + i}>
                {node.experience && <Rating rank={node.experience} icon="star" />}
                {node.desire && <Rating rank={node.desire} icon="student" />}
            </td>)}
    </tr>;

const personSkillsMutation = gql`
mutation UpdateUserSkill ($input: UpdateUserSkillInput!) {
    updateUserSkill(input: $input) {
      clientMutationId
    }
}`;

// mutation CreateUserSkill($input: CreateUserSkillInput!) {
//     createUserSkill(input: $input) {
//       userSkill{id}
//     }
//   }

const EditPerson = ({ person, skills, mutate }) => {
    let sorted = personSkillsBySkill(person, skills);
    function setRatingGraphql(skill, rating) {
        let variables = {
            input: {
                nodeId: skill.id,
                userSkillPatch: { experience: rating }
            }
        }
        mutate({ variables })
            .then(({ data }) => {
                console.log('got data', data);
            }).catch((error) => {
                console.log('there was an error sending the query', error);
            });
    }
    function setRating(skill, rating) {
        fetch(`http://localhost:5000/person/${person.id}/skill/${skill.id}`, {
            method: 'POST',
            body: JSON.stringify({ experience: rating }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success:', response));
    }
    return (<div>
        <h1 className="ui dividing header">{person.firstName} {person.lastName}</h1>
        <table className="striped table">
            <tbody>
                <tr><th /><th>Experience</th></tr>
                {sorted.map((skill, i) =>
                    <tr key={'p' + person.id + 's' + skill.id + '-' + i}>
                        <th>{skill.name || skill.skillBySkillId.name}</th>
                        <td><EditRating rank={skill.experience} onRating={r => setRating(skill, r)} /></td>
                    </tr>)}
            </tbody>
        </table>
    </div>
    );
}
const EditPersonContainer = graphql(personSkillsMutation)(EditPerson);

const Rating = ({ rank, icon }) =>
    <div>
        {Array.apply(null, Array(rank)).map((_, i) =>
            <i key={i} className={"icon small " + (icon || 'star')} />)}
    </div>

const EditRating = ({ rank, icon, onRating }) => {
    rank = rank || 0;
    icon = icon || 'star';
    return (
        <div>
            {rank > 0 && Array.apply(null, Array(rank)).map((_, i) =>
                <i key={i} className={"icon small " + icon}
                    onClick={() => onRating(i + 1)} />)}
            {rank < 5 && Array.apply(null, Array(5 - rank)).map((_, i) =>
                <i key={i + rank} className={"icon small empty " + icon}
                    onClick={() => onRating(i + 1 + rank)} />)}
        </div>)
}

export default graphql(userSkillsQuery)(App);
