import { gql } from '@apollo/client';

export const AREA_LOG_LIST = gql`
    query AreaLogList {
        areaLogList {
            id
            actionType
            area {
                id
                name
                usersQuantity
                cabinetLamellasQuantity
                cabinetBlocksQuantity
            }
            createdAt
        }
    }
`;