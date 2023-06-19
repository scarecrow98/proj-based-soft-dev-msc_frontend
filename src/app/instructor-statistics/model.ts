export class InstructorStatisticsFilterValues {
    semesterNames: string[] = [];

    subjectCodes: string[] = [];

    subjectNames: string[] = [];

    teacherNames: string[] = [];
}

export interface InstructorStatisticsItem {
    teacherName: string,

    teacherProportion: number,

    courseCode: string,

    courseSemester: string,

    courseType: string,

    courseProgram: string,

    courseLanguage: string,

    subjectName: string,

    subjectCode: string,

    signaturePerEnrollment: number|null,

    completedPerSignature: number|null,

    completedPerEnrollment: number|null,

    numberOfEnrollment: number|null,

    numberOfSignature: number|null,

    numberOfSignatureRefusal:  number|null,

    numberOfCompleted: number|null
}

export type InstructorName = string;

export type InstructorStatisticsResults = Record<InstructorName, InstructorStatisticsItem[]>;