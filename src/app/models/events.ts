export interface EventsQueryResponse {
  offset: number;
  limit: number;
  total: number;
  result: Partial<Event>[];
}

export interface EventOperationResponse {
  success: boolean;
  data: Partial<Event>[];
}

export interface Event {
  isEditing: boolean;

  eventId: number;
  animalId: string;
  cowId: number;
  ageInDays: number;
  type: string;
  alertType: string;
  cowEntryStatus: string;

  deletable: boolean;
  birthDateCalculated: boolean;
  isOutOfBreedingWindow: boolean;

  newGroupId: number;
  newGroupName: string;
  currentGroupId: number;
  currentGroupName: string;
  destinationGroup: number;
  destinationGroupName: string;

  healthIndex: number;
  heatIndexPeak: string;

  lactationNumber: number;
  oldLactationNumber: number;
  daysInLactation: number;

  sire: number;
  newborns: number;
  calvingEase: string;
  breedingNumber: number;
  interval: number;
  duration: number;
  daysInPregnancy: number;

  startDateTime: number;
  originalStartDateTime: number;
  reportingDateTime: number;
  minValueDateTime: number;
  endDate: number;
  endDateTime: number;
}
