export type StoredExamResult = {
  score: number;
  total_questions: number;
  created_at: string;
};

export type StoredStudentProfile = {
  full_name?: string;
  semester_project_desc?: string;
};

export function isMissingTableError(message?: string) {
  return message?.includes('Could not find the table') ?? false;
}

export function readStudentProfile(user?: { user_metadata?: any } | null): StoredStudentProfile {
  return (user?.user_metadata?.student_profile ?? {}) as StoredStudentProfile;
}

export function readExamResults(user?: { user_metadata?: any } | null): StoredExamResult[] {
  const rawResults = user?.user_metadata?.exam_results;
  if (!Array.isArray(rawResults)) {
    return [];
  }

  return rawResults
    .filter((result) =>
      typeof result?.score === 'number' &&
      typeof result?.total_questions === 'number' &&
      typeof result?.created_at === 'string'
    )
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()) as StoredExamResult[];
}
