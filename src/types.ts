export enum Routes {
  Loading,
  Login,
  ListOfSurveys,
  Survey,
}

export interface SurveyData {
  surveys: {
    title?: string,
    description?: string,
  }[]
}
