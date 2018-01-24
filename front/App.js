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
                    <SkillTable className="column" onRowClick={person => this.selectPerson(person)} />
                    {person && <EditPerson person={person} skills={skills} />}
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

const userSkillsQuery = gql`{
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

class SkillTableComponent extends Component {
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

const SkillTable = graphql(userSkillsQuery)(SkillTableComponent);

const PersonSkillRow = ({ person: { id: personId, firstName, lastName }, skills, onClick }) =>
    <tr onClick={onClick}>
        <th>{firstName} {lastName}</th>
        {skills.map((node) =>
            <td key={'p' + personId + 's' + node.id}>
                {node.experience && <Rating rank={node.experience} icon="star" />}
                {node.desire && <Rating rank={node.desire} icon="student" />}
            </td>)}
    </tr>;

const EditPerson = ({ person, skills }) => {
    let sorted = personSkillsBySkill(person, skills);
    return (<div>
        <h1 className="ui dividing header">{person.firstName} {person.lastName}</h1>
        <table className="striped table">
            <tbody>
                <tr><th /><th>Experience</th></tr>
                {sorted.map((skill, i) =>
                    <tr key={'s-' + skill.id}>
                        <th>{skill.name || skill.skillBySkillId.name}</th>
                        <td><EditRating rank={skill.experience} /></td>
                    </tr>)}
            </tbody>
        </table>
    </div>
    );
}

const Rating = ({ rank, icon }) =>
    <div>
        {Array.apply(null, Array(rank)).map((_, i) =>
            <i key={i} className={"icon small " + (icon || 'star')} />)}
    </div>

const EditRating = ({ rank, icon }) => {
    rank = rank || 0;
    icon = icon || 'star'
    return (
        <div>
            {rank > 0 && Array.apply(null, Array(rank)).map((_, i) =>
                <i key={i} className={"icon small " + icon} />)}
            {rank < 5 && Array.apply(null, Array(5 - rank)).map((_, i) =>
                <i key={-i} className={"icon small empty " + icon} />)}
        </div>)
}

export default graphql(userSkillsQuery)(App);
