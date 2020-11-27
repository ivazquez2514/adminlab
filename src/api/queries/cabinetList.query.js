import { gql } from '@apollo/client';

export const CABINET_LIST = gql`
    query CabinetList {
        cabinetList {
            id
            cabinetNumber
            cabinetType
            rows
            columns
            expedients {
                id
                caseNumber
                lamellaCoordinates {
                  expedientId
                  cabinetItems
                  cabinetId
                  row
                  column
                  third
                  updatedAt
                }
                blockCoordinates {
                  expedientId
                  cabinetItems
                  cabinetId
                  row
                  column
                  third
                  updatedAt
                }
            }
        }
    }
`;