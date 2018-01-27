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
                <div className="ui message">
                    <Instructions />
                    <Legend />
                </div>
                <PersonSkillTableContainer className="column" onRowClick={person => this.selectPerson(person)} />
                {person && <EditPersonContainer person={person} />}
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
    <table>
        <tr>
            <td><Rating rating={5} className="inline" /></td>
            <td>very experienced</td>
        </tr>
        <tr>
            <td><Rating rating={1} className="inline" /></td>
            <td>knows a little</td>
        </tr>
        <tr>
            <td><Rating rating={5} className="inline" icon="student" /></td>
            <td>really wants to learn</td>
        </tr>
        <tr>
            <td><Rating rating={0} className="inline" /></td>
            <td>doesn't know / doesn't care</td>
        </tr>
    </table>


export default App;
