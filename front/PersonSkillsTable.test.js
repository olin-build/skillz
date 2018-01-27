import { PersonSkillTable } from './PersonSkillsTable.js'
import React from 'react'
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

const personSkillsData = {
    allUsers: {
        edges: [
            {
                node: {
                    id: 1,
                    firstName: "Laszlo",
                    lastName: "Toth",
                    userSkillsByUserId: {
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

describe('PersonSkillTable', () => {
    test(`matches snapshot`, () => {
        const component = renderer.create(
            <PersonSkillTable data={personSkillsData} />
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
})
