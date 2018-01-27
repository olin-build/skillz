import { EditRating, Rating } from './Rating.js'
import React, { Component } from 'react';
import { graphql, withApollo } from 'react-apollo';

import { EditPersonContainer } from './EditPerson.js'
import { PersonSkillTableContainer } from './PersonSkillsTable.js'
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
        const { person } = this.state;
        return (
            <div className="ui container">
                <h1 className="ui dividing header">People Skillz Finder</h1>
                <Instructions />
                <Legend />
                <div className="ui two column grid" >
                    <PersonSkillTableContainer className="column" onRowClick={person => this.selectPerson(person)} />
                    {person && <EditPersonContainer person={person} />}
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
        <Rating rating={5} className="inline" />
        <p> = knows X.</p>
        <Rating rating={5} className="inline" icon="student" />
        <p> = wants to learn X.</p>
        <div style={{ height: '20px' }} />
    </div>


export default App;
