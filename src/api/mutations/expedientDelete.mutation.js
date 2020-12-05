import { gql } from '@apollo/client';

export const EXPEDIENT_DELETE = gql`
    mutation ExpedientDelete (
        $id: String!
    ) {
        expedientDelete(
            id: $id
        )
    }
`;