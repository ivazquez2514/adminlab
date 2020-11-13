import { gql } from '@apollo/client';

export const COLLABORATOR_CREATE = gql`
    mutation CollaboratorCreate (
        $collaborator: CollaboratorInput!
    ) {
        collaboratorCreate(
            collaborator: $collaborator
        ) {
            id
        }
    }
`;