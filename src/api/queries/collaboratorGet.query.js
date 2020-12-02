import { gql } from '@apollo/client';

export const COLLABORATOR_GET = gql`
    query CollaboratorGet(
        $id: String!
    ) {
        collaboratorGet(
            id: $id
        ) {
            id
            areaId
            role
            username
        }
    }
`;