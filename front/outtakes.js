const personSkillsMutation = gql`
    mutation UpdateUserSkill ($input: UpdateUserSkillInput!) {
            updateUserSkill(input: $input) {
            clientMutationId
        }
        }
`;

export const EditPersonContainer = graphql(personSkillsMutation)(withApollo(EditPerson));

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

mutation CreateUserSkill($input: CreateUserSkillInput!) {
    createUserSkill(input: $input) {
        userSkill{ id }
    }
}

client.writeFragment({
    id: skill.id,
    // id: `UserSkill_${skill.id}`,
    fragment: gql`
        fragment userSkill on UserSkill {
        experience
        }
    `,
    data: {
        experience: rating,
        __typename: 'UserSkill'
    },
});
