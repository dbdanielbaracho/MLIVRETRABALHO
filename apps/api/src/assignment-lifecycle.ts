export const assignmentTransitionRules={checked_in:['confirmed'],in_progress:['checked_in'],checked_out:['checked_in','in_progress'],completed:['checked_out']} as const;
export type AssignmentNextState=keyof typeof assignmentTransitionRules;
export function allowedPreviousStates(next:AssignmentNextState):readonly string[]{return assignmentTransitionRules[next];}
export function canTransition(current:string,next:AssignmentNextState){return allowedPreviousStates(next).includes(current as never);}
