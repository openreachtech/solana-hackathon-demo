import BaseAppGraphqlPayload from '~/app/graphql/client/BaseAppGraphqlPayload'

/**
 * Curriculums query payload.
 *
 * @extends {BaseAppGraphqlPayload<typeof CurriculumsQueryGraphqlPayload, CurriculumsQueryRequestVariables>}
 */
export default class CurriculumsQueryGraphqlPayload extends BaseAppGraphqlPayload {
  /** @override */
  static get document () {
    return /* GraphQL */ `
      query CurriculumsQuery ($input: CurriculumsSearchInput!) {
        curriculums (input: $input) {
          curriculums {
            id
            title
            description
            thumbnailUrl
            postedAt
          }
          pagination {
            limit
            offset
            sort {
              targetColumn
              orderBy
            }
            totalRecords
          }
        }
      }
    `
  }
}

/**
 * @typedef {{
 *   input: {
 *     limit: number
 *     offset: number
 *     sort: {
 *       targetColumn: string
 *       orderBy: string
 *     }
 *   }
 * }} CurriculumsQueryRequestVariables
 */
