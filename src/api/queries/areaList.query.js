import { gql } from '@apollo/client';

export const AREA_LIST = gql`
    query AreaList {
        areaList {
            id
            name
        }
    }
`;