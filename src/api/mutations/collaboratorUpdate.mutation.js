import { gql } from '@apollo/client';

export const COLLABORATOR_UPDATE = gql`
    mutation CollaboratorUpdate (
        $collaborator: CollaboratorInput!
    ) {
        collaboratorUpdate (
            collaborator: $collaborator
        ) {
            id
        }
    }
`;