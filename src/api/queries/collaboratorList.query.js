import { gql } from '@apollo/client';

export const COLLABORATOR_LIST = gql`
    query CollaboratorList {
        collaboratorList {
            id
            role
            username
            area {
                id
                name
            }
        }
    }
`;