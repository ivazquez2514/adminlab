import { gql } from '@apollo/client';

export const CABINET_DELETE = gql`
    mutation CabinetDelete (
        $id: String!
    ) {
        cabinetDelete(
            id: $id
        )
    }
`;