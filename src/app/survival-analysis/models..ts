export class SurvivalAnalysisFilterValues {
    neptunCodes: string[] = [];
}

export interface SurvivalPrediction {
    neptunCode: string,

    semester_1: number|null,

    semester_2: number|null,

    semester_3: number|null,

    semester_4: number|null,

    semester_5: number|null,

    semester_6: number|null,

    semester_7: number|null,

    semester_8: number|null,

    semester_9: number|null,

    semester_10: number|null,

    semester_11: number|null,

    risk_score: number|null,
    
    [key: string]: any
}

export interface SurvivalStatistic {
    neptunCode: string,

    credit: number,

    admissionSemester: string,

    semesterCount: number,

    weightedGradePointAverage: number
}