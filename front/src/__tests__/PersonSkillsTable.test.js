import { PersonSkillsTable } from '../PersonSkillsTable.js'
import React from 'react'
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

const personSkillsData = {
    allPeople: {
        edges: [
            {
                node: {
                    id: 1,
                    firstName: "Laszlo",
                    lastName: "Toth",
                    personSkillsByPersonId: {
                        edges: [
                            {
                                node: {
                                    id: 3,
                                    skillId: 1,
                                    experience: 5,
                                    desire: 3,
                                    note: null,
                                    skillBySkillId: {
                                        name: "React"
                                    }
                                }
                            }
                        ]
                    }
                }
            }
        ]
    },
    allSkills: {
        edges: [
            {
                node: {
                    id: 13,
                    name: "React"
                }
            },
            {
                node: {
                    id: 7,
                    name: "Jest"
                }
            }
        ]
    }
};

describe('PersonSkillsTable', () => {
    test(`matches snapshot`, () => {
        const component = renderer.create(
            <PersonSkillsTable data={personSkillsData} />
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
})
