import { gql } from '@apollo/client';

export const GENERAL_LOG_LIST = gql`
    query GeneralLogList {
        generalLogList {
            generalId
            id
            ownerId
            actionType
            logType
            updatedAt
            owner {
                username
                role
            }
        }
    }
`;