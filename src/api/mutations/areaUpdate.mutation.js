import { gql } from '@apollo/client';

export const AREA_UPDATE = gql`
    mutation AreaUpdate (
        $area: AreaInput!
    ) {
        areaUpdate(
            area: $area
        ) {
            id
        }
    }
`;