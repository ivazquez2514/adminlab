import { gql } from '@apollo/client';

export const AREA_DELETE = gql`
    mutation AreaDelete (
        $id: String!
    ) {
        areaDelete(
            id: $id
        )
    }
`;