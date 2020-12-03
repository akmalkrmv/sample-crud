export interface AnimalResponse {
  offset: number;
  limit: number;
  total: number;
  result: Partial<Animal>[];
}

export interface Animal {
  isEditing: boolean;

  cowId: number;
  animalId: string;
  eventId: number;
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

export interface AnimalColumnMeta {
  editable: boolean;
  name: string;
  header: string;
}

export const AnimalColumns: AnimalColumnMeta[] = [
  { editable: false, name: 'cowId', header: 'Cow Id' },
  { editable: false, name: 'animalId', header: 'Animal Id' },
  { editable: false, name: 'eventId', header: 'Event Id' },
  { editable: false, name: 'newGroupId', header: 'New Group Id' },
  { editable: false, name: 'currentGroupId', header: 'Current Group Id' },

  { editable: false, name: 'deletable', header: 'Deletable' },

  { editable: true, name: 'newGroupName', header: 'New Group Name' },
  { editable: true, name: 'currentGroupName', header: 'Current Group Name' },
  { editable: true, name: 'destinationGroup', header: 'Destination Group' },
  {
    editable: true,
    name: 'destinationGroupName',
    header: 'Destination Group Name',
  },

  { editable: true, name: 'ageInDays', header: 'Age In Days' },
  { editable: true, name: 'type', header: 'Type' },
  { editable: true, name: 'alertType', header: 'Alert Type' },
  { editable: true, name: 'cowEntryStatus', header: 'Cow Entry Status' },
  {
    editable: true,
    name: 'birthDateCalculated',
    header: 'Birth Date Calculated',
  },
  {
    editable: true,
    name: 'isOutOfBreedingWindow',
    header: 'Is Out Of Breeding Window',
  },
  { editable: true, name: 'healthIndex', header: 'Health Index' },
  { editable: true, name: 'heatIndexPeak', header: 'Heat Index Peak' },
  { editable: true, name: 'lactationNumber', header: 'Lactation Number' },
  {
    editable: true,
    name: 'oldLactationNumber',
    header: 'Old Lactation Number',
  },
  { editable: true, name: 'daysInLactation', header: 'Days In Lactation' },
  { editable: true, name: 'sire', header: 'Sire' },
  { editable: true, name: 'newborns', header: 'Newborns' },
  { editable: true, name: 'calvingEase', header: 'Calving Ease' },
  { editable: true, name: 'breedingNumber', header: 'Breeding Number' },
  { editable: true, name: 'interval', header: 'Interval' },
  { editable: true, name: 'duration', header: 'Duration' },
  { editable: true, name: 'daysInPregnancy', header: 'Days In Pregnancy' },
  { editable: true, name: 'startDateTime', header: 'Start Datetime' },
  {
    editable: true,
    name: 'originalStartDateTime',
    header: 'Original Start Datetime',
  },
  { editable: true, name: 'reportingDateTime', header: 'Reporting Datetime' },
  { editable: true, name: 'minValueDateTime', header: 'Min Value Datetime' },
  { editable: true, name: 'endDate', header: 'End Date' },
  { editable: true, name: 'endDateTime', header: 'End Datetime' },
];
