import { gql } from '@apollo/client';

export const COLLABORATOR_DELETE = gql`
    mutation CollaboraDelete (
        $id: String!
    ) {
        collaboraDelete(
            id: $id
        )
    }
`;