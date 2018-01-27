import { EditRating, Rating } from './Rating.js'
import { PersonSkillTableContainer, personSkillsQuery } from './PersonSkillsTable.js'
import React, { Component } from 'react';
import { graphql, withApollo } from 'react-apollo';

import { EditPersonContainer } from './Person.js'
import gql from 'graphql-tag'

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
                <Instructions />
                <Legend />
                <div className="ui two column grid" >
                    <PersonSkillTableContainer className="column" onRowClick={person => this.selectPerson(person)} />
                    {person && <EditPersonContainer person={person} skills={skills} />}
                </div>
            </div>
        );
    }
}

const Instructions = () =>
    <div>
        <p>
            Use this tool to find people who know or want to learn X. </p>
        <p>
            Click a row to edit it. (Please only edit yourself or with permission!)
            A panel will appear below the table.</p>
    </div>


const Legend = () =>
    <div>
        <Rating rank={5} className="inline" />
        <p> = knows X.</p>
        <Rating rank={5} className="inline" icon="student" />
        <p> = wants to learn X.</p>
        <div style={{ height: '20px' }} />
    </div>


export default graphql(personSkillsQuery)(App);
