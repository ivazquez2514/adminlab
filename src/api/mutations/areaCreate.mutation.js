import { gql } from '@apollo/client';

export const AREA_CREATE = gql`
    mutation AreaCreate (
        $area: AreaInput!
    ) {
        areaCreate(
            area: $area
        ) {
            id
        }
    }
`;