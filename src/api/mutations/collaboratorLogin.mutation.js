import { gql } from '@apollo/client';

export const COLLABORATOR_LOGIN = gql`
    mutation CollaboratorLogin (
        $username: String!
        $password: String!
    ) {
        collaboratorLogin (
            username: $username
            password: $password
        ) {
            token
            collaborator {
                id
                username
                role
            }
        }
    }
`;